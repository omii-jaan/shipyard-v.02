import { supabase } from "@/lib/supabase";

export const profileApi = {
  async getCurrent() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error && error.code !== "PGRST116") throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  async getByUsername(username: string) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", username)
      .single();

    if (error) throw error;
    return data;
  },

  async update(updates: Partial<{
    username: string;
    full_name: string;
    bio: string;
    stack: string[];
    social_links: Record<string, string>;
    avatar_url: string;
  }>) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", user.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async uploadAvatar(file: File) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const fileExt = file.name.split(".").pop();
    const fileName = `${user.id}/avatar.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(fileName, file, { upsert: true });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);
    return data.publicUrl;
  },
};

export const projectApi = {
  async getAll(filters?: {
    builder_id?: string;
    status?: string;
    category?: string;
    limit?: number;
    offset?: number;
  }) {
    let query = supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (filters?.builder_id) query = query.eq("builder_id", filters.builder_id);
    if (filters?.status) query = query.eq("status", filters.status);
    if (filters?.category) query = query.eq("category", filters.category);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  async create(project: {
    title: string;
    description?: string;
    github_repo_full_name?: string;
    github_repo_url?: string;
    live_url?: string;
    demo_video_url?: string;
    category?: string;
    category_color?: "cyan" | "purple" | "green" | "orange";
    stack?: string[];
  }) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from("projects")
      .insert({ ...project, builder_id: user.id })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<{
    title: string;
    description: string;
    live_url: string;
    demo_video_url: string;
    category: string;
    category_color: "cyan" | "purple" | "green" | "orange";
    stack: string[];
    status: "draft" | "docked" | "verified" | "archived";
    is_featured: boolean;
  }>) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from("projects")
      .update(updates)
      .eq("id", id)
      .eq("builder_id", user.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id)
      .eq("builder_id", user.id);

    if (error) throw error;
    return true;
  },

  async incrementViews(id: string) {
    const { error } = await supabase.rpc("increment_project_views", { project_id: id });
    if (error) throw error;
  },
};

export const contractApi = {
  async getAll(filters?: {
    builder_id?: string;
    founder_id?: string;
    status?: string;
  }) {
    let query = supabase
      .from("contracts")
      .select(`
        *,
        project:projects(*),
        builder:profiles!contracts_builder_id_fkey(*),
        founder:profiles!contracts_founder_id_fkey(*)
      `)
      .order("created_at", { ascending: false });

    if (filters?.builder_id) query = query.eq("builder_id", filters.builder_id);
    if (filters?.founder_id) query = query.eq("founder_id", filters.founder_id);
    if (filters?.status) query = query.eq("status", filters.status);

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from("contracts")
      .select(`
        *,
        project:projects(*),
        builder:profiles!contracts_builder_id_fkey(*),
        founder:profiles!contracts_founder_id_fkey(*)
      `)
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  async create(contract: {
    project_id?: string;
    founder_id: string;
    builder_id: string;
    title: string;
    description?: string;
    amount_usd: number;
    milestones: any[];
    deadline?: string;
  }) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from("contracts")
      .insert({ ...contract, founder_id: user.id })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<{
    status: "pending" | "active" | "completed" | "cancelled" | "disputed";
    payment_status: "unpaid" | "escrowed" | "released" | "refunded";
    milestones: any[];
  }>) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from("contracts")
      .update(updates)
      .eq("id", id)
      .or(`builder_id.eq.${user.id},founder_id.eq.${user.id}`)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
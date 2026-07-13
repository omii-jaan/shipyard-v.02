export interface Profile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  stack: string[];
  social_links: Record<string, string>;
  github_username: string | null;
  github_id: number | null;
  github_access_token: string | null;
  ships_count: number;
  stars_count: number;
  vibe_score: number;
  role: 'builder' | 'founder' | 'admin';
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  builder_id: string;
  title: string;
  description: string | null;
  github_repo_id: number | null;
  github_repo_full_name: string | null;
  github_repo_url: string | null;
  github_stars: number;
  github_forks: number;
  github_language: string | null;
  github_topics: string[];
  live_url: string | null;
  demo_video_url: string | null;
  category: string | null;
  category_color: 'cyan' | 'purple' | 'green' | 'orange' | null;
  stack: string[];
  status: 'draft' | 'docked' | 'verified' | 'archived';
  is_featured: boolean;
  views_count: number;
  created_at: string;
  updated_at: string;
  builder?: Profile;
}

export interface Contract {
  id: string;
  project_id: string | null;
  builder_id: string;
  founder_id: string;
  title: string;
  description: string | null;
  status: 'pending' | 'active' | 'completed' | 'cancelled' | 'disputed';
  amount_usd: number | null;
  currency: string;
  payment_status: 'unpaid' | 'escrowed' | 'released' | 'refunded';
  escrow_transaction_id: string | null;
  milestones: ContractMilestone[];
  started_at: string | null;
  completed_at: string | null;
  deadline: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContractMilestone {
  id: string;
  title: string;
  description: string;
  amount_usd: number;
  status: 'pending' | 'in_progress' | 'submitted' | 'approved' | 'paid';
  due_date: string | null;
  completed_at: string | null;
}
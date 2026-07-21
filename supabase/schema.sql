-- Shipyard Database Schema (safe version)
-- Run this in Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table (extends auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  full_name text,
  avatar_url text,
  bio text,
  stack text[] default '{}',
  social_links jsonb default '{}'::jsonb,
  github_username text,
  github_id bigint,
  github_access_token text,
  ships_count int default 0,
  stars_count int default 0,
  vibe_score int default 0,
  role text default 'builder' check (role in ('builder', 'founder', 'admin')),
  is_verified boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Projects (Ships) table
create table if not exists public.projects (
  id uuid default uuid_generate_v4() primary key,
  builder_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text,
  github_repo_id bigint,
  github_repo_full_name text,
  github_repo_url text,
  github_stars int default 0,
  github_forks int default 0,
  github_language text,
  github_topics text[] default '{}',
  live_url text,
  demo_video_url text,
  category text,
  category_color text check (category_color in ('cyan', 'purple', 'green', 'orange')),
  stack text[] default '{}',
  status text default 'docked' check (status in ('draft', 'docked', 'verified', 'archived')),
  is_featured boolean default false,
  views_count int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Contracts table (for hiring)
create table if not exists public.contracts (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete set null,
  builder_id uuid references public.profiles(id) on delete cascade not null,
  founder_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text,
  status text default 'pending' check (status in ('pending', 'active', 'completed', 'cancelled', 'disputed')),
  amount_usd numeric(10, 2),
  currency text default 'USD',
  payment_status text default 'unpaid' check (payment_status in ('unpaid', 'escrowed', 'released', 'refunded')),
  escrow_transaction_id text,
  milestones jsonb default '[]'::jsonb,
  started_at timestamp with time zone,
  completed_at timestamp with time zone,
  deadline timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.contracts enable row level security;

-- Drop existing policies first
drop policy if exists "Public profiles are viewable by everyone" on public.profiles;
drop policy if exists "Users can insert their own profile" on public.profiles;
drop policy if exists "Users can update their own profile" on public.profiles;
drop policy if exists "Public projects are viewable by everyone" on public.projects;
drop policy if exists "Builders can insert their own projects" on public.projects;
drop policy if exists "Builders can update their own projects" on public.projects;
drop policy if exists "Builders can delete their own projects" on public.projects;
drop policy if exists "Participants can view their contracts" on public.contracts;
drop policy if exists "Founders can create contracts" on public.contracts;
drop policy if exists "Participants can update their contracts" on public.contracts;

-- Profiles policies
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Projects policies
create policy "Public projects are viewable by everyone"
  on public.projects for select
  using (status in ('docked', 'verified') or auth.uid() = builder_id);

create policy "Builders can insert their own projects"
  on public.projects for insert
  with check (auth.uid() = builder_id);

create policy "Builders can update their own projects"
  on public.projects for update
  using (auth.uid() = builder_id);

create policy "Builders can delete their own projects"
  on public.projects for delete
  using (auth.uid() = builder_id);

-- Contracts policies
create policy "Participants can view their contracts"
  on public.contracts for select
  using (auth.uid() = builder_id or auth.uid() = founder_id);

create policy "Founders can create contracts"
  on public.contracts for insert
  with check (auth.uid() = founder_id);

create policy "Participants can update their contracts"
  on public.contracts for update
  using (auth.uid() = builder_id or auth.uid() = founder_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, avatar_url, username, github_username, github_id)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    new.raw_user_meta_data->>'user_name',
    new.raw_user_meta_data->>'user_name',
    (new.raw_user_meta_data->>'provider_id')::bigint
  )
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Updated_at trigger
create or replace function public.handle_updated_at()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end $$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

drop trigger if exists projects_updated_at on public.projects;
create trigger projects_updated_at
  before update on public.projects
  for each row execute procedure public.handle_updated_at();

drop trigger if exists contracts_updated_at on public.contracts;
create trigger contracts_updated_at
  before update on public.contracts
  for each row execute procedure public.handle_updated_at();

-- Indexes
create index if not exists idx_projects_builder_id on public.projects(builder_id);
create index if not exists idx_projects_status on public.projects(status);
create index if not exists idx_projects_category on public.projects(category);
create index if not exists idx_contracts_builder_id on public.contracts(builder_id);
create index if not exists idx_contracts_founder_id on public.contracts(founder_id);

create extension if not exists pgcrypto;

create table if not exists public.employees (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  title text not null default '',
  email text not null,
  photo_url text not null,
  created_at timestamptz not null default now()
);

alter table public.employees enable row level security;

create policy if not exists "Public read" on public.employees
  for select
  using (true);

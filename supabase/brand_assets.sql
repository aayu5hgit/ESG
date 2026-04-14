-- Brand Assets table for the Optimite Branding Portal
create table if not exists public.brand_assets (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  subcategory text default '',
  description text default '',
  file_url text not null,
  thumbnail_url text default '',
  file_type text not null,
  file_size bigint default 0,
  tags text[] default '{}',
  reactions jsonb default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.brand_assets enable row level security;

create policy "Public read brand_assets" on public.brand_assets
  for select using (true);

create policy "Anon insert brand_assets" on public.brand_assets
  for insert with check (true);

create policy "Anon update brand_assets" on public.brand_assets
  for update using (true);

create policy "Anon delete brand_assets" on public.brand_assets
  for delete using (true);

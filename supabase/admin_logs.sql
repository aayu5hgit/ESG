-- Admin access logs for the Optimite Branding Portal
create table if not exists public.admin_logs (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  action text not null,
  details text default '',
  created_at timestamptz not null default now()
);

alter table public.admin_logs enable row level security;

create policy "Public read admin_logs" on public.admin_logs
  for select using (true);

create policy "Anon insert admin_logs" on public.admin_logs
  for insert with check (true);

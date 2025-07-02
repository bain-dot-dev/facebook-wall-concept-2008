-- Create posts table
create table posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  user_name text not null default 'Bain Hansly Cruz', -- Default user name
  body text check (char_length(body) <= 280),
  image_url text,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table posts enable row level security;

-- Create policy to allow all operations (for demo purposes)
create policy "Allow all operations on posts" on posts
  for all using (true);

-- Create storage bucket for images
insert into storage.buckets (id, name, public) values ('post-images', 'post-images', true);

-- Create policy for storage bucket
create policy "Allow all operations on post-images" on storage.objects
  for all using (bucket_id = 'post-images');

-- Supabase Migration: Create leads, kb_chunks, and chat_messages tables per PRD Section 9.3

-- 1. Leads table
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  email text,
  services text[] not null default '{}',
  business_type text,
  budget_band text,
  timeline text,
  message text,
  page_path text,
  utm jsonb,
  referrer text,
  consent boolean not null,
  ip_hash text,
  status text not null default 'new' -- new | contacted | qualified | won | lost
);

-- Enable Row Level Security (RLS)
alter table leads enable row level security;
-- No public policies: only the service role (Pages Function) inserts and reads.

-- 2. P1 Tables: AI assistant RAG chunks and chat logs
create extension if not exists vector;

create table if not exists kb_chunks (
  id bigserial primary key,
  source text,
  heading text,
  content text not null,
  embedding vector(1536)
);

create table if not exists chat_messages (
  id bigserial primary key,
  session_id uuid not null,
  role text not null,
  content text not null,
  created_at timestamptz not null default now()
);

alter table kb_chunks enable row level security;
alter table chat_messages enable row level security;

-- La Carta de la Amistad: esquema, reglas y seguridad.
-- Regla de la tradición: cada persona tiene, por año, una carta con cada una de las demás.
-- La carta es direccional. Si se rechaza, se conserva como historial y la carta vuelve.

create table public.personas (
  id uuid primary key default gen_random_uuid(),
  nombre text not null unique check (length(trim(nombre)) between 1 and 40),
  palo text not null check (palo in ('oros', 'copas', 'espadas', 'bastos')),
  es_admin boolean not null default false,
  email text unique,
  user_id uuid unique references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.cartas (
  id uuid primary key default gen_random_uuid(),
  anio int not null,
  de uuid not null references public.personas (id) on delete cascade,
  para uuid not null references public.personas (id) on delete cascade,
  estado text not null default 'pendiente'
    check (estado in ('pendiente', 'aceptada', 'cumplida', 'rechazada')),
  favor text not null check (length(trim(favor)) between 1 and 160),
  fecha_limite date,
  fecha_peticion timestamptz not null default now(),
  fecha_respuesta timestamptz,
  fecha_cumplido timestamptz,
  check (de <> para)
);

-- Una única carta vigente por (de, para, año). Las rechazadas no cuentan: la carta vuelve.
create unique index cartas_una_por_par_y_anio
  on public.cartas (de, para, anio)
  where estado <> 'rechazada';

create index cartas_por_anio on public.cartas (anio);

-- Persona de la cuadrilla asociada al usuario que ha iniciado sesión.
create or replace function public.yo()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select id from public.personas where user_id = auth.uid()
$$;

create or replace function public.soy_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((select es_admin from public.personas where user_id = auth.uid()), false)
$$;

-- Tras el enlace mágico, asocia el usuario a su persona por email.
create or replace function public.vincular_persona()
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
begin
  update public.personas
     set user_id = auth.uid()
   where user_id is null
     and lower(email) = lower(auth.jwt() ->> 'email')
  returning id into v_id;
  return coalesce(v_id, public.yo());
end;
$$;

-- Responder a una carta recibida (solo el destinatario, solo si está pendiente).
create or replace function public.responder_carta(p_carta uuid, p_acepta boolean)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.cartas
     set estado = case when p_acepta then 'aceptada' else 'rechazada' end,
         fecha_respuesta = now()
   where id = p_carta
     and para = public.yo()
     and estado = 'pendiente';
  if not found then
    raise exception 'Esa carta no es tuya o ya tiene respuesta';
  end if;
end;
$$;

-- Marcar como cumplido un favor aceptado (solo el destinatario).
create or replace function public.cumplir_carta(p_carta uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.cartas
     set estado = 'cumplida',
         fecha_cumplido = now()
   where id = p_carta
     and para = public.yo()
     and estado = 'aceptada';
  if not found then
    raise exception 'Esa carta no es tuya o no está aceptada';
  end if;
end;
$$;

alter table public.personas enable row level security;
alter table public.cartas enable row level security;

-- Solo la cuadrilla ve la cuadrilla.
create policy "La cuadrilla ve a la cuadrilla" on public.personas
  for select to authenticated using (public.yo() is not null);

create policy "El admin da de alta" on public.personas
  for insert to authenticated with check (public.soy_admin());

create policy "El admin edita" on public.personas
  for update to authenticated using (public.soy_admin()) with check (public.soy_admin());

-- El texto del favor es público para toda la cuadrilla.
create policy "La cuadrilla ve las cartas" on public.cartas
  for select to authenticated using (public.yo() is not null);

-- Solo puedes gastar tus propias cartas, del año en curso y empezando como pendiente.
create policy "Solo echas tus cartas" on public.cartas
  for insert to authenticated with check (
    de = public.yo()
    and estado = 'pendiente'
    and anio = extract(year from now() at time zone 'Europe/Madrid')::int
    and fecha_respuesta is null
    and fecha_cumplido is null
  );

-- Sin políticas de update ni delete: los cambios de estado van por responder_carta y cumplir_carta.

grant execute on function public.yo() to authenticated;
grant execute on function public.soy_admin() to authenticated;
grant execute on function public.vincular_persona() to authenticated;
grant execute on function public.responder_carta(uuid, boolean) to authenticated;
grant execute on function public.cumplir_carta(uuid) to authenticated;

-- Tiempo real para que el tablero se actualice solo.
alter publication supabase_realtime add table public.personas;
alter publication supabase_realtime add table public.cartas;

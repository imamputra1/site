import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';
import { env } from '$env/dynamic/private'; // <-- Gunakan dinamis

// Ambil URL dinamis. Jika kosong (saat build Vercel), berikan URL dummy yang formatnya valid
const DATABASE_URL = env.DATABASE_URL || 'postgres://user:pass@localhost:5432/dummy';

// Ubah fatal error (throw) menjadi peringatan kuning (warn)
if (!env.DATABASE_URL) {
    console.warn('⚠️ Peringatan: DATABASE_URL belum diatur di environment.');
}

// Inisialisasi klien (mesin build Vercel akan membaca URL dummy dan tidak akan crash)
const client = postgres(DATABASE_URL, { prepare: false });
export const db = drizzle(client, { schema });

import { GitHub } from 'arctic';
// 1. HAPUS ATAU COMMENT BARIS INI:
// import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, BASE_URL } from '$env/static/private';

// 2. GUNAKAN DYNAMIC ENV SEBAGAI GANTINYA:
import { env } from '$env/dynamic/private';

// Jika di bawahnya ada deklarasi variabel, ubah cara panggilnya:
// export const github = new GitHub(env.GITHUB_CLIENT_ID || '', env.GITHUB_CLIENT_SECRET || '', env.BASE_URL || '');

// TODO: Update redirect URI

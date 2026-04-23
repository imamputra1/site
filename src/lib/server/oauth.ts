import { GitHub } from 'arctic';
// Gunakan dynamic environment alih-alih static
import { env } from '$env/dynamic/private';

// Berikan fallback (nilai cadangan) agar Arctic/TypeScript tidak protes
export const github = new GitHub(env.GITHUB_CLIENT_ID || 'pending', env.GITHUB_CLIENT_SECRET || 'pending', env.BASE_URL || 'http://localhost:5173');

// TODO: Update redirect URI

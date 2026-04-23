import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	// Ambil variabel secara dinamis, berikan URL cadangan (fallback) agar tidak error saat build
	const baseUrl = env.BASE_URL || 'https://portofolio-anda.com'; // <-- Nanti ganti dengan domain asli Anda

	return new Response(
		`User-Agent: *
Allow: /
Disallow: /api

Host: ${baseUrl}
Sitemap: ${baseUrl}/sitemap.xml`,
		{
			headers: {
				'Content-Type': 'text/plain',
				'Cache-Control': 'max-age=3600' // 1 hour
			}
		}
	);
};

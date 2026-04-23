import { error, redirect } from '@sveltejs/kit';
export const prerender = false;

// ... sisa kode Anda di bawah sini ...
export const load = async ({ params }) => {
	// 1. Menggunakan path absolute /src/... agar Vite tidak kebingungan
	const allProjects = import.meta.glob('/src/contents/projects/*.md', { eager: true });

	// 2. Mencocokkan menggunakan path absolute yang sama
	const targetPath = `/src/contents/projects/${params.slug}.md`;
	const post = allProjects[targetPath] as any;

	// Jika file tidak ditemukan
	if (!post || !post.metadata) {
		error(404, 'Project not found');
	}

	const meta = post.metadata;

	// 3. Validasi status Preview
	if (meta.preview_status === 'dns_issue') {
		error(502, 'DNS / Domain Update in progress');
	} else if (meta.preview_status === 'maintenance') {
		error(503, 'System is under maintenance');
	}

	// 4. Redirect
	if (meta.preview_url) {
		redirect(302, meta.preview_url);
	}

	error(404, 'Preview link not available');
};

import { error, redirect } from '@sveltejs/kit';

export const load = async ({ params }) => {
	// Gunakan path absolute
	const allProjects = import.meta.glob('/src/contents/projects/*.md', { eager: true });

	const targetPath = `/src/contents/projects/${params.slug}.md`;
	const post = allProjects[targetPath] as any;

	if (!post || !post.metadata) {
		error(404, 'Project not found');
	}

	const meta = post.metadata;

	// Validasi repository private
	if (meta.source_status === 'private') {
		error(403, 'Repository is private');
	}

	// Redirect ke GitHub
	if (meta.source_url) {
		redirect(302, meta.source_url);
	}

	error(404, 'Source code link not available');
};

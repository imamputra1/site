// src/routes/+page.server.ts
import { title } from 'node:process';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// 1. Fetching Articles
	const articleFiles = import.meta.glob('/src/contents/articles/*.md', { eager: true });
	const articles = [];

	for (const path in articleFiles) {
		const file = articleFiles[path] as any;
		const slug = path.split('/').pop()?.replace('.md', '');

		if (file && file.metadata) {
			articles.push({
				slug,
				title: file.metadata.title || 'Untitled Article',

				date: file.metadata.publishedDate || new Date().toISOString(),

				thumbnailUrl: file.metadata.poster || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop'
			});
		}
	}
	articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	const recentArticles = articles.slice(0, 5);

	// 2. Fetching Projects
	const projectFiles = import.meta.glob('/src/contents/projects/*.md', { eager: true });
	const projects = [];

	for (const path in projectFiles) {
		const file = projectFiles[path] as any;
		const slug = path.split('/').pop()?.replace('.md', '');

		if (file && file.metadata) {
			projects.push({
				slug,
				title: file.metadata.title || 'Untitled Project',
				date: file.metadata.publishedDate || new Date().toISOString(),
				thumbnailUrl: file.metadata.poster || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop'
			});
		}
	}
	projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	const recentProjects = projects.slice(0, 5);

	// 3. Fetching Milestones
	const milestoneData = import.meta.glob('/src/contents/abouts/milestone.md', { eager: true });
	let recentMilestones: any[] = [];

	for (const path in milestoneData) {
		const file = milestoneData[path] as any;
		if (file && file.metadata && file.metadata.milestones) {
			recentMilestones = file.metadata.milestones;
		}
	}
	recentMilestones = recentMilestones.slice(0, 5);

	// 4. Fetching Educations
	const educationData = import.meta.glob('/src/contents/abouts/education.md', { eager: true });

	let recentFormalEdu: any[] = [];
	let recentCerts: any[] = [];

	for (const path in educationData) {
		const file = educationData[path] as any;
		if (file && file.metadata) {
			if (file.metadata.formal_education) {
				recentFormalEdu = file.metadata.formal_education.slice(0, 1);
			}
			if (file.metadata.certifications) {
				recentCerts = file.metadata.certifications.slice(0, 4);
			}
		}
	}

	return {
		recentArticles,
		recentProjects,
		recentMilestones,
		recentFormalEdu,
		recentCerts
	};
};

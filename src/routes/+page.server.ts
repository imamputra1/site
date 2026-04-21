// src/routes/+page.server.ts
import { title } from 'node:process';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {

    const articleFiles = import.meta.glob('/src/contents/articles/*.md', { eager: true });
    let articles = [];
    
    for (const path in articleFiles) {
        const file = articleFiles[path] as any;
        const slug = path.split('/').pop()?.replace('.md', '');
        
        if (file && file.metadata) {
            articles.push({
                slug,
                title: file.metadata.title || 'Untitled Article',
                // Gunakan publishedDate sesuai format Bapak
                date: file.metadata.publishedDate || new Date().toISOString(),
                // Gunakan poster sesuai format Bapak
                thumbnailUrl: file.metadata.poster || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop'
            });
        }
    }
    articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const recentArticles = articles.slice(0,5);

    const projectFiles = import.meta.glob('/src/contents/projects/*.md', { eager: true });
    let projects = [];
    
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

    const milestoneData = import.meta.glob('/src/contents/abouts/milestone.md', { eager: true });
    let recentMilestones: any[] = [];

    for (const path in milestoneData) {
        const file = milestoneData[path] as any;
        if (file && file.metadata && file.metadata.milestones) {
            recentMilestones = file.metadata.milestones;
        }
    }
    recentMilestones = recentMilestones.slice(0, 5);

    const courseFiles = import.meta.glob('/src/contents/courses/*.md', { eager: true });
    let courses = [];

    for (const path in courseFiles) {
      const file = courseFiles[path] as any;
      const slug = path.split('/').pop()?.replace('.md', '');

      if (file && file.metadata) {
        courses.push({
          slug,
          title: file.metadata.title || 'Untitled Courses',
          date: file.metadata.publishedDate || new Date().toISOString(),
          thumbnailUrl: file.metadata.poster || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop'
        });
      }
    }
    courses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const recentCourses = courses.slice(0.5);

    return {
        recentArticles,
        recentProjects,
        recentMilestones,
        recentCourses
    };
};

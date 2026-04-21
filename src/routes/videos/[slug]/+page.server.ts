import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
// Path-nya butuh mundur 3 kali karena foldernya lebih dalam
import videosData from '../../../contents/videos/data.json';

export const load: PageServerLoad = async ({ params }) => {
    // 1. Tangkap 'slug' dari URL (misal: 'startup-angkut-ternak')
    const { slug } = params;
    
    // 2. Cari data di JSON yang slug-nya sama
    const video = videosData.find((v) => v.slug === slug);

    // 3. Jika pengunjung mengetik URL ngawur dan video tidak ada, kembalikan error 404
    if (!video) {
        error(404, { message: 'Video not found in our database' });
    }

    // 4. Jika ketemu, kirim data video spesifik tersebut ke frontend
    return {
        video
    };
};

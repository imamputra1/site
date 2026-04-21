import type { PageServerLoad } from './$types';
import videosData from '../../contents/videos/data.json';

export const load: PageServerLoad = async () => {
    // Mengirimkan seluruh data video ke halaman frontend
    return {
        videos: videosData
    };
};

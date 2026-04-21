<script lang="ts">
    // Menangkap data 1 video spesifik dari +page.server.ts
    let { data } = $props();
    let video = data.video;
</script>

<svelte:head>
    <title>{video.title} | Imam Putra</title>
</svelte:head>

<div class="max-w-4xl mx-auto py-12 px-4 mb-20">
    
    <a href="/videos" class="inline-flex items-center text-gray-500 hover:text-blue-400 mb-8 transition-colors text-sm font-mono group">
        <span class="mr-2 group-hover:-translate-x-1 transition-transform">←</span> 
        Back to all videos
    </a>

    <div class="relative w-full aspect-video rounded-xl overflow-hidden border border-gray-700 shadow-2xl mb-8 bg-black">
        <iframe 
            class="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/{video.youtubeId}" 
            title={video.title}
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
        </iframe>
    </div>

    <div class="flex flex-col gap-4 border-b border-gray-800 pb-8 mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-100">{video.title}</h1>
        <p class="text-blue-500 font-mono text-sm tracking-wide">
            PUBLISHED ON: {new Date(video.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase()}
        </p>
    </div>

    <div class="text-gray-300 leading-relaxed whitespace-pre-wrap font-sans text-lg">
        {video.description}
    </div>

</div>

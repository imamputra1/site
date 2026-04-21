<script lang="ts">
    // Menangkap data dari +page.server.ts menggunakan Svelte 5
    let { data } = $props();
    let videos = data.videos;
</script>

<svelte:head>
    <title>Videos | Imam Putra</title>
</svelte:head>

<div class="max-w-5xl mx-auto py-12 px-4 mb-20">
    <div class="mb-10 border-b border-gray-800 pb-6 text-center">
        <h1 class="text-3xl font-serif text-gray-100 mb-2">Algorithmic Visualizations</h1>
        <p class="text-gray-400 italic">Exploring data, logic, and systems through visual narratives.</p>
    </div>
    
    <div class="flex flex-col gap-6">
        {#each videos as video}
            <a href="/videos/{video.slug}" class="group flex flex-col md:flex-row bg-[#0a0c10] border border-gray-800 rounded-lg overflow-hidden hover:border-gray-600 transition-all duration-300 shadow-lg hover:shadow-blue-900/20">
                
                <div class="md:w-2/5 aspect-video relative overflow-hidden bg-gray-900 border-r border-gray-800">
                    <img 
                        src={video.thumbnailUrl} 
                        alt={video.title} 
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    />
                    <div class="absolute inset-0 flex items-center justify-center">
                        <div class="bg-black/50 backdrop-blur-sm p-3 rounded-full group-hover:bg-blue-600/80 transition-colors">
                            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M4 4l12 6-12 6V4z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
                
                <div class="md:w-3/5 p-6 flex flex-col justify-center">
                    <h2 class="text-xl md:text-2xl font-bold text-gray-200 mb-2 group-hover:text-blue-400 transition-colors">
                        {video.title}
                    </h2>
                    
                    <p class="text-xs text-blue-500 font-mono mb-4">
                        PUBLISHED ON: {new Date(video.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase()}
                    </p>
                    
                    <p class="text-gray-400 text-sm leading-relaxed line-clamp-3">
                        {video.description}
                    </p>
                    
                    <div class="mt-6 flex items-center text-gray-300 text-sm font-semibold group-hover:text-blue-400 transition-colors">
                        <span class="mr-2">Watch Video</span>
                        <span class="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                </div>
            </a>
        {/each}
    </div>
</div>

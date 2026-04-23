<script lang="ts">
	// Menangkap data dari +page.server.ts menggunakan Svelte 5
	let { data } = $props();
	let videos = data.videos;
</script>

<svelte:head>
	<title>Videos | Imam Putra</title>
</svelte:head>

<div class="mx-auto mb-20 max-w-5xl px-4 py-12">
	<div class="mb-10 border-b border-gray-800 pb-6 text-center">
		<h1 class="mb-2 font-serif text-3xl text-gray-100">Algorithmic Visualizations</h1>
		<p class="text-gray-400 italic">Exploring data, logic, and systems through visual narratives.</p>
	</div>

	<div class="flex flex-col gap-6">
		{#each videos as video}
			<a
				href="/videos/{video.slug}"
				class="group flex flex-col overflow-hidden rounded-lg border border-gray-800 bg-[#0a0c10] shadow-lg transition-all duration-300 hover:border-gray-600 hover:shadow-blue-900/20 md:flex-row"
			>
				<div class="relative aspect-video overflow-hidden border-r border-gray-800 bg-gray-900 md:w-2/5">
					<img
						src={video.thumbnailUrl}
						alt={video.title}
						class="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100"
					/>
					<div class="absolute inset-0 flex items-center justify-center">
						<div class="rounded-full bg-black/50 p-3 backdrop-blur-sm transition-colors group-hover:bg-blue-600/80">
							<svg class="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
								<path d="M4 4l12 6-12 6V4z"></path>
							</svg>
						</div>
					</div>
				</div>

				<div class="flex flex-col justify-center p-6 md:w-3/5">
					<h2 class="mb-2 text-xl font-bold text-gray-200 transition-colors group-hover:text-blue-400 md:text-2xl">
						{video.title}
					</h2>

					<p class="mb-4 font-mono text-xs text-blue-500">
						PUBLISHED ON: {new Date(video.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase()}
					</p>

					<p class="line-clamp-3 text-sm leading-relaxed text-gray-400">
						{video.description}
					</p>

					<div class="mt-6 flex items-center text-sm font-semibold text-gray-300 transition-colors group-hover:text-blue-400">
						<span class="mr-2">Watch Video</span>
						<span class="transition-transform group-hover:translate-x-1">→</span>
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>

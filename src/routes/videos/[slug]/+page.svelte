<script lang="ts">
	// Menangkap data 1 video spesifik dari +page.server.ts
	let { data } = $props();
	let video = data.video;
</script>

<svelte:head>
	<title>{video.title} | Imam Putra</title>
</svelte:head>

<div class="mx-auto mb-20 max-w-4xl px-4 py-12">
	<a href="/videos" class="group mb-8 inline-flex items-center font-mono text-sm text-gray-500 transition-colors hover:text-blue-400">
		<span class="mr-2 transition-transform group-hover:-translate-x-1">←</span>
		Back to all videos
	</a>

	<div class="relative mb-8 aspect-video w-full overflow-hidden rounded-xl border border-gray-700 bg-black shadow-2xl">
		<iframe
			class="absolute top-0 left-0 h-full w-full"
			src="https://www.youtube.com/embed/{video.youtubeId}"
			title={video.title}
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		>
		</iframe>
	</div>

	<div class="mb-8 flex flex-col gap-4 border-b border-gray-800 pb-8">
		<h1 class="text-3xl font-bold text-gray-100 md:text-4xl">{video.title}</h1>
		<p class="font-mono text-sm tracking-wide text-blue-500">
			PUBLISHED ON: {new Date(video.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase()}
		</p>
	</div>

	<div class="font-sans text-lg leading-relaxed whitespace-pre-wrap text-gray-300">
		{video.description}
	</div>
</div>

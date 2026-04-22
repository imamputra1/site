<script lang="ts">
	import Metadata from '$lib/components/metadata.svelte';
  import { page } from '$app/state';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Metadata title={data.meta.title + ' | Imam Putra'} description={data.meta.description} image={data.meta.poster} />

<header class="group border-ash-700 bg-ash-700 relative mb-5 aspect-3/1 overflow-hidden border">
	<img src={data.meta.poster} alt={data.meta.title} class="size-full object-cover object-center" />
	<div class="absolute top-0 left-0 grid h-full w-full place-items-center bg-[#080808]/80 transition-opacity duration-500 group-hover:opacity-0">
		<h1 class="max-w-[80%] px-4 text-center text-2xl font-semibold uppercase lg:max-w-[60%] lg:text-4xl">
			{data.meta.title}
		</h1>
	</div>
	<div
		aria-hidden="true"
		class="absolute top-0 left-0 h-full w-full bg-repeat opacity-2 group-hover:opacity-0"
		style="background-image: url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')"
	></div>
</header>


<article
	class="prose prose-hr:border-ash-600 prose-pre:bg-ash-800/20 prose-code:before:opacity-0 prose-code:after:opacity-0 prose-code:text-ash-200 prose-code:font-mono prose-pre:border prose-headings:text-ash-200 prose-p:text-ash-400 prose-strong:text-ash-200 prose-li:text-ash-400 prose-li:marker:text-ash-300 prose-a:text-ash-200 prose-blockquote:border-ash-500 prose-p:indent-5 prose-td:text-ash-300 prose-thead:border-ash-300 prose-tr:border-ash-500 mx-auto max-w-5xl font-sans"
>
  <div class="mt-6 flex flex-wrap items-end justify-center gap-4 font-mono text-sm">
    {#if data.meta.preview_url || data.meta.preview_status}
      <a 
                href="/projects/{page.params.slug}/preview" 
                target="_blank" 
                rel="noreferrer"
                class="no-underline px-5 py-2.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-gray-900 transition-all duration-300 flex items-center gap-3"
            >
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                LIVE PREVIEW
            </a>
        {/if}

        {#if data.meta.source_url || data.meta.source_status}
            <a 
                href="/projects/{page.params.slug}/source" 
                target="_blank" 
                rel="noreferrer"
                class="no-underline px-5 py-2.5 bg-gray-800 text-gray-300 border border-gray-600 hover:bg-gray-200 hover:text-black transition-all duration-300 flex items-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                SOURCE CODE
            </a>
        {/if}

        {#if data.meta.preview_url || data.meta.preview_status}
                {/if}

            {#if data.meta.source_url || data.meta.source_status}
                 {/if}

            {#if data.meta.playstore_url}
                <a 
                    href={data.meta.playstore_url} 
                    target="_blank" 
                    rel="noreferrer"
                    class="no-underline px-5 py-2.5 bg-sky-500/10 text-sky-400 border border-sky-500/30 hover:bg-sky-500 hover:text-gray-900 transition-all duration-300 flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21 19 12 5 3z"/></svg>
                    [PLAY_STORE]
                </a>
            {/if}

            {#if data.meta.appstore_url}
                <a 
                    href={data.meta.appstore_url} 
                    target="_blank" 
                    rel="noreferrer"
                    class="no-underline px-5 py-2.5 bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M10 2c1 .5 2 2 2 5"/></svg>
                    [APP_STORE]
                </a>
            {/if}

    </div>


	<data.content />
</article>

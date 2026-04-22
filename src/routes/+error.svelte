<script lang="ts">
	import { page } from '$app/state';
</script>

<main class="flex grow flex-col items-center justify-center space-y-2.5 md:space-y-5">
	{#if page.status === 404}
		<code class="block text-[2dvw] leading-[0.9] -tracking-widest whitespace-pre-wrap lg:text-[1.4dvh]">
			{`
    ___    _______     ___   
   /   )  (  __   )   /   )  
  / /) |  | (  )  |  / /) |  
 / (_) (_ | | /   | / (_) (_ 
(____   _)| (/ /) |(____   _)
     ) (  |   / | |     ) (  
     | |  |  (__) |     | |  
     (_)  (_______)     (_) 
`}
		</code>
		<h1 class="sr-only">404 Not Found</h1>
		<div class="text-center">
			<p class="mb-1 font-bold text-amber-400">Page not found</p>
			<p class="text-gray-400">Sorry, the page you are looking for could not be found.</p>
		</div>
	{:else if page.status === 403}
		<code class="block text-[2dvw] leading-[0.9] -tracking-widest whitespace-pre-wrap text-sky-500 lg:text-[1.4dvh]">
			{`
 _   ___   _____   _____ 
| | |   | |  _  | |____ |
| |_|   | | | | |     | |
|       | | | | |  ___| |
|___    | | |_| | |____ |
    |   | |     |     | |
    |___| |_____| |_____|
`}
		</code>
		<h1 class="sr-only">403 Forbidden</h1>
		<div class="max-w-md text-center">
			<p class="mb-1 font-bold text-sky-400">Private Repository</p>
			<p class="text-gray-400">Access denied. The source code for this project is currently set to private to protect sensitive credentials or ongoing work.</p>
		</div>
	{:else if page.status === 502}
		<code class="block text-[2dvw] leading-[0.9] -tracking-widest whitespace-pre-wrap text-purple-500 lg:text-[1.4dvh]">
			{`
 _______   _____   _____ 
|  ____ | |  _  | /___  |
| |___  | | | | |  ___| |
|____   | | | | | |____ |
 ___ |  | | |_| | |  ___|
|       | |     | | |___ 
|_______| |_____| |_____|
`}
		</code>
		<h1 class="sr-only">502 Bad Gateway</h1>
		<div class="max-w-md text-center">
			<p class="mb-1 font-bold text-purple-400">DNS / Domain Update</p>
			<p class="text-gray-400">
				The live preview is temporarily unavailable due to sub-domain reconfiguration or pending DNS propagation. Please check back later.
			</p>
		</div>
	{:else if page.status === 503}
		<code class="block text-[2dvw] leading-[0.9] -tracking-widest whitespace-pre-wrap text-emerald-500 lg:text-[1.4dvh]">
			{`
 _______   _____   _____ 
|  ____ | |  _  | |____ |
| |___  | | | | |     | |
|____   | | | | |  ___| |
 ___ |  | | |_| | |____ |
|       | |     |     | |
|_______| |_____| |_____|
`}
		</code>
		<h1 class="sr-only">503 Service Unavailable</h1>
		<div class="max-w-md text-center">
			<p class="mb-1 font-bold text-emerald-400">System Maintenance</p>
			<p class="text-gray-400">The live preview is currently down for maintenance or receiving a massive update. I'm actively working on it under the hood!</p>
		</div>
	{:else}
		<code class="block text-[2dvw] leading-[0.9] -tracking-widest whitespace-pre-wrap text-red-500 lg:text-[1.4dvh]">
			{`
 _______  _______  _______ 
|       ||  _    ||  _    |
|   ____|| | |   || | |   |
|  |____ | | |   || | |   |
|_____  || |_|   || |_|   |
 _____| ||       ||       |
|_______||_______||_______| 
`}
		</code>
		<h1 class="sr-only">Internal Server Error</h1>
		<div class="text-center">
			<p class="mb-1 font-bold text-red-400">Something went wrong</p>
			<p class="text-gray-400">Sorry, an unexpected error occurred while processing your request.</p>
		</div>
	{/if}

	<a
		href="/"
		class="mt-8 rounded-full border border-gray-700 px-6 py-2 font-mono text-sm text-gray-400 transition-colors hover:border-gray-400 hover:text-white"
	>
		cd ~/home
	</a>
</main>

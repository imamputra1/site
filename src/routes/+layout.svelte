<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity';

	import { PUBLIC_UMAMI_TRACKING_ID } from '$env/static/public';

	import '../app.css';
	import { dev } from '$app/environment';
	import Header from '$lib/components/layout/header/header.svelte';
	import Navbar from '$lib/components/layout/navbar/navbar.svelte';

	let { children } = $props();

	let dragging = $state(false);
	let isFullscreen = $state(false);
	let offset = $state({ x: 0, y: 0 });
	let position = $state({ x: 0, y: 0 });
	let containerElement = $state<HTMLElement | null>(null);
	let isMobile = $derived(new MediaQuery('(max-width: 500px)').current);

	function toggleFullscreen() {
		if (!isFullscreen) containerElement?.requestFullscreen();
		else {
			document.exitFullscreen();
			position = { x: 0, y: 0 };
		}
		isFullscreen = !isFullscreen;
	}

	function onMouseDown(e: MouseEvent) {
		dragging = true;
		offset = { x: e.clientX - position.x, y: e.clientY - position.y };
	}

	$effect(() => {
		const controller = new AbortController();

		const handleMouseUp = () => (dragging = false);

		const handleMouseMove = (e: MouseEvent) => {
			if (dragging) position = { x: e.clientX - offset.x, y: e.clientY - offset.y };
		};

		const handleFullscreenChange = () => {
			if (!document.fullscreenElement) isFullscreen = false;
		};

		window.addEventListener('mouseup', handleMouseUp, { signal: controller.signal });
		window.addEventListener('mousemove', handleMouseMove, { signal: controller.signal });
		document.addEventListener('fullscreenchange', handleFullscreenChange, { signal: controller.signal });

		return () => controller.abort();
	});

	$effect(() => {
		if (!isMobile) return;

		position = { x: 0, y: 0 };
	});
</script>

<!-- Container Content -->
<svelte:head>
	{#if !dev}
		<script defer src="https://cloud.umami.is/script.js" data-website-id={PUBLIC_UMAMI_TRACKING_ID}></script>
	{/if}
</svelte:head>

<div class="pointer-events-none fixed inset-0 z-[-1] overflow-hidden bg-black">
	<div class="absolute inset-0 z-10 h-1/2 bg-gradient-to-b from-black via-black/80 to-transparent"></div>
	<div class="grid-plane absolute top-1/4 left-[-50%] h-[150%] w-[200%]"></div>
</div>

<main
	bind:this={containerElement}
	data-fullscreen={isFullscreen || isMobile}
	class="from-ash-800 to-ash-700 z-10 flex h-[85dvh] w-[95dvw] flex-col overflow-hidden rounded-xl bg-black/90 bg-linear-to-tr backdrop-blur-sm data-[fullscreen=true]:h-dvh data-[fullscreen=true]:w-dvw data-[fullscreen=true]:rounded-none md:h-[75dvh] md:w-[70dvw]"
	lass:container-shadow={!isFullscreen || !isMobile}
	style:transform="translate({position.x}px, {position.y}px)"
	style:transition={dragging ? 'none' : 'all 0.2s ease-out'}
>
	<Header {isFullscreen} {onMouseDown} {toggleFullscreen} />

	<div class="no-scrollbar flex-1 overflow-y-auto">
		{@render children()}
	</div>

	<Navbar />
</main>

<!-- Grid effect -->
<style>
	.grid-plane {
		background-image:
			linear-gradient(to right, rgba(14, 165, 233, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(14, 165, 233, 0.4) 1px, transparent 1px);
		background-size: 60px 60px;
		transform-origin: top center;
		transform: perspective(800px) rotateX(70deg);
		animation: moveGrid 3s linear infinite;
	}

	@keyframes moveGrid {
		0% {
			background-position: 0 0;
		}
		100% {
			background-position: 0 60px;
		}
	}

	.no-scrollbar::-webkit-scrollbar {
		display: none;
	}
	.no-scrollbar {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	.container-shadow {
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
	}

	.grid-plane {
		background-image:
			linear-gradient(to right, rgba(14, 165, 233, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(14, 165, 233, 0.4) 1px, transparent 1px);
		background-size: 60px 60px;
		transform-origin: top center;
		transform: perspective(800px) rotateX(70deg);
		animation: moveGrid 3s linear infinite;
	}

	@keyframes moveGrid {
		0% {
			background-position: 0 0;
		}
		100% {
			background-position: 0 60px;
		}
	}

	.no-scrollbar::-webkit-scrollbar {
		display: none;
	}
	.no-scrollbar {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	.container-shadow {
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
	}

	.magic-network-pattern {
		background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 0L80 23.09V69.28L40 92.38L0 69.28V23.09L40 0Z' fill='none' stroke='%23334155' stroke-width='0.5'/%3E%3Ccircle cx='40' cy='0' r='1.5' fill='%2338bdf8' opacity='0.8'/%3E%3Ccircle cx='80' cy='23.09' r='1.5' fill='%2338bdf8' opacity='0.8'/%3E%3Ccircle cx='80' cy='69.28' r='1.5' fill='%2338bdf8' opacity='0.8'/%3E%3Ccircle cx='40' cy='92.38' r='1.5' fill='%2338bdf8' opacity='0.8'/%3E%3Ccircle cx='0' cy='69.28' r='1.5' fill='%2338bdf8' opacity='0.8'/%3E%3Ccircle cx='0' cy='23.09' r='1.5' fill='%2338bdf8' opacity='0.8'/%3E%3C/svg%3E");
		background-size: 80px 80px;
		animation: pan-network 40s linear infinite;
	}

	@keyframes pan-network {
		0% {
			background-position: 0 0;
		}
		100% {
			background-position: 160px 160px;
		}
	}
</style>

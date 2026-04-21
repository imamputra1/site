<script lang="ts">
	import { page } from '$app/state';
	import { onDestroy } from 'svelte';
	import { createWebHaptics } from 'web-haptics/svelte';
	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();

	const { trigger, destroy } = createWebHaptics();

	onDestroy(destroy);
</script>

<div class="mx-auto flex max-w-7xl flex-col p-6 pt-6 pb-1 md:p-10 md:pb-2 md:pt-14 pb-32">
    
    <div class="w-full border-b border-gray-800 pb-6 mb-8">
        <h1 class="text-4xl md:text-5xl font-serif text-white/95 tracking-tight mb-8">
            My Life's Journey.
        </h1>
        
        <nav class="flex flex-wrap gap-6 md:gap-10 select-none">
            <a 
                onclick={() => trigger()}
                href="/abouts/milestone"
                class="text-sm md:text-base font-mono tracking-wide transition-all duration-300 relative {page.params.slug === 'milestone' ? 'text-amber-400' : 'text-gray-500 hover:text-gray-300'}"
            >
                MILESTONES
                {#if page.params.slug === 'milestone'}
                    <div class="absolute -bottom-[25px] left-0 w-full h-0.5 bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]"></div>
                {/if}
            </a>
            
            <a 
                onclick={() => trigger()}
                href="/abouts/education"
                class="text-sm md:text-base font-mono tracking-wide transition-all duration-300 relative {page.params.slug === 'education' ? 'text-sky-400' : 'text-gray-500 hover:text-gray-300'}"
         <LeftMouse>
                EDUCATION & CERTIFICATIONS
                {#if page.params.slug === 'education'}
                    <div class="absolute -bottom-[25px] left-0 w-full h-0.5 bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.8)]"></div>
                {/if}
            </a>

            <a 
                onclick={() => trigger()}
                href="/abouts/work"
                class="text-sm md:text-base font-mono tracking-wide transition-all duration-300 relative {page.params.slug === 'work' ? 'text-emerald-400' : 'text-gray-500 hover:text-gray-300'}"
            >
                WORKS
                {#if page.params.slug === 'work'}
                    <div class="absolute -bottom-[25px] left-0 w-full h-0.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                {/if}
            </a>
        </nav>
    </div>

    <div class="w-full relative min-h-[500px]">
        {@render children()}
    </div>

</div>

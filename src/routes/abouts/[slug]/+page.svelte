<script lang="ts">
	import Metadata from '$lib/components/metadata.svelte';
	import { page } from '$app/state';
	import { fade } from 'svelte/transition';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let carousels: (HTMLElement | null)[] = $state([]);
	let intervals: ReturnType<typeof setInterval>[] = [];

	function scrollCarousel(index: number, direction: 'left' | 'right') {
		const container = carousels[index];
		if (container) {
			const scrollAmount = direction === 'left' ? -container.clientWidth : container.clientWidth;
			container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
		}
	}

	function startAutoScroll(index: number) {
		intervals[index] = setInterval(() => {
			const container = carousels[index];
			if (container) {
				const maxScroll = container.scrollWidth - container.clientWidth;
				if (container.scrollLeft >= maxScroll - 10) {
					container.scrollTo({ left: 0, behavior: 'smooth' });
				} else {
					container.scrollBy({ left: container.clientWidth, behavior: 'smooth' });
				}
			}
		}, 3000);
	}

	$effect(() => {
		if (page.params.slug === 'milestone') {
			const milestones = data.meta?.milestones || [];
			milestones.forEach((item: any, i: number) => {
				if (item.images && item.images.length > 1) {
					startAutoScroll(i);
				}
			});

			return () => {
				intervals.forEach(clearInterval);
			};
		}
	});

	function pauseScroll(index: number) { clearInterval(intervals[index]); }
	function resumeScroll(index: number, length: number) { if (length > 1) startAutoScroll(index); }
	let expandedEdu = $state<Record<number, boolean>>({});

	function toggleEdu(index: number) {
		expandedEdu[index] = !expandedEdu[index];
	}

	let expandedSkills = $state<Record<string, boolean>>({});

	function toggleSkills(id: string) {
		expandedSkills[id] = !expandedSkills[id];
	}

	let expandedDesc = $state<Record<number, boolean>>({});

	function toggleDesc(index: number) {
		expandedDesc[index] = !expandedDesc[index];
	}
</script>

<Metadata title={data.meta.title + ' | Imam Putra'} description={data.meta.description} />

<!-- Milestones -->
{#if page.params.slug === 'milestone'}
	<div in:fade={{duration: 400}} class="w-full">
        <p class="text-gray-400 font-sans text-lg mb-8 pt-1">
			{data.meta.description}
		</p>

		<div class="relative border-l border-gray-800 ml-4 md:ml-8 space-y-16 pb-8">
			{#each data.meta.milestones || [] as item, i}
				<div class="relative pl-8 md:pl-16 group/timeline">
					<div class="absolute -left-[6px] top-1.5 w-3 h-3 {item.color} rounded-full {item.shadow} group-hover/timeline:scale-150 transition-transform duration-300"></div>
					<div class="absolute left-0 top-3 w-4 md:w-8 h-px bg-gray-800"></div>

					<div class="flex flex-col md:flex-row gap-8 md:gap-12 items-center w-full">
						
						<div class="flex-1 flex flex-col mt-0 md:mt-2">
							<span class="text-xs font-mono text-gray-500 mb-2">{item.date} — {item.event}</span>
							<h3 class="text-2xl font-serif text-gray-200 mb-3">{item.title}</h3>
							<p class="text-gray-400 leading-relaxed text-sm md:text-base text-justify">
								{item.description}
							</p>
						</div>
						
						<div class="w-full md:w-[400px] lg:w-[350px] shrink-0 relative group/carousel ml-auto">
							<div 
								class="rounded-xl overflow-hidden border border-gray-800 bg-gray-900 group-hover/timeline:border-gray-600 transition-colors duration-500 shadow-2xl relative"
								onmouseenter={() => pauseScroll(i)}
								onmouseleave={() => resumeScroll(i, item.images.length)}
							>
								{#if item.images.length > 1}
									<button 
										onclick={() => scrollCarousel(i, 'left')}
										class="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-sky-600 text-white w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 backdrop-blur-sm"
									>
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
									</button>
								{/if}

								<div 
									bind:this={carousels[i]} 
									class="flex overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth w-full aspect-video"
								>
									{#each item.images as img}
										<div class="w-full h-full shrink-0 snap-center relative">
											<div class="absolute inset-0 bg-gradient-to-tr from-gray-900/40 to-transparent z-10 pointer-events-none"></div>
											<img src={img} alt={item.title} class="w-full h-full object-cover grayscale group-hover/carousel:grayscale-0 transition-all duration-700" />
										</div>
									{/each}
								</div>

								{#if item.images.length > 1}
									<button 
										onclick={() => scrollCarousel(i, 'right')}
										class="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-sky-600 text-white w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 backdrop-blur-sm"
									>
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
									</button>
                  {/if}
							</div>
						</div>
						
					</div>
				</div>
			{/each}
		</div>
	</div>

<!-- Education -->
{:else if page.params.slug === 'education'}
    <div in:fade={{duration: 400}} class="w-full">
    
        <!-- Container 1 -->
        <div class="mb-6">
            <h2 class="text-3xl font-serif text-white/90 uppercase tracking-widest">
                FORMAL EDUCATION
            </h2>
        </div>

        <div class="w-full h-px bg-gray-800/60 mb-6"></div>

        <div class="w-full mb-6">

            <div class="flex flex-col gap-10">
                {#each data.meta.formal_education || [] as edu, i}
                    <div class="flex flex-col md:flex-row gap-4 md:gap-6">
                        
                        <div class="w-15 h-15 md:w-30 md:h-30 shrink-0 mt-1 bg-white/5 rounded-md p-1 border border-gray-700/50">
                            <img src={edu.logo} alt={edu.institution} class="w-full h-full object-contain" onerror={(e) => e.currentTarget.style.display = 'none'} />
                        </div>

                        <div class="flex-1 flex flex-col">
                            <h4 class="text-xl font-semibold text-gray-100">{edu.institution}</h4>
                            <p class="text-gray-200 text-sm md:text-base mt-1">{edu.degree}</p>
                            <p class="text-gray-500 text-sm mt-1">{edu.date}</p>
                            <p class="text-gray-400 text-sm mt-3">IPK: {edu.gpa}</p>
                            <p class="text-gray-400 text-sm mt-1">{edu.description}</p>
                            
                            {#if edu.skills}
                                <p class="text-gray-300 text-sm mt-3 font-medium flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-500"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                    {edu.skills}
                                </p>
                            {/if}

                            {#if edu.organizations && edu.organizations.length > 0}
                                <button 
                                    onclick={() => toggleEdu(i)}
                                    class="text-gray-400 hover:text-white text-sm font-medium flex items-center gap-1 mt-6 transition-colors w-fit border-b border-transparent hover:border-gray-500 pb-0.5"
                                >
                                    {expandedEdu[i] ? 'hide detail' : 'Organizational'}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-300 {expandedEdu[i] ? 'rotate-180' : ''}"><path d="m6 9 6 6 6-6"/></svg>
                                </button>

                                {#if expandedEdu[i]}
                                    <div in:fade={{duration: 300}} class="mt-6 pt-6 border-t border-gray-800/60 flex flex-col gap-8">
                                        {#each edu.organizations as org, j}
                                            <div class="flex flex-col md:flex-row gap-4">
                                                
                                                <div class="w-12 h-12 md:w-14 md:h-14 shrink-0 mt-1 bg-white/5 rounded-full p-1.5 border border-gray-700/50">
                                                    <img src={org.logo} alt={org.name} class="w-full h-full object-contain rounded-full" onerror={(e) => e.currentTarget.style.display = 'none'} />
                                                </div>
                                                
                                                <div class="flex-1 flex flex-col">
                                                    <h5 class="text-base md:text-lg font-semibold text-gray-200">{org.role}</h5>
                                                    <p class="text-gray-300 text-sm mt-0.5">{org.name}</p>
                                                    <p class="text-gray-500 text-sm mt-1">{org.date}</p>
                                                    <p class="text-gray-500 text-sm mt-0.5">{org.location}</p>
                                                    <p class="text-gray-400 text-sm mt-3 leading-relaxed">{org.description}</p>
                                        
                                                    {#if org.skills && org.skills.length > 0}
                                                      <div class="mt-3 flex items-start gap-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-500 mt-[3px] shrink-0"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                        <div class="text-gray-300 text-sm font-medium leading-relaxed">
                                                          {#if org.skills.length <= 2 || expandedSkills[`org-${i}-${j}`]}
                                                            {org.skills.join(', ')}
                                                            {#if org.skills.length > 2}
                                                              <button onclick={() => toggleSkills(`org-${i}-${j}`)} class="text-gray-500 hover:text-white ml-1 font-normal transition-colors">&middot; hide</button>
                                                            {/if}
                                                          {:else}
                                                            {org.skills.slice(0, 2).join(', ')} dan 
                                                            <button onclick={() => toggleSkills(`org-${i}-${j}`)} class="text-gray-400 hover:text-white font-bold transition-colors">
                                                              +{org.skills.length - 2} Skills
                                                            </button>
                                                          {/if}
                                                        </div>
                                                      </div>
                                                    {/if}
                                                </div>
                                                
                                            </div>
                                        {/each}
                                    </div>
                                {/if}
                            {/if}

                        </div>
                    </div>
                {/each}
            </div>            
        </div>

        <!-- Container 2 -->
        <div class="w-full h-px bg-gray-800/60 my-12"></div>

        <div class="mb-6">
            <h2 class="text-3xl font-serif text-white/90 uppercase tracking-widest">
                LICENSE & CERTIFICATIONS
            </h2>
        </div>

        <div class="flex flex-col w-full">

            {#each data.meta.certifications || [] as cert, i}
                <div class="flex flex-col md:flex-row gap-4 md:gap-6 py-4 {i !== 0 ? 'border-t border-gray-800/60' : 'pt-0'}">
                    
                    <div class="w-15 h-15 md:w-30 md:h-30 shrink-0 mt-1 bg-white/5 rounded-md p-1 border border-gray-700/50">
                        <img src={cert.logo} alt={cert.issuer} class="w-full h-full object-contain" onerror={(e) => e.currentTarget.style.display = 'none'} />
                    </div>

                    <div class="flex-1 flex flex-col">
                        <h4 class="text-xl font-semibold text-gray-100">{cert.title}</h4>
                        <p class="text-gray-200 text-sm md:text-base mt-1">{cert.issuer}</p>
                        <p class="text-gray-500 text-sm mt-1">{cert.date}</p>
                        
                        {#if cert.credential_id}
                            <p class="text-gray-500 text-sm mt-0.5">Credentials ID {cert.credential_id}</p>
                        {/if}

                        {#if cert.credential_url}
                            <a 
                                href={cert.credential_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                class="mt-5 w-fit flex items-center gap-2 px-5 py-1.5 rounded-full border border-gray-500 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-300 transition-all text-sm font-medium group"
                            >
                                Show credentials
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                            </a>
                        {/if}

                        {#if cert.skills && cert.skills.length > 0}
                          <div class="mt-6 pt-1">
                            <div class="flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-500 mt-[3px] shrink-0"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                            <div class="text-gray-300 text-sm font-bold leading-relaxed">
                              {#if cert.skills.length <= 2 || expandedSkills[`cert-${i}`]}
                                {cert.skills.join(', ')}
                                {#if cert.skills.length > 2}
                                  <button onclick={() => toggleSkills(`cert-${i}`)} class="text-gray-500 hover:text-white ml-1 font-normal transition-colors">&middot; hide</button>
                                {/if}
                              {:else}
                                {cert.skills.slice(0, 2).join(', ')} dan 
                                <button onclick={() => toggleSkills(`cert-${i}`)} class="text-gray-400 hover:text-white hover:underline transition-colors font-extrabold">
                                  +{cert.skills.length - 2} Skills
                                </button>
                                {/if}
                                </div>
                              </div>
                            </div>
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
        
    </div>

<!-- Work -->
{:else if page.params.slug === 'work'}
    <div in:fade={{duration: 400}} class="w-full">
        
        <div class="mb-6">
            <h2 class="text-3xl font-serif text-white/90 uppercase tracking-widest">
                WORK & INTERNSHIP EXPERIENCE
            </h2>
        </div>

        <div class="w-full h-px bg-gray-800/60 mb-10"></div>

        <div class="w-full mb-8">
            <div class="flex flex-col w-full">
                {#each data.meta.experiences || [] as job, i}
                    <div class="flex flex-col md:flex-row gap-4 md:gap-6 py-5 {i !== 0 ? 'border-t border-gray-800/60' : 'pt-0'}">
                        
                        <div class="w-15 h-15 md:w-30 md:h-30 shrink-0 mt-1 bg-white/5 rounded-md p-1 border border-gray-700/50">
                            <img src={job.logo} alt={job.company} class="w-full h-full object-contain" onerror={(e) => e.currentTarget.style.display = 'none'} />
                        </div>

                        <div class="flex-1 flex flex-col">
                            <h4 class="text-xl font-semibold text-gray-100">{job.role}</h4>
                            <p class="text-gray-200 text-sm md:text-base mt-1">{job.company} · {job.type}</p>
                            
                            <p class="text-gray-500 text-sm mt-1">{job.date}</p>
                            <p class="text-gray-500 text-sm mt-0.5">{job.location}</p>

                            {#if job.description}
                                <div class="mt-4 text-sm md:text-base text-gray-400 leading-relaxed md:text-justify">
                                    {#if job.description.length <= 250 || expandedDesc[i]}
                                        {job.description}
                                        {#if job.description.length > 250}
                                            <button onclick={() => toggleDesc(i)} class="text-gray-500 hover:text-white font-medium ml-1 transition-colors">show less</button>
                                        {/if}
                                    {:else}
                                        {job.description.slice(0, 250)}<span class="text-gray-500">...</span>
                                        <button onclick={() => toggleDesc(i)} class="text-gray-300 hover:text-white font-medium ml-1 transition-colors">more detail</button>
                                    {/if}
                                </div>
                            {/if}
                            {#if job.skills && job.skills.length > 0}
                                <div class="mt-1 pt-1 border-t border-gray-800/30">
                                    <div class="flex items-start gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-500 mt-[3px] shrink-0"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                        <div class="text-gray-300 text-sm font-bold leading-relaxed">
                                            
                                            {#if job.skills.length <= 2 || expandedSkills[`work-${i}`]}
                                                {job.skills.join(', ')}
                                                
                                                {#if job.skills.length > 2}
                                                    <button onclick={() => toggleSkills(`work-${i}`)} class="text-gray-500 hover:text-white ml-1 font-normal transition-colors">&middot; hide</button>
                                                {/if}
                                            
                                            {:else}
                                                {job.skills.slice(0, 2).join(', ')} dan 
                                                <button onclick={() => toggleSkills(`work-${i}`)} class="text-gray-400 hover:text-white hover:underline transition-colors font-extrabold">
                                                    +{job.skills.length - 2} Skills
                                                </button>
                                            {/if}

                                        </div>
                                    </div>
                                </div>
                            {/if}

                            <div class="mt-4">
                                </div>

                        </div>
                    </div>
                {/each}
            </div>            
        </div>
        
    </div>

{:else}
	<div in:fade={{duration: 400}} class="w-full">
        
        <div class="mb-10">
            <h2 class="text-3xl font-serif text-white/90 capitalize">
                {page.params.slug.replace('-', ' ')}
            </h2>
            <div class="w-16 h-1 bg-gray-700 mt-4"></div>
        </div>

        <div class="w-full bg-gray-900/30 border border-gray-800/50 rounded-2xl p-6 md:p-10 backdrop-blur-sm">
            <article class="prose prose-invert prose-gray max-w-none font-mono text-sm md:text-base 
                            prose-headings:font-serif prose-headings:text-white/90 prose-headings:font-normal
                            prose-a:text-sky-400 prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-emerald-400 prose-strong:font-normal
                            prose-ul:border-l border-gray-800 prose-ul:pl-4
                            prose-li:marker:text-gray-600">
                <data.content />
            </article>
        </div>
        
	</div>
{/if}

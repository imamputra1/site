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

	function pauseScroll(index: number) {
		clearInterval(intervals[index]);
	}
	function resumeScroll(index: number, length: number) {
		if (length > 1) startAutoScroll(index);
	}
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

	let expandedOrgDesc = $state<Record<string, boolean>>({});

	function toggleOrgDesc(id: string) {
		expandedOrgDesc[id] = !expandedOrgDesc[id];
	}
</script>

<Metadata title={data.meta.title + ' | Imam Putra'} description={data.meta.description} />

<!-- Milestones -->
{#if page.params.slug === 'milestone'}
	<div in:fade={{ duration: 400 }} class="w-full">
		<p class="mb-8 pt-1 font-sans text-lg text-gray-400">
			{data.meta.description}
		</p>

		<div class="relative ml-4 space-y-16 border-l border-gray-800 pb-8 md:ml-8">
			{#each data.meta.milestones || [] as item, i}
				<div class="group/timeline relative pl-8 md:pl-16">
					<div
						class="absolute top-1.5 -left-[6px] h-3 w-3 {item.color} rounded-full {item.shadow} transition-transform duration-300 group-hover/timeline:scale-150"
					></div>
					<div class="absolute top-3 left-0 h-px w-4 bg-gray-800 md:w-8"></div>

					<div class="flex w-full flex-col items-center gap-8 md:flex-row md:gap-12">
						<div class="mt-0 flex flex-1 flex-col md:mt-2">
							<span class="mb-2 font-mono text-xs text-gray-500">{item.date} — {item.event}</span>
							<h3 class="mb-3 font-serif text-2xl text-gray-200">{item.title}</h3>
							<p class="text-justify text-sm leading-relaxed text-gray-400 md:text-base">
								{item.description}
							</p>
						</div>

						<div class="group/carousel relative ml-auto w-full shrink-0 md:w-[400px] lg:w-[350px]">
							<div
								class="relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900 shadow-2xl transition-colors duration-500 group-hover/timeline:border-gray-600"
								onmouseenter={() => pauseScroll(i)}
								onmouseleave={() => resumeScroll(i, item.images.length)}
							>
								{#if item.images.length > 1}
									<button
										onclick={() => scrollCarousel(i, 'left')}
										class="absolute top-1/2 left-2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover/carousel:opacity-100 hover:bg-sky-600"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"><path d="m15 18-6-6 6-6" /></svg
										>
									</button>
								{/if}

								<div bind:this={carousels[i]} class="no-scrollbar flex aspect-video w-full snap-x snap-mandatory overflow-x-auto scroll-smooth">
									{#each item.images as img}
										<div class="relative h-full w-full shrink-0 snap-center">
											<div class="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-gray-900/40 to-transparent"></div>
											<img
												src={img}
												alt={item.title}
												class="h-full w-full object-cover grayscale transition-all duration-700 group-hover/carousel:grayscale-0"
											/>
										</div>
									{/each}
								</div>

								{#if item.images.length > 1}
									<button
										onclick={() => scrollCarousel(i, 'right')}
										class="absolute top-1/2 right-2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover/carousel:opacity-100 hover:bg-sky-600"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg
										>
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
	<div in:fade={{ duration: 400 }} class="w-full">
		<!-- Container 1 -->
		<div class="mb-6">
			<h2 class="font-serif text-3xl tracking-widest text-white/90 uppercase">FORMAL EDUCATION</h2>
		</div>

		<div class="mb-6 h-px w-full bg-gray-800/60"></div>

		<div class="mb-6 w-full">
			<div class="flex flex-col gap-10">
				{#each data.meta.formal_education || [] as edu, i}
					<div class="flex flex-col gap-4 md:flex-row md:gap-6">
						<div class="mt-1 h-15 w-15 shrink-0 rounded-md border border-gray-700/50 bg-white/5 p-1 md:h-30 md:w-30">
							<img src={edu.logo} alt={edu.institution} class="h-full w-full object-contain" onerror={(e) => (e.currentTarget.style.display = 'none')} />
						</div>

						<div class="flex flex-1 flex-col">
							<h4 class="text-xl font-semibold text-gray-100">{edu.institution}</h4>
							<p class="mt-1 text-sm text-gray-200 md:text-base">{edu.degree}</p>
							<p class="mt-1 text-sm text-gray-500">{edu.date}</p>
							<p class="mt-3 text-sm text-gray-400">IPK: {edu.gpa}</p>
							<p class="mt-1 text-sm text-gray-400">{edu.description}</p>

							{#if edu.skills}
								<p class="mt-3 flex items-center gap-2 text-sm font-medium text-gray-300">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="text-gray-500"
										><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg
									>
									{edu.skills}
								</p>
							{/if}

							{#if edu.organizations && edu.organizations.length > 0}
								<button
									onclick={() => toggleEdu(i)}
									class="mt-6 flex w-fit items-center gap-1 border-b border-transparent pb-0.5 text-sm font-medium text-gray-400 transition-colors hover:border-gray-500 hover:text-white"
								>
									{expandedEdu[i] ? 'hide detail' : 'Organizational'}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="transition-transform duration-300 {expandedEdu[i] ? 'rotate-180' : ''}"><path d="m6 9 6 6 6-6" /></svg
									>
								</button>

								{#if expandedEdu[i]}
									<div in:fade={{ duration: 300 }} class="mt-6 flex flex-col gap-8 border-t border-gray-800/60 pt-6">
										{#each edu.organizations as org, j}
											<div class="flex flex-col gap-4 md:flex-row">
												<div class="mt-1 h-12 w-12 shrink-0 rounded-full border border-gray-700/50 bg-white/5 p-1.5 md:h-14 md:w-14">
													<img
														src={org.logo}
														alt={org.name}
														class="h-full w-full rounded-full object-contain"
														onerror={(e) => (e.currentTarget.style.display = 'none')}
													/>
												</div>

												<div class="flex flex-1 flex-col">
													<h5 class="text-base font-semibold text-gray-200 md:text-lg">{org.role}</h5>
													<p class="mt-0.5 text-sm text-gray-300">{org.name}</p>
													<p class="mt-1 text-sm text-gray-500">{org.date}</p>
													<p class="mt-0.5 text-sm text-gray-500">{org.location}</p>
													{#if org.description}
														<div class="mt-3 text-sm leading-relaxed text-gray-400 md:text-justify">
															{#if org.description.length <= 250 || expandedOrgDesc[`org-${i}-${j}`]}
																{org.description}
																{#if org.description.length > 250}
																	<button
																		onclick={() => toggleOrgDesc(`org-${i}-${j}`)}
																		class="ml-1 font-medium text-gray-500 transition-colors hover:text-white">show less</button
																	>
																{/if}
															{:else}
																{org.description.slice(0, 250)}<span class="text-gray-500">...</span>
																<button onclick={() => toggleOrgDesc(`org-${i}-${j}`)} class="ml-1 font-medium text-gray-300 transition-colors hover:text-white"
																	>more detail</button
																>
															{/if}
														</div>
													{/if}

													{#if org.skills && org.skills.length > 0}
														<div class="mt-3 flex items-start gap-2">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="14"
																height="14"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
																stroke-width="2"
																stroke-linecap="round"
																stroke-linejoin="round"
																class="mt-[3px] shrink-0 text-gray-500"
																><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
																></polygon></svg
															>
															<div class="text-sm leading-relaxed font-medium text-gray-300">
																{#if org.skills.length <= 2 || expandedSkills[`org-${i}-${j}`]}
																	{org.skills.join(', ')}
																	{#if org.skills.length > 2}
																		<button
																			onclick={() => toggleSkills(`org-${i}-${j}`)}
																			class="ml-1 font-normal text-gray-500 transition-colors hover:text-white">&middot; hide</button
																		>
																	{/if}
																{:else}
																	{org.skills.slice(0, 2).join(', ')} dan
																	<button onclick={() => toggleSkills(`org-${i}-${j}`)} class="font-bold text-gray-400 transition-colors hover:text-white">
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
		<div class="my-12 h-px w-full bg-gray-800/60"></div>

		<div class="mb-6">
			<h2 class="font-serif text-3xl tracking-widest text-white/90 uppercase">LICENSE & CERTIFICATIONS</h2>
		</div>

		<div class="flex w-full flex-col">
			{#each data.meta.certifications || [] as cert, i}
				<div class="flex flex-col gap-4 py-4 md:flex-row md:gap-6 {i !== 0 ? 'border-t border-gray-800/60' : 'pt-0'}">
					<div class="mt-1 h-15 w-15 shrink-0 rounded-md border border-gray-700/50 bg-white/5 p-1 md:h-30 md:w-30">
						<img src={cert.logo} alt={cert.issuer} class="h-full w-full object-contain" onerror={(e) => (e.currentTarget.style.display = 'none')} />
					</div>

					<div class="flex flex-1 flex-col">
						<h4 class="text-xl font-semibold text-gray-100">{cert.title}</h4>
						<p class="mt-1 text-sm text-gray-200 md:text-base">{cert.issuer}</p>
						<p class="mt-1 text-sm text-gray-500">{cert.date}</p>

						{#if cert.credential_id}
							<p class="mt-0.5 text-sm text-gray-500">Credentials ID {cert.credential_id}</p>
						{/if}

						{#if cert.credential_url}
							<a
								href={cert.credential_url}
								target="_blank"
								rel="noopener noreferrer"
								class="group mt-5 flex w-fit items-center gap-2 rounded-full border border-gray-500 px-5 py-1.5 text-sm font-medium text-gray-300 transition-all hover:border-gray-300 hover:bg-gray-800 hover:text-white"
							>
								Show credentials
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="14"
									height="14"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
									><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line
										x1="10"
										y1="14"
										x2="21"
										y2="3"
									></line></svg
								>
							</a>
						{/if}

						{#if cert.skills && cert.skills.length > 0}
							<div class="mt-6 pt-1">
								<div class="flex items-start gap-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="mt-[3px] shrink-0 text-gray-500"
										><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg
									>
									<div class="text-sm leading-relaxed font-bold text-gray-300">
										{#if cert.skills.length <= 2 || expandedSkills[`cert-${i}`]}
											{cert.skills.join(', ')}
											{#if cert.skills.length > 2}
												<button onclick={() => toggleSkills(`cert-${i}`)} class="ml-1 font-normal text-gray-500 transition-colors hover:text-white"
													>&middot; hide</button
												>
											{/if}
										{:else}
											{cert.skills.slice(0, 2).join(', ')} dan
											<button onclick={() => toggleSkills(`cert-${i}`)} class="font-extrabold text-gray-400 transition-colors hover:text-white hover:underline">
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
	<div in:fade={{ duration: 400 }} class="w-full">
		<div class="mb-6">
			<h2 class="font-serif text-3xl tracking-widest text-white/90 uppercase">WORK & INTERNSHIP EXPERIENCE</h2>
		</div>

		<div class="mb-10 h-px w-full bg-gray-800/60"></div>

		<div class="mb-8 w-full">
			<div class="flex w-full flex-col">
				{#each data.meta.experiences || [] as job, i}
					<div class="flex flex-col gap-4 py-5 md:flex-row md:gap-6 {i !== 0 ? 'border-t border-gray-800/60' : 'pt-0'}">
						<div class="mt-1 h-15 w-15 shrink-0 rounded-md border border-gray-700/50 bg-white/5 p-1 md:h-30 md:w-30">
							<img src={job.logo} alt={job.company} class="h-full w-full object-contain" onerror={(e) => (e.currentTarget.style.display = 'none')} />
						</div>

						<div class="flex flex-1 flex-col">
							<h4 class="text-xl font-semibold text-gray-100">{job.role}</h4>
							<p class="mt-1 text-sm text-gray-200 md:text-base">{job.company} · {job.type}</p>

							<p class="mt-1 text-sm text-gray-500">{job.date}</p>
							<p class="mt-0.5 text-sm text-gray-500">{job.location}</p>

							{#if job.description}
								<div class="mt-4 text-sm leading-relaxed text-gray-400 md:text-justify md:text-base">
									{#if job.description.length <= 250 || expandedDesc[i]}
										{job.description}
										{#if job.description.length > 250}
											<button onclick={() => toggleDesc(i)} class="ml-1 font-medium text-gray-500 transition-colors hover:text-white">show less</button>
										{/if}
									{:else}
										{job.description.slice(0, 250)}<span class="text-gray-500">...</span>
										<button onclick={() => toggleDesc(i)} class="ml-1 font-medium text-gray-300 transition-colors hover:text-white">more detail</button>
									{/if}
								</div>
							{/if}
							{#if job.skills && job.skills.length > 0}
								<div class="mt-1 border-t border-gray-800/30 pt-1">
									<div class="flex items-start gap-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="14"
											height="14"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
											class="mt-[3px] shrink-0 text-gray-500"
											><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg
										>
										<div class="text-sm leading-relaxed font-bold text-gray-300">
											{#if job.skills.length <= 2 || expandedSkills[`work-${i}`]}
												{job.skills.join(', ')}

												{#if job.skills.length > 2}
													<button onclick={() => toggleSkills(`work-${i}`)} class="ml-1 font-normal text-gray-500 transition-colors hover:text-white"
														>&middot; hide</button
													>
												{/if}
											{:else}
												{job.skills.slice(0, 2).join(', ')} dan
												<button
													onclick={() => toggleSkills(`work-${i}`)}
													class="font-extrabold text-gray-400 transition-colors hover:text-white hover:underline"
												>
													+{job.skills.length - 2} Skills
												</button>
											{/if}
										</div>
									</div>
								</div>
							{/if}

							<div class="mt-4"></div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
{:else}
	<div in:fade={{ duration: 400 }} class="w-full">
		<div class="mb-10">
			<h2 class="font-serif text-3xl text-white/90 capitalize">
				{page.params.slug.replace('-', ' ')}
			</h2>
			<div class="mt-4 h-1 w-16 bg-gray-700"></div>
		</div>

		<div class="w-full rounded-2xl border border-gray-800/50 bg-gray-900/30 p-6 backdrop-blur-sm md:p-10">
			<article
				class="prose prose-invert prose-gray prose-headings:font-serif prose-headings:text-white/90 prose-headings:font-normal prose-a:text-sky-400
                            prose-a:no-underline hover:prose-a:underline prose-strong:text-emerald-400
                            prose-strong:font-normal prose-ul:border-l prose-ul:pl-4
                            prose-li:marker:text-gray-600 max-w-none
                            border-gray-800 font-mono text-sm
                            md:text-base"
			>
				<data.content />
			</article>
		</div>
	</div>
{/if}

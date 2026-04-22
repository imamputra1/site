<script lang="ts">
	let { data } = $props();

	let activeTab = $state('milestones');

	const tabNarratives = {
		projects:
			"I build things because something needs fixing. From low-level routing to full-stack apps, each project started small, broke a couple times, and got better with real users. It's not perfect code, it's just how I learn by shipping.",
		articles:
			"I write to think more clearly. Here I share my notes on algorithmic systems, software architecture, and the tech decisions that actually matter in production. Some are deep dives, some are just questions I'm still working through.",
		milestones:
			"These aren't about trophies. They're about the process: late nights, failed first attempts, and teammates who pushed me harder. From competitions to campus programs like Innovative Academy, they taught me to stay consistent under pressure.",
		education:
			' graduated in Philosophy from UGM, where I learned to break problems down to first principles. I built the technical side myself, course by course, based on what I needed: Google Data Analytics, Data Mining from the University of Michigan, Financial Engineering and Risk Management from Columbia University, and Machine Learning from Stanford and DeepLearning.AI via Coursera. I learn to close real gaps, not to collect certificates.'
	};

	let sliderContainer: HTMLElement | null = $state(null);

	function scrollSlider(direction: 'left' | 'right') {
		if (sliderContainer) {
			const scrollAmount = direction == 'left' ? -400 : 400;
			sliderContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
		}
	}

	function changeTab(tabId: string) {
		activeTab = tabId;
		if (sliderContainer) sliderContainer.scrollLeft = 0;
	}

	import { fade } from 'svelte/transition';

	const galleryImages = Array.from({ length: 11 }, (_, i) => `/images/${i + 1}.png`);

	let galleryContainer: HTMLElement | null = $state(null);
	let autoScrollInterval: ReturnType<typeof setInterval>;
	function scrollGallery(direction: 'left' | 'right') {
		if (galleryContainer) {
			const scrollAmount = direction === 'left' ? -600 : 600;
			galleryContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
		}
	}
	function startAutoScroll() {
		autoScrollInterval = setInterval(() => {
			if (galleryContainer) {
				const maxScroll = galleryContainer.scrollWidth - galleryContainer.clientWidth;
				if (galleryContainer.scrollLeft >= maxScroll - 10) {
					galleryContainer.scrollTo({ left: 0, behavior: 'smooth' });
				} else {
					galleryContainer.scrollBy({ left: 600, behavior: 'smooth' });
				}
			}
		}, 2500);
	}

	$effect(() => {
		startAutoScroll();
		return () => clearInterval(autoScrollInterval);
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&display=swap" rel="stylesheet" />
</svelte:head>

<!-- Kontainer 1 -->
<div class="max-w-9xl mx-auto flex flex-col gap-16 p-6 pt-1 pb-1 md:p-10 md:pt-0 md:pb-1">
	<div class="mx-auto flex w-full flex-col gap-12 px-6 pt-4 md:px-12 md:pt-8 lg:px-16">
		<div class="flex w-full flex-col items-center gap-4 md:flex-row md:gap-4">
			<div class="justify-startflex w-full flex-col md:w-3/4">
				<h1 class="mb-8 w-full text-center font-serif text-4xl tracking-tight text-white/95 md:text-6xl">Hello, I'm Imam Putra.</h1>

				<div class="space-y-5 text-justify font-sans text-base leading-relaxed text-gray-400 md:text-lg">
					<p>
						I like to think hard about a problem, then build the fix. My philosophy background trained me to break things down to <strong
							class="font-medium text-gray-200"
							>first principles, and that habit is what pulled me into quantitative finance, data engineering, and business strategy.</strong
						> I don't fit in one box. Some days I'm in the code making sure data pipelines don't break, other days I'm mapping a messy workflow to stop leaks, other
						days I'm just sitting with the numbers to find a smarter way to grow.
					</p>
					<p>
						I'm a fresh grad, so I come in as a student who does the work. I ask the basic questions early, I test fast, I get my hands dirty, and I stay until
						it works for real people, not just on paper. I don't know everything yet, but I learn fast and I care about results you can measure. This site is my
						open notebook for what I'm building, what breaks, and how I'm getting better.
					</p>
				</div>
			</div>

			<div class="mt-4 flex w-full shrink-0 justify-center md:mt-20 md:w-1/4 md:justify-center">
				<div class="aspect-3/4 w-full max-w-50 overflow-hidden rounded-lg border border-gray-700 bg-gray-900 shadow-xl">
					<img src="/profile.png" alt="Imam Putra" class="h-full w-full object-cover grayscale transition-all duration-500 hover:grayscale-0" />
				</div>
			</div>
		</div>

		<div class="flex w-full flex-col items-center justify-end gap-4 pt-1 md:flex-row md:pt-1">
			<a
				href="/cv-imam-putra.pdf"
				download
				class="inline-flex w-fit items-center gap-2 rounded-md border border-gray-700 bg-gray-900/50 px-5 py-2.5 font-mono text-sm text-gray-300 transition-all duration-300 hover:border-sky-500 hover:bg-gray-800/50 hover:text-sky-400"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"
					></line></svg
				>
				Download CV
			</a>

			<div class="flex items-center gap-4">
				<a
					href="https://www.youtube.com/@AgusImamSyahputra-k1d"
					target="_blank"
					class="text-gray-500 transition-all duration-300 hover:scale-110 hover:text-[#FF0000]"
					aria-label="YouTube"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><path
							d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"
						></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg
					>
				</a>
				<a
					href="https://www.instagram.com/imamputra.w"
					target="_blank"
					class="text-gray-500 transition-all duration-300 hover:scale-110 hover:text-[#E1306C]"
					aria-label="Instagram"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line
							x1="17.5"
							y1="6.5"
							x2="17.51"
							y2="6.5"
						></line></svg
					>
				</a>
				<a
					href="https://www.linkedin.com/in/imam-putra/"
					target="_blank"
					class="text-gray-500 transition-all duration-300 hover:scale-110 hover:text-[#0077b5]"
					aria-label="LinkedIn"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"
						></rect><circle cx="4" cy="4" r="2"></circle></svg
					>
				</a>
				<a href="#" target="_blank" class="text-gray-500 transition-all duration-300 hover:scale-110 hover:text-white" aria-label="TikTok">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5h-2a3 3 0 0 1-3-3V4h-2v13a2 2 0 1 1-2-2v-2a4 4 0 0 0-0.1 0z"></path></svg
					>
				</a>
			</div>
		</div>
	</div>
</div>

<!-- Container 2-->
<div class="mx-auto mt-2 flex w-full flex-col px-6 pb-4 md:mt-4 md:px-12 lg:px-16">
	<div class="no-scrollbar mb-6 flex w-full items-center justify-start gap-6 overflow-auto border-b border-gray-800 pb-4 md:justify-center md:gap-10">
		<button
			onclick={() => changeTab('projects')}
			class="relative font-serif text-lg tracking-wide transition-all duration-300 md:text-xl {activeTab === 'projects'
				? 'text-white'
				: 'text-gray-500 hover:text-gray-300'}"
		>
			Projects
			{#if activeTab === 'projects'}
				<div class="absolute -bottom-[17px] left-0 h-0.5 w-full bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.8)]"></div>
			{/if}
		</button>

		<button
			onclick={() => changeTab('articles')}
			class="relative font-serif text-lg tracking-wide transition-all duration-300 md:text-xl {activeTab === 'articles'
				? 'text-white'
				: 'text-gray-500 hover:text-gray-300'}"
		>
			Articles
			{#if activeTab === 'articles'}
				<div class="absolute -bottom-[17px] left-0 h-0.5 w-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
			{/if}
		</button>

		<button
			onclick={() => changeTab('milestones')}
			class="relative font-serif text-lg tracking-wide transition-all duration-300 md:text-xl {activeTab === 'milestones'
				? 'text-white'
				: 'text-gray-500 hover:text-gray-300'}"
		>
			Milestones
			{#if activeTab === 'milestones'}
				<div class="absolute -bottom-[17px] left-0 h-0.5 w-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]"></div>
			{/if}
		</button>

		<button
			onclick={() => changeTab('education')}
			class="relative font-serif text-lg tracking-wide transition-all duration-300 md:text-xl {activeTab === 'education'
				? 'text-white'
				: 'text-gray-500 hover:text-gray-300'}"
		>
			Education & Certifications
			{#if activeTab === 'education'}
				<div class="absolute -bottom-[17px] left-0 h-0.5 w-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></div>
			{/if}
		</button>
	</div>
</div>

<!-- Routing & Description -->
<div class="mb-6 flex min-h-[80px] w-full justify-center md:min-h-[60px]">
	<p class="max-w-4xl text-center font-sans text-base leading-relaxed text-gray-400 md:text-lg">
		{tabNarratives[activeTab]}

		<a
			href={activeTab === 'milestones'
				? '/abouts/milestone'
				: activeTab === 'courses' || activeTab === 'education' || activeTab === 'educations'
					? '/abouts/education'
					: `/${activeTab}`}
			class="group ml-2 inline-flex items-center gap-1 border-b border-gray-600 pb-0.5 font-mono text-sm whitespace-nowrap text-gray-300 transition-colors hover:border-white hover:text-white md:text-base"
		>
			more detail about {activeTab === 'courses' || activeTab === 'education' || activeTab === 'educations'
				? 'education & certs'
				: activeTab === 'honors'
					? 'milestones'
					: activeTab}
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
				class="transition-transform group-hover:translate-x-1"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg
			>
		</a>
	</p>
</div>

<div class="group relative mt-2 w-full">
	<button
		onclick={() => scrollSlider('left')}
		class="absolute top-1/2 left-1 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-700 bg-gray-900/90 text-gray-300 opacity-0 shadow-xl transition-all duration-300 group-hover:opacity-100 hover:border-sky-400 hover:bg-sky-600 hover:text-white disabled:opacity-0 md:left-2 md:h-12 md:w-12"
		aria-label="Scroll left"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"><path d="m15 18-6-6 6-6" /></svg
		>
	</button>

	<div bind:this={sliderContainer} class="no-scrollbar flex w-full snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pt-2 pb-6 md:gap-8">
		{#if activeTab === 'projects'}
			{#each data.recentProjects as project}
				<a
					in:fade={{ duration: 300 }}
					href="/projects/{project.slug}"
					class="group relative flex h-[400px] w-[300px] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/50 transition-all duration-500 hover:border-sky-500/50 md:h-[440px] md:w-[380px]"
				>
					<div
						class="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full border border-gray-700/50 bg-gray-900/80 px-3 py-1.5 text-xs font-bold text-sky-400 backdrop-blur-md"
					>
						<span class="h-2 w-2 animate-pulse rounded-full bg-sky-500"></span> Project
					</div>
					<div class="h-52 w-full shrink-0 overflow-hidden bg-gray-800 md:h-60">
						<img
							src={project.thumbnailUrl}
							alt={project.title}
							class="h-full w-full object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
						/>
					</div>
					<div class="flex flex-grow flex-col justify-start p-6">
						<p class="mb-3 font-mono text-xs text-gray-400">
							{new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
						</p>
						<h4 class="line-clamp-2 font-serif text-xl leading-tight text-gray-200 transition-colors group-hover:text-sky-400 md:text-2xl">
							{project.title}
						</h4>
					</div>
				</a>
			{/each}
		{/if}

		{#if activeTab === 'articles'}
			{#each data.recentArticles as article}
				<a
					in:fade={{ duration: 300 }}
					href="/articles/{article.slug}"
					class="group relative flex h-[400px] w-[300px] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/50 transition-all duration-500 hover:border-emerald-500/50 md:h-[440px] md:w-[380px]"
				>
					<div
						class="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full border border-gray-700/50 bg-gray-900/80 px-3 py-1.5 text-xs font-bold text-emerald-400 backdrop-blur-md"
					>
						<span class="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></span> Article
					</div>
					<div class="h-52 w-full shrink-0 overflow-hidden bg-gray-800 md:h-60">
						<img
							src={article.thumbnailUrl}
							alt={article.title}
							class="h-full w-full object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
						/>
					</div>
					<div class="flex flex-grow flex-col justify-start p-6">
						<p class="mb-3 font-mono text-xs text-gray-400">
							{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
						</p>
						<h4 class="line-clamp-2 font-serif text-xl leading-tight text-gray-200 transition-colors group-hover:text-emerald-400 md:text-2xl">
							{article.title}
						</h4>
					</div>
				</a>
			{/each}
		{/if}

		{#if activeTab === 'milestones'}
			{#each data.recentMilestones || [] as item}
				<a
					in:fade={{ duration: 300 }}
					href="/abouts/milestone"
					class="group relative flex h-[400px] w-[300px] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/50 transition-all duration-500 hover:border-amber-500/50 md:h-[440px] md:w-[380px]"
				>
					<div
						class="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full border border-gray-700/50 bg-gray-900/80 px-3 py-1.5 text-xs font-bold text-amber-400 backdrop-blur-md"
					>
						<span class="h-2 w-2 rounded-full {item.color || 'bg-amber-500'} animate-pulse"></span> Milestone
					</div>
					<div class="h-52 w-full shrink-0 overflow-hidden bg-gray-800 md:h-60">
						<img
							src={item.images[0]}
							alt={item.title}
							class="h-full w-full object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
						/>
					</div>
					<div class="flex flex-grow flex-col justify-start p-6">
						<p class="mb-3 font-mono text-xs text-gray-400">
							{item.date} — {item.event}
						</p>
						<h4 class="mb-2 line-clamp-2 font-serif text-xl leading-tight text-gray-200 transition-colors group-hover:text-amber-400 md:text-2xl">
							{item.title}
						</h4>
						<p class="line-clamp-2 text-sm text-gray-500">
							{item.description}
						</p>
					</div>
				</a>
			{/each}
		{/if}

		{#if activeTab === 'education'}
			{#each data.recentFormalEdu || [] as edu}
				<a
					in:fade={{ duration: 300 }}
					href="/abouts/education"
					class="group relative flex h-[400px] w-[300px] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/50 transition-all duration-500 hover:border-purple-500/50 md:h-[440px] md:w-[380px]"
				>
					<div
						class="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full border border-gray-700/50 bg-gray-900/80 px-3 py-1.5 text-xs font-bold text-purple-400 backdrop-blur-md"
					>
						<span class="h-2 w-2 animate-pulse rounded-full bg-purple-500"></span> Formal Education
					</div>

					<div class="flex h-52 w-full shrink-0 items-center justify-center overflow-hidden bg-gray-800 p-8 md:h-60">
						<img
							src={edu.logo}
							alt={edu.institution}
							class="h-32 w-32 object-contain opacity-70 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
							onerror={(e) => (e.currentTarget.style.display = 'none')}
						/>
					</div>

					<div class="flex flex-grow flex-col justify-start p-6">
						<p class="mb-3 font-mono text-xs text-gray-400">{edu.date}</p>
						<h4 class="line-clamp-2 font-serif text-xl leading-tight text-gray-200 transition-colors group-hover:text-purple-400 md:text-2xl">
							{edu.institution}
						</h4>
						<p class="mt-2 line-clamp-2 text-sm text-gray-500">{edu.degree}</p>
					</div>
				</a>
			{/each}

			{#each data.recentCerts || [] as cert}
				<a
					in:fade={{ duration: 300 }}
					href="/abouts/education"
					class="group relative flex h-[400px] w-[300px] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/50 transition-all duration-500 hover:border-purple-500/50 md:h-[440px] md:w-[380px]"
				>
					<div
						class="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full border border-gray-700/50 bg-gray-900/80 px-3 py-1.5 text-xs font-bold text-purple-400 backdrop-blur-md"
					>
						<span class="h-2 w-2 animate-pulse rounded-full bg-purple-500"></span> Certification
					</div>

					<div class="flex h-52 w-full shrink-0 items-center justify-center overflow-hidden bg-gray-800 p-8 md:h-60">
						<img
							src={cert.logo}
							alt={cert.title}
							class="h-32 w-32 object-contain opacity-70 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
							onerror={(e) => (e.currentTarget.style.display = 'none')}
						/>
					</div>

					<div class="flex flex-grow flex-col justify-start p-6">
						<p class="mb-3 font-mono text-xs text-gray-400">{cert.date}</p>
						<h4 class="line-clamp-2 font-serif text-xl leading-tight text-gray-200 transition-colors group-hover:text-purple-400 md:text-2xl">
							{cert.title}
						</h4>
						<p class="mt-2 line-clamp-2 text-sm text-gray-500">{cert.issuer}</p>
					</div>
				</a>
			{/each}
		{/if}
	</div>
	<button
		onclick={() => scrollSlider('right')}
		class="absolute top-1/2 right-1 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-700 bg-gray-900/90 text-gray-300 opacity-0 shadow-xl transition-all duration-300 group-hover:opacity-100 hover:border-sky-400 hover:bg-sky-600 hover:text-white md:right-2 md:h-12 md:w-12"
		aria-label="Scroll right"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg
		>
	</button>
</div>
<!-- container 3 -->
<div class="my-8 h-px w-full bg-gray-800/60 md:my-10"></div>
<div class="mx-auto mb-6 flex w-full flex-col items-center gap-4 px-6 md:mb-10 md:flex-row md:gap-12 md:px-12 lg:px-16">
	<div class="w-full md:w-1/3">
		<h2 class="pb-2 font-serif text-3xl tracking-tight text-white/95 md:pb-4 md:text-4xl">Where Ideas Meet People —</h2>
	</div>

	<div class="w-full space-y-4 text-left font-sans text-base leading-relaxed text-gray-400 md:w-2/3 md:text-justify md:text-lg">
		<p>
			Philosophy taught me how to ask. Praxis is where I learned to listen. These photos are from pitching Angkut Ternak at KMI Expo, building a greenhouse with
			my KKN-PPM team in Kapuas, and working backstage at GIFTS 2024. They are not highlights. They are reminders. In each moment I was the one learning — from
			mentors who corrected my thinking, from teammates who challenged my ideas, and from people in the field who taught me that an idea only matters when it
			actually helps someone.
		</p>
		<p>
			In every frame, my logic was corrected in real time by mentors, my assumptions were challenged by teammates who were better than me, and my theories had
			to survive contact with real users. That is what praxis means to me. It is not about building clever systems in isolation. It is about taking an idea,
			putting it in front of people, watching it fail, and having the humility to rebuild it until it actually helps.
		</p>
	</div>
</div>
<div class="group relative mt-4 w-full" onmouseenter={() => clearInterval(autoScrollInterval)} onmouseleave={startAutoScroll}>
	<button
		onclick={() => scrollGallery('left')}
		class="absolute top-1/2 left-4 z-20 flex h-14 w-10 -translate-y-1/2 items-center justify-center bg-black/40 text-white/50 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 hover:bg-black/80 hover:text-white md:left-10 md:h-20 md:w-14"
		aria-label="Scroll left"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="28"
			height="28"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"><path d="m15 18-6-6 6-6" /></svg
		>
	</button>

	<div bind:this={galleryContainer} class="no-scrollbar flex w-full snap-x snap-mandatory overflow-x-auto scroll-smooth">
		{#each galleryImages as img, i}
			<div class="group/photo relative aspect-video w-[80vw] shrink-0 cursor-pointer snap-center sm:w-[380px] md:w-[450px] lg:w-[520px]">
				<img src={img} alt="Documentation {i + 1}" class="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0" />
				<div class="pointer-events-none absolute inset-0 bg-black/10 transition-colors duration-500 group-hover/photo:bg-transparent"></div>
			</div>
		{/each}
	</div>

	<button
		onclick={() => scrollGallery('right')}
		class="absolute top-1/2 right-4 z-20 flex h-14 w-10 -translate-y-1/2 items-center justify-center bg-black/40 text-white/50 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 hover:bg-black/80 hover:text-white md:right-10 md:h-20 md:w-14"
		aria-label="Scroll right"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="28"
			height="28"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg
		>
	</button>
</div>

<!-- footer -->
<footer class="relative mt-1 mt-10 flex h-20 w-full items-center justify-center overflow-hidden border-t border-gray-800 md:mt-18">
	<div class="magic-network-pattern absolute inset-0 opacity-40"></div>

	<div class="absolute inset-0 bg-gradient-to-b from-[#0f1115] to-transparent opacity-80"></div>

	<p class="relative z-10 justify-center font-mono text-sm tracking-widest text-gray-400">
		© 2026 Designed by Agus Imam Syahputra. Sources Code <a href="https://github.com/wiscaksono/site"> wiscaksono </a>
	</p>
</footer>

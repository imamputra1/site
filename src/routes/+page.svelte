<script lang="ts">
	let { data } = $props();

	let activeTab = $state('milestones');

    const tabNarratives = {
        projects: "I build things because something needs fixing. From low-level routing to full-stack apps, each project started small, broke a couple times, and got better with real users. It's not perfect code, it's just how I learn by shipping.",
        articles: "I write to think more clearly. Here I share my notes on algorithmic systems, software architecture, and the tech decisions that actually matter in production. Some are deep dives, some are just questions I'm still working through.",
        milestones: "These aren't about trophies. They're about the process: late nights, failed first attempts, and teammates who pushed me harder. From competitions to campus programs like Innovative Academy, they taught me to stay consistent under pressure.",
        education: " graduated in Philosophy from UGM, where I learned to break problems down to first principles. I built the technical side myself, course by course, based on what I needed: Google Data Analytics, Data Mining from the University of Michigan, Financial Engineering and Risk Management from Columbia University, and Machine Learning from Stanford and DeepLearning.AI via Coursera. I learn to close real gaps, not to collect certificates."
    };

    let sliderContainer: HTMLElement | null = $state(null);

    function scrollSlider(direction: 'left' | 'right') {
      if (sliderContainer) {
        const scrollAmount = direction == 'left' ? -400 : 400;
        sliderContainer.scrollBy({left: scrollAmount, behavior: 'smooth'});
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
<div class="mx-auto flex max-w-9xl flex-col gap-16 p-6 pt-1 pb-1 md:p-10 md:pt-0 md:pb-1">
  <div class="flex flex-col gap-12 pt-4 md:pt-8 px-6 md:px-12 lg:px-16 w-full mx-auto">
    
    <div class="flex flex-col md:flex-row gap-4 md:gap-4 items-center w-full">
        
        <div class="w-full md:w-3/4 justify-startflex flex-col">
            <h1 class="text-4xl md:text-6xl font-serif text-white/95 tracking-tight mb-8 text-center w-full">
                Hello, I'm Imam Putra.
            </h1>
            
            <div class="text-gray-400 font-sans leading-relaxed text-base md:text-lg space-y-5 text-justify">
                <p>
                  I like to think hard about a problem, then build the fix. My philosophy background trained me to break things down to <strong class="text-gray-200 font-medium">first principles, and that habit is what pulled me into quantitative finance, data engineering, and business strategy.</strong> I don't fit in one box. Some days I'm in the code making sure data pipelines don't break, other days I'm mapping a messy workflow to stop leaks, other days I'm just sitting with the numbers to find a smarter way to grow.
            </p>
            <p>
            I'm a fresh grad, so I come in as a student who does the work. I ask the basic questions early, I test fast, I get my hands dirty, and I stay until it works for real people, not just on paper. I don't know everything yet, but I learn fast and I care about results you can measure. This site is my open notebook for what I'm building, what breaks, and how I'm getting better.
            </p>
            </div>

        </div>

        <div class="w-full md:w-1/4 flex justify-center md:justify-center shrink-0 mt-4 md:mt-20">
            <div class="aspect-3/4 w-full max-w-50 rounded-lg overflow-hidden border border-gray-700 bg-gray-900 shadow-xl">
                <img src="/profile.png" alt="Imam Putra" class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
        </div>
    </div>

    <div class="flex flex-col md:flex-row items-center justify-end w-full gap-4 pt-1 md:pt-1">
        <a href="/cv-imam-putra.pdf" download class="inline-flex items-center gap-2 border border-gray-700 hover:border-sky-500 text-gray-300 hover:text-sky-400 px-5 py-2.5 rounded-md transition-all duration-300 w-fit font-mono text-sm bg-gray-900/50 hover:bg-gray-800/50">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Download CV
        </a>
        
        <div class="flex items-center gap-4">
            <a href="https://www.youtube.com/@AgusImamSyahputra-k1d" target="_blank" class="text-gray-500 hover:text-[#FF0000] hover:scale-110 transition-all duration-300" aria-label="YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
            <a href="https://www.instagram.com/imamputra.w" target="_blank" class="text-gray-500 hover:text-[#E1306C] hover:scale-110 transition-all duration-300" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://www.linkedin.com/in/imam-putra/" target="_blank" class="text-gray-500 hover:text-[#0077b5] hover:scale-110 transition-all duration-300" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="#" target="_blank" class="text-gray-500 hover:text-white hover:scale-110 transition-all duration-300" aria-label="TikTok">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5h-2a3 3 0 0 1-3-3V4h-2v13a2 2 0 1 1-2-2v-2a4 4 0 0 0-0.1 0z"></path></svg>
            </a>
        </div>
    </div>
  </div>		
</div>

<!-- Container 2-->
<div class="flex flex-col px-6 md:px-12 lg:px-16 w-full mx-auto pb-4 mt-2 md:mt-4">

    <div class="flex overflow-auto no-scrollbar justify-start md:justify-center items-center gap-6 md:gap-10 border-b border-gray-800 pb-4 mb-6 w-full">
        
        <button 
            onclick={() => changeTab('projects')}
            class="text-lg md:text-xl font-serif tracking-wide transition-all duration-300 relative {activeTab === 'projects' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}"
        >
            Projects
            {#if activeTab === 'projects'}
                <div class="absolute -bottom-[17px] left-0 w-full h-0.5 bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.8)]"></div>
            {/if}
        </button>

        <button 
            onclick={() => changeTab('articles')}
            class="text-lg md:text-xl font-serif tracking-wide transition-all duration-300 relative {activeTab === 'articles' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}"
        >
            Articles
            {#if activeTab === 'articles'}
                <div class="absolute -bottom-[17px] left-0 w-full h-0.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
            {/if}
        </button>

        <button 
            onclick={() => changeTab('milestones')}
            class="text-lg md:text-xl font-serif tracking-wide transition-all duration-300 relative {activeTab === 'milestones' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}"
        >
            Milestones
            {#if activeTab === 'milestones'}
                <div class="absolute -bottom-[17px] left-0 w-full h-0.5 bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]"></div>
            {/if}
        </button>

        <button 
            onclick={() => changeTab('education')}
            class="text-lg md:text-xl font-serif tracking-wide transition-all duration-300 relative {activeTab === 'education' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}"
        >
            Education & Certifications
            {#if activeTab === 'education'}
                <div class="absolute -bottom-[17px] left-0 w-full h-0.5 bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></div>
            {/if}
        </button>
    </div>
    </div>
  
  <!-- Routing & Description -->
<div class="min-h-[80px] md:min-h-[60px] mb-6 w-full flex justify-center">
    <p class="text-gray-400 font-sans text-base md:text-lg leading-relaxed max-w-4xl text-center">
        {tabNarratives[activeTab]}
        
        <a 
            href={activeTab === 'honors' ? '/abouts/milestone' : (activeTab === 'courses' || activeTab === 'education' || activeTab === 'educations') ? '/abouts/education' : `/${activeTab}`} 
            class="inline-flex items-center gap-1 text-gray-300 hover:text-white transition-colors ml-2 font-mono text-sm md:text-base border-b border-gray-600 hover:border-white pb-0.5 group whitespace-nowrap"
        >
            more detail about {(activeTab === 'courses' || activeTab === 'education' || activeTab === 'educations') ? 'education & certs' : activeTab === 'honors' ? 'milestones' : activeTab}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
        
    </p>
</div>
    
    <div class="relative w-full group mt-2">
        
        <button 
            onclick={() => scrollSlider('left')}
            class="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 z-20 bg-gray-900/90 hover:bg-sky-600 text-gray-300 hover:text-white w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-gray-700 hover:border-sky-400 transition-all duration-300 shadow-xl opacity-0 group-hover:opacity-100 disabled:opacity-0"
            aria-label="Scroll left"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>

        <div bind:this={sliderContainer} class="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-6 md:gap-8 pb-6 pt-2 w-full scroll-smooth">
            
            {#if activeTab === 'projects'}
                {#each data.recentProjects as project}
                    <a in:fade={{duration: 300}} href="/projects/{project.slug}" class="snap-center shrink-0 w-[300px] md:w-[380px] group relative rounded-2xl overflow-hidden border border-gray-800 bg-gray-900/50 hover:border-sky-500/50 transition-all duration-500 flex flex-col h-[400px] md:h-[440px]">
                        <div class="absolute top-4 left-4 z-10 bg-gray-900/80 backdrop-blur-md border border-gray-700/50 text-sky-400 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2">
                            <span class="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span> Project
                        </div>
                        <div class="w-full h-52 md:h-60 bg-gray-800 overflow-hidden shrink-0">
                            <img src={project.thumbnailUrl} alt={project.title} class="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700">
                        </div>
                        <div class="p-6 flex flex-col flex-grow justify-start">
                            <p class="text-gray-400 text-xs mb-3 font-mono">
                                {new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                            </p>
                            <h4 class="text-xl md:text-2xl font-serif text-gray-200 group-hover:text-sky-400 transition-colors line-clamp-2 leading-tight">
                                {project.title}
                            </h4>
                        </div>
                    </a>
                {/each}
            {/if}

            {#if activeTab === 'articles'}
                {#each data.recentArticles as article}
                    <a in:fade={{duration: 300}} href="/articles/{article.slug}" class="snap-center shrink-0 w-[300px] md:w-[380px] group relative rounded-2xl overflow-hidden border border-gray-800 bg-gray-900/50 hover:border-emerald-500/50 transition-all duration-500 flex flex-col h-[400px] md:h-[440px]">
                        <div class="absolute top-4 left-4 z-10 bg-gray-900/80 backdrop-blur-md border border-gray-700/50 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2">
                            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Article
                        </div>
                        <div class="w-full h-52 md:h-60 bg-gray-800 overflow-hidden shrink-0">
                            <img src={article.thumbnailUrl} alt={article.title} class="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700">
                        </div>
                        <div class="p-6 flex flex-col flex-grow justify-start">
                            <p class="text-gray-400 text-xs mb-3 font-mono">
                                {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                            </p>
                            <h4 class="text-xl md:text-2xl font-serif text-gray-200 group-hover:text-emerald-400 transition-colors line-clamp-2 leading-tight">
                                {article.title}
                            </h4>
                        </div>
                    </a>
                {/each}
            {/if}

            
            {#if activeTab === 'milestones'}
    {#each data.recentMilestones || [] as item}
        <a in:fade={{duration: 300}} href="/abouts/milestone" class="snap-center shrink-0 w-[300px] md:w-[380px] group relative rounded-2xl overflow-hidden border border-gray-800 bg-gray-900/50 hover:border-amber-500/50 transition-all duration-500 flex flex-col h-[400px] md:h-[440px]">
            <div class="absolute top-4 left-4 z-10 bg-gray-900/80 backdrop-blur-md border border-gray-700/50 text-amber-400 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2">
                <span class="w-2 h-2 rounded-full {item.color || 'bg-amber-500'} animate-pulse"></span> Milestone
            </div>
            <div class="w-full h-52 md:h-60 bg-gray-800 overflow-hidden shrink-0">
                <img src={item.images[0]} alt={item.title} class="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700">
            </div>
            <div class="p-6 flex flex-col flex-grow justify-start">
                <p class="text-gray-400 text-xs mb-3 font-mono">
                    {item.date} — {item.event}
                </p>
                <h4 class="text-xl md:text-2xl font-serif text-gray-200 group-hover:text-amber-400 transition-colors line-clamp-2 leading-tight mb-2">
                    {item.title}
                </h4>
                <p class="text-sm text-gray-500 line-clamp-2">
                    {item.description}
                </p>
            </div>
        </a>
    {/each}
{/if}

            {#if activeTab === 'education'}
                
                {#each data.recentFormalEdu || [] as edu}
                    <a in:fade={{duration: 300}} href="/abouts/education" class="snap-center shrink-0 w-[300px] md:w-[380px] group relative rounded-2xl overflow-hidden border border-gray-800 bg-gray-900/50 hover:border-purple-500/50 transition-all duration-500 flex flex-col h-[400px] md:h-[440px]">
                        <div class="absolute top-4 left-4 z-10 bg-gray-900/80 backdrop-blur-md border border-gray-700/50 text-purple-400 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2">
                            <span class="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span> Formal Education
                        </div>
                        
                        <div class="w-full h-52 md:h-60 bg-gray-800 overflow-hidden shrink-0 flex items-center justify-center p-8">
                            <img src={edu.logo} alt={edu.institution} class="w-32 h-32 object-contain opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" onerror={(e) => e.currentTarget.style.display = 'none'}>
                        </div>
                        
                        <div class="p-6 flex flex-col flex-grow justify-start">
                            <p class="text-gray-400 text-xs mb-3 font-mono">{edu.date}</p>
                            <h4 class="text-xl md:text-2xl font-serif text-gray-200 group-hover:text-purple-400 transition-colors line-clamp-2 leading-tight">
                                {edu.institution}
                            </h4>
                            <p class="text-sm text-gray-500 line-clamp-2 mt-2">{edu.degree}</p>
                        </div>
                    </a>
                {/each}

                {#each data.recentCerts || [] as cert}
                    <a in:fade={{duration: 300}} href="/abouts/education" class="snap-center shrink-0 w-[300px] md:w-[380px] group relative rounded-2xl overflow-hidden border border-gray-800 bg-gray-900/50 hover:border-purple-500/50 transition-all duration-500 flex flex-col h-[400px] md:h-[440px]">
                        <div class="absolute top-4 left-4 z-10 bg-gray-900/80 backdrop-blur-md border border-gray-700/50 text-purple-400 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2">
                            <span class="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span> Certification
                        </div>
                        
                        <div class="w-full h-52 md:h-60 bg-gray-800 overflow-hidden shrink-0 flex items-center justify-center p-8">
                            <img src={cert.logo} alt={cert.title} class="w-32 h-32 object-contain opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" onerror={(e) => e.currentTarget.style.display = 'none'}>
                        </div>
                        
                        <div class="p-6 flex flex-col flex-grow justify-start">
                            <p class="text-gray-400 text-xs mb-3 font-mono">{cert.date}</p>
                            <h4 class="text-xl md:text-2xl font-serif text-gray-200 group-hover:text-purple-400 transition-colors line-clamp-2 leading-tight">
                                {cert.title}
                            </h4>
                            <p class="text-sm text-gray-500 line-clamp-2 mt-2">{cert.issuer}</p>
                        </div>
                    </a>
                {/each}

            {/if}

        </div> <button 
            onclick={() => scrollSlider('right')}
            class="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 z-20 bg-gray-900/90 hover:bg-sky-600 text-gray-300 hover:text-white w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-gray-700 hover:border-sky-400 transition-all duration-300 shadow-xl opacity-0 group-hover:opacity-100"
            aria-label="Scroll right"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
    </div>
<!-- container 3 -->
<div class="w-full h-px bg-gray-800/60 my-8 md:my-10"></div>
<div class="px-6 md:px-12 lg:px-16 w-full mx-auto mb-6 md:mb-10 flex flex-col md:flex-row gap-4 md:gap-12 items-center">
        
        <div class="w-full md:w-1/3">
            <h2 class="text-3xl md:text-4xl font-serif text-white/95 tracking-tight pb-2 md:pb-4">
                Where Ideas Meet People — 
            </h2>
        </div>

        <div class="w-full md:w-2/3 text-gray-400 font-sans text-base md:text-lg leading-relaxed space-y-4 text-left md:text-justify">
            <p>
Philosophy taught me how to ask. Praxis is where I learned to listen.

These photos are from pitching Angkut Ternak at KMI Expo, building a greenhouse with my KKN-PPM team in Kapuas, and working backstage at GIFTS 2024. They are not highlights. They are reminders.

In each moment I was the one learning — from mentors who corrected my thinking, from teammates who challenged my ideas, and from people in the field who taught me that an idea only matters when it actually helps someone.
</p>
            <p>
               In every frame, my logic was corrected in real time by mentors, my assumptions were challenged by teammates who were better than me, and my theories had to survive contact with real users. That is what praxis means to me. It is not about building clever systems in isolation. It is about taking an idea, putting it in front of people, watching it fail, and having the humility to rebuild it until it actually helps.            </p>
        </div>
    </div>
    <div 
        class="relative w-full group mt-4"
        onmouseenter={() => clearInterval(autoScrollInterval)}
        onmouseleave={startAutoScroll}
    >
        
        <button 
            onclick={() => scrollGallery('left')}
            class="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/80 text-white/50 hover:text-white w-10 h-14 md:w-14 md:h-20 flex items-center justify-center backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100"
            aria-label="Scroll left"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>

        <div bind:this={galleryContainer} class="flex overflow-x-auto snap-x snap-mandatory no-scrollbar w-full scroll-smooth">
            
            {#each galleryImages as img, i}
                <div class="snap-center shrink-0 w-[80vw] sm:w-[380px] md:w-[450px] lg:w-[520px] aspect-video relative group/photo cursor-pointer">
                    <img 
                        src={img} 
                        alt="Documentation {i + 1}" 
                        class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                    />
                    <div class="absolute inset-0 bg-black/10 group-hover/photo:bg-transparent transition-colors duration-500 pointer-events-none"></div>
                </div>
            {/each}

        </div>

        <button 
            onclick={() => scrollGallery('right')}
            class="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/80 text-white/50 hover:text-white w-10 h-14 md:w-14 md:h-20 flex items-center justify-center backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100"
            aria-label="Scroll right"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>

    </div>

<!-- footer -->
<footer class="relative mt-1 flex h-20 w-full items-center justify-center overflow-hidden border-t border-gray-800 mt-10 md:mt-18">
	<div class="magic-network-pattern absolute inset-0 opacity-40"></div>

	<div class="absolute inset-0 bg-gradient-to-b from-[#0f1115] to-transparent opacity-80"></div>

	<p class="relative z-10 font-mono justify-center text-sm tracking-widest text-gray-400">
		© 2026 Designed by Agus Imam Syahputra.  Sources Code <a href="https://github.com/wiscaksono/site"> wiscaksono </a>
	</p>
</footer>


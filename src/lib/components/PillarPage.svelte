<script>
  import ArrowRightIcon from '$lib/components/ArrowRightIcon.svelte'
  import BuildletterCTA from '$lib/components/BuildletterCTA.svelte'
  import Seo from '$lib/components/Seo.svelte'
  import { getRelatedPillars } from '$lib/data/pillars'
  import { website } from '$lib/info.js'

  /**
   * @typedef {{
   *   slug: string,
   *   title: string,
   *   description: string,
   *   date?: string,
   *   readingTime?: string,
   *   tags: string[]
   * }} PillarArticle
   */

  /** @type {{ pillar: import('$lib/data/pillars').PillarConfig, articles: PillarArticle[] }} */
  let { pillar, articles } = $props()

  const articleBySlug = $derived(new Map(articles.map((article) => [article.slug, article])))
  const moreArticles = $derived(
    pillar.moreArticleSlugs
      .map((slug) => articleBySlug.get(slug))
      .filter((article) => article !== undefined)
  )
  const relatedPillars = $derived(getRelatedPillars(pillar.slug))

  const collectionJsonLd = $derived(
    JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: pillar.seoTitle,
      description: pillar.metaDescription,
      inLanguage: 'pl-PL',
      hasPart: articles.map((article) => ({
        '@type': 'Article',
        headline: article.title,
        url: `${website}/post/${article.slug}`
      }))
    })
  )

  const focusClasses =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-4 focus-visible:ring-offset-zinc-50 dark:focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-zinc-950'
</script>

<Seo title={pillar.seoTitle} description={pillar.metaDescription} keywords={pillar.keywords} />

<svelte:head>
  {@html `<script type="application/ld+json">${collectionJsonLd}</script>`}
</svelte:head>

<article class="mx-auto w-full max-w-6xl px-2 pb-12 pt-10 sm:px-6 sm:pt-16 lg:pt-20">
  <nav
    aria-label="Okruszki"
    class="mb-10 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-500"
  >
    <a
      href="/"
      class={`rounded-sm transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 ${focusClasses}`}
      >Blog</a
    >
    <span aria-hidden="true">/</span>
    <span class="text-zinc-800 dark:text-zinc-200">{pillar.name}</span>
  </nav>

  <header
    class="relative overflow-hidden rounded-[2rem] border border-zinc-200 bg-white px-6 py-10 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:px-10 sm:py-14 lg:px-14 lg:py-16"
  >
    <div
      aria-hidden="true"
      class="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-400/10"
    ></div>
    <div
      aria-hidden="true"
      class="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent"
    ></div>

    <div class="relative max-w-4xl">
      <p
        class="mb-5 flex items-center gap-3 text-xs font-black uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-400"
      >
        <span class="h-px w-8 bg-indigo-500"></span>
        {pillar.eyebrow}
      </p>
      <h1
        class="max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.045em] text-zinc-950 dark:text-white sm:text-5xl lg:text-7xl"
      >
        {pillar.title} <span class="text-indigo-600 dark:text-indigo-400">{pillar.accent}</span>
      </h1>
      <p
        class="mt-7 max-w-3xl text-lg font-medium leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-xl"
      >
        {pillar.promise}
      </p>
      <a
        href="#sciezka"
        class={`mt-8 inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-5 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 dark:bg-white dark:text-zinc-950 ${focusClasses}`}
      >
        Zacznij od pierwszego kroku
        <span aria-hidden="true">↓</span>
      </a>
    </div>
  </header>

  <section
    aria-labelledby="wprowadzenie"
    class="mx-auto grid max-w-5xl gap-8 py-16 sm:py-20 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16"
  >
    <div>
      <p class="text-xs font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
        Mapa tematu
      </p>
      <h2 id="wprowadzenie" class="mt-3 text-2xl font-black sm:text-3xl">
        Najpierw system, później narzędzia
      </h2>
    </div>
    <p class="text-base leading-8 text-zinc-600 dark:text-zinc-300 sm:text-lg">
      {pillar.introduction}
    </p>
  </section>

  <section
    id="sciezka"
    aria-labelledby="sciezka-title"
    class="scroll-mt-28 rounded-[2rem] bg-zinc-100/80 px-5 py-10 dark:bg-zinc-900/70 sm:px-8 sm:py-14 lg:px-12"
  >
    <div class="mb-10 max-w-2xl">
      <p class="text-xs font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
        Ścieżka nauki
      </p>
      <h2 id="sciezka-title" class="mt-3 text-3xl font-black sm:text-4xl">
        {pillar.learningPath.length === 4
          ? 'Cztery filary w dobrej kolejności'
          : 'Trzy kroki w dobrej kolejności'}
      </h2>
      <p class="mt-4 leading-7 text-zinc-600 dark:text-zinc-400">
        Nie musisz czytać wszystkiego naraz. Zacznij od pierwszego etapu i przechodź dalej, kiedy
        potrafisz zastosować poprzedni.
      </p>
    </div>

    <ol
      class={`grid gap-5 ${pillar.learningPath.length === 4 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}
    >
      {#each pillar.learningPath as step}
        {@const article = articleBySlug.get(step.articleSlug)}
        {#if article}
          <li
            class="group flex min-w-0 flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/70 hover:shadow-xl hover:shadow-indigo-500/10 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-indigo-500/70"
          >
            <p
              class="text-[11px] font-black uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400"
            >
              {step.label}
            </p>
            <h3 class="mt-4 text-xl font-black leading-snug">{step.title}</h3>
            <p class="mt-3 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              {step.description}
            </p>
            <a
              href={`/post/${article.slug}`}
              class={`mt-6 rounded-lg border-t border-zinc-100 pt-5 text-sm font-bold text-zinc-900 transition-colors hover:text-indigo-600 dark:border-zinc-800 dark:text-zinc-100 dark:hover:text-indigo-400 ${focusClasses}`}
            >
              <span class="line-clamp-2">{article.title}</span>
              <span
                class="mt-3 inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400"
              >
                Przeczytaj etap <ArrowRightIcon class="h-3 w-3" />
              </span>
            </a>
          </li>
        {/if}
      {/each}
    </ol>
  </section>

  <section aria-labelledby="biblioteka-title" class="py-16 sm:py-20">
    <div class="mb-9 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
      <div>
        <p
          class="text-xs font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400"
        >
          Czytaj dalej
        </p>
        <h2 id="biblioteka-title" class="mt-3 text-3xl font-black sm:text-4xl">Pogłęb temat</h2>
      </div>
      <p class="max-w-md text-sm leading-6 text-zinc-500 dark:text-zinc-400">
        Praktyczne teksty o kosztach, kontroli i decyzjach, które pojawiają się po opanowaniu
        podstaw.
      </p>
    </div>

    <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {#each moreArticles as article}
        <a
          href={`/post/${article.slug}`}
          class={`group flex min-w-0 flex-col rounded-2xl border border-zinc-200 bg-white p-6 transition-all hover:border-indigo-400/70 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-indigo-500/70 ${focusClasses}`}
        >
          <div
            class="mb-5 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-zinc-500"
          >
            {#if article.tags[0]}<span>{article.tags[0]}</span>{/if}
            {#if article.readingTime}<span aria-hidden="true">·</span><span
                >{article.readingTime}</span
              >{/if}
          </div>
          <h3
            class="text-lg font-black leading-snug transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
          >
            {article.title}
          </h3>
          <p class="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            {article.description}
          </p>
          <span
            class="mt-6 inline-flex items-center gap-1 text-sm font-bold text-indigo-600 dark:text-indigo-400"
          >
            Czytaj artykuł <ArrowRightIcon
              class="h-3 w-3 transition-transform group-hover:translate-x-1"
            />
          </span>
        </a>
      {/each}
    </div>
  </section>

  <section
    aria-labelledby="inne-przewodniki"
    class="border-y border-zinc-200 py-12 dark:border-zinc-800"
  >
    <h2 id="inne-przewodniki" class="text-xl font-black">Zobacz też pozostałe przewodniki</h2>
    <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {#each relatedPillars as related}
        <a
          href={`/${related.slug}`}
          class={`group flex min-w-0 items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-white p-5 transition-all hover:border-indigo-400/70 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-indigo-500/70 ${focusClasses}`}
        >
          <span>
            <span
              class="block text-[11px] font-black uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400"
              >{related.eyebrow}</span
            >
            <span class="mt-1 block font-bold text-zinc-900 dark:text-zinc-100"
              >{related.title} {related.accent}</span
            >
          </span>
          <ArrowRightIcon
            class="h-5 w-5 shrink-0 text-indigo-600 transition-transform group-hover:translate-x-1 dark:text-indigo-400"
          />
        </a>
      {/each}
    </div>
  </section>

  <BuildletterCTA postSlug={`pillar-${pillar.slug}`} />
</article>

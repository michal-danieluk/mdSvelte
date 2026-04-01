<script>
  import { website, name } from '$lib/info.js'
  import ToC from '$lib/components/ToC.svelte'
  import ArrowLeftIcon from '$lib/components/ArrowLeftIcon.svelte'
  import SocialLinks from '$lib/components/SocialLinks.svelte'
  import Tags from '$lib/components/Tags.svelte'
  import { afterNavigate } from '$app/navigation'
  import PostDate from '$lib/components/PostDate.svelte'

  /** @type {import('./$types').PageData} */
  export let data

  // generated open-graph image for sharing on social media.
  const ogImage = `https://og-image.vercel.app/**${encodeURIComponent(
    data.post.title
  )}**?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fhyper-color-logo.svg`

  const url = `${website}/${data.post.slug}`

  let canGoBack = false
  afterNavigate(({ from }) => {
    if (from && from.url.pathname.startsWith('/posts')) {
      canGoBack = true
    }
  })

  function goBack() {
    if (canGoBack) {
      history.back()
    }
  }
</script>

<svelte:head>
  <title>{data.post.title} - {name}</title>
  <meta name="description" content={data.post.preview.text} />
  <meta name="author" content={name} />

  <!-- Facebook Meta Tags -->
  <meta property="og:url" content={url} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={data.post.title} />
  <meta property="og:description" content={data.post.preview.text} />
  <meta property="og:image" content={ogImage} />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content={website} />
  <meta property="twitter:url" content={url} />
  <meta name="twitter:title" content={data.post.title} />
  <meta name="twitter:description" content={data.post.preview.text} />
  <meta name="twitter:image" content={ogImage} />
</svelte:head>

<div class="max-w-6xl mx-auto px-6 pt-12 lg:pt-20">
  <div class="relative lg:flex lg:gap-16">
    
    <!-- Left Column: Navigation (Sticky) -->
    <div class="hidden lg:block w-12 shrink-0">
      <div class="sticky top-24">
        <svelte:element
          this={canGoBack ? 'button' : 'a'}
          class="group flex items-center justify-center w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-indigo-500 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm active:scale-95"
          href={canGoBack ? undefined : '/posts'}
          onclick={goBack}
          aria-label="Wróć do listy wpisów"
        >
          <ArrowLeftIcon class="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
        </svelte:element>
      </div>
    </div>

    <!-- Center Column: Main Content -->
    <main class="flex-grow max-w-3xl mx-auto lg:mx-0 overflow-hidden">
      <article>
        <header class="mb-12">
          <div class="flex items-center gap-3 mb-6">
            <div class="h-px w-8 bg-indigo-500"></div>
            <PostDate class="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400" post={data.post} />
          </div>

          <h1 class="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.1]">
            {data.post.title}
          </h1>

          {#if data.post.readingTime}
            <p class="mt-6 text-sm font-medium text-zinc-500 dark:text-zinc-500">
              {data.post.readingTime} • {data.post.preview.text.split(' ').length} słów
            </p>
          {/if}
        </header>

        <!-- Post Content: Explicit max-w to prevent layout breaks -->
        <div class="prose prose-zinc dark:prose-invert 
          max-w-none break-words
          prose-p:text-base sm:prose-p:text-lg prose-p:leading-relaxed
          prose-headings:font-black prose-headings:tracking-tight
          prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
          prose-pre:rounded-2xl prose-pre:border prose-pre:border-zinc-200 dark:prose-pre:border-zinc-800
          prose-img:rounded-2xl prose-img:shadow-xl">
          <svelte:component this={data.component} />
        </div>

        <!-- Tags at the end -->
        {#if data.post.tags && data.post.tags.length > 0}
          <div class="mt-16 pt-8 border-t border-zinc-100 dark:border-zinc-800">
            <h3 class="text-xs font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-600 mb-4">Tematyka</h3>
            <Tags tags={data.post.tags} />
          </div>
        {/if}
      </article>

      <!-- Bottom Bio / Socials -->
      <footer class="mt-24 py-12 border-t border-zinc-100 dark:border-zinc-800">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-8">
          <div class="flex flex-col items-center sm:items-start">
            <a href="/" class="text-lg font-black tracking-tighter text-zinc-900 dark:text-zinc-50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              {name}<span class="text-indigo-600 dark:text-indigo-400">.</span>
            </a>
            <p class="text-sm text-zinc-500 dark:text-zinc-500 mt-1">Dzięki za lekturę! Podziel się tekstem dalej.</p>
          </div>
          <div class="flex items-center gap-4">
            <SocialLinks />
          </div>
        </div>
      </footer>
    </main>

    <!-- Right Column: ToC (Sticky) -->
    <div class="hidden xl:block w-64 shrink-0">
      <aside class="sticky top-24">
        {#if data.post.headings && data.post.headings.length > 0}
          <div class="pl-8 border-l border-zinc-100 dark:border-zinc-800">
            <h3 class="text-xs font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-600 mb-6">Spis treści</h3>
            <ToC post={data.post} />
          </div>
        {/if}
      </aside>
    </div>

  </div>
</div>

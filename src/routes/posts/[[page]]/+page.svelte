<script>
  import { name } from '$lib/info.js'
  import ArrowLeftIcon from '$lib/components/ArrowLeftIcon.svelte'
  import ArrowRightIcon from '$lib/components/ArrowRightIcon.svelte'
  import PostsList from '$lib/components/PostsList.svelte'
  import SocialLinks from '$lib/components/SocialLinks.svelte'

  /** @type {import('./$types').PageData} */
  let { data } = $props()

  let isFirstPage = $derived(data.page === 1)
  let totalPages = $derived(Math.ceil(data.total / data.limit))
  let hasNextPage = $derived(data.page < totalPages)
</script>

<svelte:head>
  <title>Blog - {name}</title>
</svelte:head>

<div class="max-w-4xl mx-auto px-6 pt-12 lg:pt-20 pb-24">
  <header class="mb-16">
    <div class="flex items-center gap-3 mb-6">
      <div class="h-px w-8 bg-indigo-500"></div>
      <span class="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Digital Garden</span>
    </div>
    <h1 class="text-4xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
      Piszę o technologii, marketingu i <span class="text-indigo-600 dark:text-indigo-400">automatyzacji</span>.
    </h1>
    <p class="mt-6 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
      Mój mały kawałek internetu, w którym dzielę się wiedzą o systemach, AI i freelance. Bez lania wody, same konkrety.
    </p>
  </header>

  <div class="mt-12">
    <PostsList posts={data.posts} />
  </div>

  <!-- Pagination: Modern & Indigo -->
  {#if totalPages > 1}
    <div class="mt-24 pt-12 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
      <div class="flex flex-1">
        {#if !isFirstPage}
          <a 
            href={data.page === 2 ? '/posts' : `/posts/${data.page - 1}`} 
            data-sveltekit-prefetch 
            class="group flex items-center gap-2 text-sm font-bold text-zinc-500 dark:text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors uppercase tracking-widest"
          >
            <ArrowLeftIcon class="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Nowsze wpisy
          </a>
        {/if}
      </div>

      <div class="hidden sm:flex items-center gap-2">
        <span class="text-xs font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">
          Strona {data.page} z {totalPages}
        </span>
      </div>

      <div class="flex flex-1 justify-end">
        {#if hasNextPage}
          <a 
            href={`/posts/${data.page + 1}`} 
            data-sveltekit-prefetch 
            class="group flex items-center gap-2 text-sm font-bold text-zinc-500 dark:text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors uppercase tracking-widest"
          >
            Starsze wpisy
            <ArrowRightIcon class="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        {/if}
      </div>
    </div>
  {/if}

  <!-- Unified Footer Section -->
  <footer class="mt-32 py-12 border-t border-zinc-100 dark:border-zinc-800">
    <div class="flex flex-col sm:flex-row items-center justify-between gap-8">
      <div class="flex flex-col items-center sm:items-start text-center sm:text-left">
        <a href="/" class="text-lg font-black tracking-tighter text-zinc-900 dark:text-zinc-50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          {name}<span class="text-indigo-600 dark:text-indigo-400">.</span>
        </a>
        <p class="text-xs text-zinc-500 dark:text-zinc-500 mt-1 uppercase tracking-widest font-bold">Productivity & Automation</p>
      </div>
      <div class="flex items-center gap-4">
        <SocialLinks />
      </div>
    </div>
  </footer>
</div>

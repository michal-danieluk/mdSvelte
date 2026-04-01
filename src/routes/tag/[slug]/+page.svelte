<script>
  import { name } from '$lib/info.js'
  import PostsList from '$lib/components/PostsList.svelte'
  import SocialLinks from '$lib/components/SocialLinks.svelte'
  import ArrowLeftIcon from '$lib/components/ArrowLeftIcon.svelte'

  /** @type {import('./$types').PageData} */
  export let data
</script>

<svelte:head>
  <title>Temat: {data.tag.name} - {name}</title>
  <meta name="description" content="Wpisy oznaczone tagiem {data.tag.name}" />
</svelte:head>

<div class="max-w-4xl mx-auto px-6 pt-12 lg:pt-20 pb-24">
  <header class="mb-16">
    <nav class="mb-8">
      <a 
        href="/tags" 
        class="group inline-flex items-center gap-2 text-sm font-bold text-zinc-500 dark:text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors uppercase tracking-widest"
      >
        <ArrowLeftIcon class="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Wszystkie tematy
      </a>
    </nav>
    
    <div class="flex flex-col sm:flex-row sm:items-end gap-6 mb-8">
      <div class="space-y-4">
        <div class="flex items-center gap-3">
          <div class="h-px w-8 bg-indigo-500"></div>
          <span class="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Filtrowanie według tematu</span>
        </div>
        <h1 class="text-4xl sm:text-6xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 leading-none">
          {data.tag.name}
        </h1>
      </div>
      
      <div class="shrink-0 mb-1">
        <span class="inline-flex items-center px-4 py-2 text-xs font-black bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-2xl uppercase tracking-widest">
          {data.tag.count} {data.tag.count === 1 ? 'Wpis' : data.tag.count < 5 ? 'Wpisy' : 'Wpisów'}
        </span>
      </div>
    </div>
    
    <p class="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
      Wszystkie artykuły i przemyślenia powiązane z tematem: <span class="text-zinc-900 dark:text-zinc-100 font-bold">"{data.tag.name}"</span>.
    </p>
  </header>

  <div class="mt-12">
    {#if data.posts.length > 0}
      <PostsList posts={data.posts} />
    {:else}
      <div class="bg-zinc-100 dark:bg-zinc-900/50 rounded-2xl p-20 text-center border border-dashed border-zinc-300 dark:border-zinc-800">
        <p class="text-zinc-500 dark:text-zinc-500 font-bold uppercase tracking-widest text-xs">
          Brak wpisów w tej kategorii
        </p>
      </div>
    {/if}
  </div>

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

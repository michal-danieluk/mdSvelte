<script>
  import { name } from '$lib/info.js'
  import SocialLinks from '$lib/components/SocialLinks.svelte'

  /** @type {import('./$types').PageData} */
  export let data
</script>

<svelte:head>
  <title>Tagi - {name}</title>
  <meta name="description" content="Przeglądaj wpisy według tematów" />
</svelte:head>

<div class="max-w-4xl mx-auto px-6 pt-12 lg:pt-20 pb-24">
  <header class="mb-16">
    <div class="flex items-center gap-3 mb-6">
      <div class="h-px w-8 bg-indigo-500"></div>
      <span class="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Archiwum tematów</span>
    </div>
    <h1 class="text-4xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
      Eksploruj według <span class="text-indigo-600 dark:text-indigo-400">kategorii</span>.
    </h1>
    <p class="mt-6 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
      Wybierz temat, który Cię interesuje, aby zobaczyć wszystkie powiązane z nim wpisy. Od marketingu po czysty kod.
    </p>
  </header>

  <div class="mt-12">
    {#if data.tags.length > 0}
      <div class="flex flex-wrap gap-4">
        {#each data.tags as tag}
          <a
            href="/tag/{tag.slug}"
            class="group relative flex items-center gap-3 px-5 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl transition-all duration-300 hover:border-indigo-500 dark:hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-0.5"
          >
            <span class="text-sm font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {tag.name}
            </span>
            <span class="inline-flex items-center justify-center min-w-[24px] h-6 px-1.5 text-[10px] font-black bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-lg group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all">
              {tag.count}
            </span>
          </a>
        {/each}
      </div>
    {:else}
      <div class="bg-zinc-100 dark:bg-zinc-900/50 rounded-2xl p-12 text-center border border-dashed border-zinc-300 dark:border-zinc-800">
        <p class="text-zinc-500 dark:text-zinc-500 font-bold uppercase tracking-widest text-xs">
          Brak dostępnych tagów
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

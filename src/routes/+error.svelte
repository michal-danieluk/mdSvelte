<script>
  import { page } from '$app/stores'
  import { fly } from 'svelte/transition'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { ArrowLeft } from '@steeze-ui/heroicons'

  const status = $page.status
  const message = $page.error?.message || 'Coś poszło nie tak'

  const is404 = status === 404
</script>

<svelte:head>
  <title>{status} - {is404 ? 'Strona nie znaleziona' : 'Błąd'} | Michał Danieluk</title>
</svelte:head>

<div class="flex flex-col items-center pt-24 pb-12 text-center px-6 min-h-[70vh]">
  <div in:fly={{ y: 30, duration: 800 }}>
    <span class="text-xl font-black uppercase tracking-[0.4em] text-indigo-600 dark:text-indigo-400 mb-6 block">
      Error {status}
    </span>
    
    <h1 class="text-6xl sm:text-8xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 mb-8">
      {#if is404}
        Zgubiony w <span class="text-indigo-600 dark:text-indigo-400">kodzie?</span>
      {:else}
        Mamy <span class="text-indigo-600 dark:text-indigo-400">problem.</span>
      {/if}
    </h1>

    <p class="max-w-lg mx-auto text-xl text-zinc-600 dark:text-zinc-400 mb-14 leading-relaxed font-medium">
      {#if is404}
        Wygląda na to, że ta strona nie istnieje. Może została zautomatyzowana przez AI, albo po prostu wpisałeś zły adres.
      {:else}
        {message}. Spróbuj odświeżyć stronę lub wróć za chwilę.
      {/if}
    </p>

    <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
      <a
        href="/"
        class="group flex items-center gap-3 px-12 py-5 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-bold rounded-2xl hover:bg-indigo-600 dark:hover:bg-indigo-400 hover:text-white dark:hover:text-zinc-950 transition-all active:scale-95 shadow-xl shadow-zinc-200/50 dark:shadow-none"
      >
        <Icon src={ArrowLeft} class="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        Wróć do bazy
      </a>
      
      <a
        href="mailto:michal@danieluk.pl"
        class="px-8 py-5 text-zinc-600 dark:text-zinc-400 font-bold hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
      >
        Zgłoś problem
      </a>
    </div>
  </div>

  <!-- Dekoracyjny element w tle -->
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 blur-[160px] opacity-25 dark:opacity-10 pointer-events-none">
    <div class="w-96 h-96 bg-indigo-600 rounded-full"></div>
  </div>
</div>

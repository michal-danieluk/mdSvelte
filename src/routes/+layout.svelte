<script>
  import '../app.css'
  import '../prism.css'
  import { Moon, Sun } from '@steeze-ui/heroicons'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { browser } from '$app/environment'
  import { onMount } from 'svelte'
  import { page } from '$app/stores'
  import { firstName, lastName } from '$lib/info'
  import Search from '$lib/components/Search.svelte'
  import { fly } from 'svelte/transition'

  let { children } = $props()
  
  let isDarkMode = $state(false)

  onMount(() => {
    isDarkMode = document.documentElement.classList.contains('dark')
  })

  function toggleTheme() {
    isDarkMode = !isDarkMode
    if (browser) {
      if (isDarkMode) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
    }
  }
</script>

<div class="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
  <header class="sticky top-0 z-50 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border-b border-zinc-200/50 dark:border-zinc-800/50">
    <div class="flex items-center justify-between w-full max-w-6xl px-6 py-4 mx-auto">
      <a
        href="/"
        class="text-xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
      >
        {firstName}<span class="text-indigo-600 dark:text-indigo-400">.</span>{lastName.charAt(0)}
      </a>

      <div class="flex items-center gap-4 sm:gap-8">
        <nav class="hidden sm:flex items-center gap-6">
          <a
            class="text-sm font-semibold text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors"
            href="/tags"
          >
            Tagi
          </a>
          <a
            class="text-sm font-semibold text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors"
            href="/about"
          >
            O mnie
          </a>
        </nav>

        <div class="h-4 w-px bg-zinc-200 dark:bg-zinc-800 hidden sm:block"></div>

        <Search />

        <button
          type="button"
          aria-label="Toggle Dark Mode"
          class="group flex items-center justify-center w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all active:scale-95"
          onclick={toggleTheme}
        >
          {#if isDarkMode}
            <Icon src={Sun} class="w-5 h-5 group-hover:rotate-45 transition-transform" />
          {:else}
            <Icon src={Moon} class="w-5 h-5 group-hover:-rotate-12 transition-transform" />
          {/if}
        </button>
      </div>
    </div>
  </header>

  <main class="flex-grow w-full mx-auto px-4">
    {#key $page.url.pathname}
      <div in:fly={{ y: 10, duration: 400, delay: 200 }} out:fly={{ y: -10, duration: 200 }}>
        {@render children?.()}
      </div>
    {/key}
  </main>

  <footer class="w-full border-t border-zinc-200 dark:border-zinc-800 mt-24 pb-12">
    <div class="max-w-6xl mx-auto px-6 py-12">
      <div class="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
        <div class="text-center sm:text-left">
          <p class="text-sm font-bold text-zinc-900 dark:text-zinc-50 uppercase tracking-widest">
            {firstName} {lastName}
          </p>
          <p class="text-xs text-zinc-500 dark:text-zinc-500 mt-1">
            © {new Date().getFullYear()} • Productivity, Marketing & AI
          </p>
        </div>
        
        <div class="flex items-center gap-8">
          <a href="/rss.xml" class="text-xs font-bold text-zinc-500 hover:text-indigo-600 dark:text-zinc-500 dark:hover:text-indigo-400 transition-colors">
            RSS FEED
          </a>
          <a href="/sitemap.xml" class="text-xs font-bold text-zinc-500 hover:text-indigo-600 dark:text-zinc-500 dark:hover:text-indigo-400 transition-colors">
            SITEMAP
          </a>
        </div>
      </div>
    </div>
  </footer>
</div>

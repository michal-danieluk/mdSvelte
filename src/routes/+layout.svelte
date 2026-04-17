<script>
  import '../app.css'
  import '../prism.css'
  import { Moon, Sun, Bars3 as Menu, XMark as X } from '@steeze-ui/heroicons'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { browser } from '$app/environment'
  import { onMount } from 'svelte'
  import { page } from '$app/stores'
  import { firstName, lastName } from '$lib/info'
  import Search from '$lib/components/Search.svelte'
  import { fly, slide, fade } from 'svelte/transition'
  import { dev } from '$app/environment'
  import { inject } from '@vercel/analytics'

  let { children } = $props()
  
  inject({ mode: dev ? 'development' : 'production' })
  
  let isDarkMode = $state(false)
  let isMenuOpen = $state(false)

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

  function toggleMenu() {
    isMenuOpen = !isMenuOpen
  }

  // Zamknij menu przy zmianie strony
  $effect(() => {
    $page.url.pathname;
    isMenuOpen = false;
  })
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

      <div class="flex items-center gap-2 sm:gap-8">
        <!-- Desktop Nav -->
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

        <!-- Mobile Menu Toggle -->
        <button
          type="button"
          class="sm:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all active:scale-95"
          onclick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {#if isMenuOpen}
            <Icon src={X} class="w-5 h-5" />
          {:else}
            <Icon src={Menu} class="w-5 h-5" />
          {/if}
        </button>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    {#if isMenuOpen}
      <div 
        class="sm:hidden border-t border-zinc-200/50 dark:border-zinc-800/50 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md"
        transition:slide={{ duration: 300 }}
      >
        <nav class="flex flex-col p-6 gap-4">
          <a
            class="text-base font-bold text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors py-2"
            href="/tags"
          >
            Tagi
          </a>
          <a
            class="text-base font-bold text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors py-2"
            href="/about"
          >
            O mnie
          </a>
        </nav>
      </div>
    {/if}
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

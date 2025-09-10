<script>
  import '../app.css'
  import '../prism.css'
  import { Moon, Sun } from '@steeze-ui/heroicons'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { browser } from '$app/environment'
  import { onMount } from 'svelte'
  import { page } from '$app/stores'
  import { firstName } from '$lib/info'
  import { lastName } from '$lib/info'

  let { children } = $props()
  
  // Default to dark mode (true = dark, false = light)
  let isDarkMode = $state(true)
  let mounted = $state(false)

  onMount(() => {
    mounted = true
    
    // Initialize theme from localStorage or default to dark
    const stored = localStorage.getItem('theme')
    if (stored) {
      isDarkMode = stored === 'dark'
    } else {
      // Default to dark mode
      isDarkMode = true
      localStorage.setItem('theme', 'dark')
    }
    
    // Apply theme immediately
    applyTheme()
  })

  // React to isDarkMode changes
  $effect(() => {
    if (mounted) {
      applyTheme()
    }
  })

  function applyTheme() {
    if (!browser) return
    
    const html = document.documentElement
    
    if (isDarkMode) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }

  function toggleTheme() {
    isDarkMode = !isDarkMode
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
  }
</script>

<div class="flex flex-col min-h-screen">
  <div class="flex flex-col flex-grow w-full px-4 py-2">
    <!-- Option 1: Minimal Floating Header -->
    <header class="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-700 shadow-sm">
      <div class="flex items-center justify-between w-full max-w-2xl px-4 py-3 mx-auto">
        <!-- Logo/Name -->
        <div class="flex items-center">
          <a
            href="/"
            class="text-lg font-bold text-zinc-900 dark:text-zinc-100 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200"
          >
            {firstName} {lastName}
          </a>
        </div>

        <!-- Navigation -->
        <nav class="hidden sm:flex items-center space-x-6">
          <a
            class="relative text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors duration-200 group"
            href="/tags"
          >
            Tags
            <span class="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-teal-500 to-teal-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
          </a>
          <a
            class="relative text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors duration-200 group"
            href="/about"
          >
            O mnie
            <span class="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-teal-500 to-teal-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
          </a>
        </nav>

        <!-- Dark mode toggle -->
        <div class="flex items-center">
          <button
            type="button"
            role="switch"
            aria-label="Toggle Dark Mode"
            aria-checked={isDarkMode}
            class="flex items-center justify-center w-8 h-8 rounded-md text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200"
            onclick={toggleTheme}
          >
            {#if isDarkMode}
              <Icon src={Sun} class="w-4 h-4" />
            {:else}
              <Icon src={Moon} class="w-4 h-4" />
            {/if}
          </button>
        </div>
      </div>
    </header>
    <main
      class="flex flex-col flex-grow w-full mx-auto mt-7"
      class:max-w-2xl={!$page.data.layout?.fullWidth}
    >
      {@render children?.()}
    </main>
  </div>
  
  <footer class="w-full border-t border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900">
    <div class="max-w-2xl mx-auto px-4 py-8">
      <div class="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div class="flex items-center" style="gap: 0.5rem;">
          <span class="text-sm text-zinc-600 dark:text-zinc-400">
            © 2023-{new Date().getFullYear()} {firstName} {lastName}
          </span>
        </div>
        <div class="flex items-center gap-4">
          <a href="/rss.xml" class="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
            RSS
          </a>
          <a href="/sitemap.xml" class="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
            Sitemap
          </a>
        </div>
      </div>
    </div>
  </footer>
</div>

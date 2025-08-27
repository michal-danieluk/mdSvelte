<script>
  import '../app.css'
  import '../prism.css'
  import MoonIcon from 'heroicons-svelte/solid/MoonIcon.svelte'
  import SunIcon from 'heroicons-svelte/solid/SunIcon.svelte'
  import { browser } from '$app/environment'
  //import { name } from '$lib/info'
  import { page } from '$app/stores'
  import { firstName } from '$lib/info'
  import { lastName } from '$lib/info'

  let isDarkMode = browser ? Boolean(document.documentElement.classList.contains('dark')) : true

  function disableTransitionsTemporarily() {
    document.documentElement.classList.add('[&_*]:!transition-none')
    window.setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none')
    }, 0)
  }
</script>

<div class="flex flex-col min-h-screen">
  <div class="flex flex-col flex-grow w-full px-4 py-2">
    <header class="sticky top-0 z-50 w-full backdrop-blur-md bg-white/75 dark:bg-zinc-900/75 border-b border-white/20 dark:border-zinc-700/50">
      <div class="flex items-center justify-between w-full max-w-6xl px-6 py-4 mx-auto">
        <!-- Logo/Name -->
        <a
          class="text-xl font-bold !text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-teal-600 dark:to-teal-400 hover:from-teal-600 hover:to-teal-700 dark:hover:to-teal-300 transition-all duration-300"
          href="/"
        >
          {firstName} {lastName}
        </a>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <a
            class="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100 transition-colors duration-200 relative group"
            href="/tags"
          >
            Tags
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-500 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a
            class="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100 transition-colors duration-200 relative group"
            href="/about"
          >
            O mnie
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-500 group-hover:w-full transition-all duration-300"></span>
          </a>
        </nav>

        <!-- Dark mode toggle -->
        <button
          type="button"
          role="switch"
          aria-label="Toggle Dark Mode"
          aria-checked={isDarkMode}
          class="flex items-center justify-center w-8 h-8 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200"
          on:click={() => {
            isDarkMode = !isDarkMode
            localStorage.setItem('isDarkMode', isDarkMode.toString())

            disableTransitionsTemporarily()

            if (isDarkMode) {
              document.querySelector('html').classList.add('dark')
            } else {
              document.querySelector('html').classList.remove('dark')
            }
          }}
        >
          <MoonIcon class="hidden w-5 h-5 text-zinc-600 dark:block dark:text-zinc-400" />
          <SunIcon class="block w-5 h-5 text-zinc-600 dark:hidden" />
        </button>
      </div>
    </header>
    <main
      class="flex flex-col flex-grow w-full mx-auto"
      class:max-w-2xl={!$page.data.layout?.fullWidth}
    >
      <slot />
    </main>
  </div>
  
  <footer class="w-full border-t border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900">
    <div class="max-w-2xl mx-auto px-4 py-8">
      <div class="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div class="flex items-center gap-2">
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

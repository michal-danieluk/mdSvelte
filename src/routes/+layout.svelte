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
    <header class="w-full border-b border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
      <div class="flex flex-col items-center w-full max-w-4xl px-6 py-8 mx-auto space-y-6">
        <!-- Logo/Name - Center Top -->
        <div class="text-center">
          <a
            class="text-3xl font-bold !text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-teal-600 to-teal-500 dark:from-teal-400 dark:via-teal-500 dark:to-teal-400 hover:from-teal-600 hover:via-teal-700 hover:to-teal-600 dark:hover:from-teal-300 dark:hover:via-teal-400 dark:hover:to-teal-300 transition-all duration-500 tracking-tight"
            href="/"
          >
            {firstName} {lastName}
          </a>
        </div>

        <!-- Navigation & Dark Mode Toggle Row -->
        <div class="flex items-center justify-center w-full space-x-8">
          <!-- Navigation -->
          <nav class="flex items-center space-x-8">
            <a
              class="text-base font-medium text-zinc-700 hover:text-teal-600 dark:text-zinc-300 dark:hover:text-teal-400 transition-colors duration-300 relative group"
              href="/tags"
            >
              Tags
              <span class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-teal-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <span class="text-zinc-300 dark:text-zinc-600">•</span>
            <a
              class="text-base font-medium text-zinc-700 hover:text-teal-600 dark:text-zinc-300 dark:hover:text-teal-400 transition-colors duration-300 relative group"
              href="/about"
            >
              O mnie
              <span class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-teal-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </nav>

          <!-- Separator -->
          <div class="w-px h-6 bg-zinc-300 dark:bg-zinc-600"></div>

          <!-- Dark mode toggle -->
          <button
            type="button"
            role="switch"
            aria-label="Toggle Dark Mode"
            aria-checked={isDarkMode}
            class="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors duration-200"
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

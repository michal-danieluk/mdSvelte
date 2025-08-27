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
    <header class="sticky top-0 z-50 w-full backdrop-blur-sm bg-white/90 dark:bg-zinc-900/90 border-b border-zinc-200/50 dark:border-zinc-700/50">
      <div class="flex items-center justify-between w-full max-w-5xl px-6 py-3 mx-auto">
        <!-- Avatar + Name -->
        <div class="flex items-center space-x-3">
          <a href="/" class="flex items-center space-x-3 group">
            <img
              src="/img/md.jpg"
              alt="{firstName} {lastName}"
              class="w-10 h-10 rounded-full ring-2 ring-teal-200 dark:ring-teal-600 group-hover:ring-teal-300 dark:group-hover:ring-teal-500 transition-all duration-300"
            />
            <div class="flex flex-col">
              <span class="text-lg font-semibold !text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-teal-600 dark:to-teal-400 group-hover:from-teal-600 group-hover:to-teal-700 dark:group-hover:to-teal-300 transition-all duration-300">
                {firstName} {lastName}
              </span>
              <span class="text-xs text-zinc-500 dark:text-zinc-400">
                Blog osobisty
              </span>
            </div>
          </a>
        </div>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center space-x-6">
          <a
            class="text-sm font-medium text-zinc-600 hover:text-teal-600 dark:text-zinc-300 dark:hover:text-teal-400 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-900/30"
            href="/tags"
          >
            Tags
          </a>
          <a
            class="text-sm font-medium text-zinc-600 hover:text-teal-600 dark:text-zinc-300 dark:hover:text-teal-400 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-900/30"
            href="/about"
          >
            O mnie
          </a>
        </nav>

        <!-- Dark mode toggle -->
        <div class="flex items-center">
          <button
            type="button"
            role="switch"
            aria-label="Toggle Dark Mode"
            aria-checked={isDarkMode}
            class="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200"
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
            <MoonIcon class="hidden w-4 h-4 text-zinc-600 dark:block dark:text-zinc-400" />
            <SunIcon class="block w-4 h-4 text-zinc-600 dark:hidden" />
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

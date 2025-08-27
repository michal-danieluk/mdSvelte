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
    <header class="flex items-center justify-between w-full max-w-2xl py-4 mx-auto lg:pb-8">
      <div class="flex justify-between w-full pr-4">
        <a
          class="text-lg font-bold sm:text-2xl !text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-teal-600 dark:to-teal-400"
          href="/"
        >
          {firstName}

        <i class="text-2xl bg-transparent">{lastName}</i>
        </a>

        <nav class="flex items-center space-x-4">
          <a
            class="text-lg font-bold sm:text-2xl !text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-teal-600 hover:to-teal-800 dark:hover:to-teal-600 dark:to-teal-400"
            href="/tags"
          >
            Tags
          </a>
          <a
            class="text-lg font-bold sm:text-2xl !text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-teal-600 hover:to-teal-800 dark:hover:to-teal-600 dark:to-teal-400"
            href="/about"
          >
            O mnie
          </a>
        </nav>
      </div>
      <button
        type="button"
        role="switch"
        aria-label="Toggle Dark Mode"
        aria-checked={isDarkMode}
        class="w-5 h-5 sm:h-8 sm:w-8 sm:p-1"
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
        <MoonIcon class="hidden text-zinc-500 dark:block" />
        <SunIcon class="block text-zinc-400 dark:hidden" />
      </button>
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
            © 2024 {firstName} {lastName}
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

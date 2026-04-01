<script>
  import { browser } from '$app/environment'
  import { onMount, onDestroy } from 'svelte'

  export let post

  let elements = []
  let headings = post.headings
  let activeHeading = headings[0]
  let scrollTimeout

  onMount(() => {
    updateHeadings()
    setActiveHeading()
  })

  onDestroy(() => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
    }
  })

  function updateHeadings() {
    headings = post.headings

    if (browser) {
      elements = headings.map((heading) => {
        return document.getElementById(heading.id)
      }).filter(Boolean)
    }
  }

  function setActiveHeading() {
    if (!browser || elements.length === 0) return

    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
    }

    scrollTimeout = setTimeout(() => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const offset = 120
      
      let currentActiveHeading = headings[0]

      for (let i = elements.length - 1; i >= 0; i--) {
        const element = elements[i]
        if (element && element.offsetTop <= scrollY + offset) {
          currentActiveHeading = headings[i]
          break
        }
      }

      const pageHeight = document.documentElement.scrollHeight
      const scrollProgress = (scrollY + windowHeight) / pageHeight
      
      if (scrollProgress > 0.98) {
        currentActiveHeading = headings[headings.length - 1]
      }

      activeHeading = currentActiveHeading
    }, 50)
  }
</script>

<svelte:window on:scroll={setActiveHeading}></svelte:window>

<nav class="flex flex-col gap-4">
  <ul class="flex flex-col gap-3">
    {#each headings as heading}
      <li
        class="group relative pl-4 transition-all duration-200"
        style={`--depth: ${Math.max(0, heading.depth - 2)}`}
      >
        <!-- Active indicator -->
        {#if activeHeading === heading}
          <div class="absolute left-0 top-1 bottom-1 w-0.5 bg-indigo-500 rounded-full animate-in fade-in duration-300"></div>
        {/if}

        <a 
          href={`#${heading.id}`}
          class="block text-xs font-bold leading-relaxed tracking-tight transition-colors"
          class:text-indigo-600={activeHeading === heading}
          class:dark:text-indigo-400={activeHeading === heading}
          class:text-zinc-400={activeHeading !== heading}
          class:dark:text-zinc-600={activeHeading !== heading}
          class:hover:text-zinc-900={activeHeading !== heading}
          class:dark:hover:text-zinc-300={activeHeading !== heading}
          style="padding-left: calc(var(--depth) * 1rem);"
        >
          {heading.value}
        </a>
      </li>
    {/each}
  </ul>
</nav>

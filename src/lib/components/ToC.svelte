<script>
  import { browser } from '$app/environment'
  import { onMount, onDestroy } from 'svelte'
  import Card from './Card.svelte'

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
      }).filter(Boolean) // Remove null elements
    }
  }

  function setActiveHeading() {
    if (!browser || elements.length === 0) return

    // Clear any existing timeout to throttle scroll events
    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
    }

    scrollTimeout = setTimeout(() => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      
      // Add some offset so heading is considered "active" before it reaches the very top
      const offset = 100
      
      let currentActiveHeading = headings[0]

      // Find the heading that's currently most visible
      for (let i = elements.length - 1; i >= 0; i--) {
        const element = elements[i]
        if (element && element.offsetTop <= scrollY + offset) {
          currentActiveHeading = headings[i]
          break
        }
      }

      // Handle case when we're near the bottom of the page
      const pageHeight = document.documentElement.scrollHeight
      const scrollProgress = (scrollY + windowHeight) / pageHeight
      
      if (scrollProgress > 0.95) {
        currentActiveHeading = headings[headings.length - 1]
      }

      activeHeading = currentActiveHeading
    }, 10) // Small delay to throttle scroll events
  }
</script>

<svelte:window on:scroll={setActiveHeading} />

<Card>
  <slot slot="description">
    <ul class="flex flex-col gap-2">
      {#each headings as heading}
        <li
          class="pl-2 transition-colors border-teal-500 heading text-zinc-500 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-100"
          class:active={activeHeading === heading}
          style={`--depth: ${
            // consider h1 and h2 at the same depth, as h1 will only be used for page title
            Math.max(0, heading.depth - 1)
          }`}
        >
          <a href={`#${heading.id}`}>{heading.value}</a>
        </li>
      {/each}
    </ul>
  </slot>
</Card>

<style lang="postcss">
  .heading {
    padding-left: calc(var(--depth, 0) * 0.35rem);
  }

  .active {
    @apply font-medium text-slate-900 border-l-2 -ml-[2px];
  }

  /* can't use dark: modifier in @apply */
  :global(.dark) .active {
    @apply text-slate-100;
  }
</style>

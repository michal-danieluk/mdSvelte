<script>
  import { name } from '$lib/info.js'
  import Card from '$lib/components/Card.svelte'
  import SocialLinks from '$lib/components/SocialLinks.svelte'

  /** @type {import('./$types').PageData} */
  export let data
</script>

<svelte:head>
  <title>Tags - {name}</title>
  <meta name="description" content="Browse all blog post tags" />
  <meta name="author" content={name} />
</svelte:head>

<div class="max-w-2xl mx-auto">
  <header class="flex flex-col">
    <h1 class="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
      Tags
    </h1>
    <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
      Browse posts by topic. Click on any tag to see all related posts.
    </p>
  </header>

  <div class="mt-16 sm:mt-20">
    {#if data.tags.length > 0}
      <div class="space-y-6">
        <Card>
          <slot slot="eyebrow">All Tags ({data.tags.length})</slot>
          <slot slot="description">
            <div class="flex flex-wrap gap-3">
              {#each data.tags as tag}
                <a
                  href="/tag/{tag.slug}"
                  class="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-zinc-700 bg-zinc-100 rounded-full hover:bg-zinc-200 dark:text-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors"
                >
                  {tag.name}
                  <span class="text-xs text-zinc-500 dark:text-zinc-400">
                    {tag.count}
                  </span>
                </a>
              {/each}
            </div>
          </slot>
        </Card>
      </div>
    {:else}
      <Card>
        <slot slot="description">
          <p class="text-zinc-600 dark:text-zinc-400">
            No tags found. Add some tags to your blog posts to see them here.
          </p>
        </slot>
      </Card>
    {/if}
  </div>

  <!-- bio -->
  <hr class="mt-16 border-zinc-100 dark:border-zinc-700/40" />
  <div class="py-8">
    <div class="grid gap-8">
      <div class="flex justify-center order-1 col-span-2 gap-6 md:order-2">
        <SocialLinks />
      </div>
      <div class="flex justify-center order-2 md:order-1 md:col-span-2">
        <a
          href="/"
          class="text-lg font-bold sm:text-2xl !text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-teal-600 dark:to-teal-400"
        >
          {name}
        </a>
      </div>
    </div>
  </div>
</div>
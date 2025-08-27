<script>
  import { name } from '$lib/info.js'
  import PostsList from '$lib/components/PostsList.svelte'
  import SocialLinks from '$lib/components/SocialLinks.svelte'

  /** @type {import('./$types').PageData} */
  export let data
</script>

<svelte:head>
  <title>Tag: {data.tag.name} - {name}</title>
  <meta name="description" content="Posts tagged with {data.tag.name}" />
  <meta name="author" content={name} />
</svelte:head>

<div class="max-w-2xl mx-auto">
  <header class="flex flex-col">
    <nav class="mb-4">
      <a 
        href="/tags" 
        class="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
      >
        ← Back to all tags
      </a>
    </nav>
    
    <div class="flex items-center gap-3 mb-4">
      <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
        {data.tag.name}
      </h1>
      <span class="inline-flex items-center px-3 py-1 text-sm font-medium text-zinc-600 bg-zinc-100 rounded-full dark:text-zinc-300 dark:bg-zinc-800">
        {data.tag.count} post{data.tag.count !== 1 ? 's' : ''}
      </span>
    </div>
    
    <p class="text-base text-zinc-600 dark:text-zinc-400">
      All posts tagged with "{data.tag.name}"
    </p>
  </header>

  <div class="mt-16 sm:mt-20">
    {#if data.posts.length > 0}
      <PostsList posts={data.posts} />
    {:else}
      <div class="text-center py-12">
        <p class="text-zinc-600 dark:text-zinc-400">
          No posts found with this tag.
        </p>
      </div>
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
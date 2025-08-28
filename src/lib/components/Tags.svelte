<script>
  export let tags = []
  export let showLabel = true
  export let size = 'sm' // sm, base
  
  function tagToSlug(tag) {
    return tag.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  }

  $: sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    base: 'px-3 py-2 text-sm'
  }
</script>

{#if tags && tags.length > 0}
  <div class="flex flex-wrap items-center" style="gap: 0.5rem;">
    {#if showLabel}
      <span class="text-sm text-zinc-500 dark:text-zinc-400">Tags:</span>
    {/if}
    {#each tags as tag}
      <a
        href="/tag/{tagToSlug(tag)}"
        class="inline-flex items-center {sizeClasses[size]} font-medium text-zinc-600 bg-zinc-100 rounded-full hover:bg-zinc-200 dark:text-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors"
      >
        #{tag}
      </a>
    {/each}
  </div>
{/if}
<script>
  import Tags from '$lib/components/Tags.svelte'

  export let posts
</script>

{#if posts && posts.length > 0}
  <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {#each posts as post}
      <a href="/post/{post.slug}" class="group block h-48">
        <article class="relative group-hover:scale-105 transition-transform duration-200 h-full">
          <div class="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 border border-amber-200 dark:border-gray-600 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:border-amber-300 dark:hover:border-gray-500 h-full">
            <div class="absolute top-4 right-4">
              <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-gray-700 dark:text-gray-200">
                Wyróżniony
              </span>
            </div>

            <div class="flex flex-col h-full">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 pr-16 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
                {post.title}
              </h3>

              <div class="mt-auto">
                {#if post.tags && post.tags.length > 0}
                  <div class="overflow-hidden">
                    <Tags tags={post.tags} showLabel={false} size="sm" />
                  </div>
                {/if}
              </div>
            </div>
          </div>
        </article>
      </a>
    {/each}
  </div>
{/if}

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
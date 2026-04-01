<script>
  /** @type {import('$lib/data/posts').Post[]} */
  export let posts
</script>

{#if posts && posts.length > 0}
  <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {#each posts as post}
      <a 
        href="/post/{post.slug}" 
        class="group relative flex flex-col h-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-500/50 dark:hover:border-indigo-400/50 hover:-translate-y-1"
      >
        <!-- Decorative accent -->
        <div class="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 dark:bg-indigo-400/5 rounded-bl-full -z-10 transition-colors group-hover:bg-indigo-500/10"></div>
        
        <div class="flex flex-col h-full justify-between gap-4">
          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
              <span class="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Post wyróżniony</span>
            </div>
            
            <h3 class="text-lg font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
              {post.title}
            </h3>
          </div>

          <div class="flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
            Czytaj więcej
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </a>
    {/each}
  </div>
{/if}

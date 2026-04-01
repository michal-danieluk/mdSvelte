<script>
  import PostPreview from '$lib/components/PostPreview.svelte'
  import PostDate from '$lib/components/PostDate.svelte'

  export let posts
</script>

<div class="flex flex-col gap-20 md:border-l md:border-zinc-100 md:pl-10 md:dark:border-zinc-800/60">
  {#each posts as post}
    <article class="relative grid items-start grid-cols-4 gap-8 group">
      <!-- Side indicator on hover -->
      <div class="absolute -left-[41px] top-6 w-1 h-8 bg-indigo-500 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity hidden md:block"></div>

      <PostDate class="flex-col hidden md:flex text-sm font-bold tracking-tighter text-zinc-400 dark:text-zinc-600 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors uppercase" {post} />

      <div class="col-span-4 md:col-span-3">
        <PostPreview {post}>
          <div slot="eyebrow">
            <PostDate class="md:hidden text-xs font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase mb-4" {post} />
          </div>
        </PostPreview>
      </div>
    </article>
  {/each}
</div>

<script>
  import ArrowRightIcon from './ArrowRightIcon.svelte'

  /** @type {import('$lib/data/posts').Post} */
  export let post
</script>

<div class="group relative flex flex-col items-start">
  <slot name="eyebrow" />
  
  <h3 class="text-base font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mt-3">
    <a href="/post/{post.slug}" data-sveltekit-prefetch>
      <span class="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
      <span class="relative z-10 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
        {post.title}
      </span>
    </a>
  </h3>

  <div class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
    {@html post.preview.html}
  </div>

  <div class="relative z-10 mt-4 flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-all translate-x-[-4px] group-hover:translate-x-0">
    Czytaj dalej
    <ArrowRightIcon class="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
  </div>
</div>

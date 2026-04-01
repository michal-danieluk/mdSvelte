<script>
  import ArrowRightIcon from '$lib/components/ArrowRightIcon.svelte'
  import PostsList from '$lib/components/PostsList.svelte'
  import FeaturedPosts from '$lib/components/FeaturedPosts.svelte'
  import SocialLinks from '$lib/components/SocialLinks.svelte'
  import Card from '$lib/components/Card.svelte'
  import { avatar, bio, name } from '$lib/info.js'

  /** @type {import('./$types').PageData} */
  export let data
</script>

<svelte:head>
  <title>{name}</title>
  <meta name="description" content={bio} />
</svelte:head>

<!-- Redesigned Hero Section: Professional & Compact -->
<section class="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-24">
  <div class="flex flex-col items-center text-center gap-8 px-4 max-w-4xl mx-auto">
    <div class="relative">
      <div class="absolute inset-0 rounded-full bg-indigo-500/20 blur-2xl dark:bg-indigo-400/10"></div>
      <img
        src={avatar}
        alt={name}
        class="relative mx-auto rounded-2xl w-32 h-32 sm:w-40 sm:h-40 object-cover shadow-2xl ring-1 ring-zinc-200 dark:ring-zinc-800 rotate-2 transition-transform hover:rotate-0 duration-500"
      />
    </div>
    
    <div class="space-y-4">
      <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
        Cześć, jestem <span class="text-indigo-600 dark:text-indigo-400">{name.split(' ')[0]}</span>.
      </h1>
      <p class="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
        {bio}
      </p>
    </div>

    <div class="flex items-center gap-6">
      <SocialLinks />
    </div>
  </div>
</section>

<div class="flex flex-col flex-grow pb-24 space-y-24">

  <!-- Featured Posts Section: Modern Grid Background -->
  {#if data.featuredPosts && data.featuredPosts.length > 0}
    <section class="relative">
      <div class="absolute inset-0 -top-12 -bottom-12 bg-zinc-100/50 dark:bg-zinc-900/50 -skew-y-1"></div>
      <div class="relative container mx-auto px-4 max-w-4xl">
        <div class="flex items-center gap-2 mb-10">
          <div class="h-px w-8 bg-indigo-500"></div>
          <h2 class="text-xl font-bold text-zinc-900 dark:text-zinc-50">
            Wyróżnione projekty i myśli
          </h2>
        </div>
        <FeaturedPosts posts={data.featuredPosts} />
      </div>
    </section>
  {/if}

  <!-- Latest Posts Section -->
  <section class="container mx-auto px-4 max-w-4xl">
    <div class="flex items-center justify-between gap-4 mb-10">
      <div class="flex items-center gap-2">
        <div class="h-px w-8 bg-zinc-300 dark:bg-zinc-700"></div>
        <h2 class="text-xl font-bold text-zinc-900 dark:text-zinc-50">
          Najnowsze wpisy
        </h2>
      </div>
      <a href="/posts" class="group flex items-center gap-1 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors"
        >Zobacz wszystkie <ArrowRightIcon class="w-4 h-4 transition-transform group-hover:translate-x-1" /></a
      >
    </div>
    <PostsList posts={data.posts} />
  </section>
</div>

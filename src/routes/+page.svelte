<script>
  import ArrowRightIcon from '$lib/components/ArrowRightIcon.svelte'
  import PostsList from '$lib/components/PostsList.svelte'
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

<!-- bio card - breaking out of all parent containers -->
<section class="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen flex justify-center pt-8 pb-16 bg-gradient-to-b from-amber-50/50 to-transparent dark:from-gray-800/50 dark:to-transparent">
  <div class="bg-amber-50 dark:bg-gray-800 border border-amber-200 dark:border-gray-700 rounded-xl shadow-lg p-12 transition-all duration-300 hover:shadow-xl hover:bg-amber-100 dark:hover:bg-gray-700 hover:-translate-y-1 w-full max-w-4xl mx-4">
    <div class="flex flex-col items-center w-full gap-8">
      <img
        src={avatar}
        alt={name}
        class="mx-auto rounded-full w-44 h-44 ring-4 ring-amber-200 dark:ring-gray-600 shadow-lg"
      />
      <div class="flex gap-6">
        <SocialLinks />
      </div>
      <p class="text-lg text-gray-700 dark:text-gray-300 text-center max-w-3xl leading-relaxed">
        {bio}
      </p>
    </div>
  </div>
</section>

<div class="flex flex-col flex-grow pb-16">
  
  <div class="flex flex-col gap-8">
    <section class="w-full">
      <div class="flex items-center justify-between gap-4 mb-8">
        <h2 class="text-sm font-medium sm:text-base text-zinc-500 dark:text-zinc-400">
        Najnowsze
        </h2>
        <a href="/posts" class="flex items-center gap-1 text-sm font-medium text-teal-500"
          >Blog <ArrowRightIcon class="w-4 h-4" /></a
        >
      </div>
      <PostsList posts={data.posts} />
    </section>
  </div>
</div>

<script>
// import ArrowRightIcon from '$lib/components/ArrowRightIcon.svelte'
//  import PostsList from '$lib/components/PostsList.svelte'
  import SocialLinks from '$lib/components/SocialLinks.svelte'
  import { avatar, bio, name } from '$lib/info.js'

  /** @type {import('./$types').PageData} */
  //  export let data
</script>

<svelte:head>
  <title>{name}</title>
  <meta name="description" content={bio} />
</svelte:head>

<div class="flex flex-col flex-grow gap-8 pb-16">
  <section class="flex flex-col items-center gap-16 pt-8 pb-8">
    <div class="flex flex-col items-center w-full gap-6 rounded-lg">
      <img
        src={avatar}
        alt={name}
        class="mx-auto rounded-full w-36 h-36 ring-2 ring-zinc-200 dark:ring-zinc-700"
      />
      <div class="flex gap-6">
        <SocialLinks />
      </div>
    </div>
  </section>
  <section class="flex flex-col items-center w-full prose">
    <h2 class="text-2xl">Cześć :) Nazywam się Michał.</h2>
    <p class="text-base text-zinc-600 dark:text-zinc-400">
      Od lat zajmuję się sprzedażą. W mowie i piśmie :). Prowadzę newsletter produtkowy dla klientów
      mojej obecnej firmy. Jestem odpowiedzialny za jego wygląd oraz terści. Z roku na rok zauważam
      jak bardzo zminiał się sposób prowadzenia jego prze ze mnie.
    </p>
    <p class="text-base text-zinc-600 dark:text-zinc-400">
      Prywatnie grzebię się troszkę w kodzie. Myślę, że raczej nie mogę się nazwać programistą bo za
      mało piszę kodu. Jednak jestem w stanie sam postawić sobie bloga w Nextjs czy tak jak teraz w
      Svelte. Przyznaje, że bardzo mnie to pasjonuję i staram się poświęcać jak najwięcej temu
      czasu.
    </p>
  </section>
</div>

<script>
  // import ArrowRightIcon from '$lib/components/ArrowRightIcon.svelte'
  //  import PostsList from '$lib/components/PostsList.svelte'
  import SocialLinks from '$lib/components/SocialLinks.svelte'
  import { avatar, bio, name } from '$lib/info.js'
  import { enhance } from '$app/forms'

  /** @type {import('./$types').ActionData} */
  export let form
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
  <section class="flex flex-col items-center w-full prose dark:prose-invert">
    <h2 class="text-2xl text-zinc-800 dark:text-zinc-100">Cześć &#128512; Nazywam się Michał.</h2>
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
  
  <section class="flex flex-col items-center w-full max-w-2xl mx-auto">
    <h2 class="text-2xl text-zinc-800 dark:text-zinc-100 mb-6">Skontaktuj się ze mną</h2>
    
    <form method="POST" class="w-full space-y-6" use:enhance>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="name" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Imię
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form?.name ?? ''}
            required
            class="form-input block w-full rounded-lg border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:border-teal-500 focus:ring-teal-500 dark:focus:border-teal-400 dark:focus:ring-teal-400"
            placeholder="Twoje imię"
          />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form?.email ?? ''}
            required
            class="form-input block w-full rounded-lg border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:border-teal-500 focus:ring-teal-500 dark:focus:border-teal-400 dark:focus:ring-teal-400"
            placeholder="twój@email.com"
          />
        </div>
      </div>
      
      <div>
        <label for="message" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          Wiadomość
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows="6"
          class="form-textarea block w-full rounded-lg border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:border-teal-500 focus:ring-teal-500 dark:focus:border-teal-400 dark:focus:ring-teal-400 resize-none"
          placeholder="Twoja wiadomość..."
        >{form?.message ?? ''}</textarea>
      </div>
      
      <button
        type="submit"
        class="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
      >
        Wyślij wiadomość
      </button>
      
      {#if form?.success}
        <div class="text-center text-green-600 dark:text-green-400 text-sm p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          ✅ {form.message}
        </div>
      {:else if form?.error}
        <div class="text-center text-red-600 dark:text-red-400 text-sm p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          ❌ {form.error}
        </div>
      {/if}
    </form>
  </section>
</div>

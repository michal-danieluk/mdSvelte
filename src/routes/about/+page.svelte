<script>
  import SocialLinks from '$lib/components/SocialLinks.svelte'
  import { avatar, bio, name } from '$lib/info.js'
  import { enhance } from '$app/forms'

  /** @type {import('./$types').ActionData} */
  export let form
</script>

<svelte:head>
  <title>O mnie - {name}</title>
  <meta name="description" content={bio} />
</svelte:head>

<div class="max-w-4xl mx-auto px-6 py-12 lg:py-20">
  <div class="flex flex-col lg:flex-row gap-16 lg:gap-24">
    
    <!-- Left Column: Identity & Socials -->
    <aside class="lg:w-1/3 shrink-0">
      <div class="lg:sticky lg:top-24 flex flex-col items-center lg:items-start text-center lg:text-left">
        <div class="relative mb-8">
          <div class="absolute inset-0 rounded-3xl bg-indigo-500/20 blur-2xl dark:bg-indigo-400/10"></div>
          <img
            src={avatar}
            alt={name}
            class="relative rounded-3xl w-48 h-48 lg:w-full lg:h-auto aspect-square object-cover shadow-2xl ring-1 ring-zinc-200 dark:ring-zinc-800 rotate-3 transition-transform hover:rotate-0 duration-500"
          />
        </div>
        
        <h1 class="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 mb-2">
          {name}
        </h1>
        <p class="text-indigo-600 dark:text-indigo-400 font-bold text-sm uppercase tracking-widest mb-6">
          Marketing & Automation
        </p>

        <div class="flex gap-4">
          <SocialLinks />
        </div>
      </div>
    </aside>

    <!-- Right Column: Story & Contact -->
    <main class="flex-grow">
      <section class="prose prose-zinc dark:prose-invert max-w-none 
        prose-headings:font-black prose-headings:tracking-tight
        prose-p:leading-relaxed prose-p:text-zinc-600 dark:prose-p:text-zinc-400">
        <h2 class="text-3xl sm:text-4xl mb-8">Cześć! Nazywam się Michał.</h2>
        <p>
          Od lat zajmuję się sprzedażą – w mowie i piśmie. Moja praca to ciągłe balansowanie między potrzebami klientów a technologią, która pozwala te potrzeby zaspokoić szybciej i lepiej.
        </p>
        <p>
          Obecnie prowadzę newsletter produktowy, gdzie odpowiadam za całą ścieżkę: od strategii treści, przez design, aż po techniczną egzekucję. Fascynuje mnie to, jak ewoluuje komunikacja z klientem i jak narzędzia, których używamy, zmieniają nasz sposób myślenia o marketingu.
        </p>
        <p>
          Prywatnie jestem entuzjastą kodu. Choć nie nazywam się pełnoetatowym programistą, uwielbiam budować własne systemy – od blogów w Svelte po automatyzacje w CLI. Wierzę, że zrozumienie "jak to działa pod spodem" daje ogromną przewagę w dzisiejszym świecie marketingu.
        </p>
      </section>

      <!-- Contact Section -->
      <section class="mt-20 pt-12 border-t border-zinc-100 dark:border-zinc-800">
        <div class="flex items-center gap-2 mb-10">
          <div class="h-px w-8 bg-indigo-500"></div>
          <h2 class="text-xl font-black text-zinc-900 dark:text-zinc-50 uppercase tracking-widest">
            Zróbmy coś razem
          </h2>
        </div>

        <form method="POST" class="space-y-8" use:enhance>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div class="space-y-2">
              <label for="name" class="text-xs font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-500 ml-1">
                Twoje Imię
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form?.name ?? ''}
                required
                class="block w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-900 border-transparent focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-zinc-800 focus:ring-0 rounded-xl text-zinc-900 dark:text-zinc-100 transition-all"
                placeholder="Jan Kowalski"
              />
            </div>
            <div class="space-y-2">
              <label for="email" class="text-xs font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-500 ml-1">
                Adres Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form?.email ?? ''}
                required
                class="block w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-900 border-transparent focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-zinc-800 focus:ring-0 rounded-xl text-zinc-900 dark:text-zinc-100 transition-all"
                placeholder="jan@przyklad.pl"
              />
            </div>
          </div>
          
          <div class="space-y-2">
            <label for="message" class="text-xs font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-500 ml-1">
              Twoja Wiadomość
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows="5"
              class="block w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-900 border-transparent focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-zinc-800 focus:ring-0 rounded-xl text-zinc-900 dark:text-zinc-100 transition-all resize-none"
              placeholder="O czym chcesz porozmawiać?"
            >{form?.message ?? ''}</textarea>
          </div>
          
          <button
            type="submit"
            class="group relative inline-flex items-center justify-center px-8 py-4 font-black uppercase tracking-widest text-white transition-all duration-200 bg-indigo-600 rounded-xl hover:bg-indigo-500 hover:shadow-xl hover:shadow-indigo-500/20 active:scale-95"
          >
            Wyślij wiadomość
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
          
          {#if form?.success}
            <div class="animate-in fade-in slide-in-from-top-4 duration-300 text-indigo-600 dark:text-indigo-400 font-bold text-sm p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800/50 flex items-center gap-3">
              <span class="text-xl">✅</span> {form.message}
            </div>
          {:else if form?.error}
            <div class="animate-in fade-in slide-in-from-top-4 duration-300 text-red-600 dark:text-red-400 font-bold text-sm p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-800/50 flex items-center gap-3">
              <span class="text-xl">❌</span> {form.error}
            </div>
          {/if}
        </form>
      </section>
    </main>

  </div>
</div>

<script>
  import SocialLinks from '$lib/components/SocialLinks.svelte'
  import Newsletter from '$lib/components/Newsletter.svelte'
  import { avatar, bio, name, email, substack } from '$lib/info.js'
</script>

<svelte:head>
  <title>O mnie - {name}</title>
  <meta name="description" content={bio} />
</svelte:head>

<div class="max-w-6xl mx-auto px-6 py-12 lg:py-20">
  <div class="flex flex-col lg:flex-row gap-16 lg:gap-24">
    
    <!-- Left Column: Identity & Socials -->
    <aside class="lg:w-1/4 shrink-0">
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
          Obecnie prowadzę <a href={substack} target="_blank" rel="noopener noreferrer" class="text-indigo-600 dark:text-indigo-400 font-bold no-underline hover:underline">newsletter produktowy</a>, gdzie odpowiadam za całą ścieżkę: od strategii treści, przez design, aż po techniczną egzekucję. Fascynuje mnie to, jak ewoluuje komunikacja z klientem i jak narzędzia, których używamy, zmieniają nasz sposób myślenia o marketingu.
        </p>
        <p>
          Prywatnie jestem entuzjastą kodu. Choć nie nazywam się pełnoetatowym programistą, uwielbiam budować własne systemy – od blogów w Svelte po automatyzacje w CLI. Wierzę, że zrozumienie "jak to działa pod spodem" daje ogromną przewagę w dzisiejszym świecie marketingu.
        </p>
      </section>

      <Newsletter />

      <!-- Contact Section: Simple & Direct -->
      <section class="mt-20 pt-12 border-t border-zinc-100 dark:border-zinc-800">
        <div class="flex items-center gap-2 mb-10">
          <div class="h-px w-8 bg-indigo-500"></div>
          <h2 class="text-xl font-black text-zinc-900 dark:text-zinc-50 uppercase tracking-widest">
            Zróbmy coś razem
          </h2>
        </div>

        <div class="bg-zinc-100 dark:bg-zinc-900/50 rounded-2xl p-8 sm:p-12 text-center">
          <h3 class="text-2xl font-black text-zinc-900 dark:text-zinc-50 mb-4">Masz pomysł na projekt?</h3>
          <p class="text-zinc-600 dark:text-zinc-400 mb-8 max-w-md mx-auto leading-relaxed">
            Nie cierpię spamu, ale kocham konkretne rozmowy o automatyzacji i marketingu. Napisz do mnie bezpośrednio na maila.
          </p>
          
          <a
            href="mailto:{email}"
            class="group relative inline-flex items-center justify-center px-10 py-5 font-black uppercase tracking-widest text-white transition-all duration-200 bg-indigo-600 rounded-2xl hover:bg-indigo-500 hover:shadow-xl hover:shadow-indigo-500/20 active:scale-95"
          >
            Napisz wiadomość
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </a>

          <div class="mt-8 text-xs font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">
            Odpowiadam zazwyczaj w ciągu 24h
          </div>
        </div>
      </section>
    </main>

  </div>
</div>

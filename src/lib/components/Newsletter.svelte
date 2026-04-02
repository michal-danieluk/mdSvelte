<script>
  import { substack } from '$lib/info'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { EnvelopeOpen as MailIcon } from '@steeze-ui/heroicons'
</script>

<div class="relative overflow-hidden rounded-3xl bg-zinc-900 dark:bg-zinc-800 p-6 sm:p-12 mt-16 sm:mt-24 shadow-2xl group transition-all duration-500 hover:ring-1 hover:ring-indigo-500/50 w-full">
  <!-- Decorative background elements -->
  <div class="absolute -top-12 -right-12 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl group-hover:bg-indigo-600/20 transition-all duration-500"></div>
  <div class="absolute -bottom-12 -left-12 w-48 h-48 bg-zinc-700/20 rounded-full blur-2xl group-hover:bg-indigo-600/10 transition-all duration-500"></div>

  <div class="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10">
    <div class="max-w-md text-center lg:text-left">
      <div class="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-zinc-800/80 dark:bg-zinc-700/80 border border-zinc-700/50 rounded-full">
        <Icon src={MailIcon} class="w-3.5 h-3.5 text-indigo-400" />
        <span class="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-300">Newsletter Produktowy</span>
      </div>
      <h2 class="text-2xl sm:text-3xl font-black tracking-tight text-white mb-4">
        Budujmy mądrzej.<br/><span class="text-indigo-400">BuildLetter.</span>
      </h2>
      <p class="text-zinc-400 dark:text-zinc-400 leading-relaxed text-sm sm:text-base">
        Bez spamu. Tylko konkretne rozważania o marketingu, sprzedaży i 'vibe codingu'. Dołącz do kilkuset osób, które chcą dowozić lepsze wyniki.
      </p>
    </div>

    <div class="w-full lg:w-auto shrink-0">
      <a
        href={substack}
        target="_blank"
        rel="noopener noreferrer"
        class="group relative inline-flex items-center justify-center w-full lg:w-auto px-8 py-5 font-black uppercase tracking-widest text-zinc-900 transition-all duration-200 bg-white rounded-2xl hover:bg-indigo-500 hover:text-white hover:shadow-xl hover:shadow-indigo-500/30 active:scale-95"
      >
        Zapisz się teraz
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </a>
    </div>
  </div>
</div>

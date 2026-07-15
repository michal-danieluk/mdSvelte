<!-- Most między blogiem (poligon) a buildletter.com (usługi) — wizualnie w brandzie buildletter -->
<script>
  let { postSlug = null } = $props()

  // UTM zamiast Vercel Analytics track() (custom events sa platne) — dane trafiaja
  // w query stringu, wiec zlapie je kazde narzedzie analityczne po stronie buildletter.com
  const ctaUrl = `https://buildletter.com?utm_source=michaldanieluk.pl&utm_medium=blog_cta&utm_campaign=blog_bridge${postSlug ? `&utm_content=${postSlug}` : ''}`
</script>

<aside
  class="mt-16 p-6 sm:p-8 rounded-2xl bg-black border border-zinc-800 relative overflow-hidden"
>
  <span
    aria-hidden="true"
    class="absolute -right-6 -bottom-10 text-[140px] font-black leading-none select-none pointer-events-none"
    style="color:#ff5b1f; opacity:0.9; transform:rotate(-8deg);">→</span>

  <div class="relative">
    <p class="text-lg font-black tracking-tight text-white">
      build<span style="color:#ff5b1f;">letter</span>
    </p>
    <h3 class="mt-3 text-xl sm:text-2xl font-black tracking-tight text-white">
      Prowadzisz małą firmę?
    </h3>
    <p class="mt-2 max-w-lg text-sm sm:text-base leading-relaxed text-zinc-400">
      Ten blog to mój poligon — SEO i marketing testuję tu na sobie, na własne pieniądze.
      To samo robię dla małych firm: widoczność w Google, audyty, reklamy.
    </p>
    <a
      href={ctaUrl}
      target="_blank"
      rel="noopener"
      class="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-lg text-sm font-bold text-black transition-transform hover:scale-[1.03]"
      style="background:#ff5b1f;"
    >
      Zobacz, jak pracuję →
    </a>
  </div>
</aside>

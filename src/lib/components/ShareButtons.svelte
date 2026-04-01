<script>
  import { twitter } from '$lib/info'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { Link, ClipboardDocumentCheck } from '@steeze-ui/heroicons'

  let { title, url } = $props()
  let copied = $state(false)

  const shareLinks = $derived([
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      bg: 'hover:bg-[#0A66C2] hover:text-white'
    },
    {
      name: 'X (Twitter)',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}${twitter ? `&via=${twitter}` : ''}`,
      bg: 'hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white'
    }
  ])

  function copyToClipboard() {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(url)
      copied = true
      setTimeout(() => (copied = false), 2000)
    }
  }
</script>

<div class="flex flex-col gap-4">
  <span class="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-600 block sm:text-right">
    Udostępnij wpis
  </span>
  
  <div class="flex flex-wrap items-center justify-start sm:justify-end gap-2">
    {#each shareLinks as link}
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center px-4 py-2 text-xs font-bold text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl transition-all duration-200 {link.bg} hover:border-transparent hover:shadow-lg active:scale-95"
      >
        {link.name}
      </a>
    {/each}

    <button
      onclick={copyToClipboard}
      class="group inline-flex items-center gap-2 px-4 py-2 text-xs font-bold transition-all duration-200 border rounded-xl active:scale-95
        {copied 
          ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-600 dark:text-green-400' 
          : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-indigo-500 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-lg'}"
      aria-label="Kopiuj link"
    >
      {#if copied}
        <Icon src={ClipboardDocumentCheck} class="w-4 h-4" />
        <span>Skopiowano!</span>
      {:else}
        <Icon src={Link} class="w-4 h-4 text-zinc-400 group-hover:text-indigo-500" />
        <span>Link</span>
      {/if}
    </button>
  </div>
</div>

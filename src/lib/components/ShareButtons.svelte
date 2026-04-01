<script>
  import { twitter } from '$lib/info'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { Link, ClipboardCheck } from '@steeze-ui/heroicons'
  import { onMount } from 'svelte'

  let { title, url } = $props()
  let copied = $state(false)

  const shareLinks = $derived([
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: 'hover:text-[#0A66C2]'
    },
    {
      name: 'X (Twitter)',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}${twitter ? `&via=${twitter}` : ''}`,
      color: 'hover:text-black dark:hover:text-white'
    }
  ])

  function copyToClipboard() {
    navigator.clipboard.writeText(url)
    copied = true
    setTimeout(() => (copied = false), 2000)
  }
</script>

<div class="flex items-center gap-6">
  <span class="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-600">Udostępnij</span>
  
  <div class="flex items-center gap-4">
    {#each shareLinks as link}
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        class="text-xs font-bold text-zinc-500 transition-colors {link.color}"
      >
        {link.name}
      </a>
    {/each}

    <button
      onclick={copyToClipboard}
      class="group flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-indigo-600 transition-colors"
      aria-label="Kopiuj link"
    >
      {#if copied}
        <Icon src={ClipboardCheck} class="w-4 h-4 text-green-500" />
        <span class="text-green-500">Skopiowano!</span>
      {:else}
        <Icon src={Link} class="w-4 h-4" />
        <span>Link</span>
      {/if}
    </button>
  </div>
</div>

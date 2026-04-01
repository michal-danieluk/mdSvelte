<script>
  import { onMount } from 'svelte'
  import { MagnifyingGlass, XMark } from '@steeze-ui/heroicons'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { fade, fly } from 'svelte/transition'
  import { browser } from '$app/environment'

  let isOpen = $state(false)
  let query = $state('')
  let posts = $state([])
  let filteredPosts = $derived(
    query.length > 1
      ? posts.filter(post => 
          post.title.toLowerCase().includes(query.toLowerCase()) || 
          post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        ).slice(0, 5)
      : []
  )

  onMount(async () => {
    const res = await fetch('/api/posts.json')
    posts = await res.json()
  })

  function toggleSearch() {
    isOpen = !isOpen
    if (isOpen) {
      setTimeout(() => document.getElementById('search-input')?.focus(), 50)
    } else {
      query = ''
    }
  }

  function handleKeydown(e) {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      toggleSearch()
    }
    if (e.key === 'Escape' && isOpen) {
      toggleSearch()
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- Search Toggle Button -->
<button
  type="button"
  aria-label="Szukaj wpisów"
  class="group flex items-center gap-3 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
  onclick={toggleSearch}
>
  <Icon src={MagnifyingGlass} class="w-4 h-4" />
  <span class="text-xs font-bold uppercase tracking-widest hidden sm:block">Szukaj...</span>
  <kbd class="hidden lg:inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-[10px] font-black text-zinc-400">
    <span class="text-xs">⌘</span>K
  </kbd>
</button>

{#if isOpen}
  <!-- Modal Overlay -->
  <div 
    class="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 sm:pt-32"
    transition:fade={{ duration: 200 }}
  >
    <div 
      class="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm" 
      onclick={toggleSearch}
      onkeydown={toggleSearch}
      role="button"
      tabindex="0"
    ></div>

    <!-- Search Dialog -->
    <div 
      class="relative w-full max-w-xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl shadow-indigo-500/20 border border-zinc-200 dark:border-zinc-800 overflow-hidden"
      transition:fly={{ y: -20, duration: 300 }}
    >
      <div class="flex items-center p-4 border-b border-zinc-100 dark:border-zinc-800">
        <Icon src={MagnifyingGlass} class="w-5 h-5 text-indigo-500 mr-3" />
        <input
          id="search-input"
          type="text"
          bind:value={query}
          placeholder="Czego szukasz? (wpisz min. 2 znaki)"
          class="flex-grow bg-transparent border-none focus:ring-0 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 font-medium"
          autocomplete="off"
        />
        <button 
          class="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
          onclick={toggleSearch}
        >
          <Icon src={XMark} class="w-5 h-5 text-zinc-400" />
        </button>
      </div>

      <div class="max-h-[60vh] overflow-y-auto p-2">
        {#if query.length > 1}
          {#if filteredPosts.length > 0}
            <div class="p-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              Wyniki wyszukiwania ({filteredPosts.length})
            </div>
            <div class="grid gap-1 mt-1">
              {#each filteredPosts as post}
                <a 
                  href="/post/{post.slug}" 
                  class="flex flex-col p-4 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 group transition-all"
                  onclick={toggleSearch}
                >
                  <span class="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-1">{post.date}</span>
                  <span class="text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {post.title}
                  </span>
                </a>
              {/each}
            </div>
          {:else}
            <div class="p-8 text-center text-zinc-500 dark:text-zinc-500">
              <p class="text-sm font-bold">Nic nie znaleźliśmy...</p>
              <p class="text-xs mt-1">Spróbuj wpisać inne hasło lub tag.</p>
            </div>
          {/if}
        {:else}
          <div class="p-12 text-center text-zinc-400 dark:text-zinc-600">
            <p class="text-xs font-bold uppercase tracking-widest">Wpisz minimum 2 znaki...</p>
          </div>
        {/if}
      </div>

      <div class="p-4 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-1.5">
            <kbd class="px-1.5 py-0.5 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[10px] font-black text-zinc-500">ESC</kbd>
            <span class="text-[10px] font-bold text-zinc-400 uppercase tracking-tight">Zamknij</span>
          </div>
        </div>
        <span class="text-[10px] font-black text-indigo-500/50 uppercase tracking-widest">MD.BLOG Search v1</span>
      </div>
    </div>
  </div>
{/if}

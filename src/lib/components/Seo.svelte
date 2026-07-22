<script>
  import { page } from '$app/stores'
  import { website, name } from '$lib/info.js'

  /**
   * @type {{
   *   title?: string,
   *   description?: string,
   *   type?: string,
   *   image?: string | null,
   *   keywords?: string | string[],
   *   robots?: string
   * }}
   */
  let {
    title = name,
    description = '',
    type = 'website',
    image = null,
    keywords = [],
    robots = ''
  } = $props()

  /** @param {string | string[]} value */
  function normalizeKeywords(value) {
    const seen = new Set()

    return (Array.isArray(value) ? value : [value])
      .flatMap((keyword) => keyword.split(','))
      .map((keyword) => keyword.trim())
      .filter((keyword) => {
        const normalizedKeyword = keyword.toLocaleLowerCase('pl-PL')

        if (!keyword || seen.has(normalizedKeyword)) return false

        seen.add(normalizedKeyword)
        return true
      })
      .slice(0, 10)
  }

  const canonicalUrl = `${website}${$page.url.pathname}`
  const ogImage = image || `${website}/api/og?title=${encodeURIComponent(title)}`
  // meta tag content shouldn't contain raw newlines, even if the source text does
  const metaDescription = description.replace(/\s+/g, ' ').trim()
  const metaKeywords = $derived(normalizeKeywords(keywords).join(', '))
</script>

<svelte:head>
  <title>{title}</title>
  {#if metaDescription}
    <meta name="description" content={metaDescription} />
  {/if}
  {#if metaKeywords}
    <meta name="keywords" content={metaKeywords} />
  {/if}
  {#if robots}
    <meta name="robots" content={robots} />
  {/if}
  <link rel="canonical" href={canonicalUrl} />

  <!-- Facebook Meta Tags -->
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:type" content={type} />
  <meta property="og:title" content={title} />
  {#if metaDescription}
    <meta property="og:description" content={metaDescription} />
  {/if}
  <meta property="og:image" content={ogImage} />
  <meta property="og:site_name" content={name} />
  <meta property="og:locale" content="pl_PL" />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@michaldanieluk" />
  <meta name="twitter:creator" content="@michaldanieluk" />
  <meta property="twitter:domain" content={website.replace('https://', '')} />
  <meta property="twitter:url" content={canonicalUrl} />
  <meta name="twitter:title" content={title} />
  {#if metaDescription}
    <meta name="twitter:description" content={metaDescription} />
  {/if}
  <meta name="twitter:image" content={ogImage} />
</svelte:head>

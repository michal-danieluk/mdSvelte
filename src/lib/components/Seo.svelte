<script>
  import { page } from '$app/stores'
  import { website, name } from '$lib/info.js'

  let { title = name, description = '', type = 'website', image = null } = $props()

  const canonicalUrl = `${website}${$page.url.pathname}`
  const ogImage = image || `${website}/api/og?title=${encodeURIComponent(title)}`
  // meta tag content shouldn't contain raw newlines, even if the source text does
  const metaDescription = description.replace(/\s+/g, ' ').trim()
</script>

<svelte:head>
  <title>{title}</title>
  {#if metaDescription}
    <meta name="description" content={metaDescription} />
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

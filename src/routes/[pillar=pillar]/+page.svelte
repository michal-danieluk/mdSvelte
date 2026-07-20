<script>
  import PillarPage from '$lib/components/PillarPage.svelte'

  let { data } = $props()
</script>

<PillarPage pillar={data.pillar} articles={data.articles} />

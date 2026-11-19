<script lang="ts">
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  let movie = $derived(data.movie);
</script>

<svelte:head>
  <title>{movie.title}</title>

  {#if movie.overview}
    <meta name="description" content={movie.overview} />
  {/if}
</svelte:head>

{movie.id}
<h1>{movie.title}</h1>
<p>{movie.overview}</p>

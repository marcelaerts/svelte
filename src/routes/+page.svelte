<script lang="ts">
  import { Hero } from '#lib/components/Hero/index.ts';
  import { MediaRow } from '#lib/components/MediaRow/index.ts';
  import { SITE_NAME } from '#lib/constants.ts';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

<svelte:head>
  <title>{SITE_NAME}</title>
</svelte:head>

<main class="min-h-screen">
  <h1 class="sr-only">{SITE_NAME}</h1>

  {#if data.heroMovie}
    <Hero label="Trending deze week" movie={data.heroMovie} />
  {/if}

  <section class="grid grid-cols-1 gap-10 px-6 py-8 md:px-12">
    <MediaRow title="Trending deze week" items={data.trendingMovies} />
    <MediaRow title="Populair" items={data.popularMovies} />
    <MediaRow title="Best beoordeeld" items={data.topRatedMovies} />
    <MediaRow title="Populaire series" items={data.popularSeries} />
  </section>
</main>

<script lang="ts">
  import { Header } from '#lib/components/Header/index.js';
  import { Hero } from '#lib/components/Hero/index.js';
  import { MovieRow } from '#lib/components/MovieRow/index.js';
  import { SITE_NAME } from '#lib/constants.ts';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

<svelte:head>
  <title>{SITE_NAME}</title>
</svelte:head>

<Header />
<main class="min-h-screen overflow-x-clip bg-background text-foreground">
  <h1 class="sr-only">{SITE_NAME}</h1>

  {#if data.heroMovie}
    <Hero label="Trending deze week" movie={data.heroMovie} />
  {/if}

  <section class="grid grid-cols-1 gap-10 px-6 py-8 md:px-12">
    <MovieRow title="Trending deze week" movies={data.trending} />
    <MovieRow title="Populair" movies={data.popular} />
    <MovieRow title="Best beoordeeld" movies={data.topRated} />
  </section>
</main>

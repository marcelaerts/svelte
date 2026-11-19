<script lang="ts">
  import { Hero } from '#lib/components/Hero/index.js';
  import { MovieRow } from '#lib/components/MovieRow/index.js';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

<main class="min-h-screen overflow-x-clip bg-background text-foreground">
  <header class="border-b border-border px-6 py-4">
    <h1 class="text-2xl font-bold tracking-tight text-primary">Mijn Netflix</h1>
  </header>

  {#if data.heroMovie}
    <Hero label="Trending deze week" movie={data.heroMovie} />
  {/if}

  <section class="grid grid-cols-1 gap-10 px-6 py-8">
    <MovieRow title="Trending deze week" movies={data.trending} />
    <MovieRow title="Populair" movies={data.popular} />
    <MovieRow title="Best beoordeeld" movies={data.topRated} />
  </section>
</main>

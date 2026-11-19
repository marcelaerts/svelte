<script lang="ts">
  import type { PageProps } from './$types';
  import { MovieRow } from '#lib/components/MovieRow/index.js';

  let { data }: PageProps = $props();
</script>

<main class="min-h-screen bg-neutral-950 text-neutral-100">
  <header class="border-b border-neutral-800 px-6 py-4">
    <h1 class="text-2xl font-bold tracking-tight text-red-600">Mijn Netflix</h1>
  </header>

  <section class="grid grid-cols-1 gap-10 px-6 py-8">
    <MovieRow title="Trending deze week" movies={data.trending} />
    <MovieRow title="Populair" movies={data.popular} />
    <MovieRow title="Best beoordeeld" movies={data.topRated} />
  </section>
</main>

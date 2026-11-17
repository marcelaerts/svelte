<script lang="ts">
  import type { PageProps } from './$types';
  import { MovieCard } from '#lib/components/MovieCard/index.js';

  let { data }: PageProps = $props();
</script>

<main class="min-h-screen bg-neutral-950 text-neutral-100">
  <header class="border-b border-neutral-800 px-6 py-4">
    <h1 class="text-2xl font-bold tracking-tight text-red-600">Mijn Netflix</h1>
  </header>

  <section class="mx-auto max-w-7xl px-6 py-8">
    <h2 class="mb-4 text-xl font-semibold">Populair</h2>

    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {#each data.movies as movie (movie.id)}
        <MovieCard {movie} />
      {/each}
    </div>
  </section>
</main>

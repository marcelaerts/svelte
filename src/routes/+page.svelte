<script lang="ts">
  import { MovieCard } from '#lib/components/MovieCard/index.js';

  const movies = [
    {
      id: 1,
      title: 'Dumb and Dumber',
      rating: 5
    },
    {
      id: 2,
      title: 'Dumb and Dumber To',
      rating: 1
    },
    {
      id: 3,
      title: 'Ace Ventura: Pet Detective',
      rating: 5
    },
    {
      id: 4,
      title: 'Ace Ventura: When Nature Calls',
      rating: 5
    }
  ];
</script>

<main class="min-h-screen bg-neutral-950 text-neutral-100">
  <header class="border-b border-neutral-800 px-6 py-4">
    <h1 class="text-2xl font-bold tracking-tight text-red-600">Mijn Netflix</h1>
  </header>

  <section class="mx-auto max-w-7xl px-6 py-8">
    <h2 class="mb-4 text-xl font-semibold">Populair</h2>

    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {#each movies as movie (movie.id)}
        <MovieCard {...movie} />
      {/each}
    </div>
  </section>
</main>

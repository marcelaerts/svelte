<script lang="ts">
  import type { PageProps } from './$types';
  import * as Carousel from '#lib/components/ui/carousel/index.js';
  import { MovieCard } from '#lib/components/MovieCard/index.js';

  let { data }: PageProps = $props();
</script>

<main class="min-h-screen overflow-x-clip bg-neutral-950 text-neutral-100">
  <header class="border-b border-neutral-800 px-6 py-4">
    <h1 class="text-2xl font-bold tracking-tight text-red-600">Mijn Netflix</h1>
  </header>

  <section class="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-8">
    <Carousel.Root>
      <div class="mb-4 flex items-center justify-between gap-4">
        <h2 class="text-xl font-semibold">Trending deze week</h2>
        <div class="flex gap-2">
          <Carousel.Previous class="static" />
          <Carousel.Next class="static" />
        </div>
      </div>

      <Carousel.Content>
        {#each data.trending as movie (movie.id)}
          <Carousel.Item class="basis-1/2 md:basis-1/3 lg:basis-1/5">
            <MovieCard {movie} />
          </Carousel.Item>
        {/each}
      </Carousel.Content>
    </Carousel.Root>
    <Carousel.Root>
      <div class="mb-4 flex items-center justify-between gap-4">
        <h2 class="text-xl font-semibold">Populair</h2>
        <div class="flex gap-2">
          <Carousel.Previous class="static" />
          <Carousel.Next class="static" />
        </div>
      </div>

      <Carousel.Content>
        {#each data.popular as movie (movie.id)}
          <Carousel.Item class="basis-1/2 md:basis-1/3 lg:basis-1/5">
            <MovieCard {movie} />
          </Carousel.Item>
        {/each}
      </Carousel.Content>
    </Carousel.Root>
    <Carousel.Root>
      <div class="mb-4 flex items-center justify-between gap-4">
        <h2 class="text-xl font-semibold">Best beoordeeld</h2>
        <div class="flex gap-2">
          <Carousel.Previous class="static" />
          <Carousel.Next class="static" />
        </div>
      </div>

      <Carousel.Content>
        {#each data.topRated as movie (movie.id)}
          <Carousel.Item class="basis-1/2 md:basis-1/3 lg:basis-1/5">
            <MovieCard {movie} />
          </Carousel.Item>
        {/each}
      </Carousel.Content>
    </Carousel.Root>
  </section>
</main>

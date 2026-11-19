<script lang="ts">
  import * as Carousel from '#lib/components/ui/carousel/index.js';
  import { MovieCard } from '#lib/components/MovieCard/index.js';
  import type { Movie } from '#lib/types.ts';

  interface Props {
    movies: Movie[];
    title: string;
  }

  let { movies, title }: Props = $props();
</script>

<Carousel.Root
  opts={{
    align: 'start',
    loop: true,
    slidesToScroll: 'auto'
  }}
>
  <div class="mb-4 flex items-center justify-between gap-4">
    <h2 class="text-xl font-semibold">{title}</h2>
    <div class="flex gap-2">
      <Carousel.Previous class="static" />
      <Carousel.Next class="static" />
    </div>
  </div>

  <Carousel.Content>
    {#each movies as movie (movie.id)}
      <Carousel.Item class="basis-1/2 md:basis-1/3 lg:basis-1/5 xl:basis-1/7">
        <MovieCard {movie} />
      </Carousel.Item>
    {/each}
  </Carousel.Content>
</Carousel.Root>

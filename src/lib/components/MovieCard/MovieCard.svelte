<script lang="ts">
  import { fade } from 'svelte/transition';
  import { resolve } from '$app/paths';
  import { imageUrl } from '#lib/helpers/tmdb-images.ts';
  import type { Movie } from '#lib/types.ts';
  import { cn } from '#lib/utils.js';

  interface Props {
    movie: Movie;
  }
  let { movie }: Props = $props();

  const uid = $props.id();
  let posterUrl = $derived(imageUrl({ path: movie.poster_path }));
  let roundedRating = $derived(Number(movie.vote_average.toFixed(1)));
  let ratingClass = $derived.by(() => {
    if (roundedRating >= 7) {
      return cn('bg-green-500/15 text-green-400 ring-green-500/30');
    }
    if (roundedRating >= 5) {
      return cn('bg-orange-500/15 text-orange-400 ring-orange-500/30');
    }
    return cn('bg-red-500/15 text-red-400 ring-red-500/30');
  });
  let showDescription = $state(false);

  function toggleDescription() {
    showDescription = !showDescription;
  }
</script>

<article
  class="group relative overflow-hidden rounded-lg bg-card text-card-foreground ring-1 ring-border transition hover:scale-105 has-focus-visible:scale-105"
>
  <div class="aspect-2/3 bg-muted">
    {#if posterUrl}
      <img
        src={posterUrl}
        alt="Poster van {movie.title}"
        class="h-full w-full object-cover"
        loading="lazy"
      />
    {:else}
      <p
        class="flex h-full items-center justify-center p-4 text-center text-sm text-muted-foreground"
        aria-hidden="true"
      >
        {movie.title}
      </p>
    {/if}
  </div>

  <div class="flex flex-col gap-1 p-3">
    <h3 class="truncate font-semibold">{movie.title}</h3>
    <p
      class="{ratingClass} inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ring-1"
    >
      ⭐ {roundedRating}
    </p>
    {#if showDescription}
      <p
        transition:fade
        class="absolute inset-x-0 top-0 z-10 aspect-2/3 overflow-y-auto bg-background/90 p-3 pt-11 text-sm leading-relaxed text-foreground"
        id="{uid}-description"
      >
        {movie.overview}
      </p>
    {/if}
    <a
      href={resolve('/movie/[id]', { id: String(movie.id) })}
      class="mt-2 block truncate rounded-md bg-foreground/10 px-3 py-1.5 text-center text-sm font-semibold text-foreground transition group-hover:bg-primary group-hover:text-primary-foreground after:absolute after:inset-0 after:rounded-lg focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-primary"
    >
      Bekijk {movie.title}
    </a>
  </div>

  {#if movie.overview}
    <button
      aria-controls="{uid}-description"
      aria-expanded={showDescription}
      aria-label="Meer info over {movie.title}"
      class="absolute top-2 right-2 z-10 inline-flex size-7 cursor-pointer items-center justify-center rounded-full bg-background/70 text-sm font-semibold text-foreground backdrop-blur-sm transition hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none active:scale-95"
      onclick={toggleDescription}
      type="button"
    >
      <span aria-hidden="true">i</span>
    </button>
  {/if}
</article>

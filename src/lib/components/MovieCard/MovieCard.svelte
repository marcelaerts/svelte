<script lang="ts">
  import { fade } from 'svelte/transition';
  import { imageUrl } from '#lib/helpers/tmdb-images.ts';
  import type { Movie } from '#lib/types.ts';

  interface Props {
    movie: Movie;
  }
  let { movie }: Props = $props();

  const uid = $props.id();
  let posterUrl = $derived(imageUrl({ path: movie.poster_path }));
  let roundedRating = $derived(Number(movie.vote_average.toFixed(1)));
  let ratingClass = $derived.by(() => {
    if (roundedRating >= 7) {
      return 'bg-green-500/15 text-green-400 ring-green-500/30';
    }
    if (roundedRating >= 5) {
      return 'bg-orange-500/15 text-orange-400 ring-orange-500/30';
    }
    return 'bg-red-500/15 text-red-400 ring-red-500/30';
  });
  let showDescription = $state(false);

  function toggleDescription() {
    showDescription = !showDescription;
  }
</script>

<article
  class="group relative overflow-hidden rounded-lg bg-card text-card-foreground ring-1 ring-border transition hover:scale-105"
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
    <button
      aria-controls="{uid}-description"
      aria-expanded={showDescription}
      class="mt-2 inline-flex items-center justify-center gap-1.5 rounded-md bg-foreground/10 px-3 py-1.5 text-sm font-semibold text-foreground transition hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none active:scale-95"
      onclick={toggleDescription}
      type="button"
    >
      ⓘ Meer info
    </button>

    {#if showDescription}
      <p
        transition:fade
        class="absolute inset-x-0 top-0 aspect-2/3 overflow-y-auto bg-background/90 p-3 text-sm leading-relaxed text-foreground"
        id="{uid}-description"
      >
        {movie.overview}
      </p>
    {/if}
  </div>
</article>

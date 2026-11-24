<script lang="ts">
  import { resolve } from '$app/paths';
  import { imageUrl } from '#lib/helpers/tmdb-images.ts';
  import type { Movie } from '#lib/types.ts';

  interface Props {
    label: string;
    movie: Movie;
  }

  let { label, movie }: Props = $props();
  let backdropUrl = $derived(imageUrl({ path: movie.backdrop_path, size: 'w1280' }));
</script>

<section class="relative h-[70vh] min-h-105 w-full overflow-hidden">
  {#if backdropUrl}
    <img src={backdropUrl} alt="" class="absolute inset-0 h-full w-full object-cover" />
  {:else}
    <div class="absolute inset-0 bg-linear-to-br from-muted to-card"></div>
  {/if}

  <div
    class="absolute inset-0 bg-linear-to-r from-background/90 via-background/40 to-transparent"
  ></div>
  <div class="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent"></div>

  <div
    class="relative flex h-full max-w-2xl flex-col justify-end gap-4 px-6 pb-12 md:px-12 md:pb-16"
  >
    <p class="text-sm font-semibold tracking-widest text-primary uppercase">{label}</p>
    <h2 class="text-4xl font-bold tracking-tight md:text-6xl">{movie.title}</h2>
    <p class="line-clamp-3 text-base text-foreground/90 md:text-lg">{movie.overview}</p>
    <div class="flex gap-3">
      <a
        href={resolve('/movie/[id]', { id: String(movie.id) })}
        class="inline-flex items-center gap-2 rounded-md bg-foreground/20 px-5 py-2.5 font-semibold text-foreground backdrop-blur-sm transition hover:bg-foreground/30 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none active:scale-95"
      >
        Bekijk {movie.title}
      </a>
    </div>
  </div>
</section>

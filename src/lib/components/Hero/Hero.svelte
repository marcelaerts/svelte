<script lang="ts">
  import type { Movie } from '#lib/types.ts';
  import { imageUrl } from '#lib/helpers/tmdb-images.ts';

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
    <div class="absolute inset-0 bg-linear-to-br from-neutral-800 to-neutral-900"></div>
  {/if}

  <div
    class="absolute inset-0 bg-linear-to-r from-neutral-950/90 via-neutral-950/40 to-transparent"
  ></div>
  <div
    class="absolute inset-0 bg-linear-to-t from-neutral-950 via-transparent to-transparent"
  ></div>

  <div class="relative flex h-full max-w-2xl flex-col justify-end gap-4 px-6 pb-12 md:pb-16">
    <p class="text-sm font-semibold tracking-widest text-red-600 uppercase">{label}</p>
    <h2 class="text-4xl font-bold tracking-tight md:text-6xl">{movie.title}</h2>
    <p class="line-clamp-3 text-base text-neutral-200 md:text-lg">{movie.overview}</p>
    <div class="flex gap-3">
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-md bg-white/20 px-5 py-2.5 font-semibold text-white backdrop-blur-sm transition hover:bg-white/30 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none active:scale-95"
      >
        ⓘ Meer info
      </button>
    </div>
  </div>
</section>

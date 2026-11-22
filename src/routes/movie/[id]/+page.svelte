<script lang="ts">
  import PlayIcon from '@lucide/svelte/icons/play';
  import { resolve } from '$app/paths';
  import { ActorCard } from '#lib/components/ActorCard/index.js';
  import { Rating } from '#lib/components/Rating/index.js';
  import { Badge } from '#lib/components/ui/badge/index.js';
  import * as Dialog from '#lib/components/ui/dialog/index.js';
  import { imageUrl } from '#lib/helpers/tmdb-images.ts';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  let movie = $derived(data.movie);
  let backdropUrl = $derived(imageUrl({ path: movie.backdrop_path, size: 'w1280' }));
  let posterUrl = $derived(imageUrl({ path: movie.poster_path, size: 'w500' }));

  function toHoursAndMinutes(totalMinutes: number) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours === 0) {
      return `${minutes}m`;
    }
    if (minutes === 0) {
      return `${hours}u`;
    }
    return `${hours}u ${minutes}m`;
  }

  let actors = $derived(movie.credits.cast.slice(0, 10));
  let videos = $derived(movie.videos.results);
  let trailer = $derived(videos.find(({ site, type }) => site === 'YouTube' && type === 'Trailer'));
</script>

{#snippet trailerDialog(videoKey: string)}
  <Dialog.Content
    class="gap-0 overflow-hidden bg-black px-3 pt-14 pb-3 ring-foreground/15 sm:max-w-5xl sm:px-4 sm:pb-4"
  >
    <Dialog.Title class="sr-only">Trailer van {movie.title}</Dialog.Title>
    <div class="aspect-video w-full overflow-hidden rounded-md">
      <iframe
        src="https://www.youtube.com/embed/{videoKey}?autoplay=1"
        title="Trailer van {movie.title}"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        class="h-full w-full border-0"
      ></iframe>
    </div>
  </Dialog.Content>
{/snippet}

<svelte:head>
  <title>{movie.title}</title>

  {#if movie.overview}
    <meta name="description" content={movie.overview} />
  {/if}
</svelte:head>

<main class="min-h-screen overflow-x-clip bg-background text-foreground">
  <header class="flex items-center justify-between border-b border-border px-6 py-4 md:px-12">
    <a
      href={resolve('/')}
      class="rounded-md text-2xl font-bold tracking-tight text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
    >
      Mijn Netflix
    </a>
    <a
      href={resolve('/')}
      class="inline-flex items-center gap-2 rounded-md bg-foreground/10 px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-foreground/20 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none active:scale-95"
    >
      <span aria-hidden="true">←</span> Terug
    </a>
  </header>

  <section class="relative flex min-h-[65vh] w-full items-end overflow-hidden">
    {#if backdropUrl}
      <img
        src={backdropUrl}
        alt=""
        class="absolute inset-0 h-full w-full scale-105 object-cover object-top"
      />
    {:else}
      <div class="absolute inset-0 bg-linear-to-br from-muted to-card"></div>
    {/if}

    <div
      class="absolute inset-0 bg-linear-to-r from-background via-background/70 to-background/10"
    ></div>
    <div
      class="absolute inset-0 bg-linear-to-t from-background via-background/30 to-transparent"
    ></div>

    <div
      class="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 pt-24 pb-12 md:flex-row md:items-end md:gap-16 md:px-12 md:pb-36 lg:gap-24"
    >
      <div class="hidden shrink-0 md:block">
        <div class="relative">
          {#if posterUrl}
            <img
              src={posterUrl}
              alt=""
              aria-hidden="true"
              class="absolute top-full left-0 mt-4 aspect-2/3 w-full -scale-y-100 rounded-md mask-[linear-gradient(to_top,black,transparent_25%)] object-cover opacity-40 blur-[2px]"
            />
          {/if}

          <div
            class="relative aspect-2/3 w-64 overflow-hidden rounded-md bg-muted shadow-[0_40px_80px_-20px_rgb(0_0_0/0.95),0_20px_30px_-10px_rgb(0_0_0/0.7)] ring-1 ring-foreground/15 lg:w-80"
          >
            {#if posterUrl}
              <img
                src={posterUrl}
                alt="Poster van {movie.title}"
                class="h-full w-full object-cover"
              />
            {:else}
              <p
                class="flex h-full items-center justify-center p-4 text-center text-sm text-muted-foreground"
                aria-hidden="true"
              >
                {movie.title}
              </p>
            {/if}

            <div
              class="pointer-events-none absolute inset-0 bg-linear-to-tr from-transparent via-white/15 to-transparent opacity-60"
              aria-hidden="true"
            ></div>

            {#if trailer}
              <Dialog.Root>
                <Dialog.Trigger
                  class="group absolute inset-0 flex cursor-pointer items-center justify-center bg-black/0 transition hover:bg-black/40 focus-visible:bg-black/40 focus-visible:outline-none"
                  aria-label="Trailer van {movie.title} afspelen"
                >
                  <span
                    class="flex size-16 items-center justify-center rounded-full bg-background/70 text-foreground shadow-xl ring-1 ring-foreground/30 backdrop-blur-md transition group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground group-hover:ring-primary group-focus-visible:scale-110 group-focus-visible:bg-primary group-focus-visible:text-primary-foreground lg:size-20"
                  >
                    <PlayIcon class="ml-1 size-7 fill-current lg:size-9" />
                  </span>
                </Dialog.Trigger>

                {@render trailerDialog(trailer.key)}
              </Dialog.Root>
            {/if}
          </div>
        </div>
      </div>

      <div class="flex max-w-3xl flex-col gap-5">
        <h1
          class="text-4xl leading-[1.05] font-extrabold tracking-tight text-balance drop-shadow-lg md:text-6xl lg:text-7xl"
        >
          {movie.title}
        </h1>

        <ul
          class="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-medium text-foreground/80 md:text-base [&>li+li]:before:mr-3 [&>li+li]:before:text-foreground/40 [&>li+li]:before:content-['•']"
        >
          <li>
            <Rating class="px-2.5 text-sm" score={movie.vote_average} />
          </li>

          {#if movie.release_date}
            <li>{movie.release_date.slice(0, 4)}</li>
          {/if}

          {#if movie.runtime}
            <li>{toHoursAndMinutes(movie.runtime)}</li>
          {/if}
        </ul>

        <ul class="flex flex-wrap gap-2">
          {#each movie.genres as genre (genre.id)}
            <li>
              <Badge
                variant="outline"
                class="h-7 border-foreground/25 bg-background/30 px-3 text-sm text-foreground backdrop-blur-sm"
              >
                {genre.name}
              </Badge>
            </li>
          {/each}
        </ul>

        {#if movie.overview}
          <p
            class="max-w-prose text-base leading-relaxed text-pretty text-foreground/85 md:text-lg"
          >
            {movie.overview}
          </p>
        {/if}

        {#if trailer}
          <Dialog.Root>
            <Dialog.Trigger
              class="inline-flex w-fit cursor-pointer items-center gap-2 rounded-md bg-foreground px-5 py-2.5 font-semibold text-background transition hover:bg-foreground/80 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none active:scale-95 md:hidden"
            >
              <PlayIcon class="size-5 fill-current" />
              Trailer afspelen
            </Dialog.Trigger>

            {@render trailerDialog(trailer.key)}
          </Dialog.Root>
        {/if}
      </div>
    </div>
  </section>

  <section class="mx-auto flex max-w-7xl flex-col gap-5 px-6 pt-4 pb-16 md:px-12">
    <h2 class="text-2xl font-bold tracking-tight md:text-3xl">Cast</h2>

    <ul class="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {#each actors as actor (actor.credit_id)}
        <li>
          <ActorCard {actor} />
        </li>
      {/each}
    </ul>
  </section>
</main>

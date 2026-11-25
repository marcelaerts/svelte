<script lang="ts">
  import PlayIcon from '@lucide/svelte/icons/play';
  import { ActorCard } from '#lib/components/ActorCard/index.ts';
  import { Rating } from '#lib/components/Rating/index.ts';
  import { Badge } from '#lib/components/ui/badge/index.ts';
  import * as Dialog from '#lib/components/ui/dialog/index.ts';
  import { SITE_NAME } from '#lib/constants.ts';
  import { imageUrl } from '#lib/helpers/tmdb-images.ts';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  let serie = $derived(data.serie);
  let backdropUrl = $derived(imageUrl({ path: serie.backdrop_path, size: 'w1280' }));
  let posterUrl = $derived(imageUrl({ path: serie.poster_path, size: 'w500' }));
  let actors = $derived(serie.credits.cast.slice(0, 10));
  let trailer = $derived(
    serie.videos.results.find(({ site, type }) => site === 'YouTube' && type === 'Trailer')
  );
</script>

{#snippet trailerDialog(videoKey: string)}
  <Dialog.Content
    class="gap-0 overflow-hidden bg-black px-3 pt-14 pb-3 ring-foreground/15 sm:max-w-5xl sm:px-4 sm:pb-4"
  >
    <Dialog.Title class="sr-only">Trailer van {serie.name}</Dialog.Title>
    <div class="aspect-video w-full overflow-hidden rounded-md">
      <iframe
        src="https://www.youtube.com/embed/{videoKey}?autoplay=1"
        title="Trailer van {serie.name}"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        class="h-full w-full border-0"
      ></iframe>
    </div>
  </Dialog.Content>
{/snippet}

<svelte:head>
  <title>{serie.name} · {SITE_NAME}</title>

  {#if serie.overview}
    <meta name="description" content={serie.overview} />
  {/if}
</svelte:head>

<main class="min-h-screen">
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
                alt="Poster van {serie.name}"
                class="h-full w-full object-cover"
              />
            {:else}
              <p
                class="flex h-full items-center justify-center p-4 text-center text-sm text-muted-foreground"
                aria-hidden="true"
              >
                {serie.name}
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
                  aria-label="Trailer van {serie.name} afspelen"
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
          {serie.name}
        </h1>

        <ul
          class="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-medium text-foreground/80 md:text-base [&>li+li]:before:mr-3 [&>li+li]:before:text-foreground/40 [&>li+li]:before:content-['•']"
        >
          <li>
            <Rating class="px-2.5 text-sm" score={serie.vote_average} />
          </li>

          {#if serie.first_air_date}
            <li>{serie.first_air_date.slice(0, 4)}</li>
          {/if}

          {#if serie.number_of_seasons}
            <li>
              {serie.number_of_seasons}
              {serie.number_of_seasons === 1 ? 'seizoen' : 'seizoenen'}
            </li>
          {/if}
        </ul>

        <ul class="flex flex-wrap gap-2">
          {#each serie.genres as genre (genre.id)}
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

        {#if serie.overview}
          <p
            class="max-w-prose text-base leading-relaxed text-pretty text-foreground/85 md:text-lg"
          >
            {serie.overview}
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

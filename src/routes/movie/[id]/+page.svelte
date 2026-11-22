<script lang="ts">
  import { resolve } from '$app/paths';
  import { Rating } from '#lib/components/Rating/index.js';
  import { Badge } from '#lib/components/ui/badge/index.js';
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
</script>

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

  <section class="relative flex min-h-[80vh] w-full items-end overflow-hidden">
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
      class="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 pt-24 pb-12 md:flex-row md:items-end md:gap-16 md:px-12 md:pb-48 lg:gap-24"
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
      </div>
    </div>
  </section>
</main>

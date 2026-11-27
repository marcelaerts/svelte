<script lang="ts">
  import SearchXIcon from '@lucide/svelte/icons/search-x';
  import { MediaCard } from '#lib/components/MediaCard/index.ts';
  import { SITE_NAME } from '#lib/constants.ts';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

<svelte:head>
  <title>Zoeken · {SITE_NAME}</title>
</svelte:head>

<main class="min-h-screen">
  <section class="grid grid-cols-1 gap-10 px-6 py-8 md:px-12">
    <h1 class="text-3xl font-bold tracking-tight md:text-4xl">
      {#if data.searchValue}
        <span class="text-muted-foreground">Resultaten voor</span>
        <span class="text-primary">“{data.searchValue}”</span>
      {:else}
        Waar ben je naar op zoek?
      {/if}
    </h1>
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
      {#each data.results as result (`${result.type}+${result.id}`)}
        <MediaCard item={result} />
      {:else}
        {#if data.searchValue}
          <div
            class="col-span-full flex flex-col items-center gap-3 rounded-lg border border-dashed border-border px-6 py-16 text-center"
          >
            <SearchXIcon class="size-10 text-muted-foreground" aria-hidden="true" />
            <p class="text-lg font-semibold">Geen resultaten gevonden</p>
            <p class="text-sm text-muted-foreground">
              Controleer de spelling of probeer een andere zoekterm.
            </p>
          </div>
        {/if}
      {/each}
    </div>
  </section>
</main>

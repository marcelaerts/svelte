<script lang="ts">
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
        Resultaten voor {data.searchValue}
      {:else}
        Waar ben je naar op zoek?
      {/if}
    </h1>
  </section>
</main>

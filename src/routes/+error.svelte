<script lang="ts">
  import { resolve } from '$app/paths';
  import type { ErrorProps } from './$types';

  let { error }: ErrorProps = $props();
  let isNotFound = $derived(error.status === 404);
  let description = $derived(
    isNotFound
      ? 'Sorry, deze pagina kunnen we niet vinden. Op de homepage is genoeg te ontdekken.'
      : 'Er ging iets mis bij het laden. Probeer het later opnieuw.'
  );
  let heading = $derived(isNotFound ? 'Verdwaald?' : 'Oeps!');
</script>

<svelte:head>
  <title>{heading} · Mijn Netflix</title>
</svelte:head>

<main class="relative flex min-h-screen flex-col overflow-hidden bg-background text-foreground">
  <div
    class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklch,var(--color-primary)_30%,transparent),transparent_60%)]"
    aria-hidden="true"
  ></div>
  <div
    class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgb(0_0_0/0.8),transparent_70%)]"
    aria-hidden="true"
  ></div>

  <header class="relative px-6 py-5 md:px-12">
    <a
      href={resolve('/')}
      class="rounded-md text-2xl font-bold tracking-tight text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
    >
      Mijn Netflix
    </a>
  </header>

  <section
    class="relative flex flex-1 flex-col items-center justify-center gap-6 px-6 pb-24 text-center"
  >
    <h1 class="text-5xl font-extrabold tracking-tight text-balance drop-shadow-lg md:text-7xl">
      {heading}
    </h1>

    <p class="max-w-xl text-lg text-pretty text-foreground/80 md:text-2xl">
      {description}
    </p>

    <a
      href={resolve('/')}
      class="mt-2 inline-flex items-center gap-2 rounded-md bg-foreground px-6 py-3 text-lg font-semibold text-background transition hover:bg-foreground/80 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none active:scale-95"
    >
      Terug naar home
    </a>

    <p
      class="mt-8 border-l-2 border-primary pl-3 text-left text-sm tracking-wide text-muted-foreground uppercase"
    >
      Foutcode: <span class="font-semibold text-foreground/90 normal-case">{error.status}</span>
    </p>
  </section>
</main>

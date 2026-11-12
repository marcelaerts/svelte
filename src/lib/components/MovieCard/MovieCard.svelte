<script lang="ts">
  import { fade } from 'svelte/transition';

  const uid = $props.id();

  interface Props {
    description: string;
    rating: number;
    title: string;
  }
  let { description, rating, title }: Props = $props();

  let showDescription = $state(false);

  function toggleDescription() {
    showDescription = !showDescription;
  }
</script>

<article
  class="group relative overflow-hidden rounded-lg bg-neutral-900 ring-1 ring-neutral-800 transition hover:scale-105 hover:ring-red-600"
>
  <div class="aspect-2/3 bg-neutral-800"></div>

  <div class="flex flex-col gap-1 p-3">
    <h3 class="truncate font-semibold">{title}</h3>
    <p class="text-sm text-neutral-400">⭐ {rating}</p>
    <button
      aria-controls="{uid}-description"
      aria-expanded={showDescription}
      class="mt-2 inline-flex items-center justify-center gap-1.5 rounded-md bg-white/10 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-red-600 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none active:scale-95"
      onclick={toggleDescription}
      type="button"
    >
      ⓘ Meer info
    </button>

    {#if showDescription}
      <p
        transition:fade
        class="absolute inset-x-0 top-0 aspect-2/3 overflow-y-auto bg-black/85 p-3 text-sm leading-relaxed text-neutral-200"
        id="{uid}-description"
      >
        {description}
      </p>
    {/if}
  </div>
</article>

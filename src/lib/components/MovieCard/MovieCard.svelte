<script lang="ts">
  import { fade } from 'svelte/transition';

  interface Props {
    description: string;
    rating: number;
    title: string;
  }
  let { description, rating, title }: Props = $props();

  const uid = $props.id();
  let showDescription = $state(false);
  let ratingClass = $derived.by(() => {
    const roundedRating = Number(rating.toFixed(1));
    if (roundedRating >= 7) {
      return 'bg-green-500/15 text-green-400 ring-green-500/30';
    }
    if (roundedRating >= 5) {
      return 'bg-orange-500/15 text-orange-400 ring-orange-500/30';
    }
    return 'bg-red-500/15 text-red-400 ring-red-500/30';
  });

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
    <p
      class="{ratingClass} inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ring-1"
    >
      ⭐ {rating.toFixed(1)}
    </p>
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

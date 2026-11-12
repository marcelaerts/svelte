<script lang="ts">
  interface Props {
    title: string;
    rating: number;
  }
  let { title, rating }: Props = $props();
</script>

<article
  class="group overflow-hidden rounded-lg bg-neutral-900 ring-1 ring-neutral-800 transition hover:scale-105 hover:ring-red-600"
>
  <div class="aspect-2/3 bg-neutral-800"></div>

  <div class="flex flex-col gap-1 p-3">
    <h3 class="truncate font-semibold">{title}</h3>
    <p class="text-sm text-neutral-400">⭐ {rating}</p>
  </div>
</article>
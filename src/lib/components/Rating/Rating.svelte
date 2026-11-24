<script lang="ts">
  import { cn } from '#lib/utils.ts';

  interface Props {
    class?: string;
    score: number;
  }

  let { class: className, score }: Props = $props();
  let rounded = $derived(Number(score.toFixed(1)));
  let colorClass = $derived.by(() => {
    if (rounded >= 7) {
      return cn('bg-green-500/15 text-green-400 ring-green-500/30');
    }
    if (rounded >= 5) {
      return cn('bg-orange-500/15 text-orange-400 ring-orange-500/30');
    }
    return cn('bg-red-500/15 text-red-400 ring-red-500/30');
  });
</script>

<span
  class={cn(
    'inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ring-1',
    colorClass,
    className
  )}
>
  <span aria-hidden="true">⭐ {rounded}</span>
  <span class="sr-only">Score {rounded} van 10</span>
</span>

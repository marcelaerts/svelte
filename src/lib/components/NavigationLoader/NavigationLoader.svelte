<script lang="ts">
  import { navigating } from '$app/state';
  import { Spinner } from '#lib/components/ui/spinner/index.ts';

  let isVisible = $state(false);

  $effect(() => {
    if (!navigating.to) {
      isVisible = false;
      return;
    }

    const timeout = setTimeout(() => {
      isVisible = true;
    }, 200);

    return () => {
      clearTimeout(timeout);
    };
  });
</script>

<div role="status">
  {#if isVisible}
    <div class="fixed inset-0 z-50 grid place-items-center bg-background/60 backdrop-blur-sm">
      <Spinner class="size-8 text-primary" aria-hidden="true" />
      <div class="sr-only">Laden...</div>
    </div>
  {/if}
</div>

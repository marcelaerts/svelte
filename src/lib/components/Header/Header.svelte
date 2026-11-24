<script lang="ts">
  import type { Snippet } from 'svelte';
  import { resolve } from '$app/paths';
  import { SITE_NAME } from '#lib/constants.ts';

  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();
</script>

<header
  class="relative flex h-16 items-center justify-between border-b border-border px-6 md:px-12"
>
  <a
    href={resolve('/')}
    class="rounded-md text-2xl font-bold tracking-tight text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
  >
    {SITE_NAME}
  </a>
  {@render children?.()}
</header>

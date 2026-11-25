<script lang="ts">
  import './layout.css';
  import favicon from '#lib/assets/favicon.svg';
  import { Header } from '#lib/components/Header/index.ts';
  import { NavigationLoader } from '#lib/components/NavigationLoader/index.ts';
  import type { LayoutProps } from './$types';

  let { children }: LayoutProps = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<Header />
<NavigationLoader />

<div class="overflow-x-clip">
  {@render children()}
</div>

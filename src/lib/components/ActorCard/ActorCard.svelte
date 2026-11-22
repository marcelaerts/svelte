<script lang="ts">
  import { imageUrl } from '#lib/helpers/tmdb-images.ts';
  import type { MovieActor } from '#lib/types.ts';

  interface Props {
    actor: MovieActor;
  }
  let { actor }: Props = $props();
  let profileUrl = $derived(imageUrl({ path: actor.profile_path }));
</script>

<article class="flex flex-col gap-2">
  <div
    class="relative aspect-2/3 overflow-hidden rounded-md bg-muted shadow-lg ring-1 shadow-black/40 ring-foreground/10"
  >
    {#if profileUrl}
      <img src={profileUrl} alt="" class="absolute inset-0 h-full w-full object-cover" />
    {:else}
      <div
        class="flex h-full items-center justify-center text-5xl text-muted-foreground/40"
        aria-hidden="true"
      >
        👤
      </div>
    {/if}
  </div>

  <div class="flex flex-col">
    <h3 class="truncate text-sm font-semibold md:text-base">{actor.name}</h3>
    <p class="line-clamp-2 text-xs text-muted-foreground md:text-sm">
      {actor.character}
    </p>
  </div>
</article>

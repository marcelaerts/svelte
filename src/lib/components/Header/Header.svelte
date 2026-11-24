<script lang="ts">
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import { SITE_NAME } from '#lib/constants.ts';
  import { cn } from '#lib/utils.ts';

  const navLinkClass = cn(
    'relative block rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap text-foreground/70 transition hover:bg-foreground/10 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none focus-visible:ring-inset aria-[current=page]:font-semibold aria-[current=page]:text-foreground aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-3 aria-[current=page]:after:bottom-0 aria-[current=page]:after:h-0.5 aria-[current=page]:after:rounded-full aria-[current=page]:after:bg-primary md:text-base'
  );

  const NAV_LINKS = [
    { href: '/', name: 'Home' },
    { href: '/movies', name: 'Films' },
    { href: '/series', name: 'Series' },
    { href: '/my-list', name: 'Mijn lijst' }
  ] as const;
</script>

<header
  class="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-6 backdrop-blur-md md:gap-10 md:px-12"
>
  <a
    href={resolve('/')}
    class="shrink-0 rounded-md text-xl font-bold tracking-tight text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none md:text-2xl"
  >
    {SITE_NAME}
  </a>
  <nav class="min-w-0 flex-1 scrollbar-none overflow-x-auto">
    <ul class="flex items-center gap-1 md:gap-2">
      {#each NAV_LINKS as link (link.href)}
        <li>
          <a
            href={resolve(link.href)}
            class={navLinkClass}
            aria-current={page.url.pathname === link.href ? 'page' : undefined}>{link.name}</a
          >
        </li>
      {/each}
    </ul>
  </nav>
</header>

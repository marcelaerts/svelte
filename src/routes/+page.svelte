<script lang="ts">
  import { MovieCard } from '#lib/components/MovieCard/index.js';

  const movies = [
    {
      id: 1,
      description:
        'Twee goedhartige maar onnozele vrienden reizen dwars door Amerika om een koffer terug te brengen naar een mooie vrouw, zonder te weten dat er losgeld in zit.',
      rating: 5,
      title: 'Dumb and Dumber'
    },
    {
      id: 2,
      description:
        'Twintig jaar later gaan Harry en Lloyd op zoek naar een dochter waarvan Harry niet wist dat hij haar had, in de hoop dat zij een nier kan afstaan.',
      rating: 1,
      title: 'Dumb and Dumber To'
    },
    {
      id: 3,
      description:
        'Excentrieke dierendetective Ace Ventura moet de ontvoerde dolfijn van het footballteam van Miami terugvinden voordat de Super Bowl begint.',
      rating: 5,
      title: 'Ace Ventura: Pet Detective'
    },
    {
      id: 4,
      description:
        'Ace Ventura reist naar Afrika om een heilige witte vleermuis te vinden en zo een oorlog tussen twee stammen te voorkomen.',
      rating: 5,
      title: 'Ace Ventura: When Nature Calls'
    }
  ];
</script>

<main class="min-h-screen bg-neutral-950 text-neutral-100">
  <header class="border-b border-neutral-800 px-6 py-4">
    <h1 class="text-2xl font-bold tracking-tight text-red-600">Mijn Netflix</h1>
  </header>

  <section class="mx-auto max-w-7xl px-6 py-8">
    <h2 class="mb-4 text-xl font-semibold">Populair</h2>

    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {#each movies as movie (movie.id)}
        <MovieCard {...movie} />
      {/each}
    </div>
  </section>
</main>

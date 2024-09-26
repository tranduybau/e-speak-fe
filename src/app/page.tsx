/* eslint-disable @next/next/no-img-element */

import PokemonServices from '@/services/ssr/pokemon'

export default async function Home() {
  const pokemon = await PokemonServices.getPokemonById(3)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* {JSON.stringify(pokemon.name)} */}
      <h1>{pokemon.name}</h1>

      <img src={pokemon.sprites.front_default} alt="3" />
    </main>
  )
}

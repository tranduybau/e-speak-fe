import { notFound } from 'next/navigation'

import { APIResponsive } from '../type'

interface IPokemon {
  name: string
  sprites: {
    front_default: string
  }
}

const PokemonServices = {
  getPokemonById(id: string | number): Promise<IPokemon> {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then((res) => res.json())
      .catch(() => {
        // Tùy api, API về SEO (details bài viết) thì đánh not  found để redirect về trang not found
        notFound()
      })
  },
  getListPokemons(): Promise<APIResponsive<IPokemon[]>> {
    return (
      fetch(`https://pokeapi.co/api/v2/pokemon`)
        .then((res) => res.json())
        // Trường hợp không đá sang trang error thì trả về 1 object data trong catch, handle tại page
        .catch(() => ({
          data: [],
        }))
    )
  },
}

export default PokemonServices

import {useEffect, useState} from "react";
import {Card} from "../components/Card.tsx";
import {type Pokemon} from "../helpers/helper.ts";
import {Clickable} from "../components/Clickable.tsx";

type PokemonEntry = {
  entry_number: number;
  pokemon_species: {
    name: string;
    url: string;
  };
};

type Pokedex = {
  name: string;
  pokemon_entries: PokemonEntry[];
};

export function ResultPage({edition, typeFilter, team, setTeam}: { edition: string; typeFilter: string; team: Pokemon[]; setTeam: (team: Pokemon[]) => void }) {
  const BASE_URL = "https://pokeapi.co/api/v2"
  const [data, setData] = useState<Pokedex[] | null>(null);
  const [pokemonDetails, setPokemonDetails] = useState<Pokemon[] | null>(null);

  useEffect(() => {
    if (!edition) return;

    const pokedexes = getPokedexRegion(edition);

    if (!pokedexes || pokedexes.length === 0) {
      setData(null);
      setPokemonDetails(null);
      return;
    }

    Promise.all(
      pokedexes.map((dex) =>
        fetch(`${BASE_URL}/pokedex/${dex}`).then((res) => res.json())
      )
    )
      .then((results: Pokedex[]) => {
        setData(results);

        const pokemonNumberList = getPokemonNumberList(results);

        return Promise.all(
          pokemonNumberList.map((num) =>
            fetch(`${BASE_URL}/pokemon/${num}`).then((res) => res.json())
          )
        );
      })
      .then((detailResults) => {
        if (detailResults) {
          const pokemonList: Pokemon[] = []

          for (const result of detailResults) {
            pokemonList.push({
              name: result.name,
              typeOne: result.types[0].type.name,
              typeTwo: result.types[1]?.type.name,
              sprite: result.sprites.front_default,
            });
          }
          setPokemonDetails(pokemonList);
        }
      })
      .catch((err) => {
        console.error("API Fehler:", err);
        setData(null);
        setPokemonDetails(null);
      });
  }, [edition]);

  if (!data) return null;

  const togglePokemonInTeam = (pokemon: Pokemon) => {
    let exist = false;
    const teamCopy = [...team]

    for (const teamMember of team) {
      exist = teamMember.name === pokemon.name;

      if (exist) break;
    }

    if (!exist) {
      if (teamCopy.length < 6) {
        teamCopy.push(pokemon);
        setTeam(teamCopy);
      }
    } else {
      const updatedTeam = teamCopy.filter((member) => member.name !== pokemon.name);
      setTeam(updatedTeam);
    }
  }

  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4">
      {pokemonDetails && pokemonDetails.filter((pokemon) => !typeFilter || (pokemon.typeOne === typeFilter || (pokemon.typeTwo && pokemon.typeTwo === typeFilter))).map((pokemon: Pokemon) => (
        <Clickable key={pokemon.name} onClick={() => togglePokemonInTeam(pokemon)}>
          <Card pokemon={pokemon} variant="lg" inTeam={team.filter((member) => member.name === pokemon.name).length > 0} />
        </Clickable>
      ))}
    </div>
  );
}

function getPokedexRegion(edition: string) {
  const GAME_TO_POKEDEX: Record<string, string[]> = {
    all: ["kanto", "original-johto", "hoenn", "original-sinnoh", "extended-sinnoh", "updated-johto", "original-unova", "updated-unova", "kalos-central", "kalos-coastal", "kalos-mountain", "updated-hoenn", "original-alola", "original-melemele", "original-akala", "original-ulaula", "original-poni", "updated-alola"],
    red: ["kanto"],
    blue: ["kanto"],
    yellow: ["kanto"],
    firered: ["kanto"],
    leafgreen: ["kanto"],
    gold: ["original-johto"],
    silver: ["original-johto"],
    crystal: ["original-johto"],
    ruby: ["hoenn"],
    sapphire: ["hoenn"],
    emerald: ["hoenn"],
    diamond: ["original-sinnoh"],
    pearl: ["original-sinnoh"],
    platinum: ["extended-sinnoh"],
    heartgold: ["updated-johto"],
    soulsilver: ["updated-johto"],
    black: ["original-unova"],
    white: ["original-unova"],
    black2: ["updated-unova"],
    white2: ["updated-unova"],
    x: ["kalos-central", "kalos-coastal", "kalos-mountain"],
    y: ["kalos-central", "kalos-coastal", "kalos-mountain"],
    omega_ruby: ["updated-hoenn"],
    alpha_sapphire: ["updated-hoenn"],
    sun: ["original-alola", "original-melemele", "original-akala", "original-ulaula", "original-poni"],
    moon: ["original-alola", "original-melemele", "original-akala", "original-ulaula", "original-poni"],
    ultra_sun: ["updated-alola"],
    ultra_moon: ["updated-alola"],
  };
  return GAME_TO_POKEDEX[edition]
}

function getPokemonNumberList(data: Pokedex[] | null): string[] {
  if (!data) return [];

  const seen = new Set<string>();
  const pokemonNumberList: string[] = [];

  for (const dex of data) {
    for (const entry of dex.pokemon_entries) {
      const url = entry.pokemon_species.url;
      const parts = url.split("/").filter(Boolean);
      const pokemonNumber = parts[parts.length - 1];

      if (!seen.has(pokemonNumber)) {
        seen.add(pokemonNumber);
        pokemonNumberList.push(pokemonNumber);
      }
    }
  }

  return pokemonNumberList;
}
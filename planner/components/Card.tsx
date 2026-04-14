import {capitalize, type Pokemon, TYPE_TO_COLOR} from "../helpers/helper.ts";
import {XIcon} from "lucide-react";

export function Card({pokemon, variant, inTeam}: { pokemon: Pokemon; variant: "lg" | "md" | "sm"; inTeam?: boolean; }) {
  return (
    <>
      {variant === "lg" && <LargeCard pokemon={pokemon} inTeam={inTeam} />}
      {variant === "md" && <MiddleCard pokemon={pokemon} />}
      {variant === "sm" && <SmallCard pokemon={pokemon} />}
    </>
  )
}

function LargeCard({ pokemon, inTeam }: { pokemon: Pokemon; inTeam?: boolean }) {
  return (
    <div className={`border-2 rounded-[13px] ${inTeam ? "border-green-500 shadow-md shadow-green-500" : "border-blue-100"}`}>
      <div className={`flex flex-col justify-center items-center gap-2 p-2 border rounded-xl ${inTeam ? "border-green-500" : ""}`}>
        <img src={pokemon.sprite} alt={pokemon.name} width={96} height={96} />
        <p>{capitalize(pokemon.name)}</p>
        <TypePairs pokemon={pokemon} variant="default" />
      </div>
    </div>
  )
}

function MiddleCard ({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div className={`flex flex-col justify-center items-center gap-2 p-2 border rounded-xl`}>
      <img src={pokemon.sprite} alt={pokemon.name} width={48} height={48} />
      <p>{capitalize(pokemon.name)}</p>
      <TypePairs pokemon={pokemon} variant="sm" />
    </div>
  )
}

function SmallCard ({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div className={`flex flex-col justify-center items-center gap-2 p-2 border rounded-xl`}>
      <div className="w-full h-0 flex justify-end">
        <XIcon className="w-5 h-5" />
      </div>
      <img src={pokemon.sprite} alt={pokemon.name} width={48} height={48} />
      <TypePairs pokemon={pokemon} variant="sm" />
    </div>
  )
}

function TypePairs({ pokemon, variant }: { pokemon: Pokemon; variant: "default" | "sm" }) {
  if (!pokemon.typeOne) return null;

  return (
    <div className="w-full flex gap-1">
      <TypeShell className={`${pokemon.typeTwo ? "rounded-l-xl" : "rounded-xl"} ${TYPE_TO_COLOR[pokemon.typeOne]}`}>
        {variant === "sm" ? SHORT_TYPE[pokemon.typeOne] : capitalize(pokemon.typeOne)}
      </TypeShell>

      {pokemon.typeTwo &&
          <TypeShell className={`rounded-r-xl ${TYPE_TO_COLOR[pokemon.typeTwo]}`}>
            {variant === "sm" ? SHORT_TYPE[pokemon.typeTwo] : capitalize(pokemon.typeTwo)}
          </TypeShell>
      }
    </div>
  )
}

function TypeShell({children, className}: {children: React.ReactNode; className?: string; }) {
  return (
    <span className={`w-full px-2 py-1 border text-xs text-center text-white ${className}`}>
      {children}
    </span>
  )
}

const SHORT_TYPE: Record<string, string> = {
  normal: "NRM",
  fighting: "FGT",
  flying: "FLY",
  poison: "PSN",
  ground: "GRD",
  rock: "RCK",
  bug: "BUG",
  ghost: "GHO",
  steel: "STL",
  fire: "FIR",
  water: "WTR",
  grass: "GRS",
  electric: "ELC",
  psychic: "PSY",
  ice: "ICE",
  dragon: "DRG",
  dark: "DRK",
  fairy: "FAY",
};

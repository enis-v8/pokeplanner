import {type Pokemon} from "../helpers/helper.ts";
import {Card} from "./Card.tsx";
import {Clickable} from "./Clickable.tsx";

export function TeamTable({team, setTeam, editable, variant}: {team: Pokemon[]; setTeam?: (team: Pokemon[]) => void; editable: boolean, variant: "lg" | "md" | "sm";}) {
  const removePokemonFromTeam = (pokemon: Pokemon) => {
    if (editable) {
      const updatedTeam = [...team].filter((teamMember) => teamMember.name !== pokemon.name);
      setTeam ? setTeam(updatedTeam) : null;
    }
  }

  if (team.length === 0) {
    return null;
  }

  const layout = team.length < 3 ? "h-full flex justify-center items-center" : "grid grid-cols-3 md:grid-cols-6"

  return (
    <div className={`w-full gap-4 ${layout}`}>
      {team.map((pokemon) => (
        <Clickable key={pokemon.name} onClick={() => removePokemonFromTeam(pokemon)} className={team.length < 3 ? "flex-1 max-w-1/3" : ""}>
          <Card pokemon={pokemon} variant={variant} />
        </Clickable>
      ))}
    </div>
  )
}


import {capitalize, type Pokemon} from "../helpers/helper.ts";
import type {ChangeEvent} from "react";
import {TeamTable} from "./TeamTable.tsx";

export function Header({ page, edition, typeFilter, setTypeFilter, team }: { page: string; edition: string; typeFilter: string; setTypeFilter: (typeFilter: string) => void; team: Pokemon[] }) {
  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setTypeFilter(event.target.value);
  }

	return (
		<header className="relative z-10 w-full flex justify-center items-center border-b shadow-md shadow-gray-500">
      <div className="max-w-[1280px] w-full flex flex-col justify-center items-center gap-4 p-4">
        <h1 className="text-center text-2xl font-bold">{getHeading(page, edition)}</h1>
        {page === "RESULT" && (
          <select name="typeSelect" id="typeSelect" className="w-full border rounded-xl px-4 py-2 hover:cursor-pointer" value={typeFilter} onChange={(e) => handleFilterChange(e)}>
            <option value="">All Types</option>
            <option value="normal">Normal</option>
            <option value="fighting">Fighting</option>
            <option value="flying">Flying</option>
            <option value="poison">Poison</option>
            <option value="ground">Ground</option>
            <option value="rock">Rock</option>
            <option value="bug">Bug</option>
            <option value="ghost">Ghost</option>
            <option value="steel">Steel</option>
            <option value="fire">Fire</option>
            <option value="water">Water</option>
            <option value="grass">Grass</option>
            <option value="electric">Electric</option>
            <option value="psychic">Psychic</option>
            <option value="ice">Ice</option>
            <option value="dragon">Dragon</option>
            <option value="dark">Dark</option>
            <option value="fairy">Fairy</option>
          </select>
        )}
        {page === "ANALYZE" && (
          <TeamTable team={team} editable={false} variant="md" />
        )}
      </div>
		</header>
	);
}

function getHeading(page: string, edition: string | undefined) {
  const HEADING: Record<string, string> = {
    SEARCH: "Choose a Pokémon Edition",
    RESULT: `Choose Pokémon from ${edition ? capitalize(edition) : "chosen"} Edition`,
    ANALYZE: "Team Analysis",
    SAVE: "Screenshot or Copy"
  }

  return HEADING[page];
}

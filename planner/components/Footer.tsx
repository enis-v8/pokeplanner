import {Button} from "./Button.tsx";
import {capitalize, type Pokemon} from "../helpers/helper.ts";
import {TeamTable} from "./TeamTable.tsx";
import {SymbolLegend} from "./SymbolLegend.tsx";
import {AccordeonElement} from "./AccordeonElement.tsx";

export function Footer({page, setPage, team, setTeam}: {page: string; setPage: (page: string) => void; team: Pokemon[]; setTeam?: (team: Pokemon[]) => void}) {
  const prevPage = getPrevPage(page)
  const nextPage = getNextPage(page)

  if (page === "SEARCH") {
    return null;
  }

  return (
    <footer className="relative z-10 w-full flex justify-center items-center border-t shadow-md shadow-gray-500">
      <div className="max-w-[1280px] w-full flex flex-col justify-center items-center gap-4 p-4">
        {page === "RESULT" && (
          <AccordeonElement heading={`Team ( ${team.length} / 6 )`} >
            <TeamTable team={team} setTeam={setTeam} editable={true} variant="sm" />
          </AccordeonElement>
        )}
        {page === "ANALYZE" && (
          <SymbolLegend />
        )}

        <div className="w-full flex justify-center items-center gap-4">
          <Button variant="secondary" onClick={() => setPage(prevPage)}>Back</Button>
          {page !== "ANALYZE" && <Button variant={team.length > 0 ? "primary" : "primary_disabled"} onClick={
            page === "SAVE"
              ? () => {
                navigator.clipboard.writeText(getTeamAsText(team));
                alert("Copied to clipboard!");
              }
              : () => setPage(nextPage)
          }>{getPrimaryButtonLabel(page)}</Button>}
        </div>
      </div>
    </footer>
  )
}

function getPrevPage(page: string) {
  switch (page) {
    case "ANALYZE": return "RESULT";
    case "SAVE": return "ANALYZE";
    default: return "SEARCH";
  }
}

function getNextPage(page: string) {
  switch (page) {
    case "RESULT": return "ANALYZE";
    case "ANALYZE": return "SAVE";
    default: return "SEARCH";
  }
}

function getPrimaryButtonLabel(page: string) {
  switch (page) {
    case "RESULT": return "Analyze";
    case "ANALYZE": return "Save Team";
    case "SAVE": return "Copy as Text";
    default: return null;
  }
}

function getTeamAsText(team: Pokemon[]) {
  let teamAsText = "";

  for (const member of team) {
    teamAsText = `${teamAsText}${teamAsText === "" ? "" : "\n"}• ${capitalize(member.name)} { ${capitalize(member.typeOne)}${member.typeTwo ? ` / ${capitalize(member.typeTwo)}` : ""} }`;
  }
  return teamAsText;
}
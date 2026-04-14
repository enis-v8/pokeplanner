import {type Pokemon} from "../helpers/helper.ts";
import {TeamTable} from "../components/TeamTable.tsx";

export default function SavePage({team}: {team: Pokemon[];}) {
  return (
    <div className="h-full flex justify-center items-center p-4">
      <TeamTable team={team} editable={false} variant="md" />
    </div>
  );
}
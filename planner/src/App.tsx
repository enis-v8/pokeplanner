import './App.css'
import {useState} from "react";
import SearchPage from "../pages/SearchPage.tsx";
import {ResultPage} from "../pages/ResultPage.tsx";
import AnalysisPage from "../pages/AnalysisPage.tsx";
import type {Pokemon} from "../helpers/helper.ts";
import SavePage from "../pages/SavePage.tsx";
import {Header} from "../components/Header.tsx";
import {Footer} from "../components/Footer.tsx";

export default function App() {
  const [page, setPage] = useState("SEARCH")
  const [edition, setEdition] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [team, setTeam] = useState<Pokemon[]>([])

  if (page === "SEARCH" && team.length > 0) {
    setTeam([]);
  }

  return (
    <div className="h-[100dvh] flex flex-col items-center">
      <Header page={page} edition={edition} typeFilter={typeFilter} setTypeFilter={setTypeFilter} team={team} />

      <main className="flex-1 w-full flex justify-center bg-blue-100 dark:bg-gray-900 overflow-y-auto">
        <div className="max-w-[1280px] w-full">
          {page === "SEARCH" && (<SearchPage setPage={setPage} edition={edition} setEdition={setEdition} />)}
          {page === "RESULT" && (<ResultPage edition={edition} typeFilter={typeFilter} team={team} setTeam={setTeam} />)}
          {page === "ANALYZE" && (<AnalysisPage team={team} />)}
          {page === "SAVE" && (<SavePage team={team} />)}
        </div>
      </main>


      <Footer page={page} setPage={setPage} team={team} setTeam={setTeam} />
    </div>
  )
}

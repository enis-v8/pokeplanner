import {capitalize, type Pokemon, TYPE_TO_COLOR} from "../helpers/helper.ts";
import {ArrowDown, ArrowUp, Minus} from "../components/CustomIcons.tsx";

export default function AnalysisPage({team}: {team: Pokemon[];}) {
  const pokemonTypes = getPokemonTypes();

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4 w-full xl:w-[1280px] xl:mx-auto">
      {pokemonTypes.map((pokemonType) => (
        <TypeCard key={pokemonType} pokemonType={pokemonType} team={team} />
      ))}
    </div>
  )
}

function TypeCard({pokemonType, team}: {pokemonType: string; team: Pokemon[]}) {
  const layout = team.length < 3 ? "flex justify-center gap-1" : "grid grid-cols-3 md:grid-cols-6 gap-1";

  return (
    <div className="flex flex-col items-center border rounded-2xl p-2">
      <img src={`/assets/${pokemonType}_icon.png`} alt={pokemonType} className={`${TYPE_TO_COLOR[pokemonType]} rounded-full p-1 mb-2 hidden md:block`} />
      <p className={`w-full text-center rounded-lg px-2 py-1 mb-2 m-0 ${TYPE_TO_COLOR[pokemonType]} xl:bg-transparent`}>{capitalize(pokemonType)}</p>
      <div className={layout  }>
        {team.map((teamMember, index) => (
          <span key={index}>
            {analyzeType(pokemonType, teamMember) < 1 ? <ArrowUp /> : null}
            {analyzeType(pokemonType, teamMember) === 1 ? <Minus /> : null}
            {analyzeType(pokemonType, teamMember) > 1 ? <ArrowDown /> : null}
          </span>
        ))}
      </div>
    </div>
  )
}



function analyzeType(type: string, pokemon: Pokemon) {
  const typeVector = getTypeAnalysis(type);
  const analysisTypeOne = typeVector[getPokemonTypes().indexOf(pokemon.typeOne)]
  const analysisTypeTwo = pokemon.typeTwo ? typeVector[getPokemonTypes().indexOf(pokemon.typeTwo)] : 1.
  return analysisTypeOne * analysisTypeTwo;
}

function getPokemonTypes() {
  return [
    "normal",
    "fighting",
    "flying",
    "poison",
    "ground",
    "rock",
    "bug",
    "ghost",
    "steel",
    "fire",
    "water",
    "grass",
    "electric",
    "psychic",
    "ice",
    "dragon",
    "dark",
    "fairy",
  ]
}

function getTypeAnalysis(type: string) {
  const TYPE_WEAKNESS_MATRIX: Record<string, number[]> = {
    normal:     [1., 1., 1., 1., 1., .5, 1., 0., .5, 1., 1., 1., 1., 1., 1., 1., 1., 1.],
    fighting:   [2., 1., .5, .5, 1., 2., .5, 0., 2., 1., 1., 1., 1., .5, 2., 1., 2., .5],
    flying:     [1., 2., 1., 1., 1., .5, 2., 1., .5, 1., 1., 2., .5, 1., 1., 1., 1., 1.],
    poison:     [1., 1., 1., .5, .5, .5, 1., .5, 0., 1., 1., 2., 1., 1., 1., 1., 1., 2.],
    ground:     [1., 1., 0., 2., 1., 2., .5, 1., 2., 2., 1., .5, 2., 1., 1., 1., 1., 1.],
    rock:       [1., .5, 2., 1., .5, 1., 2., 1., .5, 2., 1., 1., 1., 1., 2., 1., 1., 1.],
    bug:        [1., .5, .5, .5, 1., 1., 1., .5, .5, .5, 1., 2., 1., 2., 1., 1., 2., .5],
    ghost:      [0., 1., 1., 1., 1., 1., 1., 2., 1., 1., 1., 1., 1., 2., 1., 1., .5, 1.],
    steel:      [1., 1., 1., 1., 1., 2., 1., 1., .5, .5, .5, 1., .5, 1., 2., 1., 1., 2.],
    fire:       [1., 1., 1., 1., 1., .5, 2., 1., 2., .5, .5, 2., 1., 1., 2., .5, 1., 1.],
    water:      [1., 1., 1., 1., 2., 2., 1., 1., 1., 2., .5, .5, 1., 1., 1., .5, 1., 1.],
    grass:      [1., 1., .5, .5, 2., 2., .5, 1., .5, .5, 2., .5, 1., 1., 1., .5, 1., 1.],
    electric:   [1., 1., 2., 1., 0., 1., 1., 1., 1., 1., 2., .5, .5, 1., 1., .5, 1., 1.],
    psychic:    [1., 2., 1., 2., 1., 1., 1., 1., .5, 1., 1., 1., 1., .5, 1., 1., 0., 1.],
    ice:        [1., 1., 2., 1., 2., 1., 1., 1., .5, .5, .5, 2., 1., 1., .5, 2., 1., 1.],
    dragon:     [1., 1., 1., 1., 1., 1., 1., 1., .5, 1., 1., 1., 1., 1., 1., 2., 1., 0.],
    dark:       [1., .5, 1., 1., 1., 1., 1., 2., 1., 1., 1., 1., 1., 2., 1., 1., .5, .5],
    fairy:      [1., 2., 1., .5, 1., 1., 1., 1., .5, .5, 1., 1., 1., 1., 1., 2., 2., 1.],
  };
  return TYPE_WEAKNESS_MATRIX[type];
}
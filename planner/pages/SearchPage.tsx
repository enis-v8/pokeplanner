import {Button} from "../components/Button.tsx";

export default function SearchPage({setPage, edition, setEdition}: {setPage: (page: string) => void; edition: string; setEdition: (search: string) => void;}) {
  const handleEditionChange = (chosenEdition: string) => {
    setEdition(chosenEdition);
    if (chosenEdition !== "") {
      setPage("RESULT");
    }
  }

  return (
    <form className="flex flex-col items-center gap-4 p-4">
      <select
        name="editionSelect"
        id="editionSelect"
        className="w-full px-4 py-2 border rounded-xl hover:cursor-pointer"
        value={edition}
        onChange={(e) => handleEditionChange(e.target.value)}>
        <option value="">-</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="yellow">Yellow</option>
        <option value="firered">Fire Red</option>
        <option value="leafgreen">Leaf Green</option>
        <option value="gold">Gold</option>
        <option value="silver">Silver</option>
        <option value="crystal">Crystal</option>
        <option value="ruby">Ruby</option>
        <option value="sapphire">Sapphire</option>
        <option value="emerald">Emerald</option>
        <option value="diamond">Diamond</option>
        <option value="pearl">Perl</option>
        <option value="platinum">Platinum</option>
        <option value="heartgold">Heart Gold</option>
        <option value="soulsilver">Soul Silver</option>
        <option value="black">Black</option>
        <option value="white">White</option>
        <option value="black2">Black 2</option>
        <option value="white2">White 2</option>
        <option value="x">X</option>
        <option value="y">Y</option>
        <option value="omega_ruby">Omega Ruby</option>
        <option value="alpha_sapphire">Alpha Sapphire</option>
        <option value="sun">Sun</option>
        <option value="moon">Moon</option>
        <option value="ultra_sun">Ultra Sun</option>
        <option value="ultra_moon">Ultra Moon</option>
      </select
      >
      <div className="max-w-3/5 w-full">
        <Button variant={edition === "" ? "primary_disabled" : "primary"} onClick={() => {
          if (edition !== "") {
            setPage("RESULT")
          }
        }}>Show Pokémon</Button>
      </div>
    </form>
  )
}
export type Pokemon = {
  name: string;
  typeOne: string;
  typeTwo: string | null;
  sprite: string;
}

export const TYPE_TO_COLOR: Record<string, string> = {
  normal: "bg-[#a8a89b] border-[#a8a89b]",
  fighting: "bg-[#9d5242] border-[#9d5242]",
  flying: "bg-[#91b4e1] border-[#91b4e1]",
  poison: "bg-[#7e4db2] border-[#7e4db2]",
  ground: "bg-[#8f6a3c] border-[#8f6a3c]",
  rock: "bg-[#a69a63] border-[#a69a63]",
  bug: "bg-[#8cac40] border-[#8cac40]",
  ghost: "bg-[#5e3e62] border-[#5e3e62]",
  steel: "bg-[#9999a7] border-[#9999a7]",
  fire: "bg-[#d34a2c] border-[#d34a2c]",
  water: "bg-[#4789c7] border-[#4789c7]",
  grass: "bg-[#6da75c] border-[#6da75c]",
  electric: "bg-[#f4c742] border-[#f4c742]",
  psychic: "bg-[#d56275] border-[#d56275]",
  ice: "bg-[#7cb8ac] border-[#7cb8ac]",
  dragon: "bg-[#5264a6] border-[#5264a6]",
  dark: "bg-[#453e3e] border-[#453e3e]",
  fairy: "bg-[#c984cb] border-[#c984cb]",
};

export function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
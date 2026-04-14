import {ArrowDown, ArrowUp, Minus} from "./CustomIcons.tsx";

export function SymbolLegend() {
  return (
    <div className="w-full flex justify-around pb-4">
      <span className="flex gap-1 justify-center items-center">
        <ArrowDown />
        <span className="text-center">Weakness</span>
      </span>

      <span className="flex gap-1 justify-center items-center">
        <Minus />
        <span className="text-center">Neutral</span>
      </span>

      <span className="flex gap-1 justify-center items-center">
        <ArrowUp />
        <span className="text-center">Resistance</span>
      </span>
    </div>
  )
}
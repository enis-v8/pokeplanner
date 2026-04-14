import {ArrowDownIcon, ArrowUpIcon} from "lucide-react";
import {MinusIcon} from "lucide-react";

export function ArrowDown() {
  return (
    <ArrowDownIcon className="p-0.5 bg-white border border-black dark:border-white rounded-full text-red-800" />
  )
}

export function ArrowUp() {
  return (
    <ArrowUpIcon className="p-0.5 bg-white border border-black dark:border-white rounded-full text-blue-800" />
  )
}

export function Minus() {
  return (
    <MinusIcon className="p-0.5 bg-white border border-black dark:border-white rounded-full text-black" />
  )
}
import type {ReactNode} from "react";

export function Button({ variant, onClick, children}: { variant: string; onClick?: () => void; children: ReactNode; }) {
  const buttonStyle: Record<string, string> = {
    primary: "bg-black dark:bg-white border text-white dark:text-black cursor-pointer",
    primary_disabled: "bg-gray-500 border border-gray-500",
    secondary: "border cursor-pointer",
  }

  return (
    <button type="button" onClick={onClick} className={`w-full px-4 py-2 rounded-xl ${buttonStyle[variant]}`}>
      {children}
    </button>
  )
}
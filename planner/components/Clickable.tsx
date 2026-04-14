import type {ReactNode} from "react";

export function Clickable({onClick, className, children}: { onClick: () => void; className?: string; children: ReactNode}) {
  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  )
}
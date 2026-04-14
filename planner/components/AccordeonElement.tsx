import {type ReactNode, useState} from "react";
import {ChevronDownIcon, ChevronUpIcon} from "lucide-react";

export function AccordeonElement({heading, children}: {heading: string; children: ReactNode}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="inline-flex flex-col-reverse items-stretch w-full">
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] mt-4" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          {children}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex justify-between items-center gap-2 border rounded-xl px-4 py-2 cursor-pointer`}
      >
        <span>{isOpen ? `Hide ${heading}` : `Show ${heading}`}</span>
        <span className="text-xs">{isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}</span>
      </button>
    </div>
  );
}
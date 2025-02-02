import React,{ useState } from "react";
import { ChevronDown } from "react-feather";
import {SortOption} from "../types";



type SortDropdownProps = {
   onSortChange: (value: string, order: "asc" | "desc") => void;
};

const SortDropdown: React.FC<SortDropdownProps> = ({ onSortChange }) => {
   const [selected, setSelected] = useState<string>("Sort By");
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const [order, setOrder] = useState<"asc" | "desc">("asc");

   const options: SortOption[] = [
      { label: "Name", value: "name" },
      { label: "Date", value: "added" },
   ];

   const handleSelect = (option: SortOption) => {
      const newOrder = order === "asc" ? "desc" : "asc";
      setSelected(`${option.label} (${newOrder.toUpperCase()})`);
      setOrder(newOrder);
      onSortChange(option.value, newOrder);
      setIsOpen(false);
   };

   return (
      <div className="relative">
         <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
         >
            {selected} <ChevronDown size={18} />
         </button>
         {isOpen && (
            <div className="absolute mt-2 w-40 bg-white border rounded-lg shadow-md">
               {options.map((option) => (
                  <button
                     key={option.value}
                     className="block w-full text-left px-4 py-2 transition hover:bg-gray-100"
                     onClick={() => handleSelect(option)}
                  >
                     {option.label}
                  </button>
               ))}
            </div>
         )}
      </div>
   );
};

export default SortDropdown;

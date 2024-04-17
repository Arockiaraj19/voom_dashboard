// Dropdown.tsx

import { FC, useEffect, useState } from 'react';

interface DropdownProps {
    heading:string,
    title: string,
    selected?:string,
    options: string[];
    onSelect: (selectedOption: string) => void;
}

const Dropdown: FC<DropdownProps> = ({ options, onSelect, title,heading,selected }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectOption = (option: string) => {
        setSelectedOption(option);
        onSelect(option);
        setIsOpen(false);
    };
useEffect(() => {
  if(selected){
    console.log("what is the selected");
    console.log(selected);
    handleSelectOption(selected);
  }

  
}, [])


    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

    const changeTextColor = () => {
      setIsOptionSelected(true);
    };
  

    return (
        <div className='w-full'>
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
       {heading}
      </label>

      <div className="relative z-20 bg-white dark:bg-form-input">
     

        <select
          value={selected!=null?selected: selectedOption}
          onChange={(e) => {
            handleSelectOption(e.target.value);
            changeTextColor();
          }}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-3 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
            isOptionSelected ? "text-black dark:text-white" : ""
          }`}
        >
          <option value="" disabled className="text-body dark:text-bodydark">
           {title}
          </option>
         {
            options.map((e,index)=>{
                return   <option key={index} value={e} className="text-body dark:text-bodydark">
               {e}
              </option>
            })
         }
        </select>

        <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                fill="#637381"
              ></path>
            </g>
          </svg>
        </span>
      </div>
    </div>
    );
};

export default Dropdown;

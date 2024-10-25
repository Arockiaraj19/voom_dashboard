"use client";
import { useState, useEffect, useRef, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { axiosPrivate } from "@/helper/axiosPrivate";
// Define the type for the user


const Index = ({  submit }: {  submit: (value: any | null) => void }) => {
  const [value, setValue] = useState<any | null>(null);
  const [query, setQuery] = useState<string>("");
  const [items, setItems] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchCourses = async () => {
    try {
      if (query.length === 0) {
        setItems([]);
        return;
      }
      const result = await axiosPrivate.get("/v1/user/all", {
        params: {
          offset: 0,
          limit: 30,
          type: "driver",
          status:'approved',
          name:query
      }
    });
    console.log("what is the result",result);
      setItems(result.data?.data ?? []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [query]);


  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    if (newQuery.length === 0) {
      setItems([]);
    } else {
      setValue(null);
    }
  };

  return (
    <Combobox
      value={value}
      onChange={(selectedValue: any | null) => {
        submit(selectedValue);
        setValue(selectedValue);
      }}
    >
      <div className="mb-4.5 flex w-full flex-col gap-6 xl:flex-row">
        <div className="relative mx-auto flex w-full flex-row items-center justify-center">
          <Combobox.Input
            ref={inputRef}
          
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            placeholder="Search user"
            maxLength={50}
            displayValue={(user:any) => user?.first_name??""}
            onChange={handleQueryChange}
          />
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Combobox.Options className="w-100 bg-white absolute z-50 mt-1 max-h-100 overflow-auto rounded-md bg-white text-base sm:text-sm">
            {items.length === 0 && query.length > 0 ? (
              <div className="text-gray-700 relative cursor-default select-none px-4 py-2">
                Nothing found.
              </div>
            ) : (
              items.map((user) => (
                <Combobox.Option key={user.courseId} value={user}>
                  {({ active }) => (
                    <div
                      className={`relative cursor-pointer py-4 pl-10 pr-4 ${
                       "text-gray-700"
                      }`}
                    >
                      {user.first_name}
                    </div>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};

export default Index;

"use client";
import { axiosPrivate } from "@/helper/axiosPrivate";
import useApi from "@/hooks/useApi";
import { Package } from "@/types/package";
import moment from "moment";
import { toast } from "react-toastify";
import Dropdown from "@/components/common/Dropdown";
import { useState } from "react";
import CancelAlertItemCard from "./cancel_card_item";

const CancelAlertComponent = ({ data }: { data: any }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Title
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Message
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Type
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Status
              </th>

              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Created date
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any, index: number) => (
              <CancelAlertItemCard item={item} key={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CancelAlertComponent;

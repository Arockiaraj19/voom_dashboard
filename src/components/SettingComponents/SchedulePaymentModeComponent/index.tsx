import DateOfBirth from "@/components/FormElements/DatePicker/DateOfBirth";
import SelectGender from "@/components/SelectGroup/SelectGender";
import SelectStatus from "@/components/SelectGroup/SelectStatus";
import Dropdown from "@/components/common/Dropdown";
import { axiosPrivate } from "@/helper/axiosPrivate";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

import { useParams, usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
const SchedulePaymentMode = ({ data }: { data: any }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setLoading] = useState(false);
  const submit = async (e: string) => {
    try {
      if (isLoading) {
        return;
      }
      setLoading(true);
      await axiosPrivate.put("/v1/schedule/payment", {
        user_id: data.user_id._id.toString(),
        schedule_id: data._id.toString(),
        payment_status: e,
      });

      toast.success(
        status == "approved"
          ? "Schedule approved successfully"
          : "Cash received successfully",
      );
      setLoading(false);
      router.back();
    } catch (error) {
      setLoading(false);
    }
  };
  const [status, setStatus] = useState(data?.status);
  return (
    <div className="col-span-5 xl:col-span-3">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="p-7">
          <label className=" block text-sm font-medium text-black dark:text-white">
            Total Payment
          </label>
          <p className="mb-3">{data?.payment ?? ""}</p>
          <label className=" block text-sm font-medium text-black dark:text-white">
            Notes
          </label>
          <p className="mb-3">{data?.note ?? ""}</p>
          <label className=" block text-sm font-medium text-black dark:text-white">
            Alies
          </label>
          <p className="mb-3">{data?.alias ?? ""}</p>
          <label className=" block text-sm font-medium text-black dark:text-white">
            Alies Number
          </label>
          <p className="mb-3">{data?.alias_number ?? ""}</p>
          <label className=" block text-sm font-medium text-black dark:text-white">
            Payment Status
          </label>
          <p className="mb-3">
            {" "}
            {data?.payment_status == "completed" ? "Paid" : "Un Paid"}
          </p>
          <label className=" block text-sm font-medium text-black dark:text-white">
            Appproval Status
          </label>
          <p className="mb-3">
            {" "}
            {data?.payment_status == "approved" ? "Approved" : "Un Approved"}
          </p>
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Transactions
          </label>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                  S No
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  Payment Mode
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                  Type
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                  Payment Status
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                  Payment
                </th>
              </tr>
            </thead>
            <tbody className="capitalize">
              {(data?.transactions ?? []).map((e: any, index: any) => {
                return (
                  <tr key={index}>
                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                      <p className="text-black dark:text-white">{index + 1}</p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black dark:text-white">{e.mode}</p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black dark:text-white">{e.type}</p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {e.payment_status}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black dark:text-white">{e.amount}</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {data?.payment_mode == "cash" && (
            <form action="#">
              <div className="m-5 flex w-full gap-10">
                {(data?.payment_status == "pending" ||
                  data?.payment_status == "completed") && (
                  <button
                    onClick={(e) => {
                      submit("approved");
                    }}
                    className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                    type="submit"
                  >
                    Approved
                  </button>
                )}
                {data?.payment_status != "completed" && (
                  <button
                    onClick={(e) => {
                      submit("completed");
                    }}
                    className="flex justify-center rounded bg-primary px-10 py-2 font-medium text-gray hover:bg-opacity-90"
                    type="submit"
                  >
                    Paid
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchedulePaymentMode;

import DateOfBirth from "@/components/FormElements/DatePicker/DateOfBirth"
import SelectGender from "@/components/SelectGroup/SelectGender"
import SelectStatus from "@/components/SelectGroup/SelectStatus"
import Dropdown from "@/components/common/Dropdown";
import { axiosPrivate } from "@/helper/axiosPrivate";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from 'yup';

import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import navigateToLink from "@/helper/navigateToLink";
const CarInformation = ({ data }: { data: any }) => {
    const router = useRouter();
    const pathname = usePathname();
    const submit = async () => {
        if (status == null) {
            return;
        }
        try {
            const result = await axiosPrivate.put(`/v1/driver_car/${data?.carDetails?._id}/approve`, {
                statusReason: "Good",
                status: status,
                
            });
            toast.success("Status updated successfully");
            router.refresh();
        } catch (error) {

        }
    }
    const [status, setStatus] = useState(data?.carDetails?.status);
    return <div className="w-full">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke flex justify-between px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    Car Information
                </h3>
                <h3 onClick={(e)=>{
                    window.location.href=`${pathname}/car_info`;
                }} className="cursor-pointer font-medium text-blue-600 dark:text-white">
                   Edit Images
                </h3>
            </div>
            <div className="w-full p-7 mb-5.5">
                <form className="w-full" action="#">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                                    Brand
                                </th>
                                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                    Color
                                </th>
                                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">

                                    Manufacturing Year
                                </th>
                                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">

                                    Model
                                </th>

                            </tr>
                        </thead>
                        <tbody>

                            <tr >
                                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                    <p className="text-black dark:text-white">
                                        {data?.carDetails?.brand?.name??"N/A"}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {data?.carDetails?.color}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {data?.carDetails?.manufacturing_year}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {data?.carDetails?.model?.name??"N/A"}
                                    </p>
                                </td>

                            </tr>

                        </tbody>
                    </table>
                    <div className="mb-20 flex gap-10">
                        {
                            (data?.carDetails?.images ?? []).map((e: any, index: number) => <div onClick={(event)=>{
                                navigateToLink(e);
                            }} key={e} className="h-12.5 w-15 rounded-md">
                                <Image
                                    src={e}
                                    width={60}
                                    height={50}
                                    alt={e}
                                />
                            </div>)
                        }
                    </div>
                    <div className="mb-5.5">
                        <Dropdown heading="Select Status" title="Select Status" onSelect={(e) => {
                            console.log("what is the onselect");
                            console.log(e);
                            setStatus(e);
                        }} options={['pending', 'approved', 'rejected']} selected={status} />
                    </div>





                    <div className="flex justify-end gap-4.5">

                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                submit()
                            }}
                            className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                            type="submit"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

}

export default CarInformation;
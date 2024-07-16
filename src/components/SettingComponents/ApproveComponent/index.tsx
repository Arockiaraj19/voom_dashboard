import DateOfBirth from "@/components/FormElements/DatePicker/DateOfBirth"
import SelectGender from "@/components/SelectGroup/SelectGender"
import SelectStatus from "@/components/SelectGroup/SelectStatus"
import Dropdown from "@/components/common/Dropdown";
import { axiosPrivate } from "@/helper/axiosPrivate";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from 'yup';

import { useParams, usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
const ApproveInformation = ({ data }: { data: any }) => {
    const router = useRouter();
    const pathname = usePathname();
    const submit = async () => {
        if (status == null) {
            return;
        }
        try {
            const result = await axiosPrivate.put("/v1/user/approve", {
                statusReason: status == 'rejected'?reason: "Good",
                status: status,
                userId: pathname.split("/")[(pathname.split("/").length - 1)]
            });
            toast.success("Status updated successfully");
            router.refresh();
        } catch (error) {

        }
    }
    const [status, setStatus] = useState(data?.status);
    const [reason, setReason] = useState(data?.status_reason??'');


    return <div className="col-span-5 xl:col-span-3">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

            <div className="p-7">


                <form action="#">

                    <div className="mb-5.5">
                        <Dropdown heading="Select Status" title="Select Status" onSelect={(e) => {
                            console.log("what is the onselect");
                            console.log(e);
                            setStatus(e);
                        }} options={['pending', 'approved', 'rejected']} selected={status} />
                    </div>

                    {
                        status == 'rejected' && <div className="mb-5.5">
                            <input
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                type="text"
                                placeholder="Please enter the reason for rejection"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                    }



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

export default ApproveInformation;
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
const DocumentInformation = ({ data }: { data: any }) => {
    const router = useRouter();
    const pathname = usePathname();
    const submit = async () => {
        if (status == null) {
            return;
        }
        try {
            const result = await axiosPrivate.put(`/v1/document/${data?.documents?._id}/approve`, {
                statusReason: "Good",
                status: status,

            });
            toast.success("Status updated successfully");
            router.refresh();
        } catch (error) {

        }
    }
    const [status, setStatus] = useState(data?.documents?.status);
    return <div className="w-full">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex justify-between border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    Document Information
                </h3>
                <h3 onClick={(e)=>{
                    window.location.href=`${pathname}/documents`;
                }} className="cursor-pointer font-medium text-blue-600 dark:text-white">
                   Edit
                </h3>
            </div>
            <div className="w-full p-7 mb-5.5">
                <form className="w-full" action="#">

                    <div className="w-full flex flex-row flex-wrap gap-5 mb-5.5">
                        <section className="flex flex-col items-center justify-center gap-2">
                        <p>ID card</p>
                            <div onClick={(event) => {
                                navigateToLink(data?.documents?.id_card?.frontSide);
                            }} className=" w-15 rounded-md">
                                <Image
                                    src={data?.documents?.id_card?.frontSide}
                                    width={60}
                                    height={50}
                                    alt={data?.documents?.id_card?.frontSide}
                                />
                            </div>
                            <p>{data?.documents?.id_card?.expiry}</p>
                        </section>

                        <section className="flex flex-col items-center justify-center gap-2">
                        <p>Driving license</p>
                            <div onClick={(event) => {
                                navigateToLink(data?.documents?.driving_license?.frontSide);
                            }} className=" w-15 rounded-md">
                                <Image
                                    src={data?.documents?.driving_license?.frontSide}
                                    width={60}
                                    height={50}
                                    alt={data?.documents?.driving_license?.frontSide}
                                />
                            </div>
                            <p>{data?.documents?.driving_license?.expiry}</p>
                        </section>


                        <section className="flex flex-col items-center justify-center gap-2">
                        <p>Car license</p>
                            <div onClick={(event) => {
                                navigateToLink(data?.documents?.car_license?.frontSide);
                            }} className=" w-15 rounded-md">
                                <Image
                                    src={data?.documents?.car_license?.frontSide}
                                    width={60}
                                    height={50}
                                    alt={data?.documents?.car_license?.frontSide}
                                />
                            </div>
                            <p>{data?.documents?.car_license?.expiry}</p>
                        </section>

                        <section className="flex flex-col items-center justify-center gap-2">
                        <p>Non Criminal Certificate</p>
                            <div onClick={(event) => {
                                navigateToLink(data?.documents?.non_criminal_certificate?.frontSide);
                            }} className="w-15 rounded-md">
                                <Image
                                    src={data?.documents?.non_criminal_certificate?.frontSide}
                                    width={60}
                                    height={50}
                                    alt={data?.documents?.non_criminal_certificate?.frontSide}
                                />
                            </div>
                            <p>{data?.documents?.non_criminal_certificate?.expiry}</p>
                        </section>
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

export default DocumentInformation;
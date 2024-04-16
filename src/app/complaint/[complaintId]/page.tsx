"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLayout";

import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { axiosPrivate } from "@/helper/axiosPrivate";
import { usePathname } from "next/navigation";
import Dropdown from "@/components/common/Dropdown";

const UpdateComplaintPage = () => {

    const pathname = usePathname();
    const submit = async () => {
        if (status == null) {
            return;
        }
        try {
            const result = await axiosPrivate.put(`/v1/complaint/${pathname.split("/")[(pathname.split("/").length - 1)]}`, {
             
                status: status,
               
            });
            toast.success("Status updated successfully");
           window.location.href='/complaint';
        } catch (error) {

        }
    }
    const [status, setStatus] = useState('');
    const fetchData = async () => {
        try {
        
          const result = await axiosPrivate.get(`/v1/complaint/${pathname.split("/")[(pathname.split("/").length - 1)]}`);
          setStatus(result.data.status);
         
        } catch (error: any) {
          
        } 
      }
      useEffect(() => {

        fetchData();
    
    
      }, []);    
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Complaint" />

            <div className="col-span-5 xl:col-span-3">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    Update Information
                </h3>
            </div>
            <div className="p-7">
                <form action="#">


                    <div className="mb-5.5">
                        <Dropdown heading="Select Status" title="Select Status" onSelect={(e) => {
                            console.log("what is the onselect");
                            console.log(e);
                            setStatus(e);
                        }} options={['open', 'inprogress', 'closed']} selected={status} />
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
        </DefaultLayout>
    );
};

export default UpdateComplaintPage;

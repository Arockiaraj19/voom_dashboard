"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Dropdown from "@/components/common/Dropdown";

const Add = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      // name: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
       
      
       
       
        // await updateOrder(searchParams.get("id"), payload);
        router.back();
        resetForm();
      } catch (error: any) {
        toast.error(error?.message ?? "Something went wrong");
      }

      //
    },
  });

  
  const [status, setStatus] = useState("");
  
  return (
    <DefaultLayout>
      <Breadcrumb
        pageName={
        "Update Payment"
        }
      />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <form onSubmit={formik.handleSubmit}>
              <div className="p-6.5">
       

             
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full">
                    <Dropdown
                      onSelect={(e) => {
                        console.log("what is the onSelect");
                        console.log(e);
                        setStatus(e);
                      }}
                      options={["pending", "completed", "cancelled"]}
                      title="Status"
                      heading="Order Status"
                      selected={status ?? ""}
                    />
                  </div>
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Add;

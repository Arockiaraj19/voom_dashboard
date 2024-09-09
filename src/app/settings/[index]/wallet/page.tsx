"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DateOfBirth from "@/components/FormElements/DatePicker/DateOfBirth";
import SelectStatus from "@/components/SelectGroup/SelectStatus";
import { useFormik } from "formik";
import * as Yup from "yup";
import SelectGender from "@/components/SelectGroup/SelectGender";
import PersonalInformation from "@/components/SettingComponents/PersonalInformation";
import ApproveInformation from "@/components/SettingComponents/ApproveComponent";
import ImageUpdateComponent from "@/components/SettingComponents/ImageUpdateComponent";
import { useEffect, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { axiosPrivate } from "@/helper/axiosPrivate";
import Link from "next/link";
import { toast } from "react-toastify";
import navigateToMap from "@/helper/navigateToMap";
import CarInformation from "@/components/SettingComponents/CarComponent";
import DocumentInformation from "@/components/SettingComponents/DocumentComponent";
import useUserData from "@/hooks/userData";
import DeleteModel from "@/components/DeleteModel";
import navigateToLink from "@/helper/navigateToLink";
import { XMarkIcon } from "@heroicons/react/24/outline";
import AddImage from "@/components/AddImageComponent";

const Settings = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pathname = usePathname();

  const [images, setImages] = useState<any>([]);

 
  let [isOpen, setIsOpen] = useState(false);
 
const router=useRouter();
      
  const formik = useFormik({
    initialValues: {
    amount: "",
   
    },
    validationSchema: Yup.object({
      amount: Yup.string()
      .required('Required.')
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await axiosPrivate.post(`/v1/user/add_wallet_amount`,{


    userId:pathname.split("/")[pathname.split("/").length - 2],
          amount:Number(values.amount)
    
    });
        toast.success("Wallet amount updated successfully.");
        setTimeout(() => {
          router.back();
        }, 2000);
      } catch (error: any) {
        console.log(error.response.data.error.message);
        toast.error(
          error?.response?.data?.error?.message ?? "Something went wrong",
        );
      }

      //
    },
  });

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Wallet Amount" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
             Wallet 
              </h3>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Amount
                  </label>
                  <input
                    {...formik.getFieldProps("amount")}
                    type="number"
                    placeholder="Enter the amount"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
               {formik.errors?.amount ? (
                    <div className="text-sm text-black mt-2 ml-2">{formik.errors.amount}</div>
                  ) : null}
                </div>



            
              
                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
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

export default Settings;

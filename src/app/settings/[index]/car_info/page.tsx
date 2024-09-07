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
import { useParams, usePathname } from "next/navigation";
import { axiosPrivate } from "@/helper/axiosPrivate";
import Link from "next/link";
import { toast } from "react-toastify";
import navigateToMap from "@/helper/navigateToMap";
import CarInformation from "@/components/SettingComponents/CarComponent";
import DocumentInformation from "@/components/SettingComponents/DocumentComponent";
import useUserData from "@/hooks/userData";
import DeleteModel from "@/components/DeleteModel";
import navigateToLink from "@/helper/navigateToLink";
import {XMarkIcon } from '@heroicons/react/24/outline'
const Settings = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pathname = usePathname();

  const [images, setImages] = useState<any>([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await axiosPrivate.get("/v1/user/admin", {
        params: {
          userId: pathname.split("/")[pathname.split("/").length - 2],
        },
      });
      console.log("admin result");
      console.log(result?.data);
      setData(result?.data);
      setImages(result?.data?.carDetails?.images ?? []);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  let [isOpen, setIsOpen] = useState(false);
  const handleImageUpload = async (e: any) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("image", file);

    try {
      const imageResult = await axiosPrivate.post("/v1/image/upload", formData);
      setImages([...images, imageResult?.data.imageUrl ?? ""]);
      toast.success("Image updated successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image");
    }
  };


  const updateCarImages = async () => {
  

    try {
        
       await axiosPrivate.put(`/v1/driver_car/${data?.carDetails?._id}/images`, {
        images:images
       });
    
    } catch (error) {
   
      toast.error("Error uploading image");
    }
  };
useEffect(() => {
    if(data){
        updateCarImages();
    }
   
}, [images])

  

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Car Images" />
        <section className="flex flex-wrap gap-10">
          {(images ?? []).map((e: string, index: number) => (
            <div
            
              key={e}
              className="h-40 w-40 relative"
            >
                
              <img src={e} className="object-cover" alt={e} />
             <div className="absolute top-1 right-1 cursor-pointer bg-white rounded-full">
             <XMarkIcon onClick={(event)=>{
                setImages(images.filter((i:string)=>e!=i));
              }} className=" m-1 h-4 w-4  text-red"/>
             </div>
            </div>
          ))}
        </section>
        <div className="p-7">
          <form>
            <div
              id="FileUpload"
              className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
            >
              <input
                onChange={handleImageUpload}
                type="file"
                accept="image/*"
                className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
              />
              <div className="flex flex-col items-center justify-center space-y-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                      fill="#3C50E0"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                      fill="#3C50E0"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                      fill="#3C50E0"
                    />
                  </svg>
                </span>
                <p>
                  <span className="text-primary">Click to upload</span> or drag
                  and drop
                </p>
                <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                <p>(max, 800 X 800px)</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Settings;

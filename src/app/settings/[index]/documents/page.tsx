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
import { XMarkIcon } from "@heroicons/react/24/outline";
import AddImage from "@/components/AddImageComponent";

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
 

 
  useEffect(() => {
    if (data) {
        console.log("what is the data");
        console.log( data?.documents);
     formik.setValues({
        idCard_image: data?.documents?.id_card?.frontSide??"",
        idCard_expiry:data?.documents?.id_card?.expiry??"",
        drivingLicense_image: data?.documents?.driving_license
        ?.frontSide??'',
        drivingLicense_expiry: data?.documents?.driving_license
        ?.expiry??'',
        carLicense_image:data?.documents?.car_license
        ?.frontSide??'',
        carLicense_expiry: data?.documents?.car_license
        ?.expiry??'',
        nonCriminalCertificate_image: data?.documents?.non_criminal_certificate
        ?.frontSide??'',
        nonCriminalCertificate_expiry: data?.documents?.non_criminal_certificate
        ?.expiry??'',
     })
    }
  }, [data]);
  const formik = useFormik({
    initialValues: {
    idCard_image: "",
    idCard_expiry: "",
    drivingLicense_image: "",
    drivingLicense_expiry: "",
    carLicense_image: "",
    carLicense_expiry: "",
    nonCriminalCertificate_image: "",
    nonCriminalCertificate_expiry: "",
    },
    validationSchema: Yup.object({
     
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await axiosPrivate.put(`/v1/document/${data?.documents?._id}`,{


    
            "idCard": {
                "frontSide":values.idCard_image,
             
                "expiry":values.idCard_expiry
            },
            "drivingLicense": {
                "frontSide":values.drivingLicense_image,
             
                "expiry":values.drivingLicense_expiry
            },
            "carLicense": {
                "frontSide":values.carLicense_image,
             
                "expiry":values.carLicense_expiry
            },
            "nonCriminalCertificate": {
                "frontSide":values.nonCriminalCertificate_image,
             
                "expiry":values.nonCriminalCertificate_expiry
            }
    
    });
        toast.success("Document updated successfully.");
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
      <Breadcrumb pageName="Driver Documents" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
              Edit Driver Documents
              </h3>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Id Card
                  </label>
                  <input
                    {...formik.getFieldProps("idCard_expiry")}
                    type="date"
                    placeholder="title"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
               <AddImage submit={(e:string)=>{
formik.setFieldValue("idCard_image",e);
               }} data={data?.documents?.id_card?.frontSide}/>
                </div>



                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Driving License
                  </label>
                  <input
                    {...formik.getFieldProps("drivingLicense_expiry")}
                    type="date"
                    placeholder="title"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
               <AddImage submit={(e:string)=>{
formik.setFieldValue("drivingLicense_image",e);
               }} data={data?.documents?.driving_license
                ?.frontSide}/>
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Car License
                  </label>
                  <input
                    {...formik.getFieldProps("carLicense_expiry")}
                    type="date"
                    placeholder="title"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
               <AddImage submit={(e:string)=>{
formik.setFieldValue("carLicense_image",e);
               }} data={data?.documents?.car_license
                ?.frontSide}/>
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Non Criminal Certificate
                  </label>
                  <input
                    {...formik.getFieldProps("nonCriminalCertificate_expiry")}
                    type="date"
                    placeholder="title"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
               <AddImage submit={(e:string)=>{
formik.setFieldValue("nonCriminalCertificate_image",e);
               }} data={data?.documents?.non_criminal_certificate
                ?.frontSide}/>
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

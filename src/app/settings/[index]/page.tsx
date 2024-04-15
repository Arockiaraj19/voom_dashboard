"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DateOfBirth from "@/components/FormElements/DatePicker/DateOfBirth";
import SelectStatus from "@/components/SelectGroup/SelectStatus";
import { useFormik } from "formik";
import * as Yup from 'yup';
import SelectGender from "@/components/SelectGroup/SelectGender";
import PersonalInformation from "@/components/SettingComponents/PersonalInformation";
import ApproveInformation from "@/components/SettingComponents/ApproveComponent";
import ImageUpdateComponent from "@/components/SettingComponents/ImageUpdateComponent";
import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { axiosPrivate } from "@/helper/axiosPrivate";


const Settings = () => {

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pathname = usePathname();






  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await axiosPrivate.get("/v1/user/all", {
        params: {
          offset: 0,
          limit: 1,
          userId: pathname.split("/")[(pathname.split("/").length - 1)]
        }
      });
      setData(result?.data?.data[0]);
      console.log(Math.ceil(data?.count ?? 0) / 5);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {

    fetchData();


  }, []);




  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Settings" />

        <div className="grid grid-cols-5 gap-8 mb-5.5">
        {data&&  <PersonalInformation  data={data}/>}
         {data&& <ImageUpdateComponent  data={data}/>}
        </div>
        <div className="grid grid-cols-5 gap-8 mb-5.5">
       {data&&   <ApproveInformation data={data}  />}
        </div>


      </div>
    </DefaultLayout>
  );
};

export default Settings;

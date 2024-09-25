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
import Link from "next/link";
import { toast } from "react-toastify";
import navigateToMap from "@/helper/navigateToMap";
import CarInformation from "@/components/SettingComponents/CarComponent";
import DocumentInformation from "@/components/SettingComponents/DocumentComponent";
import useUserData from "@/hooks/userData";
import DeleteModel from "@/components/DeleteModel";

const Settings = () => {

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pathname = usePathname();






  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await axiosPrivate.get("/v1/user/admin", {
        params: {

          userId: pathname.split("/")[(pathname.split("/").length - 1)]
        }
      });
      console.log("admin result");
      console.log(result?.data);
      setData(result?.data);

    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {

    fetchData();


  }, []);

  const fetchLocation = async (id: any) => {
    try {

      const locationResult = await axiosPrivate.get("/v1/location", {
        params: {
          userId: id
        }
      });
      if (locationResult.data.length == 0) {
        return toast.error("Location not updated");
      }
      navigateToMap(locationResult.data[0].location.coordinates[0], locationResult.data[0].location.coordinates[1]);

    } catch (error: any) {

    }
  }


  let [isOpen, setIsOpen] = useState(false)
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Settings" />
        <DeleteModel isOpen={isOpen} setIsOpen={setIsOpen} id={pathname.split("/")[(pathname.split("/").length - 1)]}/>
        {
          data && data.type == "driver" ? <div className="w-full flex flex-row flex-wrap justify-end gap-6 my-4">
              {
              data.obsolete&& <button
              onClick={(e) => {
               // window.location.href=`/schedule?type=user&id=${data._id}&name=${data.first_name}`;
              }}
              className="inline-flex items-center justify-center rounded-md border border-red px-10 py-4 text-center font-medium text-red hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
            Account Deleted
            </button>
            }
             
            <button
               onClick={(e) => {
                window.location.href=`${pathname}/wallet`;
              }}
              className="inline-flex items-center justify-center rounded-md border border-primary px-10 py-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
            Wallet  {
              data?.wallet?.amount.toFixed(2)??"0"
             }          </button>
            <button
              onClick={(e) => {
                fetchLocation(data._id);
              }}
              className="inline-flex items-center justify-center rounded-md border border-primary px-10 py-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Current Location            </button>
              <button
              onClick={(e) => {
                window.location.href=`/notification?type=driver&id=${data._id}&name=${data.first_name}`;
              }}
              className="inline-flex items-center justify-center rounded-md border border-primary px-10 py-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
             Send Notification        </button>
            <button
              onClick={(e) => {
                window.location.href=`/schedule?type=driver&id=${data._id}&name=${data.first_name}`;
              }}
              className="inline-flex items-center justify-center rounded-md border border-primary px-10 py-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Schedules            </button>
            <button
              onClick={(e) => {
                window.location.href=`/trip?type=driver&id=${data._id}&name=${data.first_name}`;
              }}
              className="inline-flex items-center justify-center rounded-md border border-primary px-10 py-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Trips           </button>
              <button
              onClick={(e) => {
                setIsOpen(true);
              }}
              className="inline-flex items-center justify-center rounded-md border border-red px-10 py-4 text-center font-medium text-red hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
           Delete         </button>

          </div> : <></>
        }
        {
          data && data.type == "user" ? <div className="w-full flex flex-row flex-wrap justify-end gap-6 my-4">
            {
              data.obsolete&& <button
              onClick={(e) => {
               // window.location.href=`/schedule?type=user&id=${data._id}&name=${data.first_name}`;
              }}
              className="inline-flex items-center justify-center rounded-md border border-red px-10 py-4 text-center font-medium text-red hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
            Account Deleted
            </button>
            }
             <button
               onClick={(e) => {
                window.location.href=`${pathname}/wallet`;
              }}
              className="inline-flex items-center justify-center rounded-md border border-primary px-10 py-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
            Wallet  {
              data?.wallet?.amount.toFixed(2)??"0"
             }          </button>
            <button
              onClick={(e) => {
                window.location.href=`/schedule?type=user&id=${data._id}&name=${data.first_name}`;
              }}
              className="inline-flex items-center justify-center rounded-md border border-primary px-10 py-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Schedules
            </button>
            <button
              onClick={(e) => {
                window.location.href=`/notification?type=driver&id=${data._id}&name=${data.first_name}`;
              }}
              className="inline-flex items-center justify-center rounded-md border border-primary px-10 py-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
             Send Notification        </button>
            <button
              onClick={(e) => {
                window.location.href=`/trip?type=user&id=${data._id}&name=${data.first_name}`;
              }}
              className="inline-flex items-center justify-center rounded-md border border-primary px-10 py-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Trips
            </button>

          </div> : <></>
        }
        <div className="grid grid-cols-5 gap-8 mb-5.5">
          {data && <PersonalInformation data={data} />}
          {data && <ImageUpdateComponent data={data} />}
        </div>
        <div className="grid grid-cols-5 gap-8 mb-5.5">
          {data && data.type == "driver" ? <ApproveInformation data={data} /> : <></>}
        </div>
        <div className="w-full mb-5.5">
          {data && data.type == "driver" && data.carDetails != null ? <CarInformation data={data} /> : <></>}
        </div>
        <div className="w-full mb-5.5">
          {data && data.type == "driver" && data.documents != null ? <DocumentInformation data={data} /> : <></>}
        </div>


      </div>
    </DefaultLayout>
  );
};

export default Settings;

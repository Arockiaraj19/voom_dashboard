"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CarModelComponent from "@/components/CarComponents/car_model_component";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DriverRequestComponent from "@/components/requestComponent/request_component";
import useApi from "@/hooks/useApi";
import Link from "next/link";
import { usePathname } from 'next/navigation'

const Request = () => {
  const pathname = usePathname();
  const { data, loading, error, setData } = useApi("/v1/user/all?status=pending&offset=0&limit=10&type=driver");
  console.log("what is the data");
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Driver Request" />
    
      <DriverRequestComponent data={data?.data??[]}/>
    </DefaultLayout>
  );
};

export default Request;

"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Dropdown from "@/components/common/Dropdown";
import Pagination from "@/components/common/Pagination";

import ScheduleComponent from "@/components/ScheduleComponent/schedule_component";
import { axiosPrivate } from "@/helper/axiosPrivate";

import { usePathname } from 'next/navigation'
import { useEffect, useState } from "react";
import VerificationCodeComponent from "@/components/VerificationCodeComponent";
import { LIMIT } from "@/helper/constants";

const VerificationCodePage = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pathname = usePathname();


  const onPageChange = (e: any) => {
    console.log("what is the page count");
    console.log(e);
    setCurrentPage(e - 1);
  }
  const [currentPage, setCurrentPage] = useState(0);




  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await axiosPrivate.get("/v1/user/otp", {
        params: {
          offset: currentPage,
          limit: LIMIT
        }
      });
      setData(result.data ?? []);
      console.log(Math.ceil(data?.count ?? 0) / 5);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {

    fetchData();


  }, [currentPage]);

  const [scheduleStatus, setScheduleStatus] = useState(null);
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Verificaiton code" />
      <div className="w-full flex flex-row items-center justify-end mb-5">
      
        <Pagination
         totalCount={(data?.count ?? 0)}
          currentPage={currentPage + 1}
          totalPages={Math.ceil((data?.count ?? 0)/LIMIT)}
          onPageChange={onPageChange}
        />
      </div>
      <VerificationCodeComponent data={data?.data ?? []} />
    </DefaultLayout>
  );
};

export default VerificationCodePage;

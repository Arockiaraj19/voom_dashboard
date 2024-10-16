"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Dropdown from "@/components/common/Dropdown";
import Pagination from "@/components/common/Pagination";

import ScheduleComponent from "@/components/ScheduleComponent/schedule_component";
import { axiosPrivate } from "@/helper/axiosPrivate";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LIMIT } from "@/helper/constants";

const SchedulePage = () => {
  const searchParams = useSearchParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pathname = usePathname();

  const onPageChange = (e: any) => {
    console.log("what is the page count");
    console.log(e);
    setCurrentPage(e - 1);
  };
  const [currentPage, setCurrentPage] = useState(0);

  const fetchData = async () => {
    try {
      setLoading(true);
      let params: any = {
        offset: currentPage,
        limit: LIMIT,
      };
   

   
      const result = await axiosPrivate.get("/v1/schedule/ending_soon", {
        params: params,
      });
      setData(result.data ?? []);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, [currentPage]);
  return (
    <DefaultLayout>
      <Breadcrumb pageName={`Ending Schedules`} />
     

      {
        <div className="my-5 flex flex-row items-center justify-end">
          <Pagination
            totalCount={data?.count ?? 0}
            currentPage={currentPage + 1}
            totalPages={Math.ceil((data?.count ?? 0) / LIMIT)}
            onPageChange={onPageChange}
          />
        </div>
      }
      <ScheduleComponent data={data?.data ?? []} />
    </DefaultLayout>
  );
};

export default SchedulePage;

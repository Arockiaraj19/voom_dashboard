"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Dropdown from "@/components/common/Dropdown";
import Pagination from "@/components/common/Pagination";

import ScheduleComponent from "@/components/ScheduleComponent/schedule_component";
import { axiosPrivate } from "@/helper/axiosPrivate";

import { usePathname } from 'next/navigation'
import { useEffect, useState } from "react";

const SchedulePage = () => {
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
      const result = await axiosPrivate.get("/v1/schedule/all", {
        params: {
          offset: currentPage,
          limit: 5
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
      <Breadcrumb pageName="Schedule" />
      <div className="flex flex-row items-center justify-between">
        <Dropdown onSelect={(e) => {
          console.log("what is the onSelect");
          console.log(e);
          setScheduleStatus(e);
        }} options={["Accepted", "Non Accepted"]} title="Schedule Status" />
        <Pagination
          currentPage={currentPage + 1}
          totalPages={Math.ceil(data?.count ?? 0) / 5}
          onPageChange={onPageChange}
        />
      </div>
      <ScheduleComponent data={data?.data ?? []} />
    </DefaultLayout>
  );
};

export default SchedulePage;

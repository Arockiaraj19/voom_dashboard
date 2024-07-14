"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Dropdown from "@/components/common/Dropdown";
import Pagination from "@/components/common/Pagination";

import ScheduleComponent from "@/components/ScheduleComponent/schedule_component";
import { axiosPrivate } from "@/helper/axiosPrivate";

import { usePathname } from 'next/navigation'
import { useEffect, useState } from "react";
import ComplaintComponent from "@/components/ComplaintComponent";
import { LIMIT } from "@/helper/constants";

const ComplaintPage = () => {
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
      let params:any = {
        offset: currentPage,
        limit: LIMIT
      }
     
    
      if(status){
        params.status=status!.toString().toLowerCase();
      }
      const result = await axiosPrivate.get("/v1/complaint", {
        params:params
      });
      setData(result.data ?? []);
      console.log(Math.ceil(data?.count ?? 0) / 5);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

 
  const [status, setStatus] = useState<any>(null);
  useEffect(() => {

    fetchData();


  }, [currentPage, status]);
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Complaints" />
      <div className="w-full flex flex-row items-end justify-between my-5 gap-5">


        <Dropdown onSelect={(e) => {
          console.log("what is the onSelect");
          console.log(e);
          setStatus(e);
        }} options={['open', 'inprogress', 'closed']} title="Select Status" heading="Status" selected={status ?? ""} />
        <button
          onClick={(e) => {

            setStatus(null);

          }}
          className="inline-flex items-center justify-center rounded-md border border-primary px-10 py-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Clear
        </button>
      </div>
  {
    (Math.ceil((data?.count ?? 0)/LIMIT))>1&& <div className="flex flex-row items-center justify-between">

    <Pagination
      currentPage={currentPage + 1}
      totalPages={Math.ceil((data?.count ?? 0)/LIMIT)}
      onPageChange={onPageChange}
    />
  </div>
  }   
      <ComplaintComponent data={data?.data ?? []} />
    </DefaultLayout>
  );
};

export default ComplaintPage;

"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Dropdown from "@/components/common/Dropdown";
import Pagination from "@/components/common/Pagination";

import ScheduleComponent from "@/components/ScheduleComponent/schedule_component";
import { axiosPrivate } from "@/helper/axiosPrivate";

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from "react";
import TripComponent from "@/components/TripComponent/trip_component";
import { LIMIT } from "@/helper/constants";


const TripPage = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  console.log(searchParams.get("type"));

  const onPageChange = (e: any) => {
    console.log("what is the page count");
    console.log(e);
    setCurrentPage(e - 1);
  }
  const [currentPage, setCurrentPage] = useState(0);




  const fetchData = async () => {
    try {
      setLoading(true);
      let params: any = {
        offset: currentPage,
        limit: LIMIT
      }
      if (searchParams.get("type")) {
        if (searchParams.get("type") == "driver") {
          params.driverId = searchParams.get("id");
        }
        if (searchParams.get("type") == "user") {
          params.userId = searchParams.get("id");
        }
        if (searchParams.get("type") == "schedule") {
          params.scheduleId = searchParams.get("id");
        }

        
      }
      if (type) {
        params.type = type;
      }
      if (status) {
        params.status = status!.toString().toLowerCase();
      }
      if (time) {
        params.time = time!.toString().toLowerCase();
      }

      const result = await axiosPrivate.get("/v1/trip/all", {
        params: params
      });
      setData(result.data ?? []);
      console.log(Math.ceil(data?.count ?? 0) / 5);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }




  const [type, setType] = useState<any>(null);
  const [status, setStatus] = useState<any>(null);
  const [time, setTime] = useState<any>(null);
  useEffect(() => {

    fetchData();


  }, [currentPage, type, status, time]);
  return (
    <DefaultLayout>
      <Breadcrumb pageName={searchParams.get("name") ? `${searchParams.get("name")} Trips` : `Trip`} />
      <div className="w-full flex flex-row items-end justify-between my-5 gap-5">

        <Dropdown onSelect={(e) => {
          console.log("what is the onSelect");
          console.log(e);
          setType(e);
        }} options={['S2D', 'D2S']} title="Select type" heading="Type" selected={type ?? ""} />
        <Dropdown onSelect={(e) => {
          console.log("what is the onSelect");
          console.log(e);
          setTime(e);
        }} options={["Upcoming", "Past", "Today"]} title="Select time" heading="Time" selected={time ?? ""} />
        <Dropdown onSelect={(e) => {
          console.log("what is the onSelect");
          console.log(e);
          setStatus(e);
        }} options={['Pending', 'Started', 'Nearby', 'Reached', 'OnProgress', 'Completed']} title="Select Status" heading="Status" selected={status ?? ""} />
        <button
          onClick={(e) => {
            setCurrentPage(0);

            setType(null);
            setStatus(null);
            setTime(null);
          }}
          className="inline-flex items-center justify-center rounded-md border border-primary px-10 py-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Clear
        </button>
      </div>
      <div className="w-full flex flex-row items-center justify-end my-5">

        <Pagination
          currentPage={currentPage + 1}
          totalPages={Math.ceil((data?.count ?? 0)/LIMIT)}
          onPageChange={onPageChange}
        />
      </div>
      <TripComponent data={data?.data ?? []} />
    </DefaultLayout>
  );
};

export default TripPage;

"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Dropdown from "@/components/common/Dropdown";
import Pagination from "@/components/common/Pagination";

import ScheduleComponent from "@/components/ScheduleComponent/schedule_component";
import { axiosPrivate } from "@/helper/axiosPrivate";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CancelAlertComponent from "@/components/CancelAlertComponent";
import { LIMIT } from "@/helper/constants";

const CancelAlertPage = () => {
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
      let payload: any = {
        offset: currentPage,
        limit: LIMIT,
        type: "ADMIN",
      };
      if (status) {
        payload["status"] = status;
      }
      const result = await axiosPrivate.get("/v1/notification/all", {
        params: payload,
      });
      setData(result.data ?? []);
      console.log(Math.ceil(data?.count ?? 0) / 5);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const [status, setStatus] = useState<any>(null);
  useEffect(() => {
    fetchData();
  }, [currentPage, status]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Admin Notification" />
      <div className="flex w-full flex-row gap-10 items-end">
        <Dropdown
          onSelect={(e) => {
            console.log("what is the onSelect");
            console.log(e);
            setStatus(e);
          }}
          options={["unread", "read"]}
          title="Select Status"
          heading="Status"
          selected={status ?? ""}
        />

<button
            onClick={(e) => {
              setStatus(null);
            }}
            className="inline-flex  h-10 w-30 items-center justify-center rounded-md border border-primary text-center font-medium text-primary hover:bg-opacity-90"
          >
            Clear
          </button>
      </div>
      <div className="mb-5 flex w-full flex-row items-center justify-end">
        <Pagination
          totalCount={data?.count ?? 0}
          currentPage={currentPage + 1}
          totalPages={Math.ceil((data?.count ?? 0) / LIMIT)}
          onPageChange={onPageChange}
        />
      </div>
      <CancelAlertComponent data={data?.data ?? []} />
    </DefaultLayout>
  );
};

export default CancelAlertPage;

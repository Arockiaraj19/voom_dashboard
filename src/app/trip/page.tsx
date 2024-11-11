"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Dropdown from "@/components/common/Dropdown";
import Pagination from "@/components/common/Pagination";

import ScheduleComponent from "@/components/ScheduleComponent/schedule_component";
import { axiosPrivate } from "@/helper/axiosPrivate";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import TripComponent from "@/components/TripComponent/trip_component";
import { LIMIT } from "@/helper/constants";
import CommonPicker from "../../components/commonPicker";
import CommonPickerOne from "../../components/commonPickerOne";
import moment from "moment";
import * as XLSX from "xlsx";
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
  };
  const [currentPage, setCurrentPage] = useState(0);

  const fetchData = async () => {
    try {
      setLoading(true);
      let params: any = {
        offset: currentPage,
        limit: LIMIT,
      };
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
      if (paymentStatus) {
        params.payment_status = paymentStatus;
      }
      if (startDate) {
        params.startDate = startDate;
      }
      if (endDate) {
        params.endDate = endDate;
      }
      console.log("params", params);

      const result = await axiosPrivate.get("/v1/trip/all", {
        params: params,
      });
      console.log(params);
      console.log(result.data);
      setData(result.data ?? []);
      console.log("what is the trip data count", (result.data ?? []).length);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const download = async () => {
    try {
      setLoading(true);
      let params: any = {};
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
      if (paymentStatus) {
        params.payment_status = paymentStatus;
      }
      if (startDate) {
        params.startDate = startDate;
      }
      if (endDate) {
        params.endDate = endDate;
      }
      console.log("params", params);

      const result = await axiosPrivate.get("/v1/trip/excel", {
        params: params,
      });
      console.log(params);

      exportToExcel(result.data?.data ?? []);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const [type, setType] = useState<any>(null);
  const [status, setStatus] = useState<any>(
    searchParams.get("status") ? searchParams.get("status") : null,
  );
  const [time, setTime] = useState<any>(
    searchParams.get("time") ? searchParams.get("time") : "Today",
  );
  const [paymentStatus, setPaymentStatus] = useState<any>(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [payedAmount, setPayedAmount] = useState(null);
  useEffect(() => {
    fetchData();
    if (searchParams.get("trip")) {
      setCurrentPage(0);
      setStartDate(null);
      setEndDate(null);
      setType(null);
      setStatus(null);
      setTime(null);
      setPaymentStatus(null);
    }
    if (searchParams.get("status")) {
      setTime(null);
    }
  }, [currentPage, type, status, time, paymentStatus, startDate, endDate]);
  const exportToExcel = (data: any) => {
    console.log("excel", data);
    // Sample data
    const result = data.map((item: any) => {
      return {
        Id: item._id,
        ScheduleId: item.schedule_id.toString(),
        User: item?.user?.first_name ?? "",
        Driver: item?.driver?.first_name ?? "",
        Status:
          item?.status == "pending" && item?.obsolete
            ? "Cancelled"
            : item?.status.toUpperCase(),
        PickupTime: moment.utc(item?.pickup_time).format("hh:mm A"),
        DropTime: moment.utc(item?.drop_time).format("hh:mm A"),
        Date: moment.utc(item?.pickup_time).format("dddd, MMMM Do YYYY"),
        PickupLocation: item?.locations[0].name,
        DropLocation: item?.locations[1].name,
        StartTime:
          item?.start_time == null
            ? ""
            : moment.utc(item?.start_time).format("hh:mm A"),
        EndTime:
          item?.end_time == null
            ? ""
            : moment.utc(item?.end_time).format("hh:mm A"),
        Type: item?.type.toUpperCase(),
        TripPayment: item?.payment ?? "N/A",
        DriverPayment:
          item?.driver_payment ?? item.payment - item.payment * (10 / 100),
        DriverPaymentStatus:
          (item?.user_transactions ?? []).filter(
            (e: any) =>
              e.amount && e.type == "credit" && e.user_id == item?.driver?._id,
          ).length != 0
            ? "Received"
            : "Pending",
        Rating:
          (item?.review ?? []).length == 0
            ? "N/A"
            : (item?.review ?? [])[0].rating.toString(),
        Feedback:
          (item?.review ?? []).length == 0
            ? "N/A"
            : (item?.review ?? [])[0].feedback,
      };
    });

    // Create a new workbook and add data
    const worksheet = XLSX.utils.json_to_sheet(result);
    const workbook = XLSX.utils.book_new();
    worksheet["!cols"] = Array(result.length).fill({ wch: 25 });
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Generate Excel file and trigger download
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `trip_${moment().format("YYYY-MM-DD HH:mm:ss")}.xlsx`;
    link.click();

    // Clean up URL object
    URL.revokeObjectURL(link.href);
  };
  return (
    <DefaultLayout>
      <Breadcrumb
        pageName={
          searchParams.get("name")
            ? `${searchParams.get("name")} Trips`
            : `Trip`
        }
      />
      <div className="my-5 grid w-full grid-cols-4 justify-between gap-5">
        <Dropdown
          onSelect={(e) => {
            console.log("what is the onSelect");
            console.log(e);
            setPaymentStatus(e);
          }}
          options={["pending", "completed"]}
          title="Select status"
          heading="Driver Payment Status"
          selected={paymentStatus ?? ""}
        />

        <Dropdown
          onSelect={(e) => {
            console.log("what is the onSelect");
            console.log(e);
            setType(e);
          }}
          options={["S2D", "D2S"]}
          title="Select type"
          heading="Type"
          selected={type ?? ""}
        />

        <Dropdown
          onSelect={(e) => {
            console.log("what is the onSelect");
            console.log(e);
            setTime(e);
          }}
          options={["Upcoming", "Past", "Today"]}
          title="Select time"
          heading="Time"
          selected={time ?? ""}
        />
        <Dropdown
          onSelect={(e) => {
            console.log("what is the onSelect");
            console.log(e);
            setStatus(e);
          }}
          options={[
            "Pending",
            "Started",
            "Nearby",
            "Reached",
            "OnProgress",
            "Completed",
            "Cancelled",
          ]}
          title="Select Status"
          heading="Status"
          selected={status ?? ""}
        />
        <CommonPicker
          value={startDate}
          heading={"Start Date"}
          onChange={(e: any) => {
            console.log("end date", e);

            setStartDate(e);
          }}
        />

        <CommonPickerOne
          value={endDate}
          heading={"End Date"}
          onChange={(e: any) => {
            console.log("end date", e);

            setEndDate(e);
          }}
        />
        <button
          onClick={(e) => {
            setCurrentPage(0);
            setStartDate(null);
            setEndDate(null);
            setType(null);
            setStatus(null);
            setTime(null);
            setPaymentStatus(null);
          }}
          className="inline-flex items-center justify-center rounded-md border border-primary px-10 py-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Clear
        </button>
        <button
          onClick={(e) => {
            console.log("download");
            download();
          }}
          className="inline-flex h-10 w-30 items-center justify-center rounded-md border border-primary text-center font-medium text-primary hover:bg-opacity-90"
        >
          Download
        </button>
        {payedAmount && (
          <button
            onClick={(e) => {
              setPayedAmount(null);
            }}
            className="inline-flex items-center justify-center rounded-md border border-primary px-10 py-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Need to Pay - {payedAmount}
          </button>
        )}
      </div>
      <div className="my-5 flex w-full flex-row items-center justify-end">
        <Pagination
          totalCount={data?.count ?? 0}
          currentPage={currentPage + 1}
          totalPages={Math.ceil((data?.count ?? 0) / LIMIT)}
          onPageChange={onPageChange}
        />
      </div>
      <TripComponent
        payedAmount={payedAmount}
        setPayedAmount={setPayedAmount}
        data={data?.data ?? []}
      />
    </DefaultLayout>
  );
};

export default TripPage;

"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Dropdown from "@/components/common/Dropdown";
import Pagination from "@/components/common/Pagination";
import moment from "moment";
import ScheduleComponent from "@/components/ScheduleComponent/schedule_component";
import { axiosPrivate } from "@/helper/axiosPrivate";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LIMIT } from "@/helper/constants";
import * as XLSX from "xlsx";
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
  const [search, setSearch] = useState("");
  const fetchData = async () => {
    try {
      setLoading(true);
      let params: any = {
        offset: currentPage,
        limit: LIMIT,
      };
      if (searchParams.get("type")) {
        if (searchParams.get("type") == "user") {
          params.userId = searchParams.get("id");
        }
      }
      if (mode) {
        params.payment_mode = mode;
      }
      if (paymentStatus) {
        if (paymentStatus == "UnPaid") {
          params.payment_status = "pending";
        } else if (paymentStatus == "Paid") {
          params.payment_status = "completed";
        } else if (paymentStatus == "Approved and UnPaid") {
          params.payment_status = "approved";
        } else {
          params.payment_status = paymentStatus;
        }
      }
      if (scheduleStatus) {
        params.schedule_status = scheduleStatus == "Accepted" ? "Both" : "S2D";
      }
      if (type) {
        params.type = type == "One way" ? "one_way" : "two_way";
      }
      if (status) {
        params.status = status.toLowerCase();
      }
      if (time) {
        params.time = time!.toString().toLowerCase();
      }
      if (search.length != 0) {
        params.schedule_id = search;
      }
      if (searchParams.get("type")) {
        if (searchParams.get("type") == "driver") {
          params = {
            offset: currentPage,
            limit: LIMIT,
            driverId: searchParams.get("id"),
          };
        }
      }
      const result = await axiosPrivate.get(
        searchParams.get("type") && searchParams.get("type") == "driver"
          ? "/v1/schedule/driver/admin"
          : "/v1/schedule/all",
        {
          params: params,
        },
      );
      setData(result.data ?? []);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const download = async () => {
    try {
      let params: any = {
        offset: currentPage,
        limit: LIMIT,
      };
      if (searchParams.get("type")) {
        if (searchParams.get("type") == "user") {
          params.userId = searchParams.get("id");
        }
      }
      if (mode) {
        params.payment_mode = mode;
      }
      if (paymentStatus) {
        if (paymentStatus == "UnPaid") {
          params.payment_status = "pending";
        } else if (paymentStatus == "Paid") {
          params.payment_status = "completed";
        } else if (paymentStatus == "Approved and UnPaid") {
          params.payment_status = "approved";
        } else {
          params.payment_status = paymentStatus;
        }
      }
      if (search.length != 0) {
        params.schedule_id = search;
      }
      if (scheduleStatus) {
        params.schedule_status = scheduleStatus == "Accepted" ? "Both" : "S2D";
      }
      if (type) {
        params.type = type == "One way" ? "one_way" : "two_way";
      }
      if (status) {
        params.status = status.toLowerCase();
      }
      if (time) {
        params.time = time!.toString().toLowerCase();
      }

      const result = await axiosPrivate.get("/v1/schedule/excel", {
        params: params,
      });
      exportToExcel(result.data?.data ?? []);
    } catch (error: any) {
    } finally {
    }
  };
  const [scheduleStatus, setScheduleStatus] = useState<any>(null);
  const [paymentStatus, setPaymentStatus] = useState<any>(null);
  const [type, setType] = useState<any>(null);
  const [status, setStatus] = useState<any>(
    searchParams.get("status") ? searchParams.get("status") : "Active",
  );
  const [mode, setPaymentMode] = useState<any>(null);
  const [time, setTime] = useState<any>(null);
  useEffect(() => {
    fetchData();
  }, [
    currentPage,
    scheduleStatus,
    type,
    status,
    time,
    mode,
    paymentStatus,
    search,
  ]);

  const exportToExcel = (data: any) => {
    console.log("excel", data);

    // Process data and flatten ScheduleTransactions
    const result = data.map((item: any) => {
      const baseData = {
        Id: item._id,
        Name: item?.name ?? "",
        Notes: item?.note ?? "",
        PaymentMethod: item?.payment_mode ?? "online",
        Amount: item?.payment.toFixed(2),
        DriverAmount: item?.driver_payment.toFixed(2),
        DriverPaymentUntilNow:
          (item?.payed_amount ?? []).length == 0
            ? item?.driver_payment.toFixed(2)
            : item?.driver_payment -
              (item?.payed_amount ?? [])[0].total_driver_payment,
        AllTrips:
          (item?.trips_trip_count ?? []).length != 0
            ? (item?.trips_trip_count ?? [])[0].count +
              ((item?.cancelled_trip_count ?? []).length == 0
                ? 0
                : (item?.cancelled_trip_count ?? [])[0].count)
            : item?.trip_count,
        PendingTrips:
          (item?.pending_trip_count ?? []).length != 0
            ? (item?.pending_trip_count ?? [])[0].count
            : 0,
        CancelledTrips:
          (item?.cancelled_trip_count ?? []).length != 0
            ? (item?.cancelled_trip_count ?? [])[0].count
            : 0,
        CompletedTrips:
          (item?.completed_trip_count ?? []).length != 0
            ? (item?.completed_trip_count ?? [])[0].count
            : 0,
        PaymentStatus: item?.payment_status == "completed" ? "Paid" : "Un Paid",
        ApprovalStatus:
          item?.payment_status == "approved" ? "Approved" : "Un Approved",
        SettlementDate: item?.settlement_date
          ? moment.utc(item?.settlement_date).format("YYYY-MM-DD HH:mm:ss")
          : "N/A",
        StartDate: moment.utc(item?.start_date).format("YYYY-MM-DD"),
        EndDate: moment.utc(item?.end_date).format("YYYY-MM-DD"),
        PickupTime:
          (item?.schedule?.time ?? item?.time).length == 1
            ? moment.utc(item?.time[0]).format("HH:mm:ss")
            : (moment.utc(item?.time[0]).format("HH:mm:ss"),
              moment.utc(item?.time[1]).format("HH:mm:ss")),
        CreatedAt: moment.utc(item.createdAt).format("YYYY-MM-DD"),
        Type: item.type == "one_way" ? "One Way" : "Two Way",
        Status: item.status,
        ScheduleStatus:
          item.schedule_status == "Both" ? "Accepted" : "Non Accepted",
        User:
          item?.user.length == 0 ? "Account Deleted" : item?.user[0].first_name,
        Drivers: (item?.schedule_assignments ?? [])
          .map((e: any) => e?.driver?.first_name ?? "")
          .join(", "),
        WeekDays: JSON.stringify(
          (item.schedule ?? item).week_days.map((e: any) => e),
        ),
      };

      // Flatten ScheduleTransactions into separate columns
      const transactionFields: any = {};
      item.transactions.forEach((transaction: any, index: number) => {
        transactionFields[`Transaction_${index + 1}_Amount`] =
          transaction.amount;
        transactionFields[`Transaction_${index + 1}_Type`] = transaction.type;
        transactionFields[`Transaction_${index + 1}_Mode`] = transaction.mode;
        transactionFields[`Transaction_${index + 1}_PaymentStatus`] =
          transaction.payment_status;
      });

      return { ...baseData, ...transactionFields };
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
    link.download = `${moment().format("YYYY-MM-DD HH:mm:ss")}.xlsx`;
    link.click();

    // Clean up URL object
    URL.revokeObjectURL(link.href);
  };

  const [show, setShow] = useState(false);
  return (
    <DefaultLayout>
      <Breadcrumb
        pageName={
          searchParams.get("name")
            ? `${searchParams.get("name")} Schedule`
            : `Schedule`
        }
      />
      {searchParams.get("type") && searchParams.get("type") == "driver" ? (
        <></>
      ) : (
        <div className="flex items-center gap-5">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search Schedule by ID(Need valid ID)"
            className="mb-2 w-1/2 rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
          <button
            onClick={(e) => {
              setShow(!show);
            }}
            className="inline-flex h-10 w-30 items-center justify-center rounded-md border border-primary text-center font-medium text-primary hover:bg-opacity-90"
          >
            {show ? "Hide Filters" : "Show Filters"}
          </button>
        </div>
      )}
      {show && (
        <div>
          {searchParams.get("type") && searchParams.get("type") == "driver" ? (
            <></>
          ) : (
            <div className="grid w-full grid-cols-4 gap-5">
              <Dropdown
                onSelect={(e) => {
                  console.log("what is the onSelect");
                  console.log(e);
                  setScheduleStatus(e);
                }}
                options={["Accepted", "Non Accepted"]}
                title="Select Schedule Status"
                heading="Schedule Status"
                selected={scheduleStatus ?? ""}
              />
              <Dropdown
                onSelect={(e) => {
                  console.log("what is the onSelect");
                  console.log(e);
                  setType(e);
                }}
                options={["One way", "Two Way"]}
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
                  setPaymentMode(e);
                }}
                options={["online", "cash"]}
                title="Select Payment Mode"
                heading="Payment Mode"
                selected={mode ?? ""}
              />
              <Dropdown
                onSelect={(e) => {
                  console.log("what is the onSelect");
                  console.log(e);
                  setStatus(e);
                }}
                options={["Active", "Cancelled", "Completed"]}
                title="Select Status"
                heading="Status"
                selected={status ?? ""}
              />
              <Dropdown
                onSelect={(e) => {
                  console.log("what is the onSelect");
                  console.log(e);
                  setPaymentStatus(e);
                }}
                options={["UnPaid", "Paid", "cancelled", "Approved and UnPaid"]}
                title="Select Payment Status"
                heading="Payment Status"
                selected={paymentStatus ?? ""}
              />
              <div className="flex flex-col gap-2">
                <button
                  onClick={(e) => {
                    setSearch("");
                    setCurrentPage(0);
                    setScheduleStatus(null);
                    setType(null);
                    setStatus(null);
                    setTime(null);
                    setPaymentMode(null);
                    setPaymentStatus(null);
                  }}
                  className="inline-flex h-10 w-30 items-center justify-center rounded-md border border-primary text-center font-medium text-primary hover:bg-opacity-90"
                >
                  Clear
                </button>
                <button
                  onClick={(e) => {
                    download();
                  }}
                  className="inline-flex h-10 w-30 items-center justify-center rounded-md border border-primary text-center font-medium text-primary hover:bg-opacity-90"
                >
                  Download
                </button>
              </div>
            </div>
          )}
        </div>
      )}
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

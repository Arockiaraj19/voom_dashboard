import { axiosPrivate } from "@/helper/axiosPrivate";
import React, { ReactNode, useState, useEffect } from "react";
import { LIMIT } from "@/helper/constants";
interface CardDataStatsProps {
  title: string;
  startDate: string | null;
  endDate: string | null;
  children: ReactNode;
  onClick: any;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,

  children,
  startDate,
  endDate,
  onClick,
}) => {
  const [data, setData] = useState<any>(null);
  const fetchData = async () => {
    try {
      let params: any = {};
      let url;
      if (title == "Total Users") {
        url = "/v1/user/count?type=user";
      }
      if (title == "Total Accepted Drivers") {
        url = "/v1/user/count?type=driver&status=approved";
      }
      if (title == "Total Driver Requests") {
        url = "/v1/user/count?type=driver&status=pending";
      }
      if (title == "Total Active Schedule") {
        url = "/v1/schedule/count?status=active";
      }
      if(title=="Total Completed Schedule"){
        url = "/v1/schedule/count?status=completed";
      }
      if (title == "Total Cancelled Schedule") {
        url = "/v1/schedule/count?status=cancelled";
      }
      if (title == "Total Trips") {
        url = "/v1/trip/count";
      }
      if (title == "Today Trips") {
        url = "/v1/trip/count?time=today";
      }
      if (title == "Upcoming Trips") {
        url = "/v1/trip/count?time=upcoming";
      }
      if(title=="Cancelled Trips"){
        url = "/v1/trip/count?status=cancelled";
      }
      if(title=="Number of users who have created schedules"){
        url="/v1/user/schedule"
        params={
          offset:0,
          limit: LIMIT,
        }
      }
      if(title=="Schedules are about to end in less than a week"){
        url = "/v1/schedule/ending_soon/count";
      }
      if (startDate) {
        params.startDate = startDate;
      }
      if (endDate) {
        params.endDate = endDate;
      }
      const result = await axiosPrivate.get(url!, {
        params: params,
      });
      setData(result?.data?.count ?? 0);
    
    } catch (error: any) {
    } finally {
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  return (
    <div
      onClick={(e) => {
        onClick();
      }}
      className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark"
    >
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        {children}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {data ?? 0}
          </h4>
          <span className="text-sm font-medium">{title}</span>
        </div>

        {/* <span
          className={`flex items-center gap-1 text-sm font-medium ${
            levelUp && "text-meta-3"
          } ${levelDown && "text-meta-5"} `}
        >
          {rate}

          {levelUp && (
            <svg
              className="fill-meta-3"
              width="10"
              height="11"
              viewBox="0 0 10 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
                fill=""
              />
            </svg>
          )}
          {levelDown && (
            <svg
              className="fill-meta-5"
              width="10"
              height="11"
              viewBox="0 0 10 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.64284 7.69237L9.09102 4.33987L10 5.22362L5 10.0849L-8.98488e-07 5.22362L0.908973 4.33987L4.35716 7.69237L4.35716 0.0848701L5.64284 0.0848704L5.64284 7.69237Z"
                fill=""
              />
            </svg>
          )}
        </span> */}
      </div>
    </div>
  );
};

export default CardDataStats;

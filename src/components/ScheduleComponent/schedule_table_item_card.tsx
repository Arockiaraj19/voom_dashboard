import navigateToMap from "@/helper/navigateToMap";
import moment from "moment";
import { useSearchParams } from "next/navigation";

const ScheduleTableItemCard = ({
  item,
  index,
}: {
  item: any;
  index: number;
}) => {
  const searchParams = useSearchParams();
  return (
    <tr key={item._id}>
      <td
        onClick={(e) => {
          if (!searchParams.get("type")) {
            window.location.href = `/schedule/${item._id}`;
          }else{

          }
        }}
        className="border-b cursor-pointer border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11"
      >
        <p className="text-sm">
          {searchParams.get("type") && searchParams.get("type") == "driver"
            ? item?.schedule?.name ?? "N/A"
            : item?.name ?? "N/A"}
        </p>
      </td>
      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
        <p className="text-black dark:text-white">
          {searchParams.get("type") && searchParams.get("type") == "driver"
            ? item?.schedule?.note ?? ""
            : item?.note ?? ""}
        </p>
      </td>
      {!searchParams.get("type") ? (
        <td  onClick={(e) => {
            if (!searchParams.get("type")) {
              window.location.href = `/schedule/${item._id}`;
            }
          }} className=" cursor-pointer border-b border-[#eee] px-4 py-5 capitalize dark:border-strokedark">
        <p
              className={
                item?.payment_mode == "cash" &&
                item?.payment_status == "pending"
                  ? "text-blue-500 "
                  : "text-black dark:text-white"
              }
            >
           {item?.payment_mode ?? "online"}
            </p>
        </td>):( <td  onClick={(e)=>{
              window.location.href = `/schedule/transfer?driver_id=${item.driver_id}&id=${item?.schedule._id}`;
                
            }} className="border-b cursor-pointer border-[#eee] px-4 py-5 dark:border-strokedark">
            <p className="text-blue-600 dark:text-white">
           Transfer
            </p>
        </td>)
      }
      {!searchParams.get("type") && 
        <td  onClick={(e) => {
            if (!searchParams.get("type")) {
              window.location.href = `/schedule/${item._id}`;
            }
          }} className=" cursor-pointer border-b border-[#eee] px-4 py-5 capitalize dark:border-strokedark">
         <p
              className={
                item?.payment_mode == "cash" &&
                item?.payment_status == "pending"
                  ? "text-blue-500 "
                  : "text-black dark:text-white"
              }
            >
             
              {Math.round(item?.payment)}
            </p>
        </td>
      }
         {!searchParams.get("type") && 
        <td  onClick={(e) => {
            if (!searchParams.get("type")) {
              window.location.href = `/schedule/${item._id}`;
            }
          }} className="cursor-pointer border-b border-[#eee] px-4 py-5 capitalize dark:border-strokedark">
          <p
              className="text-black dark:text-white"
            >
            {item?.payment_status ?? ""}
            </p>
        </td>
      }
      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
        <p className="text-black dark:text-white">
          {searchParams.get("type") && searchParams.get("type") == "driver"
            ? moment(item?.schedule?.start_date).format("YYYY-MM-DD")
            : moment(item?.start_date).format("YYYY-MM-DD")}{" "}
          <br />
          {searchParams.get("type") && searchParams.get("type") == "driver"
            ? moment(item?.schedule?.end_date).format("YYYY-MM-DD")
            : moment(item?.end_date).format("YYYY-MM-DD")}
        </p>
      </td>
      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
        {(item?.schedule?.time?? item?.time).length == 1 ? (
          <p className="text-black dark:text-white">
            {searchParams.get("type") && searchParams.get("type") == "driver"
              ? moment(item?.schedule.time[0]).utc().format("HH:mm:ss")
              : moment(item?.time[0]).utc().format("HH:mm:ss")}
          </p>
        ) : (
          <p className="text-black dark:text-white">
            {searchParams.get("type") && searchParams.get("type") == "driver"
              ? moment(item?.schedule.time[0]).utc().format("HH:mm:ss")
              : moment(item?.time[0]).utc().format("HH:mm:ss")}{" "}
            <br />
            {searchParams.get("type") && searchParams.get("type") == "driver"
              ? moment(item?.schedule.time[1]).utc().format("HH:mm:ss")
              : moment(item?.time[1]).utc().format("HH:mm:ss")}
          </p>
        )}
      </td>
      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
        <p className="text-black dark:text-white">
          {moment(item.createdAt).format("YYYY-MM-DD")}
        </p>
      </td>
      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
        <p className="text-black dark:text-white">
          {searchParams.get("type") && searchParams.get("type") == "driver"
            ? item.schedule.type
            : item.type == "one_way"
              ? "One Way"
              : "Two Way"}
        </p>
      </td>
      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
        <p
          className={
            searchParams.get("type") && searchParams.get("type") == "driver"
              ? item.schedule.status
              : item.status == "active"
                ? "text-red dark:text-white"
                : "text-green-400 dark:text-white"
          }
        >
          {searchParams.get("type") && searchParams.get("type") == "driver"
            ? item.schedule.status
            : item.status}
        </p>
      </td>
      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
        <p className="text-black dark:text-white">
          {searchParams.get("type") && searchParams.get("type") == "driver"
            ? item.schedule.schedule_status == "Both"
              ? "Accepted"
              : "Non Accepted"
            : item.schedule_status == "Both"
              ? "Accepted"
              : "Non Accepted"}
        </p>
      </td>
      <td
        onClick={(event) => {
          if (
            searchParams.get("type") &&
            searchParams.get("type") == "driver"
          ) {
            window.location.href = `/trip?type=schedule&id=${item.schedule._id}&name=${item.schedule.name}`;
            return;
          }
          window.location.href = `/trip?type=schedule&id=${item._id}&name=${item.name}`;
        }}
        className="cursor-pointer border-b border-[#eee] px-4 py-5 dark:border-strokedark"
      >
       {
         searchParams.get("type") &&
         searchParams.get("type") == "driver"?<p className="text-blue-400 dark:text-white">{(item?.trips_trip_count??[]).length!=0?(item?.trips_trip_count??[])[0].count:  item?.schedule?.trip_count}</p>:<p className="text-blue-400 dark:text-white">{  (item?.trips_trip_count??[]).length!=0?(item?.trips_trip_count??[])[0].count: item?.trip_count}</p>
       } 
      </td>
      <td
        onClick={(e) => {
          window.location.href = `/settings/${item?.user[0]._id}`;
        }}
        className="cursor-pointer border-b border-[#eee] px-4 py-5 dark:border-strokedark"
      >
        <p className="text-black dark:text-white">
          {searchParams.get("type") && searchParams.get("type") == "driver"
            ? item?.schedule.user.length == 0
              ? "Account Deleted"
              : item?.schedule.user[0].first_name
            : item?.user.length == 0
              ? "Account Deleted"
              : item?.user[0].first_name}
        </p>
      </td>
      <td className="w-full border-b border-[#eee] px-4 py-5 dark:border-strokedark ">
        {searchParams.get("type") && searchParams.get("type") == "driver" ? (
          <p className="text-black dark:text-white">
            {item?.driver.first_name}
          </p>
        ) : (
          <div className="flex h-full w-full flex-col ">
            {item?.schedule_assignments.map((e: any, index: number) => (
              <p
                key={index}
                onClick={(event) => {
                  window.location.href = `/settings/${e?.driver_id}`;
                }}
                className="cursor-pointer text-black dark:text-white"
              >
                {e?.driver?.first_name ?? ""}
              </p>
            ))}
          </div>
        )}
      </td>
      <td className="flex flex-wrap border-b border-[#eee] px-4 py-5 dark:border-strokedark">
        {(item.schedule ?? item).week_days.map((e: any) => (
          <p key={e} className="text-black dark:text-white">
            {e},
          </p>
        ))}
      </td>
      <td className="w-full border-b border-[#eee] px-4 py-5 dark:border-strokedark ">
        <div className="flex h-full w-full cursor-pointer flex-wrap ">
          {(item?.locations??item?.schedule?.locations??[]).map((e: any, index: number) => (
            <p
              onClick={(event) => {
                navigateToMap(
                  e.location.coordinates[0],
                  e.location.coordinates[1],
                );
              }}
              key={index}
              className="cursor-pointer text-black dark:text-white"
            >
              {e?.name ?? ""}-(Type-{e?.type}),
            </p>
          ))}
        </div>
      </td>
    </tr>
  );
};

export default ScheduleTableItemCard;

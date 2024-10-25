import { Package } from "@/types/package";
import moment from "moment";
import ScheduleTableItemCard from "./schedule_table_item_card";
import { usePathname, useSearchParams } from "next/navigation";
const ScheduleComponent = ({ data }: { data: any }) => {
  const searchParams = useSearchParams();
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[80px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Schedule ID
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Schedule Name
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Notes
              </th>
              {!searchParams.get("type") ? (
                <th className="min-w-[200px] px-4 py-4 font-medium text-black dark:text-white">
                  Payment Method
                </th>
              ) : (
                <th className="min-w-[200px] px-4 py-4 font-medium text-black dark:text-white">
                  Transfer
                </th>
              )}
              {!searchParams.get("type") && (
                <th className="min-w-[200px] px-4 py-4 font-medium text-black dark:text-white">
                  Amount
                </th>
              )}
              {!searchParams.get("type") && (
                <th className="min-w-[200px] px-4 py-4 font-medium text-black dark:text-white">
                  Driver payment
                </th>
              )}
               {!searchParams.get("type") && (
                <th className="min-w-[200px] px-4 py-4 font-medium text-black dark:text-white">
                  Driver payment until now 
                </th>
              )}
              <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white">
                All Trips
              </th>
              {!searchParams.get("type") && (
                <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white">
                  Pending trips
                </th>
              )}
              {!searchParams.get("type") && (
                <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white">
                  Cancelled trips
                </th>
              )}
              {!searchParams.get("type") && (
                <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white">
                  Completed Trips
                </th>
              )}
              {!searchParams.get("type") && (
                <th className="min-w-[200px] px-4 py-4 font-medium text-black dark:text-white">
                  Payment Status
                </th>
              )}
              {!searchParams.get("type") && (
                <th className="min-w-[200px] px-4 py-4 font-medium text-black dark:text-white">
                  Settlement Date
                </th>
              )}

              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Start Dates
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                End Dates
              </th>
              <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white">
                Pickup Time 
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                CreatedAt
              </th>
              <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white">
                Type
              </th>
              <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white">
                Schedule status
              </th>

              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                User
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Drivers
              </th>
              <th className="min-w-[200px] px-4 py-4 font-medium text-black dark:text-white">
                WeekDays
              </th>
              <th className="min-w-[200px] px-4 py-4 font-medium text-black dark:text-white">
                Pickup location
              </th>
              <th className="min-w-[200px] px-4 py-4 font-medium text-black dark:text-white">
                Drop off location
              </th>
              {!searchParams.get("type") && (
                <th className="min-w-[200px] px-4 py-4 font-medium text-black dark:text-white">
                  Payment Helper
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((item: any, index: number) => (
              <ScheduleTableItemCard key={item._id} index={index} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleComponent;

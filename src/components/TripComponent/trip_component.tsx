import { Package } from "@/types/package";
import moment from "moment";
import TripTableItemCard from "./trip_table_item_card";

const TripComponent = ({ data }: { data: any }) => {
    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                            User
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                               Driver
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                              Time
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                              Pickup Location
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                               Drop Location
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                type
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                status
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                start time
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                              end time
                            </th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item: any, index: number) => <TripTableItemCard index={index} item={item} />)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TripComponent;

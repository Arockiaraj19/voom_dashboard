import { Package } from "@/types/package";
import moment from "moment";
import TripTableItemCard from "./trip_table_item_card";

const TripComponent = ({ data }: { data: any }) => {
    return (
        <div  className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
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
                            Pickup Time(UTC)
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                             Drop Time(UTC)
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                              Pickup Location
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                               Drop Location
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                Type
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                Status
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                Start Time
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                              End Time
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                         Payment
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                      Driver Received Payment
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                     Pay
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
Transfer
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
Rating
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
Feedback
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
Cancel
                            </th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item: any, index: number) => <TripTableItemCard key={item._id} index={index} item={item} />)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TripComponent;

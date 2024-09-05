import { Package } from "@/types/package";
import moment from "moment";
import UserTableItemCard from "../UserComponent/user_table_item_card";

const DriverRequestComponent = ({ data }: { data: any }) => {
    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                                Name
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                Mobile Number
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                               Type
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                Email
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                DOB
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                CreatedAt
                            </th>
                            <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                                Status
                            </th>
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item: any, index: number) =><UserTableItemCard key={item._id} index={index} item={item}/>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DriverRequestComponent;

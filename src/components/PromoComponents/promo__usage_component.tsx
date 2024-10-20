"use client";
import { axiosPrivate } from "@/helper/axiosPrivate";
import useApi from "@/hooks/useApi";
import { Package } from "@/types/package";
import moment from "moment";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import Pagination from "@/components/common/Pagination";
import { useState, useEffect } from "react";
import { LIMIT } from "@/helper/constants";
const PromoComponent = () => {
  const router = useRouter();
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
      let params: any = {
        promo_id:pathname.split("/")[(pathname.split("/").length - 2)],
        offset: currentPage,
        limit: LIMIT,
      };

      console.log("params", params);

      const result = await axiosPrivate.get("/v1/promo/usage", {
        params: params,
      });

      setData(result.data);
    } catch (error: any) {
      console.log("what is the error");
      setError(error);
    } finally {
      setLoading(false);
    }
  };

 

  useEffect(() => {
    fetchData();
  }, [currentPage]);
  return (
    <>
      <Pagination
        totalCount={data?.count ?? 0}
        currentPage={currentPage + 1}
        totalPages={Math.ceil((data?.count ?? 0) / LIMIT)}
        onPageChange={onPageChange}
      />
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                 Schedule Name
                </th>
                <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                User
                </th>
                <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Payment
                </th>

                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  Created date
                </th>

              </tr>
            </thead>
            <tbody>
              {(data?.data??[]).map((item: any, index: number) => (
                <tr key={item._id}>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {item.schedule.name}
                    </h5>
                  </td>
                  <td  onClick={(e) => {
                      window.location.href = `/settings/${item?.user?._id}`;
                    }} className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {item?.user?.first_name}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {item?.promo_payment}
                    </h5>
                  </td>
                 
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {moment.utc(item.createdAt).format("YYYY-MM-DD")}
                    </p>
                  </td>

                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PromoComponent;

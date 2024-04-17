"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CarModelComponent from "@/components/CarComponents/car_model_component";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Pagination from "@/components/common/Pagination";
import DriverRequestComponent from "@/components/requestComponent/request_component";
import { axiosPrivate } from "@/helper/axiosPrivate";
import { LIMIT } from "@/helper/constants";
import useApi from "@/hooks/useApi";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { useEffect, useState } from "react";

const UserPage = () => {

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const pathname = usePathname();


    const onPageChange = (e: any) => {
        console.log("what is the page count");
        console.log(e);
        setCurrentPage(e - 1);
    }
    const [currentPage, setCurrentPage] = useState(0);




    const fetchData = async () => {
        try {
            setLoading(true);
            let params: any = {
                offset: currentPage,
                limit: LIMIT,
                type: "user"
            }
            if (search.length != 0) {
                if (search.startsWith("+")) {
                    params.mobileNumber = search.substring(1);
                } else {
                    params.name = search;
                }
            }
            const result = await axiosPrivate.get("/v1/user/all", {
                params: params
            });
            setData(result.data ?? []);
            console.log(Math.ceil(data?.count ?? 0) / 5);
        } catch (error: any) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }
    const [search, setSearch] = useState("");
    useEffect(() => {

        fetchData();


    }, [currentPage,search]);
  
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Users" />
            <div className="flex flex-row items-center justify-end">

                <Pagination
                    currentPage={currentPage + 1}
                    totalPages={Math.ceil(data?.count ?? 0) / LIMIT}
                    onPageChange={onPageChange}
                />
            </div>
            <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Search Name or Mobile Number (If you want to search a mobile number, please add a + before the word.)
                </label>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="Search"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />

            </div>
            <DriverRequestComponent data={data?.data ?? []} />
        </DefaultLayout>
    );
};

export default UserPage;

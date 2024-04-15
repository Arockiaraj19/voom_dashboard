"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CarModelComponent from "@/components/CarComponents/car_model_component";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Pagination from "@/components/common/Pagination";
import DriverRequestComponent from "@/components/requestComponent/request_component";
import { axiosPrivate } from "@/helper/axiosPrivate";
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
            const result = await axiosPrivate.get("/v1/user/all", {
                params: {
                    offset: currentPage,
                    limit: 5,
                    type: "user"
                }
            });
            setData(result.data ?? []);
            console.log(Math.ceil(data?.count ?? 0) / 5);
        } catch (error: any) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {

        fetchData();


    }, [currentPage]);
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Users" />
            <div className="flex flex-row items-center justify-between">
           
                <Pagination
                    currentPage={currentPage + 1}
                    totalPages={Math.ceil(data?.count ?? 0) / 5}
                    onPageChange={onPageChange}
                />
            </div>
            <DriverRequestComponent data={data?.data ?? []} />
        </DefaultLayout>
    );
};

export default UserPage;

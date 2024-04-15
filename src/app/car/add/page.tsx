"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { toast } from "react-toastify";
import { useState } from "react";
import { axiosPrivate } from "@/helper/axiosPrivate";

const AddCarBrand = () => {
    const formik = useFormik({
        initialValues: {
            name: ''

        },
        validationSchema: Yup.object({


            name: Yup.string().required('Required'),
        }),
        onSubmit: async (values, { resetForm }) => {

            try {
                await axiosPrivate.post("/v1/car_brand",{
                    name:values.name
                })
resetForm();
                window.location.href = "/car";

            } catch (error: any) {
                toast.error(error?.message ?? "Something went wrong");
            }

            // 
        },
    });

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Add Brand" />

            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                <div className="flex flex-col gap-9">

                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

                        <form onSubmit={formik.handleSubmit}>
                            <div className="p-6.5">
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Car Name
                                        </label>
                                        <input
                                            {...formik.getFieldProps('name')}
                                            type="text"
                                            placeholder="Enter your car name"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                        {formik.errors.name ? (
                                            <div className="text-sm text-black mt-2 ml-2">{formik.errors.name}</div>
                                        ) : null}
                                    </div>


                                </div>







                                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>


            </div>
        </DefaultLayout>
    );
};

export default AddCarBrand;

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
import { usePathname } from 'next/navigation'

const AddAdmin = () => {

    const formik = useFormik({
        initialValues: {
            mobilenumber: '',
            password: ""

        },
        validationSchema: Yup.object({

            password: Yup.string().required('Required'),
            mobilenumber: Yup.string().required('Required'),
        }),
        onSubmit: async (values, { resetForm }) => {

            try {
                await axiosPrivate.post("/v1/user/admin", {
                    "mobileNumber": values.mobilenumber,
                    "password": values.password
                })
                resetForm();
                window.location.href = `/profile/admin`;

            } catch (error: any) {
                toast.error(error?.message ?? "Something went wrong");
            }

            // 
        },
    });

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Add Admin" />

            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                <div className="flex flex-col gap-9">

                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

                        <form onSubmit={formik.handleSubmit}>
                            <div className="p-6.5">
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Mobile Number
                                        </label>
                                        <input
                                            {...formik.getFieldProps('mobileNumber')}
                                            type="text"
                                            placeholder="Enter your mobile number"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                        {formik.errors.mobilenumber ? (
                                            <div className="text-sm text-black mt-2 ml-2">{formik.errors.mobilenumber}</div>
                                        ) : null}
                                    </div>


                                </div>
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Password
                                        </label>
                                        <input
                                            {...formik.getFieldProps('password')}
                                            type="text"
                                            placeholder="Enter your password"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                        {formik.errors.password ? (
                                            <div className="text-sm text-black mt-2 ml-2">{formik.errors.password}</div>
                                        ) : null}
                                    </div>


                                </div>







                                <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
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

export default AddAdmin;

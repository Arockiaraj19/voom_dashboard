
"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { axiosPrivate } from "@/helper/axiosPrivate";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from 'yup';
import { usePathname, useSearchParams } from 'next/navigation'


const Notification = () => {
    const searchParams = useSearchParams();
    const [isDriverChecked, setDriverChecked] = useState<boolean>(true);
    const [isUserChecked, setUserChecked] = useState<boolean>(false);
    const [isOtherChecked, setOtherChecked] = useState<boolean>(false);
    const formik = useFormik({
        initialValues: {
            title: '',
            body: ''

        },
        validationSchema: Yup.object({


            title: Yup.string().required('Required'),
            body: Yup.string().required('Required'),
        }),
        onSubmit: async (values, { resetForm }) => {

            try {
                if (isDriverChecked || isUserChecked) {
                    if(searchParams.get("id")){
                        await axiosPrivate.post("/v1/push_notification/device", {
                            ...values,
                            users: [searchParams.get("id")]
                        })
                    }else{
                        await axiosPrivate.post("/v1/push_notification/", {
                            ...values,
                            type: isDriverChecked == true ? "driver" : "user"
                        })
                    }
                    
                    resetForm();
                    toast.success("Notification broadcasted successfully.")
                } else {
                    toast.success("Please select valid checkbox")
                }

            } catch (error: any) {
                console.log(error.response.data.error.message);
                toast.error(error?.response?.data?.error?.message ?? "Something went wrong");
            }

            // 
        },
    });
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Notification" />

            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                <div className="flex flex-col gap-9">
                    {/* <!-- Contact Form --> */}
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Notification form
                            </h3>
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="p-6.5">




                                <div className="mb-4.5">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Title
                                    </label>
                                    <input
                                      {...formik.getFieldProps('title')}
                                        type="text"
                                        placeholder="title"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                      {formik.errors.title ? (
                      <div className="text-sm text-black mt-2 ml-2">{formik.errors.title}</div>
                    ) : null}
                                </div>



                                <div className="mb-6">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Body
                                    </label>
                                    <textarea
                                     {...formik.getFieldProps('body')}
                                        rows={6}
                                        placeholder="Type your message"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    ></textarea>
                                      {formik.errors.body ? (
                      <div className="text-sm text-black mt-2 ml-2">{formik.errors.body}</div>
                    ) : null}
                                </div>
                                {
                                    searchParams.get("id")?<></>: <div className="mb-6 flex flex-row justify-between">
                                    <label
                                        htmlFor="checkboxLabelFive"
                                        className="flex cursor-pointer select-none items-center"
                                    >
                                        <div className="relative">
                                            <input

                                                type="checkbox"
                                                id="checkboxLabelFive"
                                                className="sr-only"
                                                onChange={() => {
                                                    setUserChecked(!isUserChecked);
                                                    setDriverChecked(false);
                                                    setOtherChecked(false);
                                                }}
                                            />
                                            <div
                                                className={`box mr-4 flex h-5 w-5 items-center justify-center rounded-full border border-primary ${isUserChecked && "!border-4"
                                                    }`}
                                            >
                                                <span className="h-2.5 w-2.5 rounded-full bg-white dark:bg-transparent"></span>
                                            </div>
                                        </div>
                                        Customers
                                    </label>
                                    <label
                                        htmlFor="checkboxLabel"
                                        className="flex cursor-pointer select-none items-center"
                                    >
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                id="checkboxLabel"
                                                className="sr-only"
                                                onChange={() => {
                                                    setDriverChecked(!isDriverChecked);
                                                    setOtherChecked(false);
                                                    setUserChecked(false);
                                                }}
                                            />
                                            <div
                                                className={`box mr-4 flex h-5 w-5 items-center justify-center rounded-full border border-primary ${isDriverChecked && "!border-4"
                                                    }`}
                                            >
                                                <span className="h-2.5 w-2.5 rounded-full bg-white dark:bg-transparent"></span>
                                            </div>
                                        </div>
                                        Drivers
                                    </label>
                                    {/* <label
                                        htmlFor="check"
                                        className="flex cursor-pointer select-none items-center"
                                    >
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                id="check"
                                                className="sr-only"
                                                onChange={() => {
                                                    setUserChecked(false);
                                                    setDriverChecked(false);
                                                    setOtherChecked(!isOtherChecked);
                                                }}
                                            />
                                            <div
                                                className={`box mr-4 flex h-5 w-5 items-center justify-center rounded-full border border-primary ${isOtherChecked && "!border-4"
                                                    }`}
                                            >
                                                <span className="h-2.5 w-2.5 rounded-full bg-white dark:bg-transparent"></span>
                                            </div>
                                        </div>
                                       Others
                                    </label> */}
                                </div>
                                }
                               
                                {/* { isOtherChecked &&   <MultiSelect id="multiSelect" />} */}
                                <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>


            </div>
        </DefaultLayout>
    );
};

export default Notification;

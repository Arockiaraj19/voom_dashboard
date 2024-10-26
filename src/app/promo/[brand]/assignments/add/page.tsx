"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { axiosPrivate } from "@/helper/axiosPrivate";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import SearchComponent from "@/components/SearchUserComponent";

const Notification = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const formik = useFormik({
    initialValues: {
      userId: "",
    },
    validationSchema: Yup.object({
      userId: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log(pathname.split("/")[(pathname.split("/").length - 3)]);
       
        await axiosPrivate.post(
          `/v1/promo/add_assignments`,
          {
            promo_id:pathname.split("/")[(pathname.split("/").length - 3)],
            users:[values.userId]
          }
        );
        resetForm();
        toast.success("User Added Successfully.");
        setTimeout(() => {
          router.back();
        }, 2000);
      } catch (error: any) {
        console.log(error.response.data.error.message);
        toast.error(
          error?.response?.data?.error?.message ?? "Something went wrong",
        );
      }

      //
    },
  });
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Promo Users" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark"></div>
            <form onSubmit={formik.handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    User
                  </label>
                  <SearchComponent
                    submit={(e: any) => {
                      formik.setFieldValue("userId", e._id.toString());
                    }}
                  />
                  {formik.errors.userId ? (
                    <div className="ml-2 mt-2 text-sm text-black">
                      {formik.errors.userId}
                    </div>
                  ) : null}
                </div>

                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                 Add
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
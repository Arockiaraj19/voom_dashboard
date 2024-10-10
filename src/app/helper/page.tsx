"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { axiosPrivate } from "@/helper/axiosPrivate";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useSearchParams, useRouter } from "next/navigation";

const HelperPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      basefare: "",
      timeRate: "",
      distanceRate: "",
      bookingFee: "",
      surge: "",
      other: "",
      driverPercentage: "",
      passengerPercentage: "",
      minimumCharge: "",
      cancel_driver_charge: "",
      cancel_user_charge: "",
    },
    validationSchema: Yup.object({
      minimumCharge: Yup.string().required("Required"),
      basefare: Yup.string().required("Required"),
      timeRate: Yup.string().required("Required"),
      distanceRate: Yup.string().required("Required"),
      bookingFee: Yup.string().required("Required"),
      surge: Yup.string().required("Required"),
      other: Yup.string().required("Required"),
      driverPercentage: Yup.string().required("Required"),
      passengerPercentage: Yup.string().required("Required"),
      cancel_driver_charge: Yup.string().required("Required"),
      cancel_user_charge: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        if (searchParams.get("id")) {
          await axiosPrivate.patch(
            `/v1/schedule/payment_helper/${searchParams.get("id")}`,
            {
              minimumCharge: Number(values.minimumCharge),
              basefare: Number(values.basefare),
              timeRate: Number(values.timeRate),
              distanceRate: Number(values.distanceRate),
              bookingFee: Number(values.bookingFee),
              surge: Number(values.surge),
              other: Number(values.other),
              driver_payment_charge: Number(values.driverPercentage),
              passenger_payment_charge: Number(values.passengerPercentage),
              cancel_driver_charge: Number(values.cancel_driver_charge),
              cancel_user_charge: Number(values.cancel_user_charge),
            },
          );
        }else{
          await axiosPrivate.put("/v1/helper", {
            minimumCharge: Number(values.minimumCharge),
            basefare: Number(values.basefare),
            timeRate: Number(values.timeRate),
            distanceRate: Number(values.distanceRate),
            bookingFee: Number(values.bookingFee),
            surge: Number(values.surge),
            other: Number(values.other),
            driver_payment_charge: Number(values.driverPercentage),
            passenger_payment_charge: Number(values.passengerPercentage),
            cancel_driver_charge: Number(values.cancel_driver_charge),
            cancel_user_charge: Number(values.cancel_user_charge),
          });
        }
    
        if (searchParams.get("id")) {
          toast.success("Schedule Payment helper updated successfully.");
          router.back();
        }else{
          toast.success("Payment helper updated successfully.");
        }
        
      } catch (error: any) {
        console.log(error);
        toast.error(error?.error?.message ?? "Something went wrong");
      }

      //
    },
  });

  const fetchData = async () => {
    try {
      let paymentHelper;
      if (searchParams.get("id")) {
        const result = await axiosPrivate.get(
          `/v1/schedule/${searchParams.get("id")}`,
        );
        paymentHelper = result.data.payment_helper;
      } else {
        const result = await axiosPrivate.get("/v1/helper");
        paymentHelper = result.data[0];
      }

      formik.setValues({
        basefare: paymentHelper.basefare.toString(),
        bookingFee: paymentHelper.bookingFee.toString(),
        distanceRate: paymentHelper.distanceRate.toString(),
        other: paymentHelper.other.toString(),
        surge: paymentHelper.surge.toString(),
        timeRate: paymentHelper.timeRate.toString(),
        driverPercentage: paymentHelper?.driver_payment_charge
          ? paymentHelper?.driver_payment_charge.toString()
          : "",
        passengerPercentage: paymentHelper?.passenger_payment_charge
          ? paymentHelper?.passenger_payment_charge.toString()
          : "",
        minimumCharge: paymentHelper?.minimumCharge
          ? paymentHelper?.minimumCharge.toString()
          : "",
        cancel_driver_charge: paymentHelper?.cancel_driver_charge
          ? paymentHelper?.cancel_driver_charge.toString()
          : "",
        cancel_user_charge: paymentHelper?.cancel_user_charge
          ? paymentHelper?.cancel_user_charge.toString()
          : "",
      });
    } catch (error: any) {
    } finally {
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="HelperPage" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Helper</h3>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Minimum Wage
                  </label>
                  <input
                    {...formik.getFieldProps("minimumCharge")}
                    type="text"
                    placeholder="Minimum Wage"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {formik.errors.minimumCharge ? (
                    <div className="ml-2 mt-2 text-sm text-black">
                      {formik.errors.minimumCharge}
                    </div>
                  ) : null}
                </div>
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Basefare
                  </label>
                  <input
                    {...formik.getFieldProps("basefare")}
                    type="text"
                    placeholder="Basefare"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {formik.errors.basefare ? (
                    <div className="ml-2 mt-2 text-sm text-black">
                      {formik.errors.basefare}
                    </div>
                  ) : null}
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Time Rate
                  </label>
                  <input
                    {...formik.getFieldProps("timeRate")}
                    type="text"
                    placeholder="Time Rate"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {formik.errors.timeRate ? (
                    <div className="ml-2 mt-2 text-sm text-black">
                      {formik.errors.timeRate}
                    </div>
                  ) : null}
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Distance Rate
                  </label>
                  <input
                    {...formik.getFieldProps("distanceRate")}
                    type="text"
                    placeholder="Distance Rate"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {formik.errors.distanceRate ? (
                    <div className="ml-2 mt-2 text-sm text-black">
                      {formik.errors.distanceRate}
                    </div>
                  ) : null}
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Booking Fee
                  </label>
                  <input
                    {...formik.getFieldProps("bookingFee")}
                    type="text"
                    placeholder="Booking Fee"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {formik.errors.bookingFee ? (
                    <div className="ml-2 mt-2 text-sm text-black">
                      {formik.errors.bookingFee}
                    </div>
                  ) : null}
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Surge
                  </label>
                  <input
                    {...formik.getFieldProps("surge")}
                    type="text"
                    placeholder="Surge"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {formik.errors.surge ? (
                    <div className="ml-2 mt-2 text-sm text-black">
                      {formik.errors.surge}
                    </div>
                  ) : null}
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Other
                  </label>
                  <input
                    {...formik.getFieldProps("other")}
                    type="text"
                    placeholder="Other"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {formik.errors.other ? (
                    <div className="ml-2 mt-2 text-sm text-black">
                      {formik.errors.other}
                    </div>
                  ) : null}
                </div>
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Voom Payment Percentage
                  </label>
                  <input
                    {...formik.getFieldProps("driverPercentage")}
                    type="text"
                    placeholder="Voom Payment Percentage"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {formik.errors.driverPercentage ? (
                    <div className="ml-2 mt-2 text-sm text-black">
                      {formik.errors.driverPercentage}
                    </div>
                  ) : null}
                </div>
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Percentage increase Per passenger
                  </label>
                  <input
                    {...formik.getFieldProps("passengerPercentage")}
                    type="text"
                    placeholder="Percentage increase Per passenger"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {formik.errors.passengerPercentage ? (
                    <div className="ml-2 mt-2 text-sm text-black">
                      {formik.errors.passengerPercentage}
                    </div>
                  ) : null}
                </div>
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Parent percentage when the user cancels the trip
                  </label>
                  <input
                    {...formik.getFieldProps("cancel_user_charge")}
                    type="text"
                    placeholder="Parent percentage when the user cancels the trip"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {formik.errors.cancel_user_charge ? (
                    <div className="ml-2 mt-2 text-sm text-black">
                      {formik.errors.cancel_user_charge}
                    </div>
                  ) : null}
                </div>
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Driver percentage when the user cancels the trip
                  </label>
                  <input
                    {...formik.getFieldProps("cancel_driver_charge")}
                    type="text"
                    placeholder="Driver percentage when the user cancels the trip"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {formik.errors.cancel_driver_charge ? (
                    <div className="ml-2 mt-2 text-sm text-black">
                      {formik.errors.cancel_driver_charge}
                    </div>
                  ) : null}
                </div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
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

export default HelperPage;

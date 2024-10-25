"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { axiosPrivate } from "@/helper/axiosPrivate";
import Switch from "@/components/common/Switch";
import CommonPicker from "@/components/common/commonPicker";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import moment from "moment";
const AddPromo = () => {
  const [type, setType] = useState(false);
  const [discountType, setDiscountType] = useState(false);
  const [active, setActive] = useState(false);
  const searchParams = useSearchParams();
  const formik = useFormik({
    initialValues: {
      code: "",
      description: "",
      discount_value: "",
      expiration_date: "",
    },
    validationSchema: Yup.object({
      code: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      discount_value: Yup.string().required("Required"),
      expiration_date: Yup.string().required("percentage"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        if (searchParams.get("id")) {
          await axiosPrivate.put(`/v1/promo/${searchParams.get("id")}`, {
            ...values,
            discount_value: Number(values.discount_value),
            status: !active ? "active" : "expired",
            type: !type ? "all" : "specific",
            discount_type: !discountType ? "percentage" : "fixed",
          });
        } else {
          await axiosPrivate.post("/v1/promo", {
            ...values,
            discount_value: Number(values.discount_value),
            status: !active ? "active" : "expired",
            type: !type ? "all" : "specific",
            discount_type: !discountType ? "percentage" : "fixed",
          });
        }

        resetForm();
        window.location.href = "/promo";
      } catch (error: any) {
        toast.error(error?.message ?? "Something went wrong");
      }

      //
    },
  });
  const fetchData = async () => {
    try {
      const result = await axiosPrivate.patch(
        `/v1/promo/${searchParams.get("id")}`,
      );

      formik.setValues({
        code: result.data.code,
        description: result.data.description,
        discount_value: result.data.discount_value.toString(),
        expiration_date: moment
          .utc(result.data.expiration_date)
          .format("YYYY-MM-DD"),
      });
      setDiscountType(result.data.discount_type == "percentage" ? false : true);
      setType(result.data.type == "all" ? false : true);
      setActive(result.data.status == "active" ? false : true);
    } catch (error: any) {
      console.log("what is the error");
    } finally {
    }
  };
  useEffect(() => {
    if (searchParams.get("id")) {
      fetchData();
    }
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Promo" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <form onSubmit={formik.handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Code
                    </label>
                    <input
                      {...formik.getFieldProps("code")}
                      type="text"
                      placeholder="Enter your promo code"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {formik.errors.code ? (
                      <div className="ml-2 mt-2 text-sm text-black">
                        {formik.errors.code}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Description
                    </label>
                    <input
                      {...formik.getFieldProps("description")}
                      type="text"
                      placeholder="Enter your promo description"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {formik.errors.description ? (
                      <div className="ml-2 mt-2 text-sm text-black">
                        {formik.errors.description}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Discount Value
                    </label>
                    <input
                      {...formik.getFieldProps("discount_value")}
                      type="number"
                      placeholder="Enter your promo discount value"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {formik.errors.discount_value ? (
                      <div className="ml-2 mt-2 text-sm text-black">
                        {formik.errors.discount_value}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Discount Type-Percentage/Fixed
                    </label>
                    <Switch
                      enabled={discountType}
                      setEnabled={setDiscountType}
                    />
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Type-All/Specific
                    </label>
                    <Switch enabled={type} setEnabled={setType} />
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Status-Active/Expired
                    </label>
                    <Switch enabled={active} setEnabled={setActive} />
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full">
                    <CommonPicker
                      form={formik.getFieldProps("expiration_date")}
                      key={2}
                      heading={"Expiration date"}
                      onChange={(e: any) => {
                        console.log("end date", e);

                        formik.setFieldValue("expiration_date", e);
                      }}
                    />
                    {formik.errors.expiration_date ? (
                      <div className="ml-2 mt-2 text-sm text-red">
                        {formik.errors.expiration_date}
                      </div>
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

export default AddPromo;

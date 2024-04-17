
"use client"
import DateOfBirth from "@/components/FormElements/DatePicker/DateOfBirth"
import SelectGender from "@/components/SelectGroup/SelectGender"
import SelectStatus from "@/components/SelectGroup/SelectStatus"
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from 'yup';
import flatpickr from "flatpickr";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { axiosPrivate } from "@/helper/axiosPrivate";
import { toast } from "react-toastify";
import moment from "moment";
import LoadingOverlay from "@/components/common/LoadingOverlay";
import useUserData from "@/hooks/userData";

const PersonalInformation = ({ data }: { data: any }) => {
    const [loading,setLoading]=useState(false);
    const pathname = usePathname();
    const [selectedDate, setSelectedDate] = useState<any>(data.date_of_birth);
    const { userData, isLoading }=useUserData();
    useEffect(() => {
        // Init flatpickr
        flatpickr(".form-datepicker", {
        
            mode: "single",
            static: true,
            monthSelectorType: "static",
            dateFormat: 'd-m-Y',

            onChange: selectedDates => {
                // Update the selectedDate state when the date changes
                console.log(selectedDates[0]);
                setSelectedDate(selectedDates[0]);
            },
            prevArrow:
                '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
            nextArrow:
                '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
        });
    }, []);

    const [selectedOption, setSelectedOption] = useState<any>(data.gender);
    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

    const changeTextColor = () => {
        setIsOptionSelected(true);
    };
    const formik:any = useFormik({
        initialValues: {
            first_name: data.first_name,
            last_name: data.last_name,
          
            email: data.email,
          
            mobile_number: data.mobile_number
        },
        validationSchema: Yup.object({


            first_name: Yup.string().required('Required'),
            last_name: Yup.string().required('Required'),
           
            email: Yup.string().required('Required'),
           
            mobile_number: Yup.string().required('Required'),

        }),
        onSubmit: async (values, { resetForm }) => {

            try {
                setLoading(true);
                const payload:any={...values};
                if(selectedDate){
                    payload.date_of_birth=new Date(selectedDate);
                }
                if(selectedOption){
                    payload.gender=selectedOption;
                }

                const result = await axiosPrivate.put("/v1/user/admin", {
                   ...payload,
                    userId: pathname.split("/")[(pathname.split("/").length - 1)]
                  });
                 
                  toast.success("Status updated successfully");
                  setLoading(false);
                  if(userData?._id==pathname.split("/")[(pathname.split("/").length - 1)]){
                    localStorage.removeItem('userData');
                    window.location.href="/";
                  }
            } catch (error) {
                setLoading(false);
            }

            // 
        },
    });
    return <div className="col-span-5 xl:col-span-3">
        <LoadingOverlay show={loading}/>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    Personal Information
                </h3>
            </div>
            <div className="p-7">
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                        <div className="w-full sm:w-1/2">
                            <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor="fullName"
                            >
                                First Name
                            </label>
                            <div className="relative">
                                <span className="absolute left-4.5 top-4">
                                    <svg
                                        className="fill-current"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g opacity="0.8">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                                                fill=""
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                                                fill=""
                                            />
                                        </g>
                                    </svg>
                                </span>
                                <input
                                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="text"

                                    {...formik.getFieldProps('first_name')}
                                    placeholder="Devid "

                                />
                                {formik.errors.first_name ? (
                                    <div className="text-sm text-black mt-2 ml-2">{formik?.errors?.first_name??""}</div>
                                ) : null}
                            </div>
                        </div>

                        <div className="w-full sm:w-1/2">
                            <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor="phoneNumber"
                            >
                                Last Name
                            </label>
                            <input
                                className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="text"
                                {...formik.getFieldProps('last_name')}
                                placeholder="Jhon"

                            />
                            {formik.errors.last_name ? (
                                <div className="text-sm text-black mt-2 ml-2">{formik?.errors?.last_name??""}</div>
                            ) : null}
                        </div>
                    </div>
                    <div className="mb-5.5">
                        <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="phoneNumber"
                        >
                            Phone Number
                        </label>
                        <input
                            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            {...formik.getFieldProps('mobile_number')}
                            placeholder="+990 3343 7865"

                        />
                        {formik.errors.mobile_number ? (
                            <div className="text-sm text-black mt-2 ml-2">{formik?.errors?.mobile_number??""}</div>
                        ) : null}
                    </div>
                    <div className="mb-5.5">
                        <div>
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Date of birth
                            </label>
                            <div className="relative">
                                <input

                                    className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    placeholder="mm/dd/yyyy"
                                    data-class="flatpickr-right"
                                    value={selectedDate==null?"":moment(selectedDate).format('YYYY-MM-DD')}
                                />

                                <div className="pointer-events-none absolute inset-0 left-auto right-5 flex items-center">
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M9.0002 12.8249C8.83145 12.8249 8.69082 12.7687 8.5502 12.6562L2.08145 6.2999C1.82832 6.04678 1.82832 5.65303 2.08145 5.3999C2.33457 5.14678 2.72832 5.14678 2.98145 5.3999L9.0002 11.278L15.0189 5.34365C15.2721 5.09053 15.6658 5.09053 15.9189 5.34365C16.1721 5.59678 16.1721 5.99053 15.9189 6.24365L9.45019 12.5999C9.30957 12.7405 9.16895 12.8249 9.0002 12.8249Z"
                                            fill="#64748B"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-5.5">
                        <div>
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Select Gender
                            </label>

                            <div className="relative z-20 bg-white dark:bg-form-input">


                                <select
                                  
                                    value={selectedOption}
                                    onChange={(e) => {
                                        setSelectedOption(e.target.value);
                                        changeTextColor();
                                    }}
                                    className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-3 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${isOptionSelected ? "text-black dark:text-white" : ""
                                        }`}
                                >
                                    <option value="" disabled className="text-body dark:text-bodydark">
                                        Select Gender
                                    </option>
                                    <option value="Male" className="text-body dark:text-bodydark">
                                        Male
                                    </option>
                                    <option value="Female" className="text-body dark:text-bodydark">
                                        Female
                                    </option>
                                    <option value="Others" className="text-body dark:text-bodydark">
                                        Others
                                    </option>
                                </select>

                                <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g opacity="0.8">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                fill="#637381"
                                            ></path>
                                        </g>
                                    </svg>
                                </span>
                             
                            </div>
                        </div>
                    </div>

                    <div className="mb-5.5">
                        <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="emailAddress"
                        >
                            Email Address
                        </label>
                        <div className="relative">
                            <span className="absolute left-4.5 top-4">
                                <svg
                                    className="fill-current"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g opacity="0.8">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                                            fill=""
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                                            fill=""
                                        />
                                    </g>
                                </svg>
                            </span>
                            <input
                                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="email"
                                {...formik.getFieldProps('email')}
                                placeholder="devidjond45@gmail.com"

                            />
                            {formik.errors.email ? (
                                <div className="text-sm text-black mt-2 ml-2">{formik.errors.email}</div>
                            ) : null}
                        </div>
                    </div>



                    <div className="flex justify-end gap-4.5">

                        <button
                            className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                            type="submit"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

}

export default PersonalInformation;
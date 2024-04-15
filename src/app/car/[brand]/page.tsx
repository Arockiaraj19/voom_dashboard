"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CarModelComponent from "@/components/CarComponents/car_model_component";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import { usePathname } from 'next/navigation'

const CarBrandPage = () => {
  const pathname = usePathname();

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Car Model" />
      <div className="w-full flex flex-row justify-end my-4">
        <Link
          href={`/car/${pathname.split("/")[(pathname.split("/").length - 1)]}/add`}
          className="inline-flex items-center justify-center rounded-md border border-primary px-10 py-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add
        </Link>
      </div>
      <CarModelComponent />
    </DefaultLayout>
  );
};

export default CarBrandPage;

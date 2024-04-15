import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CarBrandComponent from "@/components/CarComponents/car_brand_component";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";


const CarBrandPage= () => {
  return (
    <DefaultLayout>
      <Breadcrumb  pageName="Car" />
      <div className="w-full flex flex-row justify-end my-4">
      <Link
              href="/car/add"
              className="inline-flex items-center justify-center rounded-md border border-primary px-10 py-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
             Add
            </Link>
      </div>
      <CarBrandComponent/>
    </DefaultLayout>
  );
};

export default CarBrandPage;

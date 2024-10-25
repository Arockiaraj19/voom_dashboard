import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import PromoComponent from "@/components/PromoComponents/promo_component";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";

const PromoPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Promo" />
      <div className="my-4 flex w-full flex-row justify-end">
        <Link
          href="/promo/add"
          className="inline-flex items-center justify-center rounded-md border border-primary px-10 py-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add
        </Link>
      </div>
      <PromoComponent />
    </DefaultLayout>
  );
};

export default PromoPage;

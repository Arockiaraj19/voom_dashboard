import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import PromoComponent from "@/components/PromoComponents/promo__usage_component";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";

const PromoPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Promo Usage" />
     
      <PromoComponent />
    </DefaultLayout>
  );
};

export default PromoPage;

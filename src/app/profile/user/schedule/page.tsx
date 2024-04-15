import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import UserScheduleListComponent from "@/components/UserComponent/user_schedule_list_component";


const UserSchedulePage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="User" />

      <UserScheduleListComponent />
    </DefaultLayout>
  );
};

export default UserSchedulePage;

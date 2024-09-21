import SchedulePayment from "@/components/ScheduleTransactions";
import DriverPayment from "@/components/DriverTransactions";
import UserPayment from "@/components/UserTransactions";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";



export default function Home() {
  return (
    <>
      <DefaultLayout>
        <div className="flex flex-col gap-10">
        <SchedulePayment/>
        <DriverPayment/>
        <UserPayment/>
        </div>
      </DefaultLayout>
    </>
  );
}

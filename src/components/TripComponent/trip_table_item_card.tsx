import { axiosPrivate } from "@/helper/axiosPrivate";
import navigateToMap from "@/helper/navigateToMap";
import moment from "moment";
import { useState, useEffect } from "react";
import Dropdown from "@/components/common/Dropdown";
import { toast } from "react-toastify";
import TripCancelModel from "../TripCancelModel";

const TripTableItemCard = ({
  payedAmount,
  setPayedAmount,
  item,
  index,
}: {
  payedAmount: any;
  setPayedAmount: any;
  item: any;
  index: number;
}) => {
  console.log("trip table", item);
  const [tripItem, setItem] = useState({
    ...item,
  });
  let [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<any>(null);

  const updateStatus = async () => {
    try {
      if (!status) {
        return;
      }
      let payload: any = {
        status: status,
      };
      if (status == "started") {
        payload.startTime = moment(new Date()).format("YYYY-MM-DD HH:mm");
      }
      if (status == "completed") {
        payload.endTime = moment(new Date()).format("YYYY-MM-DD HH:mm");
      }
      const result = await axiosPrivate.patch(
        `/v1/trip/${tripItem._id.toString()}`,
        payload,
      );
      if (status == "started") {
        setItem({
          ...tripItem,
          status: status,
          start_time: moment(new Date()).format("YYYY-MM-DD HH:mm"),
        });
      } else if (status == "completed") {
        setItem({
          ...tripItem,
          status: status,
          end_time: moment(new Date()).format("YYYY-MM-DD HH:mm"),
        });
      } else {
        setItem({
          ...tripItem,
          status: status,
        });
      }

      toast.success("Trip status updated");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.error?.message ?? "Something went wrong",
      );
    }
  };

  useEffect(() => {
    updateStatus();
  }, [status]);

  return (
    <tr key={item._id}>
      <TripCancelModel
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        id={tripItem?._id}
      />
      <td
        onClick={(e) => {
          window.location.href = `/settings/${tripItem?.user?._id}`;
        }}
        className="cursor-pointer border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11"
      >
        <p className="text-black dark:text-white">
          {tripItem?.user?.first_name}
        </p>
      </td>
      <td
        onClick={(e) => {
          window.location.href = `/settings/${tripItem?.driver?._id}`;
        }}
        className="cursor-pointer border-b border-[#eee] px-4 py-5 dark:border-strokedark"
      >
        <p className="text-black dark:text-white">
          {tripItem?.driver?.first_name}
        </p>
      </td>
      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
        <p className="text-black dark:text-white">
          {moment(tripItem?.pickup_time).local().format("dddd, MMMM Do YYYY")}
        </p>
      </td>
      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
        <p className="text-black dark:text-white">
          {moment(tripItem?.pickup_time).format("hh:mm A")}
        </p>
      </td>
      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
        <p className="text-black dark:text-white">
          {moment(tripItem?.drop_time).format("hh:mm A")}
        </p>
      </td>
      <td
        onClick={(event) => {
          navigateToMap(
            tripItem?.locations[0].location.coordinates[0],
            tripItem?.locations[0].location.coordinates[1],
          );
        }}
        className="cursor-pointer border-b border-[#eee] px-4 py-5 dark:border-strokedark"
      >
        <p className="text-black dark:text-white">
          {tripItem?.locations[0].name}
        </p>
      </td>
      <td
        onClick={(event) => {
          navigateToMap(
            tripItem?.locations[1].location.coordinates[0],
            tripItem?.locations[1].location.coordinates[1],
          );
        }}
        className="cursor-pointer border-b border-[#eee] px-4 py-5 dark:border-strokedark"
      >
        <p className="text-black dark:text-white">
          {tripItem?.locations[1].name}
        </p>
      </td>
      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
        <p className="text-black dark:text-white">
          {tripItem?.type.toUpperCase()}
        </p>
      </td>
      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
        <p className="font-medium text-black dark:text-white">
          {tripItem?.status.toUpperCase()}
        </p>
      </td>
      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
        <p className="text-black dark:text-white">
          {tripItem?.start_time == null
            ? ""
            : moment(tripItem?.start_time).format("hh:mm A")}
        </p>
      </td>
      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
        <p className="text-black dark:text-white">
          {tripItem?.end_time == null
            ? ""
            : moment(tripItem?.end_time).format("hh:mm A")}
        </p>
      </td>
      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
        <p className="text-black dark:text-white">
          {tripItem?.payment ?? "N/A"}
        </p>
      </td>
      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
        <p className="text-black dark:text-white">
          {tripItem?.driver_payment ??
            tripItem.payment - tripItem.payment * (10 / 100)}
        </p>
      </td>
      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
        <p
          className={`${(tripItem?.user_transactions ?? []).filter((e: any) => e.amount && e.type == "credit").length != 0 ? "text-green-600" : "text-blue-600"} dark:text-white`}
        >
          {(tripItem?.user_transactions ?? []).filter(
            (e: any) => e.amount && e.type == "credit",
          ).length != 0
            ? "Received"
            : "Pending"}
        </p>
      </td>
      <td
        onClick={async (e) => {
          // if((tripItem?.user_transactions??[]).filter((e:any)=>e.amount&&e.type=='credit').length==0){
          //     toast.error("Driver is not completed");
          //     return ;
          // }
          if (tripItem?.payment_status == "completed") {
            return;
          }
          e.preventDefault();
          try {
            const result = await axiosPrivate.patch(
              `/v1/trip/update_driver_payment/${tripItem._id.toString()}`,
            );
            setPayedAmount(
              (prevCount: any) =>
                prevCount +
                (tripItem?.driver_payment ??
                  tripItem.payment - tripItem.payment * (10 / 100)),
            );
            setItem({
              ...tripItem,
              payment_status: "completed",
            });
          } catch (error: any) {
            toast.error(
              error?.response?.data?.error?.message ?? "Something went wrong",
            );
          }
        }}
        className="cursor-pointer border-b border-[#eee] px-4 py-5  dark:border-strokedark"
      >
        <p
          className={
            tripItem.payment_status == "completed"
              ? "text-green-600 dark:text-green-600"
              : "text-blue-600 dark:text-blue-600"
          }
        >
          {tripItem?.payment_status ?? "N/A"}
        </p>
      </td>
      <td
        onClick={(e) => {
          if (tripItem?.payment_status == "pending") {
            window.location.href = `/trip/transfer?driver_id=${tripItem?.driver?._id}&id=${tripItem?._id}`;
          } else {
            toast.error("We can only transfer pending trips.");
          }
        }}
        className="cursor-pointer border-b border-[#eee] px-4 py-5 dark:border-strokedark"
      >
        <p className="text-blue-600 dark:text-white">Transfer</p>
      </td>
      <td className="cursor-pointer border-b border-[#eee] px-4 py-5 dark:border-strokedark">
        <p className="text-black dark:text-white">
          {(tripItem?.review ?? []).length == 0
            ? "N/A"
            : (tripItem?.review ?? [])[0].rating.toString()}
        </p>
      </td>
      <td className="cursor-pointer border-b border-[#eee] px-4 py-5 dark:border-strokedark">
        <p className="text-black dark:text-white">
          {(tripItem?.review ?? []).length == 0
            ? "N/A"
            : (tripItem?.review ?? [])[0].feedback}
        </p>
      </td>
      <td
        onClick={(ev) => {
          if (tripItem.status == "pending" || tripItem.status == "started") {
            setIsOpen(true);
          }
        }}
        className="cursor-pointer border-b border-[#eee] px-4 py-5 dark:border-strokedark"
      >
        <p className="text-red dark:text-white">
          {tripItem.status == "cancelled" ? "Already Cancelled" : "Cancel"}
        </p>
      </td>
      <td className="cursor-pointer border-b border-[#eee] px-4 py-5 dark:border-strokedark">
        <Dropdown
          onSelect={(e) => {
            setStatus(e);
          }}
          options={[
            "pending",
            "started",
            "nearby",
            "reached",
            "onprogress",
            "completed",
          ]}
          title="Update Status"
          heading="Status"
          selected={status ?? ""}
        />
      </td>
    </tr>
  );
};

export default TripTableItemCard;

import { axiosPrivate } from "@/helper/axiosPrivate";
import navigateToMap from "@/helper/navigateToMap";
import moment from "moment";
import { useState, useEffect } from "react";
import Dropdown from "@/components/common/Dropdown";
import { toast } from "react-toastify";

const CancelAlertItemCard = ({ item }: { item: any }) => {
  const [data, setData] = useState({
    ...item,
  });
  let [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<any>(null);

  const updateStatus = async () => {
    try {
      const result = await axiosPrivate.patch(
        `/v1/notification?notificationId=${data._id.toString()}`,
      );
      setData(result);

      toast.success("Notification status updated");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.error?.message ?? "Something went wrong",
      );
    }
  };

  return (
    <tr key={item._id}>
      <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
        <h5 className="font-medium text-black dark:text-white">{item.title}</h5>
      </td>
      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
        <p className="text-black dark:text-white">{item.message}</p>
      </td>
      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
        <p className="text-black dark:text-white">{item.type}</p>
      </td>
      <td
        onClick={(e: any) => {
          if (item.status == "unread") {
            updateStatus();
          }
        }}
        className=" cursor-pointer border-b border-[#eee] px-4 py-5 dark:border-strokedark"
      >
        <p className={item.status == "unread" ?"text-blue-600 dark:text-white":"text-black"}>
          {item.status == "unread" ? "Un Read" : "Read"}
        </p>
      </td>

      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
        <p className="text-black dark:text-white">
          {moment.utc(item.createdAt).format("LLL")}
        </p>
      </td>
    </tr>
  );
};

export default CancelAlertItemCard;

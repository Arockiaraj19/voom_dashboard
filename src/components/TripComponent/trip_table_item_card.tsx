import { axiosPrivate } from "@/helper/axiosPrivate";
import navigateToMap from "@/helper/navigateToMap";
import moment from "moment"
import { useState } from "react";

import { toast } from "react-toastify";
import TripCancelModel from "../TripCancelModel";

const TripTableItemCard = ({ item, index }: { item: any, index: number }) => {
console.log("trip table",item);
const [tripItem,setItem]=useState({
    ...item
});
let [isOpen, setIsOpen] = useState(false)
    return <tr key={item._id}>
         <TripCancelModel isOpen={isOpen} setIsOpen={setIsOpen} id={tripItem?._id}/>
        <td onClick={(e)=>{
                 window.location.href = `/settings/${tripItem?.user?._id}`;
            }} className="cursor-pointer border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
        <p className="text-black dark:text-white">
               {tripItem?.user?.first_name}
               
            </p>
        </td>
        <td onClick={(e)=>{
                 window.location.href = `/settings/${tripItem?.driver?._id}`;
            }} className="border-b cursor-pointer border-[#eee] px-4 py-5 dark:border-strokedark">
            <p className="text-black dark:text-white">
            {tripItem?.driver?.first_name}
            </p>
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
            <p className="text-black dark:text-white">
                {moment(tripItem?.pickup_time).utc().format('LLL')}
            </p>
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
            <p className="text-black dark:text-white">
                {moment(tripItem?.drop_time).utc().format('LLL')}
            </p>
        </td>
        <td onClick={(event)=>{
          
                  navigateToMap(tripItem?.locations[0].coordinates[0], tripItem?.locations[0].coordinates[1]);
            }}  className="border-b cursor-pointer border-[#eee] px-4 py-5 dark:border-strokedark">
            <p className="text-black dark:text-white">
            {tripItem?.locations[0].name}
            </p>
        </td>
        <td  onClick={(event)=>{
          
          navigateToMap(tripItem?.locations[1].coordinates[0], tripItem?.locations[1].coordinates[1]);
    }} className="cursor-pointer border-b border-[#eee] px-4 py-5 dark:border-strokedark">
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
            <p className="text-black font-medium dark:text-white">
            {tripItem?.status.toUpperCase()}
            </p>
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
            <p className="text-black dark:text-white">
            {tripItem?.start_time==null?"": moment(tripItem?.start_time).format('LLL')}
            </p>
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
            <p className="text-black dark:text-white">
            {tripItem?.end_time==null?"": moment(tripItem?.end_time).format('LLL')}
            </p>
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
            <p className="text-black dark:text-white">
            {tripItem?.payment??"N/A"}
            </p>
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
            <p className="text-black dark:text-white">
            {tripItem?.driver_payment?? (tripItem.payment -
      tripItem.payment * (10 / 100))}
            </p>
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
            <p className={
             `${(tripItem?.user_transactions??[]).filter((e:any)=>e.amount&&e.type=='credit').length!=0?"text-green-600":"text-blue-600"} dark:text-white`
            }>
            {(tripItem?.user_transactions??[]).filter((e:any)=>e.amount&&e.type=='credit').length!=0?"Received":"Pending"}
            </p>
        </td>
        <td onClick={async(e)=>{
            if(tripItem?.payment_status=="completed"){
                return;
            }
            e.preventDefault();
            try {
               
                const result = await axiosPrivate.patch(`/v1/trip/update_driver_payment/${tripItem._id.toString()}`);
                setItem({
                    ...tripItem,payment_status:"completed"
                });
             
              } catch (error: any) {
                toast.error(error?.response?.data?.error?.message ?? "Something went wrong");
              
              }
        }} className="border-b border-[#eee] px-4 py-5 cursor-pointer  dark:border-strokedark">
            <p className="text-blue-600 dark:text-blue-600">
            {tripItem?.payment_status??"N/A"}
            </p>
        </td>
        <td  onClick={(e)=>{
              if(tripItem?.payment_status=="pending"){
                window.location.href = `/trip/transfer?driver_id=${tripItem?.driver?._id}&id=${tripItem?._id}`;
            }else{
                toast.error("We can only transfer pending trips.");
            }
                
            }} className="border-b cursor-pointer border-[#eee] px-4 py-5 dark:border-strokedark">
            <p className="text-blue-600 dark:text-white">
           Transfer
            </p>
        </td>
        <td   className="border-b cursor-pointer border-[#eee] px-4 py-5 dark:border-strokedark">
            <p className="text-black dark:text-white">
            {(tripItem?.review??[]).length==0?"N/A":(tripItem?.review??[])[0].rating.toString()}
            </p>
        </td>
        <td  className="border-b cursor-pointer border-[#eee] px-4 py-5 dark:border-strokedark">
            <p className="text-black dark:text-white">
            {(tripItem?.review??[]).length==0?"N/A":(tripItem?.review??[])[0].feedback}
            </p>
        </td>
        <td onClick={(ev)=>setIsOpen(true)} className="border-b cursor-pointer border-[#eee] px-4 py-5 dark:border-strokedark">
            <p className="text-red dark:text-white">
          Cancel 
            </p>
        </td>
    </tr>
}

export default TripTableItemCard
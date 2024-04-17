import navigateToMap from "@/helper/navigateToMap";
import moment from "moment"



const TripTableItemCard = ({ item, index }: { item: any, index: number }) => {
    return <tr key={index}>
        <td onClick={(e)=>{
                 window.location.href = `/settings/${item?.user?._id}`;
            }} className="cursor-pointer border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
        <p className="text-black dark:text-white">
               {item?.user?.first_name}
               
            </p>
        </td>
        <td onClick={(e)=>{
                 window.location.href = `/settings/${item?.driver?._id}`;
            }} className="border-b cursor-pointer border-[#eee] px-4 py-5 dark:border-strokedark">
            <p className="text-black dark:text-white">
            {item?.driver?.first_name}
            </p>
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
            <p className="text-black dark:text-white">
                {moment(item?.pickup_time).format('LLL')}
            </p>
        </td>
        <td onClick={(event)=>{
          
                  navigateToMap(item?.locations[0].coordinates[0], item?.locations[0].coordinates[1]);
            }}  className="border-b cursor-pointer border-[#eee] px-4 py-5 dark:border-strokedark">
            <p className="text-black dark:text-white">
            {item?.locations[0].name}
            </p>
        </td>
        <td  onClick={(event)=>{
          
          navigateToMap(item?.locations[1].coordinates[0], item?.locations[1].coordinates[1]);
    }} className="cursor-pointer border-b border-[#eee] px-4 py-5 dark:border-strokedark">
            <p className="text-black dark:text-white">
            {item?.locations[1].name}
            </p>
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
            <p className="text-black dark:text-white">
            {item?.type.toUpperCase()}
            </p>
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
            <p className="text-black font-medium dark:text-white">
            {item?.status.toUpperCase()}
            </p>
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
            <p className="text-black dark:text-white">
            {item?.start_time==null?"": moment(item?.start_time).format('LLL')}
            </p>
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
            <p className="text-black dark:text-white">
            {item?.end_time==null?"": moment(item?.end_time).format('LLL')}
            </p>
        </td>
        
      
    </tr>
}

export default TripTableItemCard
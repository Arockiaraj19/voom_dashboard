import moment from "moment"



const TripTableItemCard = ({ item, index }: { item: any, index: number }) => {
    return <tr key={index}>
        <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
           
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
            <p className="text-black dark:text-white">
               
            </p>
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
            <p className="text-black dark:text-white">
                {moment(item?.pickup_time).format('YYYY-MM-DD HH:mm:ss')} <br />
               
            </p>
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
            <p className="text-black dark:text-white">
                time
            </p>
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
            <p className="text-black dark:text-white">
                {moment(item.createdAt).format('YYYY-MM-DD')}
            </p>
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
            <p className="text-black dark:text-white">
               pickup locaiton
            </p>
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
            <p className="text-black dark:text-white">
               drop locaiton
            </p>
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
            <p className="text-black dark:text-white">
              {item?.type??""}
            </p>
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
            <p className="text-black dark:text-white">
              {item?.status??""}
            </p>
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
            <p className="text-black dark:text-white">
              start time
            </p>
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
            <p className="text-black dark:text-white">
              end time
            </p>
        </td>
      
    </tr>
}

export default TripTableItemCard
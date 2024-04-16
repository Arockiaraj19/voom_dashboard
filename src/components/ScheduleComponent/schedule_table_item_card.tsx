import moment from "moment"



const ScheduleTableItemCard = ({ item, index }: { item: any, index: number }) => {
    return <tr key={index}>
        <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
            <p className="text-sm">{item?.name ?? ""}</p>
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
            <p className="text-black dark:text-white">
                {item?.note ?? ""}
            </p>
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
            <p className="text-black dark:text-white">
                {moment(item?.start_date).format('YYYY-MM-DD')} <br />
                {moment(item?.end_date).format('YYYY-MM-DD')}
            </p>
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
          {
            item.time.length==1?  <p className="text-black dark:text-white">
            {moment(item?.time[0]).format('HH:mm:ss')} 
             
            </p>:  <p className="text-black dark:text-white">
            {moment(item?.time[0]).format('HH:mm:ss')} <br />
                {moment(item?.time[1]).format('HH:mm:ss')}
            </p>
          }
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
            <p className="text-black dark:text-white">
                {moment(item.createdAt).format('YYYY-MM-DD')}
            </p>
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
            <p className="text-black dark:text-white">
                {item.type=="one_way"?"One Way":"Two Way"}
            </p>
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
            <p className={item.status=="active"?"text-red dark:text-white":"text-green-400 dark:text-white"}>
                {item.status}
            </p>
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
            <p className="text-black dark:text-white">
                {item. schedule_status=="Both"?"Accepted":"Non Accepted"}
            </p>
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
            <p className="text-blue-400 dark:text-white">
              Trips
            </p>
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
            <p className="text-black dark:text-white">
                {item.user[0].first_name}
            </p>
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark ">
      <div className="flex flex-col">
      {
        item.schedule_assignments.map((e)=>{
            <p className="text-black dark:text-white">
            {e?.driver?.first_name??""}
        </p>
        })

       }    
      </div>
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark flex flex-col">
       {
        item.week_days.map((e)=>{
            <p className="text-black dark:text-white">
            {e}
        </p>
        })

       }    
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark flex flex-col">
       {
        item.locations
        .map((e)=>{
            <p className="text-black dark:text-white">
            {e.name-e.type}
        </p>
        })

       }    
        </td>
    </tr>
}

export default ScheduleTableItemCard
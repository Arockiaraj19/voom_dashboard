import moment from "moment"



const UserTableItemCard=({item,index}:{item:any,index:number})=>{
    return   <tr key={index}>
    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
        <p className="text-sm">{item?.first_name ?? ""} {item?.last_name ?? ""}</p>
    </td>
    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
        <p className="text-black dark:text-white">
            {item?.mobile_number ?? ""}
        </p>
    </td>
    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
        <p className="text-black dark:text-white">
            {item?.email ?? ""}
        </p>
    </td>
    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
        <p className="text-black dark:text-white">
            {item?.date_of_birth == null ? "" : moment(item?.date_of_birth).format('YYYY-MM-DD')}
        </p>
    </td>
    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
        <p className="text-black dark:text-white">
            {moment(item.createdAt).format('YYYY-MM-DD')}
        </p>
    </td>
    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
        <p
            className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${item.status === "approved"
                ? "bg-success text-success"
                : item.status === "rejected"
                    ? "bg-danger text-danger"
                    : "bg-warning text-warning"
                }`}
        >
            {item.status}
        </p>
    </td>
    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
        <div className="flex items-center space-x-3.5">
            <button onClick={(e)=>{
                 window.location.href = `/settings/${item._id}`;
            }} className="hover:text-primary">
                <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                        fill=""
                    />
                    <path
                        d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                        fill=""
                    />
                </svg>
            </button>


        </div>
    </td>
</tr>
}

export default UserTableItemCard
import { axiosPrivate } from "@/helper/axiosPrivate";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Switch from "@/components/common/Switch"
function TripCancelModel({
  id,
  isOpen,
  setIsOpen,
}: {
  id: string;
  isOpen: boolean;
  setIsOpen: any;
}) {
  const pathname=usePathname();
  const router = useRouter();
  const deleteAccount = async () => {
    try {
      await axiosPrivate.patch(`/v1/trip/${id}/cancel`, {
      
          type:enabled?"refund":"no_refund" ,
        
      });

      toast.success("Trip Cancelled successfully.");
      setTimeout(() => {
      window.location.href=pathname;
      }, 1000);
    } catch (error: any) {
      console.log(error.response.data.error.message);
      toast.error(
        error?.response?.data?.error?.message ?? "Something went wrong",
      );
    }
  };
  const [enabled, setEnabled] = useState(false);
  return (
    <>
     
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">Cancel trip</DialogTitle>
            <p>
              Are you sure you want to can this trip ? 
            </p>
            <div className="w-full mb-3">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Refund
                    </label>
                    <Switch enabled={enabled} setEnabled={setEnabled} />
                  </div>
            <div className="flex gap-4">
              <button onClick={() => setIsOpen(false)}>Cancel</button>
              <button className="text-red" onClick={() => {
                deleteAccount();
                setIsOpen(false);
              }}>Submit</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

export default TripCancelModel;

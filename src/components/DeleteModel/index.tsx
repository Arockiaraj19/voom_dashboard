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
function DeleteModel({
  id,
  isOpen,
  setIsOpen,
}: {
  id: string;
  isOpen: boolean;
  setIsOpen: any;
}) {
  const router = useRouter();
  const deleteAccount = async () => {
    try {
      await axiosPrivate.delete(`/v1/user`, {
        params: {
          user_id: id,
        },
      });

      toast.success("Account deleted successfully.");
      setTimeout(() => {
        router.back();
      }, 2000);
    } catch (error: any) {
      console.log(error.response.data.error.message);
      toast.error(
        error?.response?.data?.error?.message ?? "Something went wrong",
      );
    }
  };

  return (
    <>
     
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">Delete account</DialogTitle>
            <Description>This will permanently Delete your account</Description>
            <p>
              Are you sure you want to Delete your account? All of your data
              will be permanently removed.
            </p>
            <div className="flex gap-4">
              <button onClick={() => setIsOpen(false)}>Cancel</button>
              <button className="text-red" onClick={() => {
                deleteAccount();
                setIsOpen(false);
              }}>Delete</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

export default DeleteModel;

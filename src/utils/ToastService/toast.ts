import toast from "react-hot-toast";

const durationForToast = {
    duration: 4000,
}
export const ToastMessage = (type: string, message: string) => {
    if (type === "Success") {
        toast.success(message,durationForToast);
    } else if (type === "Error") {
        toast.error(message,durationForToast)
    } else {
        toast(message,durationForToast)
    }
}
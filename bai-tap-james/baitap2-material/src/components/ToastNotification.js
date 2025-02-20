import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = (type, message) => {
    switch (type) {
        case "success":
            toast.success(message);
            break;
        case "info":
            toast.info(message);
            break;
        case "error":
            toast.error(message);
            break;
        default:
            toast(message);
    }
};

const ToastNotification = () => {
    return (
        <div>
            <toast.Container position="top-right" autoClose={3000} />
        </div>
    );
};

export default ToastNotification;

import { toast } from "react-toastify";

const ToastNotification = {
    success: (message, title = "") => toast.success(`${message} ${title ? `: "${title}"` : ""}`),
    error: (message, title = "") => toast.error(`${message} ${title ? `: "${title}"` : ""}`),
    info: (message, title = "") => toast.info(`${message} ${title ? `: "${title}"` : ""}`),
    warning: (message, title = "") => toast.warning(`${message} ${title ? `: "${title}"` : ""}`),
};

export default ToastNotification;

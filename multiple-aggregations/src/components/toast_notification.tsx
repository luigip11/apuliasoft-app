import React from "react";
import { TypeOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * This method is used to check which Toast Notification
 * to choose based on the status.
 */

interface ToastNotificationProps {
  status: TypeOptions;
  description: string;
  toastId?: string;
  title?: string;
  onClose?: (e: any) => any;
}

export const ToastNotification = ({
  status,
  description,
  toastId,
  title,
  onClose,
}: ToastNotificationProps) => {
  const options = {
    toastId: toastId ?? undefined,
    // position: toast.POSITION.BOTTOM_RIGHT,
    closeButton: true,
    style: { fontSize: "12px" },
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    type: status,
    onClose: onClose,
  };

  toast(
    <>
      {title && (
        <div className="toast-title">
          <span>{title}</span>
        </div>
      )}
      <div className="toast-description">
        <span>{description}</span>
      </div>
    </>,
    options
  );
};

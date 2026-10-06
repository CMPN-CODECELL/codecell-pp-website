"use client";

import { ToastContainer } from "react-toastify";

export default function Toasts() {
  return (
    <ToastContainer
      position="bottom-center"
      pauseOnFocusLoss={false}
      pauseOnHover={false}
      draggablePercent={50}
      theme="dark"
    />
  );
}

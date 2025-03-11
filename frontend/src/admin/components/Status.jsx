import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { MdPending } from "react-icons/md";

export const StatusBadge = ({ status }) => {
  switch (status) {
    case "approved":
      return (
        <div className="flex items-center gap-1 text-green-600 bg-green-100 px-3 py-1 rounded-full">
          <FaCheckCircle />
          <span>Approved</span>
        </div>
      );
    case "rejected":
      return (
        <div className="flex items-center gap-1 text-red-600 bg-red-100 px-3 py-1 rounded-full">
          <FaTimesCircle />
          <span>Rejected</span>
        </div>
      );
    case "pending":
      return (
        <div className="flex items-center gap-1 text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full">
          <MdPending />
          <span>Pending</span>
        </div>
      );
    default:
      return (
        <div className="flex items-center gap-1 text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
          <MdPending />
          <span>Unknown</span>
        </div>
      );
  }
};
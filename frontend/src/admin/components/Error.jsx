import { X } from "lucide-react";

export  const ErrorMessage = ({ message, onRetry }) => (
    <div className="text-center text-red-500 bg-red-50 p-8 rounded-lg">
      <X size={48} className="mx-auto mb-4 text-red-500" />
      <p className="mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        Try Again
      </button>
    </div>
  );

  
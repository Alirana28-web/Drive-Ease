import { RefreshCcw } from "lucide-react";

export const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center h-64">
      <RefreshCcw size={48} className="text-indigo-500 animate-spin mb-4" />
      <p className="text-indigo-600">Loading data...</p>
    </div>
  );
  
  
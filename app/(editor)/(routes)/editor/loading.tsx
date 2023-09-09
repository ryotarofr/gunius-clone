"use client";

import { BounceLoader } from "react-spinners";

// import Box from "@/components/Box";

const Loading = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <BounceLoader color="#ffffff" size={40} />
    </div>
  );
}

export default Loading;

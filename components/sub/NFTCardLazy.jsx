import React from "react";

function NFTCardLazy() {
  return (
    <div className="bg-secondary relative shadow-md rounded-xl">
      <div className="animate-pulse">
        <div className="w-auto min-h-80 bg-primary aspect-w-1 aspect-h-1 rounded-xl overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none m-4">
          {/* Image */}
        </div>
      </div>

      <div className="flex justify-between text-xs p-8 m-4 bg-primary rounded-xl"></div>
      {/* Buy Button */}
    </div>
  );
}

export default NFTCardLazy;

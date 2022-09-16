import React from "react";

function Hero({ setBuyTokensModel }) {
  return (
    <div className="text-center h-[calc(100vh-100px)]">
      <h2 className="w-11/12 md:w-6/12 mx-auto font-play text-5xl font-bold uppercase pt-40">
        be the ulimate ibalr and winn your dream prize
      </h2>
      <p className="w-10/12 md:w-4/12 mx-auto text-sm font-mediun uppercase py-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies velit
        lacus, nunc, lorem lacinia aliquam vestibulum. In adipiscing.
      </p>
      <button
        onClick={() => {
          setBuyTokensModel({
            openStatus: true,
            tokens: 0,
          });
        }}
        className="bg-[#FF0000] text-sm uppercase font-semibold py-3 px-4 rounded"
      >
        Buy Throttle
      </button>
    </div>
  );
}

export default Hero;

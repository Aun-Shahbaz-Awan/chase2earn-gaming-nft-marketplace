import React from "react";
import Image from "next/image";
import Avatar from "../assets/Avatar.svg";
import Comet from "../assets/Comet.svg";

function AboutUs() {
  return (
    <div className="mb-28">
      <div className="bg-secondary rounded-3xl  m-8 md:m-12 lg:m-20">
        <div className="bg-[url('../assets/Ellipse.svg')] bg-no-repeat bg-auto bg-center flex-col lg:flex-row lg:flex py-2 md:py-4 px-8 md:px-24">
          <div className="w-full lg:w-5/12 py-12 lg:py-20 my-auto">
            <h5>About Us</h5>
            <h3 className="text-4xl font-play font-semibold uppercase py-4">
              be the ulimate ibalr and winn your dream prizev
            </h3>
            <p>
              vLorem ipsum dolor sit amet, consectetur adipiscing elit.
              Ultricies velit lacus, nunc, lorem lacinia aliquam vestibulum. In
              adipiscing.Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Ultricies velit lacus, nunc, lorem lacinia aliquam
              vestibulum. In adipiscing.Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Ultricies velit lacus, nunc, lorem lacinia
            </p>
          </div>
          <div className="w-full lg:w-5/12 py-9 text-center">
            {/* <div className="bg-[url('../assets/Ellipse.svg')] bg-no-repeat bg-cover h-full bg-center py-9 text-center"> */}
            <Image src={Avatar} alt="Avatar" className="rounded-xl" />
            {/* </div> */}
          </div>
          <div className="w-full lg:w-2/12 py-12 lg:py-20 my-auto">
            <div className="py-2 my-4 border-b border-gray_ ">
              <h3 className="font-play font-semibold text-2xl pb-1">
                19 0000$+
              </h3>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <p className="text-gray_">Total NFT's Sold</p>
            </div>
            <div className="py-2 my-4 border-b border-gray_ ">
              <h3 className="font-play font-semibold text-2xl pb-1">
                20 000 00$+
              </h3>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <p className="text-gray_">Total Active NFT's</p>
            </div>
            <div className="py-2 my-4 border-b border-gray_ ">
              <h3 className="font-play font-semibold text-2xl pb-1">20</h3>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <p className="text-gray_">Upcoming Nft's</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end px-2 md:px-20 -mt-40 md:-mt-60">
        <Image src={Comet} alt="Avatar" />
      </div>
    </div>
  );
}

export default AboutUs;

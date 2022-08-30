import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaDiscord } from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-secondary text-center py-12">
      <div className="">
        <ul className="text-lg font-medium">
          <li className="inline px-2 cursor-pointer">As seen On</li>
          <li className="inline px-2 cursor-pointer">Game info</li>
          <li className="inline px-2 cursor-pointer">Tokenomics</li>
          <li className="inline px-2 cursor-pointer">Roadmap</li>
          <li className="inline px-2 cursor-pointer">Team</li>
        </ul>
      </div>
      <div className="py-6">
        <ul className="text-2xl text-gray_">
          <li className="inline mx-3">
            <FaFacebookF className="inline cursor-pointer" />
          </li>
          <li className="inline mx-3">
            <FaInstagram className="inline cursor-pointer" />
          </li>
          <li className="inline mx-3">
            <FaTwitter className="inline cursor-pointer" />
          </li>
          <li className="inline mx-3 cursor-pointer">
            <FaDiscord className="inline" />
          </li>
        </ul>
      </div>
      <p className="text-xs text-gray_">
        © 2022 sanvyislam. All rights reserved.
      </p>
    </div>
  );
}

export default Footer;

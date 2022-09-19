import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Cyclone_GT from "../../public/assets/category-card/Cyclone_GT.png";
import Class_T from "../../public/assets/category-card/Class_T.png";
import AMG_63 from "../../public/assets/category-card/AMG_63.png";
// import F11 from "../../public/assets/category-card/F11.png";
import Fantom from "../../public/assets/category-card/Fantom.png";
import Jaguar_C_Type from "../../public/assets/category-card/Jaguar_C_Type.png";
import axios from "axios";

const cars = [
  {
    id: "Uncommon_1",
    name: "Cyclone GT",
    url: "cyclone-gt",
    image: Cyclone_GT,
    totalTokens: 1200,
  },
  {
    id: "Uncommon_2",
    name: "Class T",
    url: "class-t",
    image: Class_T,
    totalTokens: 1500,
  },
  {
    id: "Rare_1",
    name: "AMG 63",
    url: "amg-gt",
    image: AMG_63,
    totalTokens: 450,
  },
  // {
  //   id: "Rare_2",
  //   name: "F11",
  //   url: "f11",
  //   image: F11,
  //   totalTokens: 1500,
  // },
  {
    id: "Rare_3",
    name: "Fantom",
    url: "fantom",
    image: Fantom,
    totalTokens: 500,
  },
  {
    id: "Rare_4",
    name: "Jaguar C-Type",
    url: "jaguar-c-type",
    image: Jaguar_C_Type,
    totalTokens: 250,
  },
];

function Listed() {
  const [listedCars, setListedCars] = React.useState([]);
  const fetchListedCarsName = () => {
    axios
      .get(process.env.baseURL + "/list/get-listed-name")
      .then((response) => setListedCars(response.data))
      .catch((error) => console.log("Get listed card error:", error));
  };
  console.log("ListedCars:", listedCars);
  React.useEffect(() => {
    fetchListedCarsName();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="border border-[#FF0000] mx-8 md:mx-12 lg:mx-20 mb-28 mt-16 rounded-3xl">
        <div className="flex justify-center mb-2">
          <div className="bg-primary border-2 border-[#FF0000] font-a4speed text-3xl tracking-wide pt-4 pb-3 px-12 rounded-full -mt-8 mb-8">
            Listed Cars Categories
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 mx-12">
          {listedCars ? (
            cars.map((car, index) => {
              if (listedCars.includes(car.url))
                return (
                  <Link href={"listed/" + car?.url} key={car?.url + index}>
                    <div className="bg-secondary p-3 mx-auto rounded-xl cursor-pointer hover:scale-105 hover:border border-sky-900 ease-in-out transition-all">
                      <Image
                        src={car?.image}
                        alt="NFT Image"
                        className="rounded-xl"
                        width="350"
                        height="350"
                      />
                      <div className="flex justify-between text-xs py-4 px-6 mb-1 mt-2  bg-primary rounded-xl">
                        <div className="">
                          <p className="text-gray_">Name</p>
                          <p className="text-gray_">Total Tokens</p>
                        </div>
                        <div className="">
                          <p>{car?.name}</p>
                          <p>{car?.totalTokens}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
            })
          ) : (
            <h2 className="text-2xl">Loading...</h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default Listed;

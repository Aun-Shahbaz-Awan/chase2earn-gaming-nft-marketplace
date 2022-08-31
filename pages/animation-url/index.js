import React from "react";
import axios from "axios";
import Image from "next/image";
import Car from "../../assets/cars/Cyclone_GT.svg";

export default function AnimationURL() {
  const [slug, setSlug] = React.useState([]);
  const [attributeInfo, setAttributeInfo] = React.useState({});
  const [rander, setRander] = React.useState(false); // Use to Re-Rander to Fetch APIs

  const getAttributeInfo = () => {
    axios
      .get("https://nft.chase2earn.com/api/v1/attribute/get/" + slug[1])
      .then((response) => {
        setAttributeInfo(response?.data);
      });
  };
  React.useEffect(() => {
    if (typeof window !== "undefined")
      setSlug(localStorage.getItem("slug").split(","));
  }, [rander]);

  React.useEffect(() => {
    if (slug !== undefined) {
      getAttributeInfo();
      setRander(true); // Responsible for get & set Slug!
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);
  return (
    <div className="bg-[#f2f2f2] rounded-lg">
      <div className="w-auto p-[2%]">
        <div className="w-auto bg-[#edc6ff] shadow-md shadow-[#e986ff] rounded-lg p-[1%]">
          <div className="w-auto bg-black p-[2%] rounded-xl">
            <div className="w-auto bg-emerald-300 shadow-md shadow-emerald-300 rounded-lg p-[1%]">
              <div className="w-auto bg-[#000029] p-[2%] rounded-xl">
                <div className="w-auto bg-white shadow-md shadow-[#2F3DFF] rounded-lg p-[1%]">
                  {/* <!-- Heading --> */}
                  <div>
                    <h3 className="w-auto font-astrolab text-white text-center text-[6vw] bg-[url('/assets/nft/BG_Header.png')] bg-no-repeat bg-cover bg-current rounded-t-xl py-[3.5vw] m-0">
                      UNCOMMON
                    </h3>
                  </div>
                  {/* <!-- Token ID --> */}
                  <div className="w-auto flex justify-center bg-[#101322]">
                    <div className="w-[100vw] h-[10vw] flex items-center justify-center bg-[url('/assets/nft/BG_ID_Pink.svg')] bg-contain bg-no-repeat bg-center">
                      <div className="w-[55vw] h-[9vw] flex items-center justify-center bg-[url('/assets/nft/BG_ID_White.png')] bg-contain bg-no-repeat bg-center">
                        <div className="w-[52vw] h-[9vw] flex items-center justify-center bg-[url('/assets/nft/BG_ID_Dark.svg')] bg-contain bg-no-repeat bg-center">
                          <h3 className="text-[#00F3FF] font-astrolab text-[2.5vw]">
                            #000{slug[1]}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Car BG --> */}
                  <div className="w-auto h-[60vw] bg-[url('/assets/nft/BG_Car.png')] bg-no-repeat bg-cover bg-current">
                    {/* <!-- Car Image --> */}
                    <div className="flex justify-center relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      {/* top-[10vw] w-[57vw] */}
                      <div className="absolute top-[10vw]">
                        <Image src={Car} alt="car-image" width="620" />
                      </div>
                    </div>
                    {/* <!-- Car Name --> */}
                    <div className="relative flex justify-center">
                      <h3 className="absolute text-[#00F3FF] font-a4speed text-[6vw] top-[40vw]">
                        CYCLONE GT
                      </h3>
                    </div>
                    {/* <!-- Loading --> */}
                    <div className="relative">
                      <div className="w-full flex absolute top-[49vw]">
                        <div className="w-1/2 px-[3vw] py-[1vw]">
                          <h2 className="text-white font-astrolab text-[1.5vw] pb-[1vw] m-0">
                            Level {attributeInfo?.level}
                          </h2>
                          <div className="w-full">
                            <div className="main-progress-bar stripes animated">
                              <span className="damage-progress-bar"></span>
                            </div>
                            <style jsx>{`
                              @keyframes level-progress {
                                0% {
                                  width: 0%;
                                }
                                100% {
                                  width: ${attributeInfo?.level + "%"};
                                }
                              }
                              .main-progress-bar {
                                background-color: #1a1a1a;
                                height: 3vw;
                                width: auto;
                                border-radius: 5px;
                                box-shadow: 0 1px 5px #000 inset, 0 1px 0 #444;
                              }
                              .stripes {
                                background-size: 30px 30px;
                                background-image: linear-gradient(
                                  135deg,
                                  rgba(255, 255, 255, 0.15) 25%,
                                  transparent 25%,
                                  transparent 50%,
                                  rgba(255, 255, 255, 0.15) 50%,
                                  rgba(255, 255, 255, 0.15) 75%,
                                  transparent 75%,
                                  transparent
                                );
                              }
                              .stripes.animated {
                                animation: animate-stripes 1s linear infinite;
                              }
                              .damage-progress-bar {
                                display: block;
                                height: 3vw;
                                width: 0%;
                                background-color: #34c2e3;
                                border-radius: 3px;
                                box-shadow: 0 1px 0 rgba(255, 255, 255, 0.5)
                                  inset;
                                position: relative;
                                animation: level-progress 2s forwards;
                              }
                            `}</style>
                          </div>
                        </div>
                        {/* ---------- */}
                        <div className="w-1/2 px-[3vw] py-[1vw]">
                          <h2 className="text-white font-astrolab text-[1.5vw] pb-[1vw] m-0">
                            Damage {attributeInfo?.damage}
                          </h2>
                          <div className="w-full">
                            <div className="main-progress-bar stripes animated">
                              <span className="damage-progress-bar"></span>
                            </div>
                            <style jsx>{`
                              @keyframes damage-progress {
                                0% {
                                  width: 0%;
                                }
                                100% {
                                  width: ${attributeInfo?.damage + "%"};
                                }
                              }
                              .main-progress-bar {
                                background-color: #1a1a1a;
                                height: 3vw;
                                width: auto;
                                border-radius: 5px;
                                box-shadow: 0 1px 5px #000 inset, 0 1px 0 #444;
                              }
                              .stripes {
                                background-size: 30px 30px;
                                background-image: linear-gradient(
                                  135deg,
                                  rgba(255, 255, 255, 0.15) 25%,
                                  transparent 25%,
                                  transparent 50%,
                                  rgba(255, 255, 255, 0.15) 50%,
                                  rgba(255, 255, 255, 0.15) 75%,
                                  transparent 75%,
                                  transparent
                                );
                              }
                              .stripes.animated {
                                animation: animate-stripes 1s linear infinite;
                              }
                              .damage-progress-bar {
                                display: block;
                                height: 3vw;
                                width: 0%;
                                background-color: #e33434;
                                border-radius: 3px;
                                box-shadow: 0 1px 0 rgba(255, 255, 255, 0.5)
                                  inset;
                                position: relative;
                                animation: damage-progress 2s forwards;
                              }
                            `}</style>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Specs Heading --> */}
                  <div className="specs-heading">
                    <div className="base-heading">
                      <h3>BASE</h3>
                    </div>
                    <div className="bolts-heading">
                      <h3>BOLTS</h3>
                    </div>
                    <div className="points-heading">
                      <h3>+POINT</h3>
                    </div>
                    <style jsx>{`
                      .specs-heading {
                        width: auto;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        background: linear-gradient(
                          180deg,
                          #161a1f -157.13%,
                          #2d353f -139.51%,
                          #434f5e -121.89%,
                          #4c5c6d -91.68%,
                          #434f5e -66.51%,
                          #161a1f -33.79%,
                          #2d353f -18.68%,
                          #434f5e -3.58%,
                          #4c5c6d 29.14%,
                          #434f5e 54.32%,
                          #161a1f 94.59%
                        );
                        padding: 1vw 3vw;
                      }
                      .specs-heading h3 {
                        margin: 0;
                        font-family: astrolab, sans-serif;
                        font-size: 2vw;
                      }
                      .base-heading {
                        background-color: #00f3ff;
                        padding: 0.6vw 3vw;
                        border: 0.6vw solid #2d353f;
                        border-radius: 8px;
                      }
                      .bolts-heading {
                        color: #00f3ff;
                      }
                      .bolts-heading h3 {
                        font-size: 3.5vw;
                      }
                      .points-heading {
                        background-color: #f9e4e4;
                        padding: 0.6vw 3vw;
                        border: 0.6vw solid #2d353f;
                        border-radius: 8px;
                      }
                      .specs-heading {
                        width: auto;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        background: linear-gradient(
                          180deg,
                          #161a1f -157.13%,
                          #2d353f -139.51%,
                          #434f5e -121.89%,
                          #4c5c6d -91.68%,
                          #434f5e -66.51%,
                          #161a1f -33.79%,
                          #2d353f -18.68%,
                          #434f5e -3.58%,
                          #4c5c6d 29.14%,
                          #434f5e 54.32%,
                          #161a1f 94.59%
                        );
                        padding: 1vw 3vw;
                      }
                      .specs-heading h3 {
                        margin: 0;
                        font-family: astrolab, sans-serif;
                        font-size: 2vw;
                      }
                      .base-heading {
                        color: #000000;
                        background-color: #00f3ff;
                        padding: 0.6vw 3vw;
                        border: 0.6vw solid #2d353f;
                        border-radius: 8px;
                      }
                      .bolts-heading {
                        color: #00f3ff;
                      }
                      .bolts-heading h3 {
                        font-size: 3.5vw;
                      }
                      .points-heading {
                        color: #000000;
                        background-color: #f9e4e4;
                        padding: 0.6vw 3vw;
                        border: 0.6vw solid #2d353f;
                        border-radius: 8px;
                      }
                    `}</style>
                  </div>
                  {/* <!-- Loading --> */}
                  <div className="all-loading-contract">
                    {/* <!-- Throttle ----------------------------------  --> */}
                    <div className="all-loading-sub-container">
                      <div className="all-loading-heading">
                        <div className="throttle-circle"></div>
                        <h3>Throttle</h3>
                      </div>
                      <div className="progress-bar">
                        <label className="_label">
                          <div
                            id="level-loading-fill"
                            className="throttle"
                          ></div>
                        </label>
                      </div>
                      <h3 className="points">{attributeInfo?.throttle}</h3>
                    </div>
                    {/* <!-- 2Earn ----------------------------------  --> */}
                    <div className="all-loading-sub-container">
                      <div className="all-loading-heading">
                        <div className="_2earn-circle"></div>
                        <h3>2Earn</h3>
                      </div>
                      <div className="progress-bar">
                        <label className="_label">
                          <div
                            id="level-loading-fill"
                            className="two-earn"
                          ></div>
                        </label>
                      </div>
                      <h3 className="points">{attributeInfo?.earn}</h3>
                    </div>
                    {/* <!-- Nitro ----------------------------------  --> */}
                    <div className="all-loading-sub-container">
                      <div className="all-loading-heading">
                        <div className="nitro-circle"></div>
                        <h3>Nitro</h3>
                      </div>
                      <div className="progress-bar">
                        <label className="_label">
                          <div id="level-loading-fill" className="nitro"></div>
                        </label>
                      </div>
                      <h3 className="points">{attributeInfo?.nitro}</h3>
                    </div>
                    {/* <!-- Tire ----------------------------------  --> */}
                    <div className="all-loading-sub-container">
                      <div className="all-loading-heading">
                        <div className="tire-circle"></div>
                        <h3>Tire</h3>
                      </div>
                      <div className="progress-bar">
                        <label className="_label">
                          <div id="level-loading-fill" className="tire"></div>
                        </label>
                      </div>
                      <h3 className="points">{attributeInfo?.tire}</h3>
                    </div>
                    <style jsx>{`
                      .all-loading-contract {
                        width: auto;
                        background-color: #0039f7;
                        padding: 2vw 1vw;
                      }
                      .all-loading-sub-container {
                        width: auto;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 1vw 2vw;
                      }
                      .all-loading-heading {
                        width: 37vw;
                        display: flex;
                        align-items: center;
                      }
                      .all-loading-heading h3 {
                        color: #fff;
                        font-family: A4Speed, sans-serif;
                        font-size: 3vw;
                        margin: 0;
                        padding-top: 0.7vw;
                      }
                      .points {
                        color: #fff;
                        font-family: A4Speed, sans-serif;
                        font-size: 3vw;
                        margin: 0;
                        width: 12vw;
                        text-align: right;
                        padding-top: 0.7vw;
                      }
                      .throttle-circle {
                        background: #b71eff;
                        width: 2.5vw;
                        height: 2.5vw;
                        border: 2px solid #ffffff;
                        border-radius: 50%;
                        margin-right: 0.7vw;
                      }
                      ._2earn-circle {
                        background: #00cfff;
                        width: 2.5vw;
                        height: 2.5vw;
                        border: 2px solid #ffffff;
                        border-radius: 50%;
                        margin-right: 0.7vw;
                      }
                      .nitro-circle {
                        background: #ffd300;
                        width: 2.5vw;
                        height: 2.5vw;
                        border: 2px solid #ffffff;
                        border-radius: 50%;
                        margin-right: 0.7vw;
                      }
                      .tire-circle {
                        background: #e81c1c;
                        width: 2.5vw;
                        height: 2.5vw;
                        border: 2px solid #ffffff;
                        border-radius: 50%;
                        margin-right: 0.7vw;
                      }
                      /* Specs Loading */
                      @keyframes throttle {
                        from {
                          width: 0%;
                        }
                        to {
                          width: ${attributeInfo?.throttle + "%"};
                        }
                      }
                      @keyframes two-earn {
                        from {
                          width: 0%;
                        }
                        to {
                          width: ${attributeInfo?.earn + "%"};
                        }
                      }
                      @keyframes nitro {
                        from {
                          width: 0%;
                        }
                        to {
                          width: ${attributeInfo?.nitro + "%"};
                        }
                      }
                      @keyframes tire {
                        from {
                          width: 0%;
                        }
                        to {
                          width: ${attributeInfo?.tire + "%"};
                        }
                      }
                      .progress-bar {
                        width: 100%;
                        padding: 1vw 2vw;
                      }
                      ._label {
                        position: relative;
                        display: block;
                        width: 100%;
                        height: 2.5vw;
                        background: transparent;
                        border-radius: 1rem;
                        border: 1px solid white;
                        overflow: hidden;
                        box-shadow: -2px 0 8px 0 rgba(255, 255, 255, 0.6);
                      }
                      ._label div:after {
                        display: block;
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/172299/bubbles-mask.gif);
                        mix-blend-mode: overlay;
                        opacity: 0.5;
                      }
                      ._label .throttle {
                        position: absolute;
                        top: 0;
                        left: 0;
                        background: linear-gradient(
                          to bottom,
                          #ae00ff 35%,
                          #9457b0
                        );
                        /* background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/172299/bubbles-mask.gif); */
                        height: 100%;
                        width: 0%;
                        animation: throttle 2s forwards;
                        box-shadow: 0 0 2px 1px white inset;
                        border-radius: 0.4rem;
                        opacity: 0.8;
                      }
                      ._label .two-earn {
                        position: absolute;
                        top: 0;
                        left: 0;
                        background: linear-gradient(
                          to bottom,
                          #00d5ff 35%,
                          #4f9cc0
                        );
                        height: 100%;
                        width: 0%;
                        animation: two-earn 2s forwards;
                        box-shadow: 0 0 2px 1px white inset;
                        border-radius: 0.4rem;
                      }
                      ._label .nitro {
                        position: absolute;
                        top: 0;
                        left: 0;
                        background: linear-gradient(
                          to bottom,
                          #ffd500 35%,
                          #ffe14c
                        );
                        height: 100%;
                        width: 0%;
                        animation: nitro 2s forwards;
                        box-shadow: 0 0 2px 1px white inset;
                        border-radius: 0.4rem;
                      }
                      ._label .tire {
                        position: absolute;
                        top: 0;
                        left: 0;
                        background: linear-gradient(
                          to bottom,
                          #f80000 35%,
                          #ff3737
                        );
                        height: 100%;
                        width: 0%;
                        animation: tire 2s forwards;
                        box-shadow: 0 0 2px 1px white inset;
                        border-radius: 0.4rem;
                      }
                      .pink-shadow {
                        box-shadow: #e986ff 0px 2px 16px 0px,
                          #e986ff 0px 2px 16px 0px;
                      }
                    `}</style>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flap"></div>
      </div>
    </div>
  );
}

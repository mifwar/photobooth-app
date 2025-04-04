"use client";
import CameraPreview from "@/component/CameraPreview";
import Image from "next/image";
import { useState } from "react";
export default function Home() {
  const [numberPhotos, setNumberPhotos] = useState(1);
  const increasePhotos = () => {
    if (numberPhotos < 4) {
      setNumberPhotos(numberPhotos + 1);
    }
  };
  const decreasePhotos = () => {
    if (numberPhotos > 1) {
      setNumberPhotos(numberPhotos - 1);
    }
  };

  const [timer, setTimer] = useState(0);
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const capturePhoto = async () => {
    const video = document.querySelector("video");
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");
    if (!context) return;

    // Flip the image horizontally
    context.translate(canvas.width, 0);
    context.scale(-1, 1);
    context.drawImage(video, 0, 0);

    context.setTransform(1, 0, 0, 1, 0, 0);
    const photoData = canvas.toDataURL("image/jpeg");

    setCapturedPhotos((prev) => {
      const emptyIndex = prev.findIndex((photo) => photo === "");
      if (emptyIndex !== -1) {
        const newPhotos = [...prev];
        newPhotos[emptyIndex] = photoData;
        return newPhotos;
      }
      return [...prev, photoData];
    });
  };

  const deletePhoto = (index: number) => {
    setCapturedPhotos((prev) => {
      const newPhotos = [...prev];
      newPhotos[index] = "";
      return newPhotos;
    });
  };

  return (
    <div className="w-full p-6 flex flex-col justify-center items-center bg-gradientCloud bg-cover bg-center bg-no-repeat h-screen font-[family-name:var(--font-lilita-one)]">
      <div className="inset-0 absolute bg-black bg-opacity-15 z-0 h-screen w-full">
        {}
      </div>

      <p
        className="text-[48px] text-[#fcd3d2] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
"
      >
        Self Photobooth
      </p>
      <div className="w-full z-10 h-full flex justify-center items-center">
        <div className="w-1/2 h-full relative">
          <div className="relative w-full h-full flex justify-center items-center">
            <Image
              src="/images/frame.png"
              alt="Photobooth"
              width={500}
              height={500}
              className="w-full h-full z-10"
            />
            <CameraPreview className="absolute top-[13%] z-0 left-[13%] w-[450px] h-[430px]" />
          </div>
          <Image
            onClick={capturePhoto}
            src="/images/camera-button.png"
            alt="button"
            width={240}
            height={240}
            className="absolute hover:cursor-pointer hover:brightness-75 transition-all duration-200 z-50 bottom-[22%] left-[50%] translate-x-[-50%] translate-y-[50%] object-cover"
          />
        </div>
        <div className="w-1/2 gap-4 bg-gradientSettings border-[8px]  border-[#efb4e1] bg-cover bg-center bg-no-repeat rounded-3xl p-6 h-full flex flex-col justify-start items-start">
          <div>
            <p className="text-[28px] text-[#8f73d1] drop-shadow-[0_1.2px_1.2px_#ffe1cd]">
              Photo Preview
            </p>
            <div className="flex gap-3 justify-start items-start">
              {Array.from({ length: numberPhotos }, (_, idx) => (
                <div
                  key={idx}
                  className="bg-[#ffdada] border-2 border-[#efb4e1] w-[120px] h-[120px] rounded-lg overflow-hidden"
                >
                  {capturedPhotos[idx] && (
                    <div className="relative w-full h-full">
                      <Image
                        src={capturedPhotos[idx]}
                        alt={`Photo ${idx + 1}`}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover z-30"
                      />
                      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                      <div
                        className="p-1 rounded-full absolute z-50 -top-1 right-[2%] drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] hover:cursor-pointer text-[#f9cbcb] group"
                        title="Re-take the picture"
                        onClick={() => deletePhoto(idx)}
                      >
                        x
                        <span className="invisible group-hover:visible absolute -top-8 left-1/2 -translate-x-1/2 bg-[#674f9e] text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                          Re-take the picture
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-4 w-full justify-center items-start">
            <div className="w-1/2">
              <p
                className="text-[28px] text-[#8f73d1] drop-shadow-[0_1.2px_1.2px_#ffe1cd]
"
              >
                Filter
              </p>
              <div className="flex flex-col gap-2 items-center justify-center">
                <div className=" flex w-full justify-around gap-2 items-center">
                  <div className="bg-purple-500 rounded-lg w-[70px] h-[70px]">
                    1
                  </div>
                  <div className="bg-purple-500 rounded-lg w-[70px] h-[70px]">
                    1
                  </div>
                  <div className="bg-purple-500 rounded-lg w-[70px] h-[70px]">
                    2
                  </div>
                </div>
                <div className=" flex w-full justify-around gap-2 items-center">
                  <div className="bg-purple-500 rounded-lg w-[70px] h-[70px]">
                    3
                  </div>
                  <div className="bg-purple-500 rounded-lg w-[70px] h-[70px]">
                    1
                  </div>
                  <div className="bg-purple-500 rounded-lg w-[70px] h-[70px]">
                    4
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <p className="text-[28px] text-[#8f73d1] ">Options</p>
              <div>
                <p className="text-[#8f73d1] font-quicksand font-bold text-[20px]">
                  Number of Photos
                </p>
                <div className="flex bg-[#fddeea] border-4 border-[#efb4e1] px-4 py-2 rounded-full gap-2 justify-between items-center">
                  {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                  <p
                    onClick={decreasePhotos}
                    className="hover:cursor-pointer text-[#674f9e] text-[20px]"
                  >
                    -
                  </p>
                  <p className="text-[#674f9e] text-[20px]">{numberPhotos}</p>
                  {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                  <p
                    onClick={increasePhotos}
                    className="hover:cursor-pointer text-[#674f9e] text-[20px]"
                  >
                    +
                  </p>
                </div>
              </div>
              <div className="">
                <p className="text-[#8f73d1] font-quicksand font-bold text-[20px]">
                  Timer
                </p>
                <div className="flex bg-[#fddeea] border-4 border-[#efb4e1] px-4 py-2 rounded-full gap-2 justify-between items-center">
                  <select
                    className="bg-transparent w-full text-[#674f9e] text-[20px] outline-none"
                    value={timer}
                    onChange={(e) => setTimer(Number.parseInt(e.target.value))}
                  >
                    <option value={0}>0</option>
                    <option value={3}>3</option>
                    <option value={5}>5</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#fddeea] border-4 border-[#efb4e1] hover:cursor-pointer transition-all duration-300 hover:bg-[#efcdda] px-4 py-2 rounded-full w-full flex gap-2 justify-center items-center">
            <p className="font-lilita text-[20px] text-[#a285e4]">
              Print your photos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

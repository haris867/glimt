import ThreeFiberScene from "../scene";
import CameraCapture from "../cameraCapture";
import React, { useState } from "react";

export default function Page() {
  const [isClicked, setIsClicked] = useState(false);
  const handleLabelClick = () => {
    console.log("Label clicked");
    setIsClicked(true);
  };

  return (
    <>
      {/* <header className="my-4" style={{ height: isClicked ? "20%" : "60%" }}> */}
      <div className="header py-4">
        <ThreeFiberScene isClicked={isClicked} />
      </div>
      <CameraCapture onLabelClick={handleLabelClick} />
    </>
  );
}

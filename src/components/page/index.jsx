import ThreeFiberScene from "../scene";
import CameraCapture from "../cameraCapture";
import React, { useState } from "react";

export default function Page() {
  const [isClicked, setIsClicked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);

  const handleLabelClick = () => {
    console.log("Label clicked");
    setIsClicked(true);
  };

  const handleSubmit = () => {
    if (inputValue === "images123") {
      setIsCorrect(true);
    } else {
      console.log("Incorrect password. Please try again.");
    }
  };

  return (
    <>
      <div className="header py-4">
        <ThreeFiberScene isClicked={isClicked} />
        {!isCorrect ? (
          <div className="access-input d-flex flex-column justify-content-center w-75 mx-auto mt-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Your access code"
            />
            <button onClick={handleSubmit}>JOIN</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        ) : (
          <>
            <CameraCapture onLabelClick={handleLabelClick} />
          </>
        )}
      </div>
    </>
  );
}

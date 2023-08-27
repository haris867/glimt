import ThreeFiberScene from "../scene";
import CameraCapture from "../cameraCapture";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { save, load } from "../../hooks/storage";

const AccessContainer = styled.div`
  gap: 10px;
  max-width: 300px;
`;

const AccessInput = styled.input`
  background-color: transparent;
  border: 2px solid #fff;
  border-radius: 5px;
  color: #fff;
  font-size: 1.2em;
  font-weight: 500;
  transition: all 0.3s ease-in;
  font-family: "Poppins", sans-serif;
  padding: 10px;
  width: 100%;
  &:focus {
    outline: none;
    background-color: #fff;
    color: #2d6b79;
  }
`;

const AccessButton = styled.button`
  background-color: transparent;
  border: 2px solid #fff;
  border-radius: 5px;
  color: #fff;
  transition: all 0.3s ease-in;
  font-size: 1.2em;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
  padding: 10px;
  width: 100%;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: #fff;
    color: #2d6b79;
  }
`;

export default function Page() {
  const [isClicked, setIsClicked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const isLoggedIn = load("accessCode");
    if (isLoggedIn) {
      setIsCorrect(true);
    }
  }, []);

  const handleLabelClick = (value) => {
    console.log("Label clicked");
    setIsClicked(Boolean(value)); // true if value exists, false otherwise
  };

  const handleSubmit = () => {
    if (inputValue === "images123") {
      setIsCorrect(true);
      save("accessCode", JSON.stringify(inputValue));
    } else {
      setError("Incorrect access code. Please try again.");
    }
  };

  return (
    <>
      <div className="header">
        <ThreeFiberScene isClicked={isClicked} />
      </div>
      {!isCorrect ? (
        <AccessContainer className="d-flex flex-column justify-content-center w-75 mx-auto mt-4">
          <AccessInput
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Your access code"
          />
          <AccessButton onClick={handleSubmit}>JOIN</AccessButton>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </AccessContainer>
      ) : (
        <>
          <CameraCapture onLabelClick={handleLabelClick} />
        </>
      )}
    </>
  );
}

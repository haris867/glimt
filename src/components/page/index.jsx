import ThreeFiberScene from "../scene";
import CameraCapture from "../cameraCapture";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { save, load } from "../../hooks/storage";
import { Col } from "react-bootstrap";
import { BsArrowDown, BsPlusSquare, BsBoxArrowUp } from "react-icons/bs";

const AccessContainer = styled(Col)`
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

const PageContainer = styled.div`
  // gap: calc(10px + 5vh);
`;
const AddText = styled.p`
  color: #fff;
  font-family: "Poppins", sans-serif;
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
    setIsClicked(Boolean(value));
  };

  const handleSubmit = () => {
    if (
      inputValue === "images123" ||
      inputValue === "images1" ||
      inputValue === "images2"
    ) {
      setIsCorrect(true);
      save("accessCode", JSON.stringify(inputValue));
    } else {
      setError("Incorrect access code. Please try again.");
    }
  };

  return (
    <PageContainer className="d-flex flex-column justify-content-between h-100">
      <div className="header">
        <ThreeFiberScene isClicked={isClicked} />
      </div>
      {!isCorrect ? (
        <AccessContainer className="d-flex flex-column justify-content-center w-75 mx-auto mt-4">
          <AccessInput
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Tilgangskode"
          />
          <AccessButton onClick={handleSubmit}>BLI MED</AccessButton>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="mt-3 tips">
            <AddText>
              iPhone? Trykk på <BsBoxArrowUp /> og deretter{" "}
              <span className="fw-bold">Legg til på Hjem-skjerm</span>{" "}
              <BsPlusSquare />
            </AddText>
            <BsArrowDown
              className="arrow-down mx-auto mt-4"
              size={60}
              color="white"
            />
          </div>
        </AccessContainer>
      ) : (
        <>
          <div>
            <CameraCapture onLabelClick={handleLabelClick} />
            {/* <TestingApi /> */}
          </div>
        </>
      )}
    </PageContainer>
  );
}

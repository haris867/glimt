import React, { useState } from "react";
import { MdMonochromePhotos } from "react-icons/md";
import Collapse from "react-bootstrap/Collapse";
import styled from "styled-components";
import { CiCircleRemove } from "react-icons/ci";

const CaptureButton = styled.button`
  background-color: transparent;
  border: 2px solid #fff;
  border-radius: 5px;
  color: #fff;
  transition: all 0.3s ease-in;
  font-size: 1.2em;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
  padding: 10px 30px;
  width: 100%;
  max-width: 180px;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: #fff;
    color: #2d6b79;
  }
`;

const CaptureLabel = styled.label`
  border: solid 2.5px #f4d2da;
  border-radius: 5px;
  min-width: 300px;
  max-width: 300px;
`;

const CapturedImageContainer = styled.div`
  max-width: 650px;
`;

const CapturedImage = styled.img`
  width: calc(100px + 50vw);
  max-width: 650px;
  margin: 0 auto;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
const CapturedRemoveButton = styled(CiCircleRemove)`
  position: relative;
  z-index: 100;
  cursor: pointer;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  color: #fff;
  transform: scale(1);
  transition: all 0.3s ease-in;
  &:hover {
    transform: scale(1.1);
  }
`;

export default function CameraCapture({ onLabelClick }) {
  const clearImage = () => {
    setImageSrc(null); // Clear the image source
    if (onLabelClick) onLabelClick(null); // Notify the parent
    setOpen(!open);
  };

  const [imageSrc, setImageSrc] = useState(null);
  const [open, setOpen] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
        if (onLabelClick) onLabelClick(reader.result); // Update isClicked as soon as the image is loaded
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCaptureClick = (e) => {
    e.stopPropagation();

    // Trigger the image input
    document.getElementById("icon-button-file").click();

    if (onLabelClick) onLabelClick(imageSrc);
  };

  return (
    <div className="w-100 mt-2 camera-capture">
      <CapturedImageContainer className="camera-capture__image w-75 mx-auto d-flex flex-column">
        {imageSrc && (
          <>
            <CapturedRemoveButton
              className="align-self-end mb-2"
              onClick={clearImage}
            >
              X
            </CapturedRemoveButton>
            <CapturedImage
              src={imageSrc}
              alt="Captured preview"
              className="w-100 h-100"
            />
            <CaptureButton className="mx-auto mt-3">SUBMIT</CaptureButton>
          </>
        )}
      </CapturedImageContainer>
      <div className="w-100 mt-4 mb-2">
        <input
          accept="image/*"
          id="icon-button-file"
          className="d-none"
          type="file"
          capture="environment"
          onChange={handleImageChange}
        />
        <MdMonochromePhotos
          className="camera-capture__icon mb-3"
          onClick={() => setOpen(!open)}
        />
        <div className="button-container">
          <Collapse in={open} className="mx-auto">
            <CaptureLabel
              htmlFor="icon-button-file"
              onClick={handleCaptureClick}
            >
              <CaptureButton onClick={() => setOpen(!open)} className="m-3">
                CAPTURE
              </CaptureButton>
            </CaptureLabel>
          </Collapse>
        </div>
      </div>
    </div>
  );
}

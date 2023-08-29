import React, { useState } from "react";
import { MdMonochromePhotos } from "react-icons/md";
import styled from "styled-components";
import { CiCircleRemove } from "react-icons/ci";
import { load } from "../../hooks/storage";

export const CaptureButton = styled.button`
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
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: #fff;
    color: #2d6b79;
  }
`;

export const CaptureLabel = styled.label`
  border: solid 2.5px #f4d2da;
  border-radius: 5px;
  min-width: 300px;
  max-width: 300px;
`;

export const CapturedImageContainer = styled.div`
  max-width: 450px;
`;

const CapturedImage = styled.img`
  width: calc(100px + 50vw);
  max-width: 650px;
  margin: 0 auto;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
export const CapturedRemoveButton = styled(CiCircleRemove)`
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
  const accessCode = JSON.parse(load("accessCode"));
  console.log(accessCode);
  const [imageSrc, setImageSrc] = useState(null);
  const clearImage = () => {
    const imageInput = document.getElementById("icon-button-file");

    if (imageInput) {
      imageInput.value = ""; // Clear the input's file value
    }
    if (imageSrc) {
      URL.revokeObjectURL(imageSrc);
    }
    setImageSrc(null); // Clear the image source
    setFile(null); // Clear the file state
    if (onLabelClick) onLabelClick(null); // Notify the parent
    setOpen(!open);
  };

  const [open, setOpen] = useState(false);

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Create an object URL for the file
      const objectURL = URL.createObjectURL(selectedFile);

      // Set the image source for displaying the image
      setImageSrc(objectURL);
      if (onLabelClick) onLabelClick(objectURL);

      // Set the file for uploading later
      setFile(selectedFile);
    }
  };

  const handleUploadClick = async () => {
    // Sanity API related information
    const projectId = "45qbr9g7";
    const dataset = "production";
    const apiVersion = "v2021-10-21";
    const token =
      "skY4ZPymEfLDlQxeVm4o1z4kyz2Qqop0aYO6eZHjTF2HqQIxo1fqg4q8V6YzNEaTUuhJNXbdEXu1ycsbjm24LnodhPvHbksqetKROrdCFpACAG1Q25vwIcUCw6d7TMw4Y4ol2WVUHV2v592lzRfRalaQ8yppc5BxZaFIc2tAea4amABeaWQw";

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const byteArray = new Uint8Array(arrayBuffer);

    // Upload File
    const uploadUrl = `https://${projectId}.api.sanity.io/${apiVersion}/assets/images/${dataset}`;
    const uploadRes = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": file.type, // e.g., image/jpeg
      },
      body: byteArray,
    });

    const uploadData = await uploadRes.json();
    console.log(uploadData);
    console.log("Asset ID set:", uploadData.document._id);
    return uploadData;
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();

    if (file) {
      // First, upload the file and get the asset ID
      const uploadData = await handleUploadClick();
      if (uploadData && uploadData.document) {
        const assetId = uploadData.document._id;

        const projectId = "45qbr9g7";
        const dataset = "production";
        const apiVersion = "v2021-10-21";
        const token =
          "skY4ZPymEfLDlQxeVm4o1z4kyz2Qqop0aYO6eZHjTF2HqQIxo1fqg4q8V6YzNEaTUuhJNXbdEXu1ycsbjm24LnodhPvHbksqetKROrdCFpACAG1Q25vwIcUCw6d7TMw4Y4ol2WVUHV2v592lzRfRalaQ8yppc5BxZaFIc2tAea4amABeaWQw";

        // Now, create a new document with the asset ID
        const currentDateTime = new Date().toISOString();
        const document = {
          _type: accessCode,
          time: currentDateTime,
          image: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: assetId,
            },
          },
        };

        console.log("Document to be created:", document);

        const postUrl = `https://${projectId}.api.sanity.io/${apiVersion}/data/mutate/${dataset}`;
        const postRes = await fetch(postUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ mutations: [{ create: document }] }),
        });

        const postData = await postRes.json();

        if (postRes.ok) {
          // Check if POST request was successful
          clearImage(); // Clear the captured image
        }
        console.log("Document created: ", postData);
      }
    } else {
      console.log("No file to upload");
    }
  };
  return (
    <form className="w-100 mt-2 camera-capture">
      <CapturedImageContainer className="camera-capture__image w-75 mx-auto d-flex flex-column">
        {imageSrc && (
          <>
            <CapturedRemoveButton
              className="remove-button align-self-end mb-2"
              onClick={clearImage}
            >
              X
            </CapturedRemoveButton>
            <CapturedImage
              src={imageSrc}
              alt="Captured preview"
              className="w-100 h-100"
            />
            <CaptureButton
              onClick={handleSaveClick}
              type="submit"
              className="mx-auto mt-3"
            >
              SUBMIT
            </CaptureButton>
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
          onChange={handleFileChange}
        />

        <div className="button-container d-flex justify-content-center flex-column">
          <label htmlFor="icon-button-file">
            <MdMonochromePhotos className="camera-capture__icon my-3" />
          </label>
          {!imageSrc && (
            <div>
              <p className="poppins">
                Trykk på kameraet for å knipse et bilde!
              </p>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

import React, { useState } from "react";
import { MdMonochromePhotos } from "react-icons/md";
import { load } from "../../hooks/storage";
import * as S from "./index.styles";
import { ChaoticOrbit } from "@uiball/loaders";

export default function CameraCapture({ onLabelClick }) {
  const accessCode = JSON.parse(load("accessCode"));

  const [isLoading, setIsLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const clearImage = () => {
    const imageInput = document.getElementById("icon-button-file");

    if (imageInput) {
      imageInput.value = "";
    }
    if (imageSrc) {
      URL.revokeObjectURL(imageSrc);
    }
    setImageSrc(null);
    setFile(null);
    if (onLabelClick) onLabelClick(null);
    setOpen(!open);
  };

  const [open, setOpen] = useState(false);

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const objectURL = URL.createObjectURL(selectedFile);
      setImageSrc(objectURL);
      if (onLabelClick) onLabelClick(objectURL);
      setFile(selectedFile);
    }
  };

  const handleUploadClick = async () => {
    setIsLoading(true);
    const projectId = "45qbr9g7";
    const dataset = "production";
    const apiVersion = "v2021-10-21";
    const token =
      "skY4ZPymEfLDlQxeVm4o1z4kyz2Qqop0aYO6eZHjTF2HqQIxo1fqg4q8V6YzNEaTUuhJNXbdEXu1ycsbjm24LnodhPvHbksqetKROrdCFpACAG1Q25vwIcUCw6d7TMw4Y4ol2WVUHV2v592lzRfRalaQ8yppc5BxZaFIc2tAea4amABeaWQw";
    const arrayBuffer = await file.arrayBuffer();
    const byteArray = new Uint8Array(arrayBuffer);

    // Upload File
    const uploadUrl = `https://${projectId}.api.sanity.io/${apiVersion}/assets/images/${dataset}`;
    const uploadRes = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": file.type,
      },
      body: byteArray,
    });

    const uploadData = await uploadRes.json();
    setIsLoading(false);
    console.log(uploadData);
    console.log("Asset ID set:", uploadData.document._id);
    return uploadData;
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    clearImage();

    if (file) {
      const uploadData = await handleUploadClick();
      if (uploadData && uploadData.document) {
        const assetId = uploadData.document._id;

        const projectId = "45qbr9g7";
        const dataset = "production";
        const apiVersion = "v2021-10-21";
        const token =
          "skY4ZPymEfLDlQxeVm4o1z4kyz2Qqop0aYO6eZHjTF2HqQIxo1fqg4q8V6YzNEaTUuhJNXbdEXu1ycsbjm24LnodhPvHbksqetKROrdCFpACAG1Q25vwIcUCw6d7TMw4Y4ol2WVUHV2v592lzRfRalaQ8yppc5BxZaFIc2tAea4amABeaWQw";

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

        console.log("Document created: ", postData);
      }
    } else {
      console.log("No file to upload");
    }
    setIsLoading(false);
  };

  if (isLoading)
    return (
      <div className="d-flex justify-content-center">
        <ChaoticOrbit size={50} color="white" />
      </div>
    );

  return (
    <form className="w-100 mt-2 camera-capture">
      <S.CapturedImageContainer className="camera-capture__image w-75 mx-auto d-flex flex-column">
        {imageSrc && (
          <>
            <S.CapturedImage
              src={imageSrc}
              alt="Captured preview"
              className="w-100 h-100"
            />
            <S.CaptureButton
              onClick={handleSaveClick}
              type="submit"
              className="mx-auto mt-3"
            >
              DEL
            </S.CaptureButton>
            <S.RemoveButton onClick={clearImage} className="mx-auto mt-3">
              ANGRE
            </S.RemoveButton>
          </>
        )}
      </S.CapturedImageContainer>
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
          {!imageSrc && (
            <>
              <label htmlFor="icon-button-file">
                <MdMonochromePhotos className="camera-capture__icon my-3" />
              </label>
              <div>
                <p className="poppins">
                  Trykk på kameraet for å knipse et bilde!
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

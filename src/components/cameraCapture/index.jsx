import React, { useState, useEffect, useCallback } from "react";
// import { MdMonochromePhotos } from "react-icons/md";
import { load } from "../../hooks/storage";
import * as S from "./index.styles";
import { ChaoticOrbit } from "@uiball/loaders";
// import { TbQuestionMark, TbPhoto } from "react-icons/tb";
import TestingCamera from "../testingCamera";
import HelpIcon from "../help";
import AlbumIcon from "../albumIcon";

export default function CameraCapture({ onLabelClick }) {
  const accessCode = JSON.parse(load("accessCode"));

  const [isLoading, setIsLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);
  const [statusType, setStatusType] = useState(null);
  const [albumOpen, setAlbumOpen] = useState(null);
  const [fetchedImages, setFetchedImages] = useState([]);

  const fetchImages = useCallback(async () => {
    const projectId = "45qbr9g7";
    const dataset = "production";
    const apiVersion = "v2021-10-21";
    const token =
      "skY4ZPymEfLDlQxeVm4o1z4kyz2Qqop0aYO6eZHjTF2HqQIxo1fqg4q8V6YzNEaTUuhJNXbdEXu1ycsbjm24LnodhPvHbksqetKROrdCFpACAG1Q25vwIcUCw6d7TMw4Y4ol2WVUHV2v592lzRfRalaQ8yppc5BxZaFIc2tAea4amABeaWQw";
    const query = encodeURIComponent(
      `*[_type == "${accessCode}"]{time, "imageUrl": image.asset->url}`
    );

    const url = `https://${projectId}.api.sanity.io/${apiVersion}/data/query/${dataset}?query=${query}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      const sortedImages = data.result.sort((a, b) => {
        return new Date(b.time) - new Date(a.time);
      });
      setFetchedImages(sortedImages);
    } else {
      console.error("Failed to fetch images");
    }
  }, [accessCode]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

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

    if (albumOpen) {
      setAlbumOpen(false);
    }

    const clearStatusMessage = () => {
      setTimeout(() => {
        setStatusMessage(null);
        setStatusType(null);
      }, 3000);
    };

    if (uploadRes.ok) {
      setIsLoading(false);
      setStatusMessage("Bildet er lastet opp 🌥️");
      setStatusType("success");
      await fetchImages();
    } else {
      setIsLoading(false);
      setStatusMessage("Noe gikk galt 😞");
      setStatusType("error");
    }
    clearStatusMessage();

    const uploadData = await uploadRes.json();
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

        const postUrl = `https://${projectId}.api.sanity.io/${apiVersion}/data/mutate/${dataset}`;
        const postRes = await fetch(postUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ mutations: [{ create: document }] }),
        });

        // if (postRes.ok) {
        //   Fetch images only if POST was successful
        // }

        // else {
        //   setStatusMessage("Noe gikk galt 😞");
        //   setStatusType("error");
        // }

        const postData = await postRes.json();
        console.log("postData:", postData);
      }
    }
    setIsLoading(false);
    await fetchImages();
  };

  function openAlbum() {
    if (albumOpen) {
      setAlbumOpen(false);
    } else {
      setAlbumOpen(true);
setTimeout(() => {
        window.scrollBy(0, 500);
      }, 2000);
    }
    const instructions = document.querySelector(".instructions");
    if (instructions) {
      instructions.classList.remove("display-help");
    }
  }
  function openInstructions() {
    if (albumOpen) {
      setAlbumOpen(false);
    }
    const instructions = document.querySelector(".instructions");
    instructions.classList.toggle("display-help");
  }

  return (
    <div className="w-100 camera-capture">
      <S.CapturedImageContainer className="camera-capture__image mx-auto d-flex flex-column">
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
              LAST OPP
            </S.CaptureButton>
            <S.RemoveButton onClick={clearImage} className="mx-auto mt-3">
              ANGRE
            </S.RemoveButton>
          </>
        )}
      </S.CapturedImageContainer>

      <div className="w-100 mt-4 mb-2">
        {isLoading && (
          <div className="d-flex justify-content-center align-items-center w-100 h-100 mb-6">
            <ChaoticOrbit size={50} color="white" />
          </div>
        )}
        {statusMessage && (
          <div className={`status-message ${statusType}`}>{statusMessage}</div>
        )}
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
              <div className="instructions flex-column text-start px-3 mx-auto">
                <S.InstructionText>
                  1. Del koden med alle som er med 🙋
                </S.InstructionText>
                <S.InstructionText>2. Trykk på kameraet 📷</S.InstructionText>
                <S.InstructionText>
                  3. Knips bilder og last opp 🤳
                </S.InstructionText>
                <S.InstructionText>
                  4. Vent i spenning på delt album 👯
                </S.InstructionText>
              </div>
              <label className="cursor-pointer" htmlFor="icon-button-file">
                {/* <MdMonochromePhotos className="icons camera-capture__icon mygap-3" /> */}
                <TestingCamera />
              </label>
              <div className="d-flex justify-content-between mb-5">
                {/* <TbPhoto
                  className="album-icon icons ms-2"
                  onClick={openAlbum}
                /> */}
                <div className="icons" onClick={openAlbum}>
                  <AlbumIcon />
                </div>
                {/* <TbQuestionMark className="instructions-icon icons" />
                 */}
                <div className="icons" onClick={openInstructions}>
                  <HelpIcon />
                </div>
              </div>

              {/* <div>
                <p className="poppins">
                  Trykk på kameraet for å knipse et bilde!
                </p>
              </div> */}
            </>
          )}
        </div>
      </div>
      {albumOpen && !imageSrc && (
        <div className="w-100">
          {fetchedImages.map((imgData, index) => {
            const date = new Date(imgData.time);
            const day = String(date.getDate()).padStart(2, "0");
            const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
            const hours = String(date.getHours()).padStart(2, "0");
            const minutes = String(date.getMinutes()).padStart(2, "0");

            const formattedDate = `${day}/${month} ${hours}:${minutes}`;

            return (
              <div key={index} className="album-image w-100">
                <img src={imgData.imageUrl} alt="Fetched" className="w-100" />
                <p className="mt-2 status-message">{formattedDate}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

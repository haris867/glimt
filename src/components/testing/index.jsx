import React, { useState } from "react";
import { CapturedImageContainer } from "../cameraCapture";
import { MdMonochromePhotos } from "react-icons/md";

export default function TestingApi() {
  const [file, setFile] = useState(null);
  const [imageAssetId, setImageAssetId] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
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
    setImageAssetId(uploadData.document._id); // <-- This is important
    console.log(uploadData);
    console.log("Asset ID set:", uploadData.document._id);
  };

  //   const handleSaveClick = async () => {
  //     handleUploadClick();
  //     // Sanity API related information
  //     const projectId = "45qbr9g7";
  //     const dataset = "production";
  //     const apiVersion = "v2021-10-21";
  //     const token =
  //       "skY4ZPymEfLDlQxeVm4o1z4kyz2Qqop0aYO6eZHjTF2HqQIxo1fqg4q8V6YzNEaTUuhJNXbdEXu1ycsbjm24LnodhPvHbksqetKROrdCFpACAG1Q25vwIcUCw6d7TMw4Y4ol2WVUHV2v592lzRfRalaQ8yppc5BxZaFIc2tAea4amABeaWQw";

  //     const currentDateTime = new Date().toISOString();

  //     // Creating a new document and including the asset
  //     const document = {
  //       _type: "images123",
  //       time: currentDateTime, // Current datetime
  //       image: {
  //         _type: "image",
  //         asset: {
  //           _type: "reference",
  //           _ref: imageAssetId,
  //         },
  //       },
  //     };

  //     console.log("Document to be created:", document);

  //     const postUrl = `https://${projectId}.api.sanity.io/${apiVersion}/data/mutate/${dataset}`;
  //     const postRes = await fetch(postUrl, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({ mutations: [{ create: document }] }),
  //     });

  //     const postData = await postRes.json();
  //     console.log("Document created: ", postData);
  //   };

  return (
    <CapturedImageContainer className="camera-capture__image w-75 mx-auto d-flex flex-column">
      <label className="mx-auto" htmlFor="icon-button-file">
        <MdMonochromePhotos className="camera-capture__icon my-3" />
      </label>
      <input
        accept="image/*"
        id="icon-button-file"
        className="d-none"
        type="file"
        capture="environment"
        onChange={handleFileChange}
      />
      {/* <CaptureButton onClick={handleSaveClick}>SUBMIT</CaptureButton> */}
    </CapturedImageContainer>
  );
}

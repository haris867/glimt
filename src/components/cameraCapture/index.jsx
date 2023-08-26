import React, { useState } from "react";
import { MdMonochromePhotos } from "react-icons/md";

export default function CameraCapture({ onLabelClick }) {
  const [imageSrc, setImageSrc] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLabelClick = (e) => {
    e.stopPropagation();

    if (onLabelClick) onLabelClick(e);
  };

  return (
    <div className="w-100 mt-4">
      {/* <h1>Page</h1>
      <div>
        <input
          accept="image/*"
          id="icon-button-file"
          type="file"
          capture="environment"
        />
      </div> */}
      <div className="camera-capture__image">
        {imageSrc && (
          <img src={imageSrc} alt="Captured preview" className="w-100 h-100" />
        )}
      </div>
      <div className="camera-capture w-100">
        <input
          accept="image/*"
          id="icon-button-file"
          className="camera-capture__input"
          type="file"
          capture="environment"
          onChange={handleImageChange}
        />
        <label
          htmlFor="icon-button-file"
          className="camera-capture__label"
          onClick={handleLabelClick}
        >
          <MdMonochromePhotos />
        </label>
      </div>
    </div>
  );
}

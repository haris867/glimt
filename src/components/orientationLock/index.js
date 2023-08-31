import React, { useEffect } from "react";

export default function OrientationLock() {
  useEffect(() => {
    const handleOrientationChange = () => {
      const isLandscape = window.innerWidth > window.innerHeight;
      if (isLandscape && window.innerWidth < 1000) {
        document.body.classList.add("landscape");
      } else {
        document.body.classList.remove("landscape");
      }
    };

    handleOrientationChange();

    window.addEventListener("orientationchange", handleOrientationChange);
    window.addEventListener("resize", handleOrientationChange);

    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
      window.removeEventListener("resize", handleOrientationChange);
    };
  }, [window.innerWidth, window.innerHeight]);

  return null;
}

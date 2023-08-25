import { MdMonochromePhotos } from "react-icons/md";
import ThreeFiberScene from "../scene";

export default function Page() {
  return (
    <div className="w-100 h-100">
      {/* <h1>Page</h1>
      <div>
        <input
          accept="image/*"
          id="icon-button-file"
          type="file"
          capture="environment"
        />
      </div> */}
      <div className="position-absolute camera-capture w-100">
        <input
          accept="image/*"
          id="icon-button-file"
          className="camera-capture__input"
          type="file"
          capture="environment"
        />
        <label htmlFor="icon-button-file" className="camera-capture__label">
          <MdMonochromePhotos />
        </label>
      </div>
      <ThreeFiberScene className="w-100 h-100" />
    </div>
  );
}

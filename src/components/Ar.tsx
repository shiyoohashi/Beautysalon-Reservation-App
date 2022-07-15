// import { listShopmenus } from "../graphql/queries";
// import { API, graphqlOperation } from "aws-amplify";
// import { Link } from "react-router-dom";
// import { TypeOfMenuDetail, TypeOfMenu } from "../global";

// import "@aws-amplify/ui-react/styles.css";
import Webcam from "react-webcam";
import { useState, useCallback, useRef } from "react";
import "./css/Ar.css";
import { EditPhoto } from "./EditPhoto";

const videoConstraints = {
  width: 720,
  height: 360,
  facingMode: "user",
};
function test() {
  let canvasHeight = window.innerHeight;
  let canvasWidth = window.innerWidth;

  if (window.innerWidth > window.innerHeight) {
    canvasWidth = Math.floor(window.innerHeight * 0.66);
  }
}
export const Ar = () => {
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
  const [isFirstCapture, setFirstCapture] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const [url, setUrl] = useState<string | null>(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setUrl(imageSrc);
      setCaptureEnable(false);
    }
  }, [webcamRef]);

  function retake() {
    setUrl(null);
    setCaptureEnable(true);
  }

  function firstCapture() {
    setCaptureEnable(true);
    setFirstCapture(true);
  }

  // () => setCaptureEnable(true)

  return (
    <>
      <div className="cameraArea">
        {isCaptureEnable || isFirstCapture || (
          <button onClick={firstCapture}>開始</button>
        )}
        {isCaptureEnable && (
          <>
            <div>
              <button onClick={() => setCaptureEnable(false)}>終了</button>
            </div>
            <div>
              <Webcam
                audio={false}
                width={540}
                height={360}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
              />
            </div>
            <button onClick={capture}>キャプチャ</button>
          </>
        )}
        {url && (
          <>
            <div>
              <button onClick={retake}>再撮影</button>
            </div>
            <div>
              <img id="screen-shot" src={url} alt="Screenshot" />
            </div>
            <p>あははははははは</p>
            {/* <EditPhoto /> */}
          </>
        )}
      </div>
    </>
  );
};

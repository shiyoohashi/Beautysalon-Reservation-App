// import { listShopmenus } from "../graphql/queries";
// import { API, graphqlOperation } from "aws-amplify";
// import { Link } from "react-router-dom";
// import { TypeOfMenuDetail, TypeOfMenu } from "../global";
// import "@aws-amplify/ui-react/styles.css";
import Webcam from "react-webcam";
import { useState, useCallback, useRef } from "react";
import "./Ar.css";

const videoConstraints = {
  width: 720,
  height: 360,
  facingMode: "user",
};

export const Ar = () => {
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const [url, setUrl] = useState<string | null>(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setUrl(imageSrc);
    }
  }, [webcamRef]);
  return (
    <>
      <div className="cameraArea">
        {isCaptureEnable || (
          <button onClick={() => setCaptureEnable(true)}>開始</button>
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
              <button
                onClick={() => {
                  setUrl(null);
                }}
              >
                削除
              </button>
            </div>
            <div>
              <img id="screen-shot" src={url} alt="Screenshot" />
            </div>
          </>
        )}
      </div>
    </>
  );
};

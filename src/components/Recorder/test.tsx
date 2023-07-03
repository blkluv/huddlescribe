import React, { useState } from "react";
import {
  ReactMediaRecorderHookProps,
  useReactMediaRecorder,
} from "react-media-recorder";
import { useVideoStore } from "@/hooks/useVideoStore";
import { NFTStorage } from "nft.storage";

const client = new NFTStorage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEI2ZUQxZTJGZkQ4NUE4RjU5NTg2ZTYzNURiOTYxMTIyNzA5M0Q4ZEEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4ODMzNTIxMDYyMSwibmFtZSI6Ikh1ZGRsZSJ9.ttTEpm-z2fPhbPwcCSd3P2KCf0IWj79Fy08HCwsbAKQ" });

function App(): JSX.Element {
  const { setVideoSrc, videoSrc } = useVideoStore();

  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      video: true,
      screen: true,
      onStop: (blobUrl) => {
        setVideoSrc(blobUrl);
      },
    });

  const handleStart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    startRecording();
  };

  const handleStop = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    stopRecording();
  };

  const handleSave = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    console.log("saving")

    try {
      const metadata = await client.store({
        name: "My Awesome Video",
        description:
          "This is a video uploaded to the Filecoin network using nft.storage.",
        image: new File(
          [
            /* thumbnail data */
          ],
          "thumbnail.png",
          { type: "image/png" }
        ),
        video: new File(
          [
            /* video data */
          ],
          "recording.webm",
          { type: "video/webm" }
        ),
      });

      setVideoSrc(metadata.url);

      console.log(metadata)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleStart} disabled={status === "recording"}>
          start
        </button>
        <button onClick={handleStop} disabled={status === "stopped"}>
          stop
        </button>
        <button onClick={handleSave} disabled={!mediaBlobUrl}>
          save to Filecoin
        </button>
      </header>
    </div>
  );
}

export default App;


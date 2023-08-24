import React, { useRef, useState } from "react";
import RecordRTC from "recordrtc";

const RecordVideo = () => {
  const videoRef = useRef(null);
  const recorderRef = useRef(null);
  const streamRef = useRef(null);

  const [permissionGranted, setPermissionGranted] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState("");

  const requestPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      setPermissionGranted(true);
    } catch (error) {
      console.error("Error accessing camera and microphone:", error);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      recorderRef.current = new RecordRTC(streamRef.current, {
        type: "video",
        mimeType: "video/webm",
      });

      recorderRef.current.startRecording();
      setRecordingStatus("Recording...");
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    if (!recorderRef.current) {
      console.warn("Recorder is not available.");
      return;
    }

    recorderRef.current.stopRecording(() => {

      const blob = recorderRef.current.getBlob();
      const videoURL = URL.createObjectURL(blob);

      const videoElement = document.createElement("video");
      videoElement.controls = true;
      videoElement.src = videoURL;

      if (videoRef.current.parentNode) {
        videoRef.current.parentNode.replaceChild(
          videoElement,
          videoRef.current
        );
      }

      videoRef.current = videoElement;
      videoRef.current.srcObject = null;

      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach((track) => track.stop());
      }

      setRecordingStatus("Recording stopped");
    });
  };

  return (
    <div className="my-4">
      {!permissionGranted ? (
        <button
          className="bg-blue-400 rounded-lg p-2 mx-2"
          onClick={requestPermission}
        >
          Allow Camera and Microphone
        </button>
      ) : (
        <>
          {recordingStatus === "Recording..." ? (
            <button
              className="bg-red-400 rounded-lg p-2"
              onClick={stopRecording}
            >
              Stop Recording
            </button>
          ) : (
            <button
              className="bg-blue-400 rounded-lg p-2"
              onClick={startRecording}
            >
              Start Recording
            </button>
          )}

          {recordingStatus && <p>{recordingStatus}</p>}
        </>
      )}
      <video className="mt-3" ref={videoRef} autoPlay playsInline muted />
    </div>
  );
};

export default RecordVideo;

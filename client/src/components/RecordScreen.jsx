import React, { useRef } from 'react';

const RecordScreen = () => {
  const videoRef = useRef(null);
  const recordedVideoRef = useRef(null);
  let mediaRecorder;
  let recordedChunks = [];

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
      videoRef.current.srcObject = stream;

      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = event => {
        if (event.data.size > 0) {
          recordedChunks.push(event.data);
        }
      };

      mediaRecorder.start();
    } catch (error) {
      console.error('Error accessing screen and microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const videoURL = URL.createObjectURL(blob);
        recordedVideoRef.current.src = videoURL;
      };
    }
  };

  return (
    <div>
      <button className="bg-blue-400 rounded-lg p-2 mr-2" onClick={startRecording}>Start Recording</button>
      <button className="bg-blue-400 rounded-lg p-2" onClick={stopRecording}>Stop Recording</button>
      <video ref={videoRef} autoPlay playsInline muted />
      <video ref={recordedVideoRef} controls />
    </div>
  );
};

export default RecordScreen;

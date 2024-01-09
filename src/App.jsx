import React, { useRef, useEffect, useState } from 'react';

const CameraApp = () => {
  const videoRef = useRef(null);
  const [isVideoOn, setIsVideoOn] = useState(false);

  useEffect(() => {
    const enableCamera = async () => {
      try {
        if (isVideoOn) {
          const stream = await navigator.mediaDevices.getUserMedia({ video: isVideoOn, audio: true });
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing webcam:', error);
      }
    };
    

    enableCamera();
    //it only works(web cam indicator) because of this return
    return () => {
      // Cleanup - stop the video stream when the component unmounts
      const stream = videoRef.current.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => {
          if (track.kind === 'video') {
                        track.stop();
                    }
        });
      }
    };
  }, [isVideoOn]); // Run the effect whenever isVideoOn changes

  const toggleVideo = () => {
    setIsVideoOn((prev) => !prev);
  };

  return (
    <div>
      <h1>Camera App</h1>
      <button onClick={toggleVideo}>{isVideoOn ? 'Turn Off Video' : 'Turn On Video'}</button>
      <video ref={videoRef} autoPlay playsInline />
    </div>
  );
};

export default CameraApp;


/*
        const enableCamera = async () => {
            console.log(call.peerConnection.getSenders());
            if (isVideoClose) {
                const videoSender = call.peerConnection.getSenders().find(s => s.track.kind === 'video');
                const videoTrack = videoSender.track;
                videoTrack.stop();
                // call.peerConnection.removeTrack(videoSender);
                console.log(videoSender);
            }
            else{
                try {
                    const newStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                    
                    // Assuming video track is at index 1
                    const newVideoTrack = newStream.getTracks()[1];

                    // Find and replace the existing video track
                    const sender = call.peerConnection.getSenders().find(s => s.track.kind === newVideoTrack.kind);

                    if (sender) {
                        sender.replaceTrack(newVideoTrack);
                    }
                } catch (error) {
                    console.error('Error accessing webcam:', error);
                }
            }
        }
        
        enableCamera();
        

    }, [isVideoClose]);
*/
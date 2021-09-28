import React, { useState, useEffect, createContext, useRef } from 'react'
import { io} from 'socket.io-client'
import Peer from 'simple-peer';

// Initial context
const Connection = createContext();

// Pass instance of the serevr to context.io | The full URL of the deployed server can be passed in here
const socket = io('https://localhost:5000');

const ContextProvider = ({ children }) => {

    const [stream, setStream] = useState(null);
    const [me, setMe] = useState('');
    const [call, setCall] = useState({});
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);

    // Refs to connect with the iframes of that specific video
    const videoSrc = useRef();
    const callerVideo = useRef();
    // Ref for call
    const connectionRef = useRef();

    useEffect(() => {
        // Get the permission of the camera and mic of the browser from the client's system
        navigator.mediaDevices.getUserMedia({ video: true, audio: true}) // chain a then() as this returns a promise
            .then(currentStream => {
                setStream(currentStream);

                videoSrc.current.srcObject = currentStream; // Setting the currentStream to state and videoSrc ref, whihc will populate-
                //- the video iframe 
            });

            // Catch.Listen to the event emitted by the server once connection is successful
            socket.on("me", id => setMe('id'))

            socket.on("callUser", ({ from, name: callerName, signal }) => {
                setCall({ 
                    isReceivedCall: true, 
                    from, 
                    name: callerName, 
                    signal
                })
            });
    }, []);

    const answerCall = () => { 
        // set callAccpeted to true once a call was acceptedTypes
        setCallAccepted(true);

        // create a peer capable of a video call
        const peer = new Peer({
            initiator: false, // Set to false as a call is just accepted and not initiated
            // options for video chat
            trickle: false, // Set to true
            stream // stream was received and set to state while requesting permission for browser's camera and mic
        });
        
        // Peer will behave as similar to a socket. it will have some actions and handlers that will happen when initiating/accepting a call
        peer.on('signal', (data)=>{ // Data about that signal that was received
            // Video connection would be established here by intertwining hte Socket and Peer
            socket.emit('answerCall',{ // This happens/gets_exe once a signal is created
                signal: data,
                to: call.from, // Whose call is being attended 
            })
        });

        peer.on('stream', (currentStream =>{
            // Set another ref as one was set for videoSrc, for the other user's video || Stream for the other person on the call
            callerVideo.current.srcObject = currentStream;
        }));

        // This call comes from the initial socket, listening for `callUser`
        peer.signal(call.signal);

        // Assigning that the current connection = the current peer inside of the connection
        connectionRef.current = peer;
     }

    const callUser = () => {  }

    const leaveCall = () => {  }

    return true;
}

export default ContextProvider;
import { Socket } from "socket.io-client";

const iceConfig: RTCConfiguration = {
  iceServers: [
    {
      urls: [
        "stun:stun.1.google.com:19302",
        "stun:stun1.1.google.com:19302",
        "stun:stun1.1.google.com:19302",
      ],
    },
  ],
};

class Peer {
  socket: Socket;
  peerConnection: RTCPeerConnection;
  onTrack: (track: MediaStreamTrack) => void;
  constructor(socket: Socket, onTrack: (track: MediaStreamTrack) => void) {
    this.socket = socket;
    this.peerConnection = new RTCPeerConnection(iceConfig);
    this.onTrack = onTrack;
  }
  init(): void {
    this.socket.on("answer", (answer: RTCSessionDescriptionInit): void => {
      const remoteDesc: RTCSessionDescription = new RTCSessionDescription(
        answer
      );
      this.peerConnection
        .setRemoteDescription(remoteDesc)
        .then((): void => {
          console.log(`remote answer set as rDesc`);
        })
        .catch(console.error);
    });

    this.socket.on("offer", (offer: RTCSessionDescriptionInit): void => {
      this.peerConnection.setRemoteDescription(offer).then((): void => {
        console.log(`remove offer set as rDesc`);
        this.peerConnection
          .createAnswer()
          .then((answer: RTCSessionDescriptionInit): void => {
            console.log(`sent answer`);
            this.peerConnection.setLocalDescription(answer);
            this.socket.emit("answer", answer);
          })
          .catch(console.error);
      });
    });

    this.socket.on("candidate", (candidate: RTCIceCandidateInit): void => {
      this.peerConnection
        .addIceCandidate(candidate)
        .then((): void => {
          console.log(`add ice`);
        })
        .catch(console.error);
    });

    this.peerConnection.addEventListener("connectionstatechange", (event) => {
      if (this.peerConnection.connectionState === "connected") {
        console.log("peer connected!");
      }
    });

    this.peerConnection.addEventListener(
      "icecandidate",
      ({ candidate }: RTCPeerConnectionIceEvent): void => {
        console.log(`sending ice`);
        this.socket.emit("candidate", candidate);
      }
    );
    this.peerConnection.addEventListener(
      "track",
      ({ track }: RTCTrackEvent): void => {
        this.onTrack(track);
      }
    );
  }
  createOffer(): void {
    this.peerConnection
      .createOffer()
      .then((offer: RTCSessionDescriptionInit): void => {
        this.peerConnection
          .setLocalDescription(offer)
          .then(() => {
            console.log(`local offer set as lDesc`);
          })
          .catch(console.error);
        this.socket.emit("offer", offer);
      })
      .catch(console.error);
  }
  addStream(stream: MediaStream): void {
    stream.getTracks().forEach((track: MediaStreamTrack): void => {
      this.peerConnection.addTrack(track);
    });
  }
}

export default Peer;

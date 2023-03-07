import { FC, useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import Lion from "../components/Lion";
import { SocketContext } from "../contexts/socketContext";
import MuteMicrophone from "../assets/mute-microphone.png";
import Microphone from "../assets/microphone.png";
import { getDisplayMedia, getUserMedia } from "../webRTC/getMedia";
import Button from "../components/Button";
import Input from "../components/Input";
import Peer from "../webRTC";

const Den: FC = (): JSX.Element => {
  const { denId }: { denId?: string } = useParams<string>();

  const socket: Socket | null = useContext<Socket | null>(SocketContext);

  const peer: React.MutableRefObject<Peer | null> = useRef<Peer | null>(null);

  const [localUserStream, setLocalUserStream] = useState<MediaStream | null>();
  const [remoteUserStream, setRemoteUserStream] = useState<MediaStream>(
    new MediaStream()
  );

  useEffect((): (() => void) => {
    if (socket && !peer.current) {
      socket.emit("gather", denId);
      socket.on("gathered", (lionId: string): void => {
        console.log(`${lionId} gathered in ${denId}`);
      });

      peer.current = new Peer(socket, (track: MediaStreamTrack): void => {
        remoteUserStream?.addTrack(track);
      });
      peer.current.init();
      getDisplayMedia().then((stream: MediaStream): void => {
        console.log("adding stream");
        setLocalUserStream(stream);
        peer.current?.addStream(stream);
      });
    }
    return (): void => {};
  }, [socket]);

  return (
    <div className={`p-8 min-h-screen w-full`}>
      <div
        className={`flex flex-wrap landscape:flex-row justify-center items-center gap-3 h-full w-full`}>
        <div className={`flex flex-col gap-4 justify-between grow`}>
          <div className={`text-2xl font-bold underline decoration-wavy`}>
            DEN: {denId?.toLowerCase()}
          </div>
          <Lion srcObject={remoteUserStream} king name={`king's stream`} />
          <Button
            onClick={(): void => {
              peer.current?.createOffer();
            }}>
            Connect
          </Button>
        </div>
        <div
          className={`flex landscape:max-h-[40rem] portrait:max-h-[20rem] justify-around overflow-auto py-4 rounded-md bg-indigo-200 items-center flex-wrap landscape:w-2/5 portrait:w-full h-full gap-2 snap-y`}>
          <Lion srcObject={localUserStream} name={`remote stream`} />
        </div>
      </div>
    </div>
  );
};

export default Den;

// grid grid-cols-12 grid-rows-4

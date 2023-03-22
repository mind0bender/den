import { FC, useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import Lion from "../components/Lion";
import { SocketContext } from "../contexts/socketContext";
import { getDisplayMedia, getUserMedia } from "../webRTC/getMedia";
import Button from "../components/Button";
import Peer from "../webRTC";

const Den: FC = (): JSX.Element => {
  const { denId }: { denId?: string } = useParams<string>();

  const socket: Socket | null = useContext<Socket | null>(SocketContext);

  const peer: React.MutableRefObject<Peer | null> = useRef<Peer | null>(null);

  const [localUserStream, setLocalUserStream] = useState<MediaStream | null>();
  const [remoteUserStream, setRemoteUserStream] = useState<MediaStream | null>(
    null
  );

  const [name, setName] = useState<string>("unknown");

  useEffect((): (() => void) => {
    if (socket && !peer.current) {
      socket.on("connect", () => {
        setName(socket.id);
        console.log(socket.id);
      });
      socket.emit("gather", denId);
      socket.on("members", (lionIds: string[]): void => {
        console.log(`${lionIds.length} members in ${denId}`);
      });

      peer.current = new Peer(socket, (track: MediaStreamTrack): void => {
        setRemoteUserStream((pms: MediaStream | null): MediaStream => {
          if (!pms) {
            return new MediaStream([track]);
          } else {
            pms.addTrack(track);
            return pms;
          }
        });
      });
      peer.current.init();
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
          <Lion srcObject={remoteUserStream} king name={`${name}'s stream`} />
          <div className={`flex gap-4 justify-center items-center`}>
            <Button
              onClick={(): void => {
                getUserMedia().then((stream: MediaStream): void => {
                  console.log("adding stream");
                  setLocalUserStream(stream);
                  peer.current?.addStream(stream);
                  peer.current?.createOffer();
                });
              }}>
              Share Stream
            </Button>
            <Button
              onClick={(): void => {
                getDisplayMedia().then((stream: MediaStream): void => {
                  console.log("adding stream");
                  setLocalUserStream(stream);
                  peer.current?.addStream(stream);
                  peer.current?.createOffer();
                });
              }}>
              Share Screen
            </Button>
          </div>
        </div>
        <div
          className={`flex landscape:max-h-[40rem] portrait:max-h-[20rem] justify-around overflow-auto py-4 rounded-md bg-indigo-200 items-center flex-wrap landscape:w-2/5 portrait:w-full h-full gap-2 snap-y`}>
          <Lion srcObject={localUserStream} name={`your stream`} />
        </div>
      </div>
    </div>
  );
};

export default Den;

// grid grid-cols-12 grid-rows-4

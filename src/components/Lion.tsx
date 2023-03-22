import {
  FC,
  memo,
  MutableRefObject,
  NamedExoticComponent,
  useEffect,
  useRef,
} from "react";

interface LionProps {
  king?: boolean;
  name: string;
  muted?: boolean;
  srcObject?: MediaStream | null;
}

const Lion: FC<LionProps> = ({
  king = false,
  name,
  muted = true,
  srcObject,
}: LionProps): JSX.Element => {
  const vdo: MutableRefObject<HTMLVideoElement | null> =
    useRef<HTMLVideoElement | null>(null);
  useEffect((): (() => void) => {
    if (vdo.current) {
      if (srcObject && srcObject.getTracks().length) {
        console.log("setting stream");
        vdo.current.srcObject = srcObject;
      } else {
        vdo.current.srcObject = null;
      }
    }
    return (): void => {};
  }, [srcObject]);

  return (
    <div
      className={`relative group bg-indigo-500 min-w-[10rem] snap-center aspect-video inline max-h-nonav ${
        king ? `grow` : "landscape:w-5/12 portrait:w-1/3"
      } rounded-md`}>
      {srcObject && srcObject.getTracks().length !== 0 && (
        <video
          ref={vdo}
          autoPlay
          muted={muted}
          className={`w-full h-full rounded-md`}
        />
      )}
      <div
        className={`${
          king ? "text-sm" : "text-sm"
        } absolute opacity-0 group-hover:opacity-100 bg-gradient-to-b from-black w-full top-0 left-0 text-lg md:text-xl px-2 py-1 rounded-t-md text-white duration-200`}>
        {name}
      </div>
    </div>
  );
};

export const MemoizedLion: NamedExoticComponent<LionProps> = memo(Lion);

export default MemoizedLion;

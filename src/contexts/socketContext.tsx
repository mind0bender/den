import {
  Context,
  createContext,
  FC,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { SERVER_URL } from "../constants";

export const SocketContext: Context<Socket | null> =
  createContext<Socket | null>(null);

interface SocketProviderProps {
  children: ReactNode;
}

const SocketProvider: FC<SocketProviderProps> = ({
  children,
}: SocketProviderProps): JSX.Element => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect((): (() => void) => {
    const soc: Socket = io(SERVER_URL);

    soc.on("connection", (): void => {
      console.log("socket connection established");
    });

    setSocket(soc);

    return (): void => {
      soc.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;

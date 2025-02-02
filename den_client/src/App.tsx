import { useEffect } from "react";
import { socket } from "./socket";

function App(): JSX.Element {
  useEffect((): (() => void) => {
    socket.on("message", (data: string): void => {
      console.log(`Message received: ${data}`);
    });
    return (): void => {};
  }, []);

  return <div className={`w-full min-h-screen bg-blue-100`}>Lol</div>;
}

export default App;

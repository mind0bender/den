import { ChangeEvent, useEffect, useState } from "react";
import { socket } from "./socket";

function App(): JSX.Element {
  const [messageReceiving, setMessageReceiving] = useState<string>("");
  const [messageSending, setMessageSending] = useState<string>("");

  useEffect((): (() => void) => {
    socket.on("message", (message: string): void => {
      setMessageReceiving(message);
    });
    return (): void => {
      socket.off("message");
    };
  }, []);

  useEffect((): (() => void) => {
    socket.emit("message", messageSending);
    return (): void => {};
  }, [messageSending]);

  return (
    <div className={`w-full min-h-screen bg-blue-100`}>
      <pre className={`w-full bg-white px-4 py-2`}>
        <code>{messageReceiving || " "}</code>
      </pre>
      <hr className={`border-blue-300`} />
      <input
        className={`bg-white px-4 py-2 w-full`}
        type="text"
        placeholder={`Type your message here...`}
        value={messageSending}
        onChange={(e: ChangeEvent<HTMLInputElement>): void => {
          setMessageSending(e.target.value);
        }}
      />
    </div>
  );
}

export default App;

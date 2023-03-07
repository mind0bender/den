import { ChangeEvent, FC, useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import VRChat from "../assets/vr_chat.svg";
import Layout from "../components/Layout";

const BuildDen: FC = (): JSX.Element => {
  const [denID, setDenID] = useState<string>("");

  return (
    <Layout>
      <div
        className={`w-full py-20 px-10 lg:px-20 flex flex-col lg:flex-row-reverse gap-10 justify-around items-center grow`}>
        <div
          className={`max-w-lg flex flex-col space-y-4 lg:space-y-20 justify-center items-center lg:items-start`}>
          <div className={`max-w-lg w-full flex flex-col gap-4`}>
            <div className={`text-4xl font-semibold`}>
              Build Your Den -
              <div className={`text-2xl py-2`}>
                The Ultimate Real-Time Communication Space for Developers
              </div>
            </div>
          </div>
          <div
            className={`flex w-fit flex-col gap-4 bg-indigo-400 rounded-md px-6 py-4`}>
            <Input
              value={denID}
              onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                console.log(e.target.value);
                setDenID(e.target.value);
              }}
              placeholder={`DEN ID`}
              label={`den-id`}
            />
            <div className={`flex justify-end`}>
              <Button>Build</Button>
            </div>
          </div>
        </div>
        <div className={`max-w-lg w-full flex flex-col gap-4`}>
          <div
            className={`w-full flex lg:justify-end justify-center items-center p-2`}>
            <img
              draggable={"false"}
              className={`max-w-sm`}
              src={VRChat}
              alt="VR chat"
            />
          </div>
          <div className={`text-lg`}>
            Welcome to
            <span className={`font-bold`}> Den's </span>
            Build page - the ultimate destination for&nbsp;
            <span className={`underline decoration-wavy`}>developers</span>
            &nbsp; who want to&nbsp;
            <span className={`underline decoration-wavy`}>collaborate</span>
            &nbsp; and have their own real-time communication space
            <br />- their den.
          </div>
          <div>
            So what are you waiting for?
            <br />
            Start building your Den today and enjoy the ultimate real-time
            communication space for developers.
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BuildDen;

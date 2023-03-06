import { ChangeEvent, FC, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";

const Gather: FC = (): JSX.Element => {
  const [denID, setDenID] = useState<string>("");

  return (
    <div
      className={`w-full py-20 px-10 lg:px-20 flex flex-col lg:flex-row-reverse gap-10 justify-around items-center grow`}>
      <div
        className={`max-w-lg flex flex-col space-y-4 lg:space-y-20 justify-center items-center lg:items-start`}>
        <div className={`max-w-lg w-full flex flex-col gap-4`}>
          <div className={`text-4xl font-semibold`}>
            Enter our Den Gathering
            <div className={`text-2xl py-2`}>
              and discover new possibilities for collaboration and communication
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
        <div className={`w-full flex justify-end p-2`}>
          {/* <img className={`max-w-sm`} src={VRChat} alt="VR chat" /> */}
        </div>
        <div className={`text-lg font-bold`}>
          Join the <span title={`group of lions`}>Pride</span> of developers at
          Den Gathering -
        </div>
        where collaboration and communication are taken to new heights. Discover
        the power of real-time communication with our platform and start
        building something amazing.
        <div>
          Enter our Den Gathering today and unlock your team's full potential.
        </div>
      </div>
    </div>
  );
};

export default Gather;

import { FC } from "react";
import { Link } from "react-router-dom";
import GroupVideo from "../assets/group_video.svg";
import Button from "../components/Button";
import Layout from "../components/Layout";

const Home: FC = (): JSX.Element => {
  return (
    <Layout>
      <div
        className={`w-full py-20 px-10 lg:px-20 flex flex-col lg:flex-row gap-10 justify-around items-center grow`}>
        <div className={`flex gap-8 flex-col max-w-lg lg:text-2xl`}>
          <div className={`flex flex-col gap-2`}>
            <div>
              Build{" "}
              <span className={`text-xl lg:text-3xl font-semibold`}>
                Den -{" "}
              </span>
              the Lion's Den of Real-Time Communication for developers.
            </div>
            Connect, collaborate and create with lightning-fast messaging and
            intuitive interface.
          </div>
          <div className={`w-full flex justify-between`}>
            <Button>
              <Link className={`uppercase text-lg`} to="/build">
                Build your Den!
              </Link>
            </Button>
            <Button>
              <Link className={`uppercase text-lg`} to="/build">
                Gather in Den!
              </Link>
            </Button>
          </div>
        </div>
        <div className={`px-2 lg:grow max-w-sm`}>
          <img
            draggable={"false"}
            className={`w-full`}
            src={GroupVideo}
            alt="Group Video"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Home;

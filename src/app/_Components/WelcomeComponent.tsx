import Image from 'next/image';

import flow1 from '@/images/flow_1.png';
import flow2 from '@/images/flow_2.png';
import flow3 from '@/images/flow_3.png';
import { useAppDispatch } from '@/features/hooks';
import { setInteractable } from '@/features/reducers/UIReducer';

const WelcomeComponent = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="fixed w-full h-full top-0 bg-secondary bg-opacity-80 z-50 flex justify-center items-center">
      <div className="bg-secondary rounded-md px-5 py-10 w-4/5 max-w-[1000px] max-lg:h-3/4 h-fit ">
        <h1 className="text-white max-lg:text-xl text-3xl font-semibold text-center mt-3 mb-7">
          Welcome to Nightowl!
        </h1>
        <div className="grid max-lg:grid-cols-1 grid-cols-3 max-lg:h-3/4 overflow-y-auto">
          <div className="bg-button-secondary max-lg:max-w-[500px] max-lg:mx-auto h-full max-lg:h-fit bg-opacity-25 text-white pt-3 pb-10 mx-2 rounded-md max-lg:my-2">
            <h3 className="font-bold mt-5 max-lg:text-lg text-xl text-center w-4/5 mx-auto ">
              1. View your Top Tracks and Artists
            </h3>
            <p className="w-4/5 text-center mx-auto mt-4 lg:h-32">
              Navigate through your top Tracks and artists based on a given
              timeframe.
            </p>
            <div className="relative w-full max-lg:h-40 h-60 mx-auto">
              <Image
                src={flow1}
                fill={true}
                className="w-full object-contain max-lg:p-0 max-lg:my-3 p-5"
                alt="Flow 1"
              />
            </div>
          </div>
          <div className="bg-button-secondary max-lg:max-w-[500px] max-lg:mx-auto h-full max-lg:h-fit bg-opacity-25 text-white pt-3 pb-10 mx-2 rounded-md max-lg:my-2">
            <h3 className="font-bold mt-5 max-lg:text-lg text-xl text-center w-4/5 mx-auto ">
              2. Find more tracks and artists
            </h3>
            <p className="w-4/5 text-center mx-auto mt-4 lg:h-32">
              Navigate through your top Tracks and artists based on a given
              timeframe.
            </p>
            <div className="relative w-full max-lg:h-40 h-60 mx-auto">
              <Image
                src={flow2}
                fill={true}
                className="w-full object-contain max-lg:p-0 max-lg:my-3 p-5"
                alt="Flow 2"
              />
            </div>
          </div>
          <div className="bg-button-secondary max-lg:max-w-[500px] max-lg:mx-auto h-full max-lg:h-fit bg-opacity-25 text-white pt-3 pb-10 mx-2 rounded-md max-lg:my-2">
            <h3 className="font-bold mt-5 max-lg:text-lg text-xl text-center w-4/5 mx-auto ">
              3. Add to your Liked songs or playlists
            </h3>
            <p className="w-4/5 text-center mx-auto mt-4 lg:h-32">
              Navigate through your top Tracks and artists based on a given
              timeframe.
            </p>
            <div className="relative w-full max-lg:h-40 h-60 mx-auto">
              <Image
                src={flow3}
                fill={true}
                className="w-full object-contain max-lg:p-0 max-lg:my-3 p-5"
                alt="Flow 3"
              />
            </div>
          </div>
        </div>
        <p className="text-white max-lg:text-sm max-lg:w-4/5 max-lg:mx-auto text-lg text-center my-4">
          <strong>Note: </strong>Make sure to check your volume, the previews
          may be a little louder than expected.
        </p>
        <div className="flex justify-center ">
          <button
            className="px-8 py-3  bg-button-secondary font-semibold hover:bg-opacity-35  hover:text-white duration-75"
            onClick={() => dispatch(setInteractable(true))}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeComponent;

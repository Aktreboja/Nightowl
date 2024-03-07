import { Triangle } from "react-loader-spinner"
import { Merriweather_Sans } from "next/font/google";

const merriweather = Merriweather_Sans({
    subsets: ['latin'],
    weight: 'variable'
})

const LandingLoader = ({loading}: {loading: boolean}) => {
    return <div className={`absolute inset-0 flex flex-col justify-center items-center bg-secondary transition-opacity duration-1000 ${loading ? 'opacity-100' : 'opacity-0'}`}>
        <Triangle
            visible={true}
            height="150"
            width="150"
            color="#FFFFFF"
            ariaLabel="triangle-loading"

        />
        <h1 className={`${merriweather.className} text-3xl font-bold mt-2 text-white`}>Welcome</h1>
    </div>
}

export default LandingLoader;


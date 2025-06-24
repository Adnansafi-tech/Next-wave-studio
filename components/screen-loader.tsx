import {PulseLoader} from "react-spinners";

export const ScreenLoader = () => {
    return (
        <div
            className="w-[100vw] h-[100vh] flex items-center justify-center"
        >
            <PulseLoader size={16} color={'#ffffff'} />
        </div>
    )
}
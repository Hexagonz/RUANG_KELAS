import { Link } from "react-router-dom";

const NotFound:React.FC = () => {
    return (
        <>
            <div className="flex flex-col gap-2 justify-center items-center h-svh bg-gradient-to-r from-[#FF8D0C] to-[#364F97]">
                <h1 className="text-[4rem] text-white">
                    404
                </h1>
                <h2 className="text-white mb-4">
                    OOPS! NOTHING WAS FOUND
                </h2>
                <Link to="/" className="shadow-[0_10px_20px_rgba(255,_255,_255,_0.2)] text-white border-2 px-3 py-1 hover:bg-white hover:text-[#FF8D0C]">
                    Back HOME
                </Link>
            </div>
        </>
      );
};

export default NotFound;
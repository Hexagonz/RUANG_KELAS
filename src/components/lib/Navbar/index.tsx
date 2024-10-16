import { Link } from "react-router-dom";
import logo from "./assets/image/logo.png";
import "./style/style.css"
import { Confirmation } from "../index";
import { useState } from "react";


const handleClick = (id: string): void => {
    const elementID: HTMLElement | null = document.getElementById(id);
    elementID?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Back to Top function
const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

type ListShow = {
    onShow: boolean;
}

const Navbar: React.FC<ListShow> = ({ onShow }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isVisible, setIsVisible] = useState(false); // State untuk back to top button
    const token = localStorage.getItem("access_token");


    const handleConfirm = () => {
        setShowConfirmation(true);
    };

    const handelClose = () => {
        setShowConfirmation(false);
    };

    return (
        <>
            <header>
                <div className="sticky top-0 flex justify-between items-center p-10 h-14 border-b shadow-md">
                    <div className="name">
                        <div className="head-contain flex items-center">
                            <img src={logo} alt="logo" className="w-14" />
                            <Link to="/"><h3 className="text-4xl font-bold">STUDILAB</h3></Link>
                        </div>
                    </div>
                    <div className="list" hidden={onShow}>
                        <ul className="flex justify-between items-center gap-28 *:font-semibold">
                            <li><Link className="hover:text-[#FF8F00]" to="#teori" onClick={() => handleClick("teori")}>Gedung Teori</Link></li>
                            <li><Link className="hover:text-[#FF8F00]" to="#floor-1" onClick={() => handleClick("floor-1")}>Gedung Lab</Link></li>
                            <li><Link className="hover:text-[#FF8F00]" to="/dashboard">Dashboard</Link></li>
                        </ul>
                    </div>
                    <div className="login-page *:p-3 mr-8 text-lg text-[#FF8F00]">
                        <div
                            className="hover:font-bold transition-all block text-center cursor-pointer"
                            style={{ minWidth: '100px' }}
                        >
                            {token ? (
                                <>
                                    <button onClick={handleConfirm}>KELUAR</button>
                                    {showConfirmation && <Confirmation open={showConfirmation} setOpen={handelClose} />}
                                </>
                            ) : <Link to="/login">MASUK</Link>}
                        </div>
                    </div>
                </div>
            </header>

            {/* Tombol Back to Top */}
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-4 right-4 p-3 rounded-full bg-blue-500 text-white hover:bg-blue-700 transition-all"
                    style={{ width: '80px', height: '80px' }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="w-6 h-6 mx-auto" // Menengah untuk ikon
        >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                     </svg>  
                </button>
            )}
        </>
    )
}

export default Navbar;

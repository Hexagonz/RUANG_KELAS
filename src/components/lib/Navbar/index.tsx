import { Link } from "react-router-dom";
import logo from "./assets/image/logo.png";
import "./style/style.css"
import { Confirmation } from "../index";
import { useEffect, useState } from "react";

const handleClick = (id:string): void => {
    const elementID: HTMLElement | null = document.getElementById(id);
    elementID?.scrollIntoView({ behavior: "smooth", block:"start"});
}


type ListShow = {
    onShow: boolean;
}
const Navbar: React.FC<ListShow> = ({ onShow }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const token = localStorage.getItem("access_token");

    const handleConfirm = () => {
      setShowConfirmation(true);
    };

    return (
        <>
            <header>
                <div className="navbar flex justify-between items-center p-10 h-14 sticky top-0">
                    <div className="name">

                        <div className="head-contain flex items-center">
                            <img src={logo} alt="logo" className="w-14" />
                            <Link to="/"><h3 className="text-4xl font-bold">PRESISTI</h3></Link>
                        </div>
                    </div>
                    <div className="list" hidden={onShow} >
                        <ul className="flex justify-between items-center gap-28 *:font-semibold">
                            <li><a className="hover:text-[#FF8F00]" href="#teori" onClick={() => handleClick("#teori")}>Gedung Teori</a></li>
                            <li><a className="hover:text-[#FF8F00]" href="#floor-1" onClick={() => handleClick("#floor-1")}>Gedung Lab</a></li>
                            <li><Link className="hover:text-[#FF8F00]" to="/jadwal">Jadwal Ruangan</Link></li>
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
                                    { showConfirmation &&  <Confirmation open={showConfirmation} setOpen={setShowConfirmation}/>}
                                    
                                </>
                        ): <Link to="/login">MASUK</Link>}
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Navbar;
import ladder from "../../assets/ladder_up.svg";
import { KelasCard } from "../../../../lib";
import { useState } from "react";

const Floor2: React.FC = () => {
    const [hoveredClass, setHoveredClass] = useState<string | null>(null);

    const handleMouseEnter = (className: string) => {
      setHoveredClass(className);
    };
  
    const handleMouseLeave = () => {
      setHoveredClass(null);
    };
    const handleClick = (id:string): void => {
        const elementID: HTMLElement | null = document.getElementById(id);
        elementID?.scrollIntoView({ behavior: "smooth", block:"start"});
    }

    return (
        <>
            <div className="content *:text-center pt-28 py-12 text-[#333333]">
                <h4 className="font-bold text-3xl" id="floor-2">Denah Gedung LAB Lantai 2</h4>
                <p className="text-xl">Menyediakan Ruangan</p>
            </div> 
            <div className="location w-[55%] mx-auto bg-[#DDF2FD] h-max py-8 rounded-[10px] shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] relative">
                <div className="flex text-white justify-evenly *:w-64 *:h-36 *:flex *:justify-center *:items-center *:text-2xl *:font-bold *:rounded-xl *:border-4 *:border-white *:text-center *:cursor-pointer">
                    <div className="class-11 bg-[#6EACDA]"
                        onMouseEnter={() => handleMouseEnter("TI-11")}
                        onMouseLeave={handleMouseLeave}
                    >
                        <h1>TI-13</h1>
                        {hoveredClass === 'TI-11' && (
                            <KelasCard isHovered={hoveredClass === 'TI-11'} rl="right-0" />
                        )}
                    </div>
                    <div className="class-12 bg-[#6EACDA]"
                        onMouseEnter={() => handleMouseEnter("TI-12")}
                        onMouseLeave={handleMouseLeave}
                    >
                        <h1>TI-12</h1>
                        {hoveredClass === 'TI-12' && (
                            <KelasCard isHovered={hoveredClass === 'TI-12'} rl="right-0" />
                        )}
                    </div>
                    <div className="class-13 bg-[#6EACDA]"
                        onMouseEnter={() => handleMouseEnter("TI-13")}
                        onMouseLeave={handleMouseLeave}
                    >
                        <h1>TI-13</h1>
                        {hoveredClass === 'TI-13' && (
                            <KelasCard isHovered={hoveredClass === 'TI-13'} rl="right-0" />
                        )}
                    </div>
                </div>
                <div className="bottom flex justify-between px-16 text-white mt-12">
                    <div className="ladder">
                        <a href="#floor-1" onClick={() => handleClick("floor-1")}><img src={ladder} alt="tangga"  /></a>
                    </div>
                    <div className="toilet bg-[#FF8D0C] w-52 h-48 flex justify-center items-center text-2xl font-bold rounded-xl border-4 border-white text-center">
                        <h1>Ruang Teknisi </h1>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Floor2;
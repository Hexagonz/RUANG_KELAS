import ladder from "../../assets/ladder_down.svg";
import { KelasCard } from "../../../../lib";
import { useState } from "react";


const Floor1: React.FC = () => {
    const [hoveredClass, setHoveredClass] = useState<string | null>(null);

    const handleMouseEnter = (className: string) => {
      setHoveredClass(className);
    };
  
    const handleMouseLeave = () => {
      setHoveredClass(null);
    };
 
    const handleClick = (id: string): void => {
        const elementID: HTMLElement | null = document.getElementById(id);
        elementID?.scrollIntoView({
          behavior: "smooth",
          block: "start" as ScrollLogicalPosition, // or block: 0
        });
      };
    
    return (
        <>
            <div className="content *:text-center pt-28 py-12 text-[#333333]">
                <h4 className="scroll-smooth font-bold text-3xl" id="floor-1">Denah Gedung LAB Lantai 1</h4>
                <p className="text-xl">Menyediakan Ruangan</p>
            </div> 
            <div className="location w-[55%] mx-auto bg-[#DDF2FD] h-max py-8 rounded-[10px] shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] relative">
                <div className="flex text-white justify-evenly *:flex *:justify-center *:items-center *:text-2xl *:font-bold *:rounded-xl *:border-4 *:border-white *:text-center">
                    <div className="lecturer bg-[#FF8D0C] w-36 h-64 ">
                        <h1>Ruang Dosen</h1>
                    </div>
                    <div className="lecturer bg-[#FF8D0C] w-64 h-36">
                        <h1>Ruang Dosen</h1>
                    </div>
                    <div className="class-14 bg-[#6EACDA] w-64 h-36 cursor-pointer"
                        onMouseEnter={() => handleMouseEnter("TI-14")}
                        onMouseLeave={handleMouseLeave}
                    >
                        <h1>TI-14</h1>
                        {hoveredClass === 'TI-14' && (
                            <KelasCard isHovered={hoveredClass === 'TI-14'} rl="right-0" />
                        )}
                    </div>
                </div>
                <div className="bottom flex justify-between px-20 text-white *:flex *:justify-center *:items-center *:text-2xl *:font-bold *:rounded-xl *:border-4 *:border-white *:text-center">
                    <div className="toilet bg-[#BE6F15] w-32 h-28 mt-4">
                        <h1>Wc <br /> Dosen </h1>
                    </div>
                    <div className="toilet bg-[#FF8D0C] w-52 h-48">
                        <h1>Ruang Teknisi </h1>
                    </div>
                </div>
                <div className="ladder">
                    <a href="#floor-2" onClick={() => handleClick("#floor-2")}><img src={ladder} alt="tangga" className="ml-20" /></a>
                </div>
            </div>
        </>
    );
}

export default Floor1;
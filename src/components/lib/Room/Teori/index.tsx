import { Time, KelasCard } from "../../../lib";
import { useState } from "react";
import pool from "../assets/pool.svg"
import up from "../assets/ladder_up.svg";
import down from "../assets/ladder_down.svg";


const Teori: React.FC = () => {
    const [hoveredClass, setHoveredClass] = useState<string | null>(null);

    const handleMouseEnter = (className: string) => {
      setHoveredClass(className);
    };
  
    const handleMouseLeave = () => {
      setHoveredClass(null);
    };


    return (
        <>
        <div className="content *:text-center pt-28 p-12 text-[#333333]">
                <h4 className="font-bold text-3xl">Denah Gedung Teori Lantai 2</h4>
                <p className="text-xl">Menyediakan Ruangan</p>
                <div  id="teori"></div>
            </div> 
            <Time />
            <div className="location w-[55%] mx-auto bg-[#DDF2FD] h-[88vh] py-8 rounded-[10px] shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] relative">
                <div className="another absolute left-[6%] top-[6%] h-20 w-20 bg-[#A7A7A7] rounded-3xl border-solid border-4 border-white ">
                </div>
                <div className="another absolute left-[6%] bottom-[6%] h-20 w-20 bg-[#A7A7A7] rounded-3xl border-solid border-4 border-white ">
                </div>
                <div className="map-top flex justify-center gap-2 text-white font-bold h-[16%] *:w-[12%] *:flex *:items-center *:justify-center *:rounded-3xl *:hover:cursor-pointer *:border-solid *:border-4 *:border-white *:text-center">
                    <div className="class-1 bg-[#A7A7A7]">
                        <h1>Kelas Lain</h1>
                    </div>
                    <div className="another bg-[#A7A7A7]">
                        <h1>Kelas Lain</h1>
                    </div>
                    <div className="another bg-[#A7A7A7]">
                        <h1>Kelas Lain</h1>
                    </div>
                    <div className="class-6 bg-[#6EACDA]"
                        onMouseEnter={() => handleMouseEnter("TI-6")}
                        onMouseLeave={handleMouseLeave}
                        >
                        <h1 >TI-6</h1>
                        {hoveredClass === 'TI-6' && (
                            <KelasCard isHovered={hoveredClass === 'TI-6'} rl="right-0" />
                        )}
                    </div>
                    <div className="class-5 bg-[#6EACDA]"
                        onMouseEnter={() => handleMouseEnter("TI-5")}
                        onMouseLeave={handleMouseLeave}
                        >
                        <h1 >TI-5</h1>
                        {hoveredClass === 'TI-5' && (
                            <KelasCard isHovered={hoveredClass === 'TI-5'}  rl="right-0"/>
                        )}
                    </div>
                </div>
                <div className="map-rl flex justify-between text-white font-bold">
                    <div className="map-left  *:w-28 *:h-28 *:flex *:items-center *:justify-center *:my-2 pl-10 *:rounded-3xl *:hover:cursor-pointer *:border-solid *:border-4 *:border-white">
                        <div className="class-7 bg-[#6EACDA]"
                            onMouseEnter={() => handleMouseEnter("TI-7")}
                            onMouseLeave={handleMouseLeave}
                            >
                            <h1 >TI-7</h1>
                            {hoveredClass === 'TI-7' && (
                                <KelasCard isHovered={hoveredClass === 'TI-7'} rl="left-0"/>
                            )}
                        </div>
                        <div className="class-8 bg-[#6EACDA]"
                            onMouseEnter={() => handleMouseEnter("TI-8")}
                            onMouseLeave={handleMouseLeave}
                            >
                        <h1 >TI-8</h1>
                        {hoveredClass === 'TI-8' && (
                            <KelasCard isHovered={hoveredClass === 'TI-8'} rl="left-0" />
                        )}
                        </div>
                        <div className="class-9 bg-[#6EACDA]"
                            onMouseEnter={() => handleMouseEnter("TI-9")}
                            onMouseLeave={handleMouseLeave}
                            >
                        <h1 >TI-9</h1>
                        {hoveredClass === 'TI-9' && (
                            <KelasCard isHovered={hoveredClass === 'TI-9'} rl="left-0" />
                        )}
                        </div>
                        <div className="class-10 bg-[#6EACDA]"
                            onMouseEnter={() => handleMouseEnter("TI-10")}
                            onMouseLeave={handleMouseLeave}
                            >
                        <h1 >TI-10</h1>
                        {hoveredClass === 'TI-10' && (
                            <KelasCard isHovered={hoveredClass === 'TI-10'} rl="left-0" />
                        )}
                        </div>
                    </div>
                    <div className="map-right *:w-28 *:h-28 *:flex *:items-center *:justify-center *:my-2 pr-10 *:rounded-3xl *:hover:cursor-pointer *:border-solid *:border-4 *:border-white ">
                    <div className="class-1 bg-[#6EACDA]"
                            onMouseEnter={() => handleMouseEnter("TI-1")}
                            onMouseLeave={handleMouseLeave}
                            >
                        <h1 >TI-1</h1>
                        {hoveredClass === 'TI-1' && (
                            <KelasCard isHovered={hoveredClass === 'TI-1'} rl="right-0"/>
                        )}
                        </div>
                        <div className="class-2 bg-[#6EACDA]"
                            onMouseEnter={() => handleMouseEnter("TI-2")}
                            onMouseLeave={handleMouseLeave}
                            >
                        <h1 >TI-2</h1>
                        {hoveredClass === 'TI-2' && (
                            <KelasCard isHovered={hoveredClass === 'TI-2'} rl="right-0" />
                        )}
                        </div>
                        <div className="class-3 bg-[#6EACDA]"
                            onMouseEnter={() => handleMouseEnter("TI-3")}
                            onMouseLeave={handleMouseLeave}
                            >
                        <h1 >TI-3</h1>
                        {hoveredClass === 'TI-3' && (
                            <KelasCard isHovered={hoveredClass === 'TI-3'} rl="right-0" />
                        )}
                        </div>
                        <div className="class-4 bg-[#6EACDA]"
                            onMouseEnter={() => handleMouseEnter("TI-4")}
                            onMouseLeave={handleMouseLeave}
                            >
                        <h1 >TI-4</h1>
                        {hoveredClass === 'TI-4' && (
                            <KelasCard isHovered={hoveredClass === 'TI-4'} rl="right-0" />
                        )}
                        </div>
                    </div>
                </div>
                <div className="map-top flex justify-center gap-2 text-white font-bold h-28 *:w-28 *:flex *:items-center *:justify-center *:rounded-3xl *:hover:cursor-pointer *:border-solid *:border-4 *:border-white *:text-center">
                    <div className="class-1 bg-[#A7A7A7]">
                        <h1>Kelas Lain</h1>
                    </div>
                    <div className="another bg-[#A7A7A7]">
                        <h1>Kelas Lain</h1>
                    </div>
                    <div className="another bg-[#A7A7A7]">
                        <h1>Kelas Lain</h1>
                    </div>
                    <div className="class-6 bg-[#A7A7A7]">
                        <h1>Kelas Lain</h1>
                    </div>
                    <div className="class-5 bg-[#A7A7A7]">
                        <h1>Kelas Lain</h1>
                    </div>
                </div>
                <div className="pool w-[60%] flex items-center justify-between absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="ladder-left">
                    <img src={up} alt="ladder-up" className="w-5/6" />
                    <br />
                    <img src={down} alt="ladder-down" className="w-5/6" />
                </div>
                <div className="pool">
                    <img src={pool} alt="pool" className="w-52"/>
                </div>
                <div className="ladder-right">
                    <img src={down} alt="ladder-up" className="w-5/6" />
                    <br />
                    <img src={up} alt="ladder-down" className="w-5/6" />
                </div>
                </div>
            </div>
        </>
    );
}

export default Teori;
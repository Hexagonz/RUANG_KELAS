import { IoIosCall } from "react-icons/io";
import { CgMail } from "react-icons/cg";
import { FaFacebook, FaInstagram } from "react-icons/fa";


const Footer:  React.FC = () => {
    return (
        <>
            <footer className="bg-[#1E3163] py-12 text-white">
            <div className="container bg-[#1E3163]  pt-14 mx-auto px-4 ">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Kolom Gedung Teori */}
                    <div>
                        <h3 className="font-bold text-3xl mb-4 text-white" >GEDUNG TEORI</h3>
                        <div className="flex items-center mb-2">
                            <IoIosCall className="w-6"/>
                            <span>+6281256074059</span>
                        </div>
                        <div className="flex items-center mb-2" id="floor-2">       
                            <CgMail className="w-6"/> 
                            <a href="mailto:kampus@polnep.ac.id" className="underline">
                                kampus@polnep.ac.id
                            </a>
                        </div>
                        <p>
                        Jl. Jenderal Ahmad Yani, Bansir Laut, Pontianak Tenggara, Kota Pontianak, Kalimantan
                        Barat 78124
                        </p>
                    </div>
        
                {/* Kolom Gedung LAB TI */}
                <div>
                    <h3 className="font-bold text-3xl mb-4 text-white ">GEDUNG LAB TI</h3>
                    <div className="flex items-center mb-2">
                        <IoIosCall className="w-6"/>
                        <span>+62 561 736180</span>
                    </div>
                    <div className="flex items-center mb-2">
                        <CgMail className="w-6"/> 
                        <a href="mailto:kampus@polnep.ac.id" className="underline">
                            kampus@polnep.ac.id
                        </a>
                    </div>
                    <p>
                    Jl. Jenderal Ahmad Yani, Bansir Laut, Pontianak Tenggara, Kota Pontianak, Kalimantan
                    Barat 78124
                    </p>
                </div>
        
                {/* Kolom Tentang Kami */}
                <div>
                    <h3 className="font-bold text-3xl mb-4 text-white">Tentang Kami</h3>
                    <p className="mb-4">
                    Politeknik Negeri Pontianak (POLNEP) merupakan sistem Pendidikan Tinggi jalur
                    profesional yang menekankan penguasaan dan pengembangan Ilmu Pengetahuan dan Teknologi
                    untuk mendukung era industrialisasi.
                    </p>
                </div>
                </div>
        
                <div className="mt-8 border-t border-white pt-4 text-center">
                <p>Copyright Polnep 2024 • Made in Pontianak</p>
                <div className="flex justify-center space-x-4 mt-4">
                    <a href="#" aria-label="Facebook">
                        <FaInstagram/>
                    </a>
                    <a href="#" aria-label="Instagram">
                        <FaFacebook/>
                    </a>
                </div>
                </div>
            </div>
            </footer>
        </>
    );
}

export default Footer;
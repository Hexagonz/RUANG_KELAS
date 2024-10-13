import { Link, Navigate } from "react-router-dom";
type Card = {
    isHovered: boolean;
    rl: string;
}
const KelasCard: React.FC<Card> = ({ isHovered, rl }) => {
  const token = localStorage.getItem("access_token");

  return (
    <div className="relative z-40 *:text-[1.1rem] h-max">
      {/* Card yang muncul ketika di-hover */}
      {isHovered && (
        <div className={`absolute top-12 ${rl} font-normal text-black w-[45vh] bg-gray-300 rounded-lg text-left py-5 pl-4 shadow-[inset_-12px_-8px_40px_#46464620]`}>
          <p>MATA KULIAH: -</p>
          <p>Dosen Pengajar: -</p>
          <p>Waktu Penggunaan Kelas: -</p>
          <div className="details flex justify-between items-center w-full mt-10 pr-4 ">
            {
            token ?
            <a href="/details" className="bg-white py-2 px-4 text-black rounded hover:bg-gray-500">Detail Kelas</a> 
            :
            <a href="/login" className="bg-white py-2 px-4 text-black rounded hover:bg-gray-500">Detail Kelas</a>
            }  
            <div className="details flex items-center justify-between gap-5">
                <p>RUANGAN TERSEDIA</p>
                <span className="block rounded-full bg-[#6EACDA] w-10 h-10"></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KelasCard;

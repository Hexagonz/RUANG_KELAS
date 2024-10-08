import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import { Confirmation } from '../../lib';
// Icons dari Font Awesome bisa diinstal menggunakan react-icons
import { FaCalendar, FaUsers, FaTachometerAlt, FaChevronDown  } from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [jadwalCount, setJadwalCount] = useState<number>(0);
  const [accountCount, setAccountCount] = useState<number>(0);
  const [semester, setSemester] = useState<string>('Genap');
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const handleConfirm = () => {
    setShowConfirmation(true);
  };

  const navigate = useNavigate();

  const logoutUser = () => {
    // Logika logout
    navigate('/login');
  };

  useEffect(() => {
    // Mem-fetch data jadwal dan akun dari localStorage atau API
    setJadwalCount(10); // Contoh data jadwal
    setAccountCount(5); // Contoh data akun
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-[#364F97] text-white">
        <div className="py-4">
          <div className="text-center text-2xl font-bold mb-6"><Link to="/">PRESISTI</Link></div>
          <hr className="my-4 border-gray-400" />
          <nav className="space-y-2">
            <a href="/dashboard" className="flex items-center px-4 py-2 text-white focus:bg-blue-900 hover:bg-blue-900">
              <FaTachometerAlt className="mr-2" />
              <span>Dashboard</span>
            </a>
            <JadwalSemester jadwal={3} smstr={semester == "Genap" ? 0 : 1 }/>
            <a href="/akun" className="flex items-center px-4 py-2">
              <FaUsers className="mr-2" />
              <span>Akun</span>
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <header className="bg-white shadow py-4 px-6">
          <div className="flex justify-between items-center">
            <button className="block lg:hidden">
              <i className="fa fa-bars"></i>
            </button>

            {/* <button onClick={logoutUser} className="text-blue-600">KELUAR</button> */}
            <button onClick={handleConfirm} className="text-blue-600 hover:font-bold transition-all block text-center cursor-pointer"
            style={{ minWidth: '100px' }}>KELUAR</button>
            { showConfirmation &&  <Confirmation open={showConfirmation} setOpen={setShowConfirmation}/>}                        
          </div>
        </header>

        <main className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card title="Jumlah Jadwal" count={jadwalCount} icon={<FaCalendar />} />
            <Card title="Jumlah Akun" count={accountCount} icon={<FaUsers />} />

            <div className="col-span-1">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="text-lg font-bold text-gray-600">Semester</h5>
                    <p className="text-gray-800 font-bold">{semester}</p>
                  </div>
                  <select
                    className="border rounded-lg py-2 px-4 cursor-pointer"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                  >
                    <option value="Genap">Genap</option>
                    <option value="Ganjil">Ganjil</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const Card: React.FC<{ title: string; count: number; icon: JSX.Element }> = ({ title, count, icon }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg flex items-center justify-between">
      <div>
        <h5 className="text-lg font-bold text-gray-600">{title}</h5>
        <p className="text-2xl font-bold text-gray-800">{count}</p>
      </div>
      <div className="text-4xl text-blue-600">{icon}</div>
    </div>
  );
};

type Jadwal = {
    jadwal: number;
    smstr: number;
}
const JadwalSemester: React.FC<Jadwal> = ({ jadwal, smstr }) => {
    const [isOpen, setIsOpen] = useState<number | null>(null);

    const toggleDropdown = (sms:number) => {
      setIsOpen(sms);
      if(isOpen != null) {
        setIsOpen(null);
      }
    };
    const list = [];
    const semester = [1,2,3,4,5,6];
    for (let i=0; i < jadwal ; i++) {
        list.push(
            <div className="w-full ">
            <button
              className="flex items-center w-full px-4 py-2 text-left text-white rounded-lg focus:bg-blue-900 hover:bg-blue-900"
              onClick={() => toggleDropdown(i)}
            >
              <FaCalendar className="mr-2 " />
              <span>Jadwal Semester {smstr == 0 ? semester[(i*2)+1] : semester[i*2] }</span>
              <FaChevronDown
                className={`ml-auto transform transition-transform duration-300 ${
                  isOpen == i ? 'rotate-120' : '-rotate-90'
                }`}
              />
            </button>
            {/* Dropdown with animation */}
            <div
              className={`ml-6 mr-4 mt-2 space-y-2 overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen == i ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <a href="/jadwal/semester2/kelasA" className="block foucus:hover:bg-blue-900 rounded-lg py-2 px-1">
                Kelas A
              </a>
              <a href="/jadwal/semester2/kelasB" className="block hover:bg-blue-900 rounded-lg py-2 px-1">
                Kelas B
              </a>
              <a href="/jadwal/semester2/kelasC" className="block hover:bg-blue-900 rounded-lg py-2 px-1">
                Kelas C
              </a>
              <a href="/jadwal/semester2/kelasD" className="block hover:bg-blue-900 rounded-lg py-2 px-1">
                Kelas D
              </a>
              <a href="/jadwal/semester2/kelasE" className="block hover:bg-blue-900 rounded-lg py-2 px-1">
                Kelas E
              </a>
            </div>
          </div>
        );
    }
    return (
        <>
            {
                list
            }
        </>
    );
  };
  
export default Dashboard;

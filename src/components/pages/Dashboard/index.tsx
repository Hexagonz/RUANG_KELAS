import React, { useEffect, useState, useRef} from 'react';
import { Link  } from "react-router-dom"
import { Confirmation } from '../../lib';
import { FaCalendar, FaUsers, FaTachometerAlt, FaChevronDown, FaChalkboardTeacher  } from 'react-icons/fa';
import { SiGoogleclassroom } from "react-icons/si";
import { IoBookSharp } from "react-icons/io5";
import { TbAirConditioning } from "react-icons/tb";
import "./style/style.css";


const Dashboard: React.FC = () => {
  const [jadwalCount, setJadwalCount] = useState<number>(0);
  const [accountCount, setAccountCount] = useState<number>(0);
  const [semester, setSemester] = useState<string>("Genap");
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedSms, setSelectedSms] = useState<number | null>(null);
  const [selectedView, setSelectedView] = useState<string>("Dashboard");
  const [activeButton, setActiveButton] = useState<string>("Dashboard");

  const handleSelectClass = (className: string | null, smstr: number | null) => {
    setSelectedClass(className);
    setSelectedSms(smstr);
    setSelectedView("JadwalSemester");
    setActiveButton(`JadwalSemester-${smstr}-${className}`); // Set active button untuk Jadwal Semester
  };

  const handelSemesters = (value: string) => {
    setSemester(value);
    localStorage.setItem("semester", value);
  };

  const handleSelectView = (view: string) => {
    setSelectedView(view);
    setSelectedClass(null); // Reset selected class
    setActiveButton(view); // Set button yang diklik sebagai active
  };

  useEffect(() => {
    setJadwalCount(10);
    setAccountCount(5);
    if (!localStorage.getItem("semester")) {
      localStorage.setItem("semester", semester);
    } else {
      const storage = localStorage.getItem("semester") as string;
      setSemester(storage);
    }
  }, [selectedClass, semester, selectedView]);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-[#364F97] text-white">
        <div className="py-4">
          <div className="text-center text-2xl font-bold mb-6">
            <Link to="/">STUDILAB</Link>
          </div>
          <hr className="my-4 border-gray-400" />
          <nav className="space-y-2">
            <button
              onClick={() => handleSelectView("Dashboard")}
              className={`flex items-center px-4 py-2 text-white hover:bg-blue-900 w-full ${
                activeButton === "Dashboard" ? "bg-blue-900" : ""
              }`}
            >
              <FaTachometerAlt className="mr-2" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => handleSelectView("Dosen")}
              className={`flex items-center px-4 py-2 text-white hover:bg-blue-900 w-full ${
                activeButton === "Dosen" ? "bg-blue-900" : ""
              }`}
            >
              <FaChalkboardTeacher className="mr-2" />
              <span>Dosen</span>
            </button>
            <button
              onClick={() => handleSelectView("Mata Kuliah")}
              className={`flex items-center px-4 py-2 text-white hover:bg-blue-900 w-full ${
                activeButton === "Mata Kuliah" ? "bg-blue-900" : ""
              }`}
            >
              <IoBookSharp className="mr-2" />
              <span>Mata Kuliah</span>
            </button>
            <button
              onClick={() => handleSelectView("Kelas")}
              className={`flex items-center px-4 py-2 text-white hover:bg-blue-900 w-full ${
                activeButton === "Kelas" ? "bg-blue-900" : ""
              }`}
            >
              <SiGoogleclassroom className="mr-2" />
              <span>Kelas</span>
            </button>
            <button
              onClick={() => handleSelectView("Fasilitas")}
              className={`flex items-center px-4 py-2 text-white hover:bg-blue-900 w-full ${
                activeButton === "Fasilitas" ? "bg-blue-900" : ""
              }`}
            >
              <TbAirConditioning className="mr-2" />
              <span>Fasilitas</span>
            </button>
            <JadwalSemester
              jadwal={3}
              smstr={semester === "Genap" ? 0 : 1}
              onSelectClass={handleSelectClass}
              activeButton={activeButton} // Pass activeButton ke JadwalSemester
            />
            <a href="/akun" className="flex items-center px-4 py-2">
              <FaUsers className="mr-2" />
              <span>Akun</span>
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <NavDash />
        <main className="slide-page p-6">
          {selectedView === "Dashboard" && (
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
                      className="border rounded-lg py-2 px-4 cursor-pointer w-[20%]"
                      value={semester}
                      onChange={(e) => handelSemesters(e.target.value)}
                    >
                      <option value="Genap">Genap</option>
                      <option value="Ganjil">Ganjil</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
          {selectedView === "Dosen" &&  <> <TableDosen /></>}
          {selectedView === "Mata Kuliah" && <div>Konten Mata Kuliah</div>}
          {selectedView === "Kelas" && <div>Konten Kelas</div>}
          {selectedView === "Fasilitas" && <div>Konten Fasilitas</div>}
          {selectedView === "JadwalSemester" && selectedClass && (
            <TableJadwal smstr={selectedSms} kelas={selectedClass} />
          )}
        </main>
      </div>
    </div>
  );
};

interface Jadwal  {
  jadwal: number;
  smstr: number;
  onSelectClass: (params: string | null,param2: number | null) => void;
  activeButton: string;
}

const JadwalSemester: React.FC<Jadwal> = ({ jadwal, smstr, onSelectClass, activeButton }) => {
  const [isOpen, setIsOpen] = useState<number | null>(null);

  const toggleDropdown = (sms: number) => {
    setIsOpen(sms);
    if (isOpen != null) {
      setIsOpen(null);
    }
  };
  const list = [];
  const semester = [1, 2, 3, 4, 5, 6];
  
  for (let i = 0; i < jadwal; i++) {
    const genap =  semester[(i * 2) + 1];
    const ganjil = semester[i * 2];
    const sms = smstr == 0 ? genap : ganjil ;
    list.push(
      <div className="w-full " key={i} >
        <button
          className={`flex items-center w-full px-4 py-2 text-left text-white hover:bg-blue-900 ${
            activeButton === `JadwalSemester-${sms}` ? "bg-blue-900" : ""
          }`}
          onClick={() => toggleDropdown(i)}
        >
          <FaCalendar className="mr-2 " />
          <span>Jadwal Semester {sms}</span>
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
          {
          ["A","B","D","E"].map((value) => ( 
            <>
              <button
                className={`block hover:bg-blue-900 rounded-lg py-2 px-1 w-full text-left ${
                  activeButton === `JadwalSemester-${sms}-${value}` ? "bg-blue-900" : ""
                }`}
                onClick={() => onSelectClass(`${value}`,sms)}
              >
                Kelas {value}
              </button>
            </>
          ))
          
          }
        </div>
      </div>
    );
  }

  return (
    <>
      {list}
    </>
  );
};

import { FaArrowUp, FaArrowDown, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

// Definisikan tipe Data dan Ruang sesuai dengan kebutuhan
interface Data {
  id: number;
  no: number;
  hari: string;
  waktuMulai: string;
  waktuAkhir: string;
  mataKuliah: string;
  dosen: string;
  ruang: string;
  semester: number;
  kelas: string;
}

const initialData: Data[] = [
  { id: 1, no: 1, hari: "Senin", waktuMulai: "08:00", waktuAkhir: "10:00", mataKuliah: "Pemrograman Web", dosen: "Dosen A", ruang: "TI-1", semester: 2, kelas: "A" },
  { id: 2, no: 2, hari: "Senin", waktuMulai: "10:15", waktuAkhir: "12:15", mataKuliah: "Basis Data", dosen: "Dosen B", ruang: "TI-2", semester: 2, kelas: "A" },
  { id: 3, no: 3, hari: "Selasa", waktuMulai: "08:00", waktuAkhir: "10:00", mataKuliah: "Jaringan Komputer", dosen: "Dosen C", ruang: "TI-3", semester: 2, kelas: "A" },
  { id: 4, no: 4, hari: "Selasa", waktuMulai: "10:15", waktuAkhir: "12:15", mataKuliah: "Sistem Operasi", dosen: "Dosen D", ruang: "TI-4", semester: 2, kelas: "A" },
  { id: 5, no: 5, hari: "Rabu", waktuMulai: "08:00", waktuAkhir: "10:00", mataKuliah: "Analisis dan Perancangan Sistem", dosen: "Dosen E", ruang: "TI-1", semester: 2, kelas: "A" },
  { id: 6, no: 6, hari: "Rabu", waktuMulai: "10:15", waktuAkhir: "12:15", mataKuliah: "Kecerdasan Buatan", dosen: "Dosen F", ruang: "TI-2", semester: 2, kelas: "A" },
  { id: 7, no: 7, hari: "Kamis", waktuMulai: "08:00", waktuAkhir: "10:00", mataKuliah: "Rekayasa Perangkat Lunak", dosen: "Dosen G", ruang: "TI-3", semester: 2, kelas: "A" },
  { id: 8, no: 8, hari: "Kamis", waktuMulai: "10:15", waktuAkhir: "12:15", mataKuliah: "Keamanan Sistem", dosen: "Dosen H", ruang: "TI-4", semester: 2, kelas: "A" },
  { id: 9, no: 9, hari: "Jumat", waktuMulai: "08:00", waktuAkhir: "10:00", mataKuliah: "Machine Learning", dosen: "Dosen I", ruang: "TI-1", semester: 3, kelas: "A" },
  { id: 10, no: 10, hari: "Jumat", waktuMulai: "10:15", waktuAkhir: "12:15", mataKuliah: "Pengujian Perangkat Lunak", dosen: "Dosen J", ruang: "TI-2", semester: 2, kelas: "A" },
  { id: 11, no: 11, hari: "Jumat", waktuMulai: "10:15", waktuAkhir: "12:15", mataKuliah: "Pengujian Perangkat Lunak", dosen: "Dosen J", ruang: "TI-2", semester: 2, kelas: "A" },
];
interface Ruang {
  smstr: number | null;
  kelas: string | null;
}

const TableJadwal: React.FC<Ruang> = ({ smstr, kelas }) => {
  const [data, setData] = useState<Data[]>(initialData); // Ganti initialData sesuai dengan data yang Anda miliki
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filter, setFilter] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: keyof Data; direction: "asc" | "desc" } | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleForm = () => {
    setShowForm(true);
  }

  const handleCloseForm = () => {
    setShowForm(false);
  }

  const requestSort = (key: keyof Data) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Filter data berdasarkan input filter
  const filteredData = data.filter((item) =>
    item.hari.toLowerCase().includes(filter.toLowerCase()) ||
    item.mataKuliah.toLowerCase().includes(filter.toLowerCase()) ||
    item.dosen.toLowerCase().includes(filter.toLowerCase()) ||
    item.ruang.toLowerCase().includes(filter.toLowerCase()) ||
    item.kelas.toLowerCase().includes(filter.toLowerCase()) ||
    item.waktuMulai.toLowerCase().includes(filter.toLowerCase()) ||
    item.waktuAkhir.toLowerCase().includes(filter.toLowerCase())
  );

  // Function to parse time from string to Date
  const parseTime = (timeString: string): Date => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  // Sort data yang telah difilter
  const sortedFilteredData = (dataToSort: Data[]) => {
    if (!sortConfig) return dataToSort;

    const { key, direction } = sortConfig;

    return [...dataToSort].sort((a, b) => {
      let aValue: Date | string | number;
      let bValue: Date | string | number;

      if (key === "waktuMulai" || key === "waktuAkhir") {
        aValue = parseTime(String(a[key as keyof Data]));
        bValue = parseTime(String(b[key as keyof Data]));
      } else {
        aValue = a[key as keyof Data];
        bValue = b[key as keyof Data];
      }

      if (aValue instanceof Date && bValue instanceof Date) {
        return direction === "asc" ? aValue.getTime() - bValue.getTime() : bValue.getTime() - aValue.getTime();
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return direction === "asc"
          ? aValue.toLowerCase().localeCompare(bValue.toLowerCase())
          : bValue.toLowerCase().localeCompare(aValue.toLowerCase());
      } else if (typeof aValue === "number" && typeof bValue === "number") {
        return direction === "asc" ? aValue - bValue : bValue - aValue;
      } else {
        return direction === "asc"
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
      }
    });
  };
  const paginatedData = sortedFilteredData(filteredData).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage); // Hitung total halaman

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-blue-600">Tabel Data Jadwal Semester {smstr} Kelas {kelas}</h2>
        <button onClick={handleForm} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">
          <FaPlus className="mr-2" /> Tambah Data
        </button>
        { showForm &&  <TambahData open={showForm} setOpen={handleCloseForm} semester={smstr} kelas={kelas}/>}
      </div>
      <div className="mb-4 flex justify-between items-center">
        <div>
          <label className="mr-2">Show</label>
          <select value={itemsPerPage} onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1); 
          }} className="p-2 border rounded">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <label className="ml-2">entries</label>
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
          {["No", "Hari", "Waktu Mulai", "Waktu Akhir", "Mata Kuliah", "Dosen", "Ruang", "Semester", "Kelas"].map((header) => (
            <th
              key={header}
              className="border px-4 py-2 cursor-pointer"
              onClick={() =>
                requestSort(
                  header === "Waktu Mulai" ? "waktuMulai" :
                  header === "Waktu Akhir" ? "waktuAkhir" : 
                  header.toLowerCase() as keyof Data
                )
              }
              style={{ width: "120px" }} // Set fixed width untuk kolom
            >
              <div className="flex justify-center items-center">
                <div>{header}</div>
                <span className="ml-2 flex">
                  <FaArrowUp className={`inline-block ${sortConfig?.key === (header === "Waktu Mulai" ? "waktuMulai" : header === "Waktu Akhir" ? "waktuAkhir" : header.toLowerCase()) && sortConfig.direction === "asc" ? "text-blue-500" : "text-gray-300"}`} />
                  <FaArrowDown className={`inline-block ml-1 ${sortConfig?.key === (header === "Waktu Mulai" ? "waktuMulai" : header === "Waktu Akhir" ? "waktuAkhir" : header.toLowerCase()) && sortConfig.direction === "desc" ? "text-blue-500" : "text-gray-300"}`} />
                </span>
              </div>
            </th>
          ))}

            <th className="border p-2" style={{ width: "100px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id} className="text-center">
              <td className="border p-2">{item.no}</td>
              <td className="border p-2">{item.hari}</td>
              <td className="border p-2">{item.waktuMulai}</td>
              <td className="border p-2">{item.waktuAkhir}</td>
              <td className="border p-2" style={{ width:"200px", height:"60px"}}>
                {item.mataKuliah}
              </td>
              <td className="border p-2">{item.dosen}</td>
              <td className="border p-2">{item.ruang}</td>
              <td className="border p-2">{item.semester}</td>
              <td className="border p-2">{item.kelas}</td>
              <td className="border p-2 align-middle" style={{ verticalAlign: "middle" }}>
                <div className="flex justify-center space-x-2">
                  <button className="text-white bg-green-500 p-2 rounded">
                    <FaEdit />
                  </button>
                  <button className="text-white bg-blue-900 p-2 rounded">
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between ">
        <span>
          Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} entries
        </span>
        <div>
          <button onClick={handlePrevious} disabled={currentPage === 1} className="px-4 mx-2 py-2 bg-gray-300 rounded disabled:opacity-50">
            Previous
          </button>
          <button onClick={handleNext} disabled={currentPage >= totalPages} className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

interface Dosen {
  id: number;
  no: number;
  nip: string;
  namaDosen: string;
}

const initialDataDosen: Dosen[] = [
  { id: 1, no: 1, nip: "19700101", namaDosen: "Dosen A" },
  { id: 2, no: 2, nip: "19700202", namaDosen: "Dosen B" },
  { id: 3, no: 3, nip: "19700303", namaDosen: "Dosen C" },
];

const TableDosen: React.FC = () => {
  const [data, setData] = useState<Dosen[]>(initialDataDosen);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filter, setFilter] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newNip, setNewNip] = useState("");
  const [newNamaDosen, setNewNamaDosen] = useState("");

  const handleForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleAddDosen = () => {
    const newDosen: Dosen = {
      id: data.length + 1,
      no: data.length + 1,
      nip: newNip,
      namaDosen: newNamaDosen,
    };
    setData([...data, newDosen]);
    setNewNip("");
    setNewNamaDosen("");
    setShowForm(false);
  };

  const filteredData = data.filter((item) =>
    item.nip.toLowerCase().includes(filter.toLowerCase()) ||
    item.namaDosen.toLowerCase().includes(filter.toLowerCase())
  );

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-blue-600">Tabel Data Dosen</h2>
        <button onClick={handleForm} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">
          <FaPlus className="mr-2" /> Tambah Data
        </button>
        {showForm && <TambahDataDosen open={showForm} setOpen={handleCloseForm} />}
      </div>
      <div className="mb-4 flex justify-between items-center">
      <div>
          <label className="mr-2">Show</label>
          <select value={itemsPerPage} onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1); 
          }} className="p-2 border rounded">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <label className="ml-2">entries</label>
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            {["No", "NIP", "Nama Dosen"].map((header) => (
              <th key={header} className="border px-4 py-2">{header}</th>
            ))}
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id} className="text-center">
              <td className="border p-2">{item.no}</td>
              <td className="border p-2">{item.nip}</td>
              <td className="border p-2">{item.namaDosen}</td>
              <td className="border p-2">
                <button className="text-white bg-green-500 p-2 rounded mr-2">
                  <FaEdit />
                </button>
                <button className="text-white bg-blue-900 p-2 rounded">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between">
        <span>
          Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} entries
        </span>
        <div>
          <button onClick={handlePrevious} disabled={currentPage === 1} className="px-4 mx-2 py-2 bg-gray-300 rounded disabled:opacity-50">
            Previous
          </button>
          <button onClick={handleNext} disabled={currentPage >= totalPages} className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};


const NavDash:  React.FC = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleConfirm = () => {
    setShowConfirmation(true);
  };

  
  const handelClose = () => {
    setShowConfirmation(false);
  }
  return (
      <>
          <header className="bg-white shadow py-4 px-6">
          <div className="flex justify-between items-center">
            <button className="block lg:hidden">
              <i className="fa fa-bars"></i>
            </button>

            {/* <button onClick={logoutUser} className="text-blue-600">KELUAR</button> */}
            <button onClick={handleConfirm} className="text-blue-600 hover:font-bold transition-all block text-center cursor-pointer"
            style={{ minWidth: '100px' }}>KELUAR</button>
            { showConfirmation &&  <Confirmation open={showConfirmation} setOpen={handelClose}/>}                        
          </div>
        </header>
    </>
  );
}

// 'use client'

// import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline'; // Pastikan Anda sudah menginstal heroicons
import Select, { StylesConfig } from 'react-select';

// Tipe untuk opsi Select
type Option = {
  value: string;
  label: string;
  isDisabled?: boolean;
};

interface Confirm {
  open: boolean;
  setOpen: (open: boolean) => void;
  semester: number | null ;
  kelas: string | null;
}

const TambahData: React.FC<Confirm> = ({ open, setOpen, semester, kelas }) => {

  const hariOptions: Option[] = [
    { value: 'Senin', label: 'Senin' },
    { value: 'Selasa', label: 'Selasa' },
    { value: 'Rabu', label: 'Rabu' },
    { value: 'Kamis', label: 'Kamis' },
    { value: 'Jumat', label: 'Jumat' },
    { value: 'Sabtu', label: 'Sabtu' },
  ];

  const mataKuliahOptions: Option[] = [
    { value: 'MK1', label: 'Matematika' },
    { value: 'MK2', label: 'Fisika' },
    { value: 'MK3', label: 'Kimia' },
  ];

  const dosenOptions: Option[] = [
    { value: 'DS1', label: 'Dr. Budi' },
    { value: 'DS2', label: 'Dr. Ani' },
    { value: 'DS3', label: 'Prof. Rina' },
  ];

  const ruangOptions: Option[] = [
    { value: 'R101', label: 'R101' },
    { value: 'R102', label: 'R102' },
    { value: 'R103', label: 'R103' },
  ];

  const semesterOptions: Option[] = [
    { value: `${semester}`, label: `Semester ${semester}`, isDisabled: true }, // Semester 2 disabled
  ];

  const kelasOptions: Option[] = [
    { value: `${kelas}`, label: `Kelas ${kelas}`, isDisabled: true }, // Kelas A disabled
  ];

  // Opsi untuk waktu mulai dan akhir
  const timeOptions: Option[] = Array.from({ length: 24 * 4 }, (_, i) => {
    const hours = String(Math.floor(i / 4)).padStart(2, '0');
    const minutes = String((i % 4) * 15).padStart(2, '0');
    return { value: `${hours}:${minutes}`, label: `${hours}:${minutes}` };
  });

  // Custom styles for react-select
  const customStyles: StylesConfig<Option> = {
    control: (provided) => ({
      ...provided,
      padding: '8px',
      borderColor: 'gray',
      boxShadow: 'none',
      '&:hover': {
        borderColor: 'blue',
      },
    }),
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-6 py-5 sm:p-6">
                  <div className="sm:flex sm:items-start">
                    <button
                      type="button"
                      className="absolute top-2 right-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <div className="mt-3 w-full text-center sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        Menambah Jadwal Baru
                      </Dialog.Title>
                      <form className="mt-5 space-y-4">
                        <div>
                          <label htmlFor="hari" className="block text-sm font-medium text-gray-700">
                            Hari
                          </label>
                          <Select
                            id="hari"
                            options={hariOptions}
                            className="mt-1"
                            placeholder="Pilih Hari"
                            isSearchable
                            styles={customStyles}
                          />
                        </div>
                        <div>
                          <label htmlFor="waktu-mulai" className="block text-sm font-medium text-gray-700">
                            Waktu Mulai
                          </label>
                          <Select
                            id="waktu-mulai"
                            options={timeOptions}
                            className="mt-1"
                            placeholder="Pilih Waktu Mulai"
                            isSearchable
                            styles={customStyles}
                          />
                        </div>
                        <div>
                          <label htmlFor="waktu-akhir" className="block text-sm font-medium text-gray-700">
                            Waktu Akhir
                          </label>
                          <Select
                            id="waktu-akhir"
                            options={timeOptions}
                            className="mt-1"
                            placeholder="Pilih Waktu Akhir"
                            isSearchable
                            styles={customStyles}
                          />
                        </div>
                        <div>
                          <label htmlFor="mata-kuliah" className="block text-sm font-medium text-gray-700">
                            Mata Kuliah
                          </label>
                          <Select
                            id="mata-kuliah"
                            options={mataKuliahOptions}
                            className="mt-1"
                            placeholder="Pilih Mata Kuliah"
                            isSearchable
                            styles={customStyles}
                          />
                        </div>
                        <div>
                          <label htmlFor="dosen" className="block text-sm font-medium text-gray-700">
                            Dosen
                          </label>
                          <Select
                            id="dosen"
                            options={dosenOptions}
                            className="mt-1"
                            placeholder="Pilih Dosen"
                            isSearchable
                            styles={customStyles}
                          />
                        </div>
                        <div>
                          <label htmlFor="ruang" className="block text-sm font-medium text-gray-700">
                            Ruang
                          </label>
                          <Select
                            id="ruang"
                            options={ruangOptions}
                            className="mt-1"
                            placeholder="Pilih Ruang"
                            isSearchable
                            styles={customStyles}
                          />
                        </div>
                        <div>
                          <label htmlFor="semester" className="block text-sm font-medium text-gray-700">
                            Semester
                          </label>
                          <Select
                            id="semester"
                            options={semesterOptions}
                            defaultValue={semesterOptions[0]} // Semester 2 disabled
                            className="mt-1"
                            placeholder="Pilih Semester"
                            isSearchable
                            styles={customStyles}
                            isDisabled
                          />
                        </div>
                        <div>
                          <label htmlFor="kelas" className="block text-sm font-medium text-gray-700">
                            Kelas
                          </label>
                          <Select
                            id="kelas"
                            defaultValue={kelasOptions[0]} // Kelas A disabled
                            className="mt-1"
                            isSearchable
                            styles={customStyles}
                            isDisabled
                          />
                        </div>
                        <div className="mt-5 sm:mt-6 flex justify-end">
                          <button 
                          onClick={() => setOpen(false)}
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                            Simpan Jadwal
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

interface ConfirmDosen {
  open: boolean;
  setOpen: (open: boolean) => void;
}
const TambahDataDosen: React.FC<ConfirmDosen> = ({ open, setOpen }) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-6 py-5 sm:p-6">
                  <div className="sm:flex sm:items-start">
                    <button
                      type="button"
                      className="absolute top-2 right-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <div className="mt-3 w-full text-center sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        Menambah Jadwal Baru
                      </Dialog.Title>
                      <form className="mt-5 space-y-4">
                        <div>
                          <label htmlFor="nip-dosen" className="block text-sm font-medium text-gray-700">
                            NIP Dosen
                          </label>
                          <input
                            id="nip-dosen"
                            type="text"
                            className="mt-1 block w-full rounded-md py-4 px-2 border-gray-300 shadow-sm  focus:outline-indigo-500 sm:text-sm"
                            placeholder="Masukkan NIP Dosen"
                          />
                        </div>
                        <div>
                          <label htmlFor="nama-dosen" className="block text-sm font-medium text-gray-700">
                            Nama Dosen
                          </label>
                          <input
                            id="nama-dosen"
                            type="text"
                            className="mt-1 block w-full rounded-md py-4 px-2 border-gray-300 shadow-sm focus:outline-indigo-500 sm:text-sm"
                            placeholder="Masukkan Nama Dosen"
                          />
                        </div>
                        <div className="mt-5 sm:mt-6 flex justify-end">
                          <button
                            onClick={() => setOpen(false)}
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          >
                            Simpan Jadwal
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
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





// const JadwalSemester: React.FC<Jadwal> = ({ jadwal, smstr, onSelectClass}) => {
//   const [isOpen, setIsOpen] = useState<number | null>(null);

//   const toggleDropdown = (sms: number) => {
//     setIsOpen(sms);
//     if (isOpen != null) {
//       setIsOpen(null);
//     }
//   };
//   const list = [];
//   const semester = [1, 2, 3, 4, 5, 6];
  
//   for (let i = 0; i < jadwal; i++) {
//     const genap =  semester[(i * 2) + 1];
//     const ganjil = semester[i * 2];
//     const sms = smstr == 0 ? genap : ganjil ;
//     list.push(
//       <div className="w-full " key={i} >
//         <button
//           className={`flex items-center w-full px-4 py-2 text-left text-white hover:bg-blue-900 focus:bg-blue-900`}
//           onClick={() => toggleDropdown(i)}
//         >
//           <FaCalendar className="mr-2 " />
//           <span>Jadwal Semester {sms}</span>
//           <FaChevronDown
//             className={`ml-auto transform transition-transform duration-300 ${
//               isOpen == i ? 'rotate-120' : '-rotate-90'
//             }`}
//           />
//         </button>
//         {/* Dropdown with animation */}
//         <div
//           className={`ml-6 mr-4 mt-2 space-y-2 overflow-hidden transition-all duration-300 ease-in-out ${
//             isOpen == i ? 'max-h-96' : 'max-h-0'
//           }`}
//         >
//           {
//           ["A","B","D","E"].map((value) => ( 
//             <>
//               <button
//                 className="block hover:bg-blue-900 rounded-lg py-2 px-1 w-full text-left focus:bg-blue-900"
//                 onClick={() => onSelectClass(`${value}`,sms)}
//               >
//                 Kelas {value}
//               </button>
//             </>
//           ))
          
//           }
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       {list}
//     </>
//   );
// };
  
export default Dashboard;

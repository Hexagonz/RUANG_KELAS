import React from "react";
import { Footer, Navbar } from "../../lib";

const FormDetails: React.FC = () => {
    return (
        <>
            <Navbar onShow={true}/>
            <div className="detail flex justify-evenly items-start py-10 ">
                <RoomDetails />
                <RoomUsage />
            </div>
            <Footer/>
        </>
    );
}

const RoomDetails: React.FC  = () => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 py-10 border-2">
            <h1 className="text-2xl font-bold mb-2">TI 1</h1>
            <p className="text-gray-600 mb-4">Gedung Teori</p>
            <img src="https://placehold.co/600x400" alt="Classroom with a whiteboard and desks" className="w-full h-64 object-cover mb-4 rounded-lg" />
            <div className="flex justify-center space-x-2 mb-4">
                <img src="https://placehold.co/100x100" alt="Classroom view 1" className="w-24 h-24 object-cover rounded-lg border-2 border-blue-500" />
                <img src="https://placehold.co/100x100" alt="Classroom view 2" className="w-24 h-24 object-cover rounded-lg" />
                <img src="https://placehold.co/100x100" alt="Classroom view 3" className="w-24 h-24 object-cover rounded-lg" />
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                    <p className="text-gray-600">Gedung:</p>
                    <p className="font-bold">Teori</p>
                </div>
                <div>
                    <p className="text-gray-600">Lantai:</p>
                    <p className="font-bold">2</p>
                </div>
                <div>
                    <p className="text-gray-600">Kapasitas:</p>
                    <p className="font-bold">30</p>
                </div>
            </div>
            <div>
                <p className="text-gray-600 mb-2">Fasilitas Ruangan :</p>
                <div className="grid grid-cols-2 gap-4 border p-4 rounded-lg w-1/2">
                    <div className="flex items-center space-x-2 border p-2 rounded-lg">
                        <i className="fas fa-table text-xl"></i>
                        <span>Meja</span>
                    </div>
                    <div className="flex items-center space-x-2 border p-2 rounded-lg">
                        <i className="fas fa-chair text-xl"></i>
                        <span>Kursi</span>
                    </div>
                    <div className="flex items-center space-x-2 border p-2 rounded-lg">
                        <i className="fas fa-chalkboard text-xl"></i>
                        <span>Papan Tulis</span>
                    </div>
                    <div className="flex items-center space-x-2 border p-2 rounded-lg">
                        <i className="fas fa-wind text-xl"></i>
                        <span>Air Conditioner</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const RoomUsage: React.FC = () => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 w-1/2 border-2">
            <h2 className="text-xl font-bold mb-8">Ruangan ini akan digunakan pada:</h2>
            <table className="min-w-full bg-white">
                <thead className="border-t-2">
                    <tr className="border-b-2">
                        <th className="py-2 px-4 border-b">Hari</th>
                        <th className="py-2 px-4 border-b">Waktu Mulai</th>
                        <th className="py-2 px-4 border-b">Waktu Akhir</th>
                        <th className="py-2 px-4 border-b">Mata Kuliah</th>
                        <th className="py-2 px-4 border-b">Dosen Pengampu</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b *:text-center">
                        <td className="no py-2 px-4">Senin</td>
                        <td className="strat py-2 px-4">07:00</td>
                        <td className="end py-2 px-4">08:40</td>
                        <td className="matkul py-2 px-4">Pemograman Web</td>
                        <td className="dosen py-2 px-4">Fery Faisal</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
export default FormDetails;
import { Link } from "react-router-dom";

const PopUp:  React.FC = () => {
    return (
        <div id="card-popup">
            <div className="info">
                <p>Mata Kuliah: -</p>
                <p>Dosen Pengajar: -</p>
                <p>Waktu penggunan kelas: -</p>
            </div>
            <br />
            <div className="status">
                <Link to="#">Detail Kelas</Link>
                <div className="status-side">
                    <p>Ruangan Tersedia</p>
                    <span id="status-clr"></span>
                </div>
            </div>
        </div>
    );
}

export default PopUp;
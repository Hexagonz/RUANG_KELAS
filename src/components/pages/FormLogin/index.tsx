import { Form } from "../../lib";
import img from "./assets/image/circle.png";
import logo from "./assets/image/logo.png";
import "./style/style.css";

const ButtonLogin: React.FC = () => {
    return (
    <>
        <div className="login flex">
            <div className="image">
                    <h1>Pengelolaan Ruang dan Sistem <br/>Informasi Studi Teknik <br/> Informatika.</h1>
                </div>
            <div className="form-login w-[100vh] h-[100vh] flex justify-center items-center">
                <Form name="Sign In"/>
            </div>
        <img src={img} alt="circle" className="w-40 absolute bottom-0 right-0"/>
        <img src={logo} alt="logo" className="w-28 absolute top-4 right-2"/>
        </div>
    </>
    );
}

export default ButtonLogin;
import { useEffect, useState, useRef } from "react";
import "./style/style.css"
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { handleSubmit } from "../Api/login";

type Btn = {
    name: string;
}

export interface ValidationLogin {
    nomor_induk: string;
    password: string;
}

export interface FocusInput {
    nomor_induk : HTMLInputElement | null;
    password : HTMLInputElement | null;
}

export interface ValidationState {
    error: string | null;
    status: number | null;
}


const Form: React.FC<Btn> = ({ name }) => {
    const navigate = useNavigate();
    const [type, setType] = useState<string>('password');
    const [error, setError] = useState<string | null>(null);
    const [validate, setValidate] = useState<ValidationState>({
        error: null,
        status: null
    });
    const [loading, setLoading] = useState(false);

    const focusInput = useRef<FocusInput>({
        nomor_induk: null!,
        password: null!
    })

    const [login, setLogin] = useState<ValidationLogin>({
        nomor_induk: '',
        password: ''
      });
    
      const onSubmit = async (e: React.FormEvent) : Promise<void> => {
        e.preventDefault();
        if (!login.nomor_induk || !login.password) {
            setError('Both fields are required.');
            if (!login.nomor_induk && focusInput.current.nomor_induk) {
                focusInput.current.nomor_induk.focus();
            } else if (!login.password && focusInput.current.password) {
                focusInput.current.password.focus();
            }
            return;
        }

        await handleSubmit(login, setValidate);
        if (loading) return;

        setLoading(true); 
        setError(null);
        if(validate.status == 422) {
            setTimeout(() => {
                setLoading(false);
              }, 1000);
        };
    }

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        console.log(validate)
        if (validate.status == 200) {
               navigate("/");
       } else if(token) {
               navigate("/");
       } else if(validate.status == 422) {
           setTimeout(() => {
               setLoading(false);
               }, 1000);
       };
    },[type, navigate,validate.status]);
    return <>
        <form  onSubmit={onSubmit} className="w-[50%]">
            <h1 className="font-bold text-[5rem] leading-[6rem]">Welcome <br />Back</h1>
            <div className="nomor_induk flex flex-col">
                <label htmlFor="nomor_induk" className="text-xl mb-1">nomor_induk</label>
                <input
                ref={(el) => (focusInput.current.nomor_induk = el)}
                type="text"
                name="text"
                placeholder="Enter our nomor_induk"
                value={login.nomor_induk}
                onChange={(e) =>  setLogin({ ...login, nomor_induk: e.target.value })}
                autoComplete="current-nomor_induk"
                className="h-8 p-6 py-7 border-solid border-[1px] border-gray-400 rounded-[7px] w-full"/>
            </div>
            <div className="password flex flex-col">
                <label htmlFor="password" className="text-xl my-3 mb-1">Password</label>
                <div className="password relative">
                    <input 
                        ref={(el) => (focusInput.current.password = el)}
                        type={type}
                        name="password"
                        placeholder="Enter Password"
                        onChange={(e) =>  setLogin({ ...login, password: e.target.value })}
                        autoComplete="current-password"
                        className="h-8 p-6 py-7 border-solid border-[1px] border-gray-400 rounded-[7px] w-full"
                    />
                    {/* <FiEye className="absolute right-6 top-4 w-7 h-7 opacity-[.5] " data-attribut="hidden"/> */}
                </div>
            </div>
            <div className="formem flex justify-between my-6 items-center">
                <div className="radio flex gap-1">
                    <input type="checkbox" id="remember" name="remember" value="remember" className="w-4 cursor-pointer"/>
                    <label htmlFor="checkbox" className="font-[500]">Remember me</label><br />
                </div>
                <div className="forgot underline font-[500]">
                    <a href="#">Forgot Password</a>
                </div>
            </div>
            <input type="submit" value={name} className="bg-[#1E2A5E] text-white w-full mt-10 p-4 font-bold text-xl rounded-[5px] cursor-pointer hover:bg-[#0f1636]" />
            {(validate.error || error )&& <p className='text-lg text-red-500 text-center items-center py-2'>{validate.error || error}</p>}
        </form>
    </>;
}

export default Form;
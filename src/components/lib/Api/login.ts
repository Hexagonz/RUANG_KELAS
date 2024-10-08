import axios, { AxiosResponse }  from 'axios';
const BASE_URL =  import.meta.env.VITE_APP_BASE_URL;

export interface ValidationLogin {
    nomor_induk: string;
    password: string;
}

export interface ValidationState {
    error: string | null;
    status: number | null;
}

export const handleSubmit = async ( 
  login: ValidationLogin, 
  setValidate: (state: ValidationState) => void
): Promise<void> => {
    try {
      const { data }: AxiosResponse = await axios.post(BASE_URL + 'api/login', login);
      setValidate({error: null, status: data.status});
      localStorage.setItem('access_token', data.token);
    } catch (err: any) {
      setValidate({error: err.response?.data?.message, status:err.response?.data?.status });
  }
};


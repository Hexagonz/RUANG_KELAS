import { useState, useEffect } from "react";

const Time: React.FC = () => {
    const [dateState, setDateState] = useState<Date>(new Date());
    useEffect(() => {
           setInterval(() => setDateState(new Date()), 1000);
    }, []);
    return (
        <>
            <div className="time bg-[#FF8F00] w-48 text-white font-bold rounded-lg flex justify-center items-center py-4 p-12 text-2xl shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.5)] absolute right-[22.5%] top-6">
                <p>
                    {
                    dateState.toLocaleString('in-ID', {
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                    })}
                </p>
            </div>
        </>
    );
};

export default Time;
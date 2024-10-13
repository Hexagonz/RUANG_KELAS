import "./style/style.css";

const Home: React.FC = () => {
    return (
        <>
            <article className="h-[110vh] flex items-center justify-center w-[100%]">
                <div className="container w-max rounded-[10px] py-24 px-24 flex justify-center items-center gap-16">
                    <div className="text-contain *:py-2">
                        <h1 className="bg-[#FF8D0C] text-7xl font-bold">STUDILAB</h1>
                        <h3 className="text-[1.82rem] font-semibold text-[333333] text-center">Your Learning Space<br />
                        </h3>
                    </div>
                    <div className="btn-contain flex gap-14 *:bg-[#1D294A] text-white  *:rounded-[10px] font-semibold *:text-center *:h-32 *:w-32 *:flex *:justify-center *:items-center">
                        <h1 className="use">
                            1
                            <br />
                        Terpakai</h1>
                        <h1 className="not use">
                            12 
                            <br />
                        Kosong</h1>
                    </div>
                </div>
            </article>
        </>
    );
};

export default Home;
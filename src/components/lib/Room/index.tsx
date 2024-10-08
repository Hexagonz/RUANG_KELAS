import Teori from "./Teori";
import Floor1 from "./LAB/Floor1";
import Floor2 from "./LAB/Floor2";

const Room: React.FC = () => {
    return (
        <>
            <section className="contain-map mx-auto w-11/12 py-4 relative"> 
                <Teori />
                <Floor1 />
                <Floor2 />
            </section>  
        </>
    );
}

export default Room;
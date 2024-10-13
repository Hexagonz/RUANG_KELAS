import "./style/style.css"
import { Navbar, Hero, Room, Footer } from "../../lib";

const FormHome: React.FC = () => {
    return (
        <>  
            <Navbar onShow={false}/>
            <Hero />
        <div className="mb-24">
            <Room />
        </div>
            <Footer />
        </>
    );
}

export default FormHome;
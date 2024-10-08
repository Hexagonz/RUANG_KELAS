import "./style/style.css"
import { Navbar, Hero, Room, Footer } from "../../lib";

const FormHome: React.FC = () => {
    return (
        <>  
            <Navbar onShow={false}/>
            <Hero />
            <Room />
            <Footer />
        </>
    );
}

export default FormHome;
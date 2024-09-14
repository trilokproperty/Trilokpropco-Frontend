import { Helmet } from "react-helmet";
import Header from "../../Component/Navigation/Header";
import SectionTitle from "../../Component/ForAll/SectionTitle";
import Contact from "../Home/Home/Contact";
import Footer from "../../Component/Navigation/Footer";

const ContactUs = () => {
    return (
    <div>
       <div
                className="pt-5 lg:h-96 h-40 md:h-56"
                style={{
                    backgroundImage: `url(https://i.ibb.co/NT6PZjt/16406692-rm378-02c.webp)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <Header />
                <Helmet>
                <meta charSet="utf-8" />
                <title>Contact Us - Trilokpropco</title>
                </Helmet>
                <SectionTitle value="Contact Us" color="white" />
          </div>
          <Contact />
          <Footer />      
    </div>
    );
};

export default ContactUs;

import Footer from "../../../Component/Navigation/Footer";
import Contact from "../Home/Contact";
import ExploreCities from "../Home/ExploreCities";
import Home from "../Home/Home";
import Info from "../Home/Info";
import LatestBlogs from "../Home/LatestBlogs";
import LatestProperties from "../Home/LatestProperties";
import Partners from "../Home/Partners";
import PropertyTypes from "../Home/PropertyTypes";
import SearchBar from "../Home/SearchBar";
import Testimonial from "../Home/Testimonial";

const Main = () => {
    return (
        <div className="overflow-hidden">
            <Home />
            <SearchBar />
            <Partners />
            <ExploreCities />
            <PropertyTypes />
            <LatestProperties />
            <Info />
            <LatestBlogs />
            <Testimonial />
            <Contact />
            <Footer />
        </div>
    );
};

export default Main;
import { useEffect, useState } from "react";
import Header from "../../Component/Navigation/Header";
import { Helmet } from "react-helmet";
import SectionTitle from "../../Component/ForAll/SectionTitle";
import PropertyListCard from "../../Component/ForAll/PropertyListCard";
import Footer from "../../Component/Navigation/Footer";

const FavLists = () => {
    const [favLists, setFavLists] = useState([]);

    const fetchFavLists = () => {
        const favList = JSON.parse(localStorage?.getItem("favList")) || [];
        setFavLists(favList);
    };

    useEffect(() => {
        // Get the favorite list from localStorage on component load
        fetchFavLists();

        // Add event listener for favListUpdated event
        const handleFavListUpdate = () => {
            fetchFavLists();
        };

        window.addEventListener('favListUpdated', handleFavListUpdate);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('favListUpdated', handleFavListUpdate);
        };
    }, []);

    return (
        <div className="bg-[#eae9e920] h-full">
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
                    <title>Favourites List - Trilokpropco</title>
                </Helmet>
                <SectionTitle value="Favourites List" color="white" />
            </div>

            {/* card */}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-4 lg:mt-24 lg:mx-6 lg:pb-20 pb-12 mx-4 mt-10 gap-6">
                {favLists?.map((favlist, index) =>
                    <PropertyListCard key={index} property={favlist} />
                )}
            </div>

<Footer />
        </div>
    );
};

export default FavLists;

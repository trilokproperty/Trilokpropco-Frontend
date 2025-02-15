import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { endPoint } from "../../Component/ForAll/ForAll";
import FloatingIcons from '../../Component/ForAll/FloatingIcons';
import Header from "../../Component/Navigation/Header";
import Footer from "../../Component/Navigation/Footer";
import PropertyListCard from "../../Component/ForAll/PropertyListCard";

const ResultsPage = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();

    const fetchResults = async () => {
        try {
            const queryParams = new URLSearchParams(location.search);
            const type = queryParams.get('type');
            const city = queryParams.get('city');
            const status = queryParams.get('status');

            // console.log("Fetching with params:", { type, city, status });

            const response = await fetch(`${endPoint}/property/search?type=${type}&city=${city}&status=${status}`);

            if (!response.ok) {
                throw new Error('Failed to fetch search results');
            }

            const data = await response.json();
            // console.log("Fetched data:", data);
            setResults(data);
        } catch (error) {
            console.error("Error fetching search results:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Fetch the initial search results on component load
        fetchResults();

        // Add event listener for favListUpdated event
        const handleFavListUpdate = () => {
            fetchResults();
        };

        window.addEventListener('favListUpdated', handleFavListUpdate);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('favListUpdated', handleFavListUpdate);
        };
    }, [location.search]);

    return (
        <div className="">
            <FloatingIcons/>
            <Header isDefault={false}/>
            <div className="w-[85%] mx-auto mb-10">
                <h1 className="text-2xl font-bold my-4">Search Results</h1>
                {loading ? (
                    <p>Loading results...</p>
                ) : error ? (
                    <p className="text-red-500">Error: {error}</p>
                ) : results.length > 0 ? (
                    <ul className="list-inside list-none grid lg:grid-cols-3 gap-3 md:grid-cols-2 lg:gap-4">
                        {results.map(result => (
                            <PropertyListCard key={result._id} property={result} />
                        ))}
                    </ul>
                ) : (
                    <p>No results found.</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default ResultsPage;

import { useEffect, useState } from "react";
import SectionTitle from "../../../Component/ForAll/SectionTitle";
import { endPoint } from "../../../Component/ForAll/ForAll";

const ExploreCities = () => {
    const [cities, setCities] = useState([]);
    const [propertyCounts, setPropertyCounts] = useState({});
    const [visibleCount, setVisibleCount] = useState(5);

    useEffect(() => {
        const fetchCitiesAndProperties = async () => {
            try {
                const cityResponse = await fetch(`${endPoint}/city`);
                const cityData = await cityResponse.json();
                setCities(cityData);

                const propertyResponse = await fetch(`${endPoint}/property`);
                const propertyData = await propertyResponse.json();

                const counts = cityData.reduce((acc, city) => {
                    const count = propertyData.filter(
                        (property) => property.location === city._id
                    ).length;
                    acc[city._id] = count;
                    return acc;
                }, {});

                setPropertyCounts(counts);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchCitiesAndProperties();
    }, []);

    const handleViewMore = () => {
        setVisibleCount(cities.length);
    };

    const formatCount = (count) => {
        return count.toString().padStart(2, '0');
    };

    return (
        <div className="lg:my-24 lg:mx-24 mx-5 md:mx-2">
            <SectionTitle value="Explore Cities" />

            <div className="city-grid flex flex-wrap gap-5 lg:gap-x-10 lg:gap-y-6 mt-10">
                {cities.slice(0, visibleCount).map((city, index) => {
                    let flexBasisClasses = "";

                    // Determine the flex basis based on the city index
                    if (index === 0 || index === 1) {
                        flexBasisClasses = "flex-grow lg:basis-1/4 md:basis-1/4 basis-full";
                    } else if (index === 2 || index === 3) {
                        flexBasisClasses = "flex-grow lg:basis-1/3 md:basis-1/3 basis-full";
                    } else if (index === 4) {
                        flexBasisClasses = "flex-grow lg:basis-1/2 md:basis-1/2 basis-full";
                    } else {
                        flexBasisClasses = "flex-grow lg:basis-1/4 md:basis-1/3 basis-full";
                    }

                    return (
                        <div
                            key={city._id}
                            className={`city-item ${flexBasisClasses} relative`}
                            style={{
                                backgroundImage: `url(${city?.image})`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                            }}
                        >
                            {/* Overlay */}
                            <div className="overlay absolute inset-0 bg-black opacity-20 rounded-[25px]"></div>

                            {/* Content */}
                            <div className="relative z-10 text-white md:p-1 p-4 pb-8">
                                <p className="lg:text-6xl md:text-5xl text-6xl font-bold opacity-60">{formatCount(propertyCounts[city._id] || 0)}</p>
                                <h3 className="md:text-xs text-sm lg:text-[18px]">{city.name}</h3>
                            </div>
                        </div>
                    );
                })}
            </div>

            {visibleCount < cities.length && (
                <button onClick={handleViewMore} className="mt-12 lg:px-16 p-3 px-6 bg-[#046307] text-white rounded flex justify-center text-xl font-normal mx-auto">
                    View More
                </button>
            )}
        </div>
    );
};

export default ExploreCities;

import { Helmet } from 'react-helmet';
import Header from '../../Component/Navigation/Header';
import Footer from '../../Component/Navigation/Footer';
import SectionTitle from '../../Component/ForAll/SectionTitle';
import { useEffect, useState } from 'react';
import { endPoint } from '../../Component/ForAll/ForAll';
import PropertyListCard from '../../Component/ForAll/PropertyListCard';
import Filter from '../../Component/Filter/Filter';
import Map from '../../Component/Map/Map';

const AllProperties = () => {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [filters, setFilters] = useState({
        city: '',
        type: '',
        status: '',
        for: ''
    });

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch(`${endPoint}/property`);
                const data = await response.json();
                
                // Sort by date and limit to the first 8 properties
                const sortedProperties = data
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

                setProperties(sortedProperties);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties();
    }, []);

    useEffect(() => {
        // Filter properties based on the selected filters
        const applyFilters = () => {
            const filtered = properties.filter(property => {
                const matchesCity = filters.city ? property.location === filters.city : true;
                const matchesType = filters.type ? property.type === filters.type : true;
                const matchesStatus = filters.status ? property.status === filters.status : true;
                const matchesFor = filters.for ? property.for === filters.for : true;

                return matchesCity && matchesType && matchesStatus && matchesFor;
            });

            setFilteredProperties(filtered);
        };

        applyFilters();
    }, [filters, properties]);

    const handleFilterChange = (newFilters) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            ...newFilters
        }));
    };

    return (
        <div>
            <div style={{
                backgroundImage: `url(https://i.ibb.co/NT6PZjt/16406692-rm378-02c.webp)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }} className="pt-5 lg:h-96 h-40 md:h-56">
                <Header />
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Explore Properties Lists - Trilokpropco</title>
                </Helmet>
                <SectionTitle value="Explore Properties" color="white" />
            </div>
            <div className='md:mx-0 mx-2'>
                <Filter onFilterChange={handleFilterChange} />
            </div>
            <div className="grid md:grid-cols-5 gap-8 lg:mx-20 mx-5 mb-3">
                <div className='md:col-span-2 grid grid-cols-1 gap-5 mt-5'>
                    {filteredProperties.slice(0, 8).map(property => (
                        <PropertyListCard key={property?._id} property={property} />
                    ))}
                </div>
                <div className="md:col-span-3 sticky top-0 h-[calc(160vh-160px)]">
                    <Map properties={filteredProperties} />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AllProperties;

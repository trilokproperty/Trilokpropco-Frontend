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
  const [selectedCategory, setSelectedCategory] = useState('All'); // default to 'All'

  const [filters, setFilters] = useState({
    city: '',
    type: '',
    status: '',
    for: ''
  });

  // Fetch properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`${endPoint}/property`);
        const data = await response.json();

        // Sort by date and set properties
        const sortedProperties = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setProperties(sortedProperties);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    fetchProperties();
  }, []);

  // Filter properties based on selectedCategory and other filters
  useEffect(() => {
    const applyFilters = () => {
      const filtered = properties.filter(property => {
        const matchesCity = filters.city ? property.location === filters.city : true;
        const matchesType = filters.type ? property.type === filters.type : true;
        const matchesStatus = filters.status ? property.status === filters.status : true;
        const matchesFor = filters.for ? property.for === filters.for : true;

        // Match the property category based on selectedCategory
        const matchesSelectedCategory = selectedCategory === 'All'
          ? true
          : property.category.toLowerCase() === selectedCategory.toLowerCase();

        return matchesCity && matchesType && matchesStatus && matchesFor && matchesSelectedCategory;
      });

      setFilteredProperties(filtered);
    };

    applyFilters();
  }, [filters, properties, selectedCategory]); // re-run when selectedCategory or filters change

  const handleButtonClick = (type) => {
    console.log('Selected Category:', type);
    setSelectedCategory(type); 
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters
    }));
  };

  return (
    <div className='overflow-hidden'>
      <div
        style={{
          backgroundImage: `url(https://i.ibb.co/NT6PZjt/16406692-rm378-02c.webp)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        className="pt-5 lg:h-96 h-40 md:h-56"
      >
        <Header />
        <Helmet>
          <meta charSet="utf-8" />
          <title>Explore Properties Lists - Trilokpropco</title>
        </Helmet>
        <SectionTitle value="Explore Properties" color="white" />
      </div>

      <div className='md:mx-0 mx-2 '>
        <Filter onFilterChange={handleFilterChange} />
      </div>

      {/* Property Category Buttons */}
      <div className="flex justify-center md:gap-2 gap-5 flex-wrap space-x-4 my-6">
        <button
          className={`btn btn-sm ${selectedCategory === 'All' ? 'bg-[#046307] text-white' : 'bg-black text-white'}`}
          onClick={() => handleButtonClick('All')}
        >
          All
        </button>
        <button
          className={`btn btn-sm ${selectedCategory === 'Residential' ? 'bg-[#046307] text-white' : 'bg-black text-white'}`}
          onClick={() => handleButtonClick('Residential')}
        >
          Residential Property
        </button>
        <button
          className={`btn btn-sm ${selectedCategory === 'Commercial' ? 'bg-[#046307] text-white' : 'bg-black text-white'}`}
          onClick={() => handleButtonClick('Commercial')}
        >
          Commercial Property
        </button>
      </div>

      {/* Property List */}
      <div className="grid md:grid-cols-5 gap-8 lg:mx-20 mx-5 mb-3">
        <div className='md:col-span-2 flex flex-col gap-5 mt-5'>
          {filteredProperties.slice(0, 8).map(property => (
            <PropertyListCard key={property?._id} property={property} />
          ))}
        </div>
        <div className="md:col-span-3 sticky top-0 md:h-[calc(160vh-160px)] h-[calc(60vh-60px)]">
          <Map properties={filteredProperties} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AllProperties;

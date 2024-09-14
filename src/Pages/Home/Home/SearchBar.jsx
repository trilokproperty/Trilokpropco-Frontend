import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router
import { endPoint } from "../../../Component/ForAll/ForAll";
import { GoSearch } from "react-icons/go";

const SearchBar = () => {
  const [typeOptions, setTypeOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);

  const [selectedType, setSelectedType] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const typeResponse = await fetch(`${endPoint}/type`);
        const cityResponse = await fetch(`${endPoint}/city`);
        const statusResponse = await fetch(`${endPoint}/status`);

        const types = await typeResponse.json();
        const cities = await cityResponse.json();
        const statuses = await statusResponse.json();

        setTypeOptions(types);
        setCityOptions(cities);
        setStatusOptions(statuses);
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    };

    fetchFilters();
  }, []);

  const handleSearch = () => {
    // Build the search query parameters
    const queryParams = new URLSearchParams({
      type: selectedType,
      city: selectedCity,
      status: selectedStatus,
    }).toString();

    // Navigate to the results page with the query parameters
    navigate(`/results?${queryParams}`);
  };

  return (
    <div className="search-bar"
    style={{
      background: 'rgba( 255, 255, 255, 0.25 )',
      boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
      backdropFilter: 'blur( 6px )',
      borderRadius: '20px',
      WebkitBackdropFilter: 'blur( 6px )',
      border: '1px solid rgba( 255, 255, 255, 0.18 )',
    }} >
      <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="lg:px-10 lg:py-3 md:text-[13px] text-[10px] md:px-1 md:py-2 rounded option">
        <option value="">All Types</option>
        {typeOptions.map(type => (
          <option key={type._id} value={type._id}>{type.type}</option>
        ))}
      </select>

      <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className=" lg:py-3 md:text-[13px] text-[10px] md:px-1 md:py-2 lg:px-2 rounded option">
        <option value="">All Cities</option>
        {cityOptions.map(city => (
          <option key={city._id} value={city._id}>{city.name}</option>
        ))}
      </select>

      <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="lg:px-6 lg:py-3 md:text-[13px] text-[10px] md:px-1 md:py-2 rounded option">
        <option value="">All Statuses</option>
        {statusOptions.map(status => (
          <option key={status._id} value={status._id}>{status.status}</option>
        ))}
      </select>

      <button onClick={handleSearch} className="bg-[#046307] lg:px-7 lg:py-3 text-white font-light flex gap-2 items-center lg:text-[16px] md:text-[13px] text-[10px] md:px-2 md:py-[9px] rounded py-1 px-1">Search Now <span className="text-2lg" ><GoSearch/></span>
</button>
    </div>
  );
};

export default SearchBar;

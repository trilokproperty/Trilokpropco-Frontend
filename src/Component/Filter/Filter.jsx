import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { endPoint } from "../ForAll/ForAll";

const Filter = ({ onFilterChange }) => {
    const [typeOptions, setTypeOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);
    const [statusOptions, setStatusOptions] = useState([]);

    const [selectedType, setSelectedType] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedFor, setSelectedFor] = useState('');
    // console.log(selectedType, selectedCity, selectedStatus, selectedFor )
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

    const handleFilterSubmit = () => {
        onFilterChange({
            city: selectedCity,
            type: selectedType,
            status: selectedStatus,
            for: selectedFor
        });
    };

    return (
        <div>
            <div className="md:flex grid grid-cols-2 items-end justify-center mb-10 md:gap-5 gap-2 mt-10 flex-warp">
                <div className="cols-span-1 flex flex-col">
                    <label htmlFor="city">Location</label>
                    <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="select select-bordered  text-black bg-white">
                        <option value="">All</option>
                        {cityOptions.map(city => (
                            <option key={city._id} value={city._id}>{city.name}</option>
                        ))}
                    </select>
                </div>
                <div className="cols-span-1">
                    <label htmlFor="type">Type</label>
                    <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="select select-bordered text-black w-full max-w-xs  bg-white">
                        <option value="">All Types</option>
                        {typeOptions.map(type => (
                            <option key={type._id} value={type._id}>{type.type}</option>
                        ))}
                    </select>
                </div>
                <div className="cols-span-1">
                    <label htmlFor="for">For</label>
                    <select value={selectedFor} onChange={(e) => setSelectedFor(e.target.value)} className="select select-bordered text-black w-full bg-white">
                        <option value="">All</option>
                        <option value="Buy">Buy</option>
                        <option value="Sale">Sale</option>
                        <option value="Rent">Rent</option>
                    </select>
                </div>
                <div className="cols-span-1">
                    <label htmlFor="status">Status</label>
                    <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="select select-bordered text-black w-full bg-white">
                        <option value="">Status</option>
                        {statusOptions.map(status => (
                            <option key={status._id} value={status._id}>{status.status}</option>
                        ))}
                    </select>
                </div>
                <button onClick={handleFilterSubmit} className="btn bg-[#046307] text-white col-span-2"><FaSearch /></button>
            </div>
        </div>
    );
};

export default Filter;

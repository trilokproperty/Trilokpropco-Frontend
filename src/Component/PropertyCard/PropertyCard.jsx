import { useEffect, useState } from "react";
import { endPoint } from "../ForAll/ForAll";
import { SlLocationPin } from "react-icons/sl";
import { FcDataConfiguration } from "react-icons/fc";
import { IoGitCompareOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
    const [curentLocation, setCurentLocation] = useState(null);
    const [curentStatus, setCurentStatus] = useState(null);
    const [curentType, setCurentType] = useState(null);
    const [isInCompare, setIsInCompare] = useState(false);
    const [isInFav, setIsInFav] = useState(false);

    useEffect(() => {
        const fetchLocation = async () => {
            const cityResponse = await fetch(`${endPoint}/city`);
            const cityData = await cityResponse.json();
            const locationData = cityData.find(
                (city) => city._id === property?.location
            );
            setCurentLocation(locationData);
        };
        fetchLocation();

        const fetchStatus = async () =>{
            const statusResponse = await fetch(`${endPoint}/status`);
            const statusData = await statusResponse.json();
            const status = statusData.find(
                (status) => status._id === property?.status
            );
            setCurentStatus(status);
        }
        fetchStatus();

        const fetchType = async () => {
            const typeResponse = await fetch(`${endPoint}/type`);
            const typeData = await typeResponse.json();
            const type = typeData.find(
                (type) => type._id === property?.type
            );
            setCurentType(type);
        };
        fetchType();

        // Check if the property is already in the compare and favorite lists on component load
        const compareList = JSON.parse(localStorage.getItem("compareList")) || [];
        const favList = JSON.parse(localStorage.getItem("favList")) || [];
        const isAlreadyInCompare = compareList.some(item => item._id === property._id);
        const isAlreadyInFav = favList.some(item => item._id === property._id);
        setIsInCompare(isAlreadyInCompare);
        setIsInFav(isAlreadyInFav);
    }, [property]);

    const handleCompareClick = () => {
        let compareList = JSON.parse(localStorage.getItem("compareList")) || [];
    
        if (isInCompare) {
            // Remove the property from the compare list
            compareList = compareList.filter(item => item._id !== property._id);
        } else {
            // Check if the compare list already has 4 properties
            if (compareList.length >= 4) {
                alert("You can only compare up to 4 properties.");
                return;
            }
            // Add the property to the compare list
            compareList.push(property);
        }
    
        // Update localStorage
        localStorage.setItem("compareList", JSON.stringify(compareList));
    
        // Dispatch a custom event to notify header
        window.dispatchEvent(new Event('compareListUpdated'));
    
        // Update the state
        setIsInCompare(!isInCompare);
    };
    
    
    const handleFavClick = () => {
        let favList = JSON.parse(localStorage.getItem("favList")) || [];
    
        if (isInFav) {
            // Remove the property from the favorite list
            favList = favList.filter(item => item._id !== property._id);
        } else {
            // Add the property to the favorite list
            favList.push(property);
        }
    console.log(favList)
        // Update localStorage
        localStorage.setItem("favList", JSON.stringify(favList));
         
        // Dispatch a custom event to notify header
        window.dispatchEvent(new Event('favListUpdated'));
    
        // Update the state
        setIsInFav(!isInFav);
    };
    
    
    return (
        <div>
            <Link to={`/property/${property?._id}`}>
            <div>
                <img
                    src={property?.galleryImages[0]}
                    alt={property?.name}
                    className="h-[330px] rounded-[30px] mt-12 relative"
                />
                 
                {property?.exclusive && (
                    <div className="bg-gradient-to-r from-[#E7C578] to-[#C19554]  h-[30px] flex items-center justify-center rounded-r-[10px] absolute top-[15%] text-white font-normal uppercase px-3 text-[19px] Bebas-Neue pt-1"
                    style={{
                        letterSpacing:'1px',
                      }}>Exclusive</div>
                )}
       <div className="absolute top-[60%] flex px-5 justify-between w-full">
        
       <p className="text-[#ffffff] flex items-center gap-2 bg-[#dfdfdfbe] px-4 rounded-full">
       <img src={curentType?.logo} alt={curentType?.type} className="w-[20px] h-[20px]" />
       <span className="font-normal text-[#046307]">{curentType?.type}</span></p>

       <div>
         {/* Compare icon */}
         {isInCompare ? <div
           onClick={handleCompareClick}
           className={`text-white text-[12px] lg:text-[25px] indicator border-white border-[3px] rounded-full p-1 lg:p-2 mr-3 cursor-pointer `}
         >
          <span className="absolute bottom-[-10px] left-[-10px] badge bg-[#ff0000] text-white border-0 p-1">
            -
          </span>
          <IoGitCompareOutline className="font-[900] text-[16px]"/>
        </div> : <div
           onClick={handleCompareClick}
           className={`text-white text-[12px] lg:text-[25px] indicator border-white border-[3px] rounded-full p-1 lg:p-2 mr-3 cursor-pointer `}
         >
          <span className="absolute bottom-[-10px] left-[-10px] badge bg-[#046307] text-white border-0 p-1">
            +
          </span>
          <IoGitCompareOutline className="font-[900] text-[16px]"/>
        </div>}

        {/* Fav icon */}
        {
            isInFav? <div
            onClick={handleFavClick}
            className={`text-white text-[12px] lg:text-[25px] indicator border-white border-[3px] rounded-full p-1 lg:p-2 cursor-pointer`}
          >
          <span className="absolute bottom-[-10px] left-[-10px] badge bg-[#ff0000] text-white border-0 p-1">
            -
            </span>
            <FaRegHeart className="font-[900] text-[16px]" />
          </div> :
          <div
          onClick={handleFavClick}
          className={`text-white text-[12px] lg:text-[25px] indicator border-white border-[3px] rounded-full p-1 lg:p-2 cursor-pointer`}
        >
        <span className="absolute bottom-[-10px] left-[-10px] badge bg-[#046307] text-white border-0 p-1">
            +
          </span>
          <FaRegHeart className="font-[900] text-[16px]" />
        </div>
        }
       </div>
       </div>
         
            </div>
            </Link>
            <div className="mt-6 text-black">
            <Link to={`/property/${property?._id}`}>
                <h3 className="text-[26px] font-semibold !mb-0">₹ {property?.priceRange}</h3></Link>
                <h4 className="text-[20px] font-medium !mt-0">{property?.name}</h4>
                <p className="text-[#9a9a9a] flex items-center gap-2"><SlLocationPin /><span>{curentLocation?.name}</span></p>
                <p className="flex items-center justify-between text-[15px]">
                    <span className="text-[#000] flex items-center gap-2">
                    <FcDataConfiguration/> {property?.configuration}
                    </span>
                    <span className="text-[#000] flex items-center gap-2">
                    <img src={curentStatus?.image} alt={curentStatus?.status} className="w-[24px] h-[24px] font-bold"/> <span className="font-bold">{curentStatus?.status}</span>
                    </span>
                </p>
            </div>
        </div>
    );
};

export default PropertyCard;
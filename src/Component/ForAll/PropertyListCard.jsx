import { useEffect, useState } from "react";
import { endPoint } from "./ForAll";
import { SlLocationPin } from "react-icons/sl";
import { Link } from "react-router-dom";
import { IoGitCompareOutline } from "react-icons/io5";
import { FaHeart, FaMinus, FaPlus, FaRegHeart } from "react-icons/fa6";

const PropertyListCard = (property) => {
    const [curentLocation, setCurentLocation] = useState(null);
    const [curentStatus, setCurentStatus] = useState(null);
    const [curentType, setCurentType] = useState(null);
    const [curentDeveloper, setCurentDeveloper] = useState(null);
    const [isInCompare, setIsInCompare] = useState(false);
    const [isInFav, setIsInFav] = useState(false);
   console.log(property)
    useEffect(() => {
        const fetchLocation = async () => {
            const cityResponse = await fetch(`${endPoint}/city`);
            const cityData = await cityResponse.json();
            const locationData = cityData.find(
                (city) => city._id === property?.property?.location || property?.property?.location?._id
            );
            setCurentLocation(locationData);
        };
        fetchLocation();

        const fetchStatus = async () =>{
            const statusResponse = await fetch(`${endPoint}/status`);
            const statusData = await statusResponse.json();
            const status = statusData.find(
                (status) => status._id === property?.property?.status || property?.property?.status?._id
            );
            setCurentStatus(status);
        }
        fetchStatus();

        const fetchType = async () => {
            const typeResponse = await fetch(`${endPoint}/type`);
            const typeData = await typeResponse.json();
            const type = typeData.find(
                (type) => type._id === property?.property?.type || property?.property?.type?._id
            );
            setCurentType(type);
        };
        fetchType();

        const fetchDeveloper = async () => {
            const developerResponse = await fetch(`${endPoint}/developer`);
            const developerData = await developerResponse.json();
            const developer = developerData.find(
                (developer) => developer._id === property?.property?.developer || property?.property?.developer?._id
            );
            setCurentDeveloper(developer);
        };
        fetchDeveloper();

        // Check if the property is already in the compare and favorite lists on component load
        const compareList = JSON.parse(localStorage.getItem("compareList")) || [];
        const favList = JSON.parse(localStorage.getItem("favList")) || [];
        const isAlreadyInCompare = compareList.some(item => item._id === property?.property?._id);
        const isAlreadyInFav = favList.some(item => item._id === property?.property?._id);
        setIsInCompare(isAlreadyInCompare);
        setIsInFav(isAlreadyInFav);
    }, [property]);

    const handleCompareClick = () => {
        let compareList = JSON.parse(localStorage.getItem("compareList")) || [];
    
        if (isInCompare) {
            // Remove the property from the compare list
            compareList = compareList.filter(item => item._id !== property?.property?._id);
        } else {
            // Check if the compare list already has 4 properties
            if (compareList.length >= 4) {
                alert("You can only compare up to 4 properties.");
                return;
            }
            // Add the property to the compare list
            compareList.push(property?.property);
        }
       console.log(compareList)
        // Update localStorage
        localStorage.setItem("compareList", JSON.stringify(compareList));
    
        // Dispatch a custom event to notify header
        window.dispatchEvent(new Event('compareListUpdated'));
    
        // Update the state
        setIsInCompare(!isInCompare);}
    
    const handleFavClick = () => {
        let favList = JSON.parse(localStorage.getItem("favList")) || [];
    
        if (isInFav) {
            // Remove the property from the favorite list
            favList = favList.filter(item => item._id !== property?.property?._id);
        } else {
            // Add the property to the favorite list
            favList.push(property?.property);
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
        {property &&
        <div className="flex gap-3 h-[210px] items-center rounded-2xl shadow-xl pr-2 hover:transform hover:translate-y-2 transition md:hover:shadow-2xl bg-white hover:border-[#046307] hover:border-2 hover:h-[212px] w-full">
            <div className="relative">
                <img src={property?.property?.galleryImages[0]} alt="" className="  h-[208px] lg:w-[170px] w-[140px] rounded-l-2xl relative object-cover object-center"/>

                {property?.property?.exclusive && (
                    <div className="bg-[#046307]  h-[30px] flex items-center justify-center rounded-r-[10px] absolute top-[10%] text-white font-normal uppercase px-3 text-[17px] Bebas-Neue pt-1"
                    style={{
                        letterSpacing:'1px',
                      }}>Exclusive</div>
                )}

                
        <div className="absolute bottom-[8%] right-[4%] flex gap-2">
         {/* Compare icon */}
         {isInCompare ? <div
           onClick={handleCompareClick}
           className={`text-[#046307] bg-white text-[12px] lg:text-[16px] indicator border-white border-[1px] rounded-full p-1 cursor-pointer`}
         >
          <FaMinus  className="font-[900] text-[15px]" />

        </div> : <div
           onClick={handleCompareClick}
           className={`text-[#046307] bg-white text-[12px] lg:text-[16px] indicator border-white border-[1px] rounded-full p-1 cursor-pointer`}
         >
          <FaPlus  className="font-[900] text-[15px]"/>
        </div>}

        {/* Fav icon */}
        {
            isInFav? <div
            onClick={handleFavClick}
            className={`text-[#046307] bg-white text-[12px] lg:text-[16px] indicator border-white border-[1px] rounded-full p-1 cursor-pointer`}
          >
            <FaHeart className="font-[900] text-[15px]" />
          </div> :
          <div
          onClick={handleFavClick}
          className={`text-[#046307] text-[12px] lg:text-[16px] indicator border-white border-[1px] bg-white  rounded-full p-1 cursor-pointer`}
        >
          <FaRegHeart className="font-[900] text-[15px]" />
        </div>
        }
       </div>
            </div>
            
        <div className="relative"> 
        <Link to={`/property/${property?.property?._id}`}>
                <h4 className="lg:text-[20px] text-[18px] font-medium text-black lg:mb-2 mb-1"
                style={{
                    lineHeight:'22px'
                }}
                >{property?.property?.name}</h4></Link>
                <h6 className="lg:text-[14px] text-[12px] font-normal text-black mt-[-4px]">by {curentDeveloper?.name}</h6>
                <p className="lg:text-[14px] text-[12px] flex items-center gap-2"><SlLocationPin/> {curentLocation?.name}</p>
                <h4 className="lg:text-[20px] text-[18px] font-medium text-black mt-[-4px]">₹   {property?.property?.priceRange}</h4>
                <p className="lg:text-[14px] text-[12px] flex items-center gap-2"><img src={property?.property?.type?.logo ||curentType?.logo} alt={property?.property?.type?.type ||curentType?.type} className="w-[16px] h-[16px]" /> <span>{property?.property?.type?.type ||curentType?.type}</span></p>
                <p className="lg:text-[14px] text-[12px] flex items-center gap-2"><img src={curentStatus?.image} alt={curentStatus?.status} className="w-[16px] h-[16px]" /> <span>{curentStatus?.status}</span></p>
                
            </div>
        </div>
       }
    </div>
    );
};

export default PropertyListCard;
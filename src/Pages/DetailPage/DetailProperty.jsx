import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Header from "../../Component/Navigation/Header";
import Footer from "../../Component/Navigation/Footer";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { endPoint } from "../../Component/ForAll/ForAll";
import FloatingIcons from '../../Component/ForAll/FloatingIcons';
import Modal from "../../Component/ForAll/Modal";
import {
  FaAngleLeft,
  FaAngleRight,
  FaHeart,
  FaIndianRupeeSign,
  FaRegHeart,
} from "react-icons/fa6";
import { IoBedOutline, IoResize, IoShareSocial } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import { BsThreeDots } from "react-icons/bs";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Sector } from "recharts";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { LiaPercentSolid } from "react-icons/lia";
import { IoMdTime } from "react-icons/io";
import { Helmet } from "react-helmet";
import ContactModel from "../../Component/ForAll/ContactModel";
import { ShareSocial } from "react-share-social";

// Custom active shape rendering for Pie chart
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const DetailProperty = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { name } = useParams();  // Get id and slug from URL parameters
  const [property, setProperty] = useState({});
  const [developer, setDeveloper] = useState({});
  const [location, setLocation] = useState({});
  const [status, setStatus] = useState({});
  const [type, setType] = useState({});
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isInFav, setIsInFav] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [amenities, setAmenities] = useState([]);
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(9);
  const [loanTenure, setLoanTenure] = useState(20); // in years
  const [tenureType, setTenureType] = useState("years"); // 'years' or 'months'
  const [footer, setFooter] = useState();
  const [modelOpen, setModelOpen] = useState(false);
  const [fullImageOpen, setFullImageOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

  const openPlanModal = () => setIsPlanModalOpen(true);
  const closePlanModal = () => setIsPlanModalOpen(false);
  
  const toggleModalOpen = () => {
    setModelOpen(!modelOpen);
  };

  const cleanUrl = (url) => {
  return url.replace(/-/g, ' '); // This removes all hyphens from the URL
};
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch main property
        
        const cleanedName = cleanUrl(name);
        const response = await fetch(`${endPoint}/property/name/${encodeURIComponent(cleanedName)}`);
        const propertyData = await response.json();
        setProperty(propertyData);

        // Fetch developer
        if (propertyData.developer) {
          const developerResponse = await fetch(`${endPoint}/developer`);
          const developerData = await developerResponse.json();
          const foundDeveloper = developerData.find((d) => d._id === propertyData.developer);
          setDeveloper(foundDeveloper);
        }

        // Fetch type
        if (propertyData.type) {
          const typeResponse = await fetch(`${endPoint}/type`);
          const typeData = await typeResponse.json();
          const foundType = typeData.find((d) => d._id === propertyData.type);
          setType(foundType);
        }

        // Fetch location
        if (propertyData.location) {
          const locationResponse = await fetch(`${endPoint}/city`);
            // console.log(locationResponse,3333);
          const locationData = await locationResponse.json();
          const foundLocation = locationData.find((d) => d._id === propertyData.location);
          setLocation(foundLocation);
        }

        // Fetch status
        if (propertyData.status) {
          const statusResponse = await fetch(`${endPoint}/status`);
          const statusData = await statusResponse.json();

          const foundStatus = await statusData.find((d) => d._id === propertyData.status);
          setStatus(foundStatus);
        }

        // Fetch amenities
        if (propertyData.amenities) {
          
          const amenityResponse = await fetch(`${endPoint}/amenity`);
          const amenityData = await amenityResponse.json();
          const matchedAmenities = propertyData.amenities.map((amenityId) =>
            amenityData.find((amenity) => amenity._id === amenityId)
          );
          setAmenities(matchedAmenities);
        }

        // Set default plan
        if (propertyData.plans?.length > 0 && !selectedPlan) {
          setSelectedPlan(propertyData.plans[0]);
        }

        // Check favorite
        const favList = JSON.parse(localStorage.getItem("favList")) || [];
        const isFavorite = favList.some((item) => item._id === propertyData._id);
        setIsInFav(isFavorite);

      } catch (error) {
        console.error("Error fetching property data:", error);
      }
    };

    const fetchFooter = async () => {
      try {
        const response = await fetch(`${endPoint}/footer`);
        const data = await response.json();
        setFooter(data);
      } catch (error) {
        console.error("Error fetching footer:", error);
      }
    };

    fetchData();
    fetchFooter();

  }, [name]); // ✅ Only depend on `name`, NOT `property`


  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.slideTo(activeIndex);
    }
    
  }, [activeIndex, swiperInstance]);
  useEffect(() => {
    if (property?.plans?.length > 0) {
      // Only set the selectedPlan when it's null (initial load)
      if (!selectedPlan) {
        setSelectedPlan(property.plans[0]);
      }
    }
  }, [property, selectedPlan]);
  

  const handlePrev = () => {
    if (swiperInstance) {
      const newIndex = activeIndex - 1;
      if (newIndex >= 0) {
        setActiveIndex(newIndex);
        swiperInstance.slideTo(newIndex);
      }
    }
  };

  const handleNext = () => {
    if (swiperInstance) {
      const newIndex = activeIndex + 1;
      if (newIndex < (property?.galleryImages?.length || 0)) {
        setActiveIndex(newIndex);
        swiperInstance.slideTo(newIndex);
      }
    }
  };

  const handleSlideClick = (index) => {
    if (swiperInstance) {
      swiperInstance.slideTo(index);
      setActiveIndex(index);
    }
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);
  useEffect(() => {
    const favList = JSON.parse(localStorage.getItem("favList")) || [];
    const isFavorite = favList.some((item) => item._id === property?._id);
    setIsInFav(isFavorite);
  }, [property._id]);

  const handleFavClick = () => {
    let favList = JSON.parse(localStorage.getItem("favList")) || [];
    if (isInFav) {
      // Remove the property from the favorite list
      favList = favList.filter((item) => item._id !== property?._id);
    } else {
      // Add the property to the favorite list
      favList.push(property);
    }

    // Update localStorage

    localStorage.setItem("favList", JSON.stringify(favList));

    // Dispatch a custom event to notify header
    window.dispatchEvent(new Event("favListUpdated"));

    // Update the state
    setIsInFav(!isInFav);
  };

  const [loading, setLoading] = useState(false);
  const [countryCodes, setCountryCodes] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91"); // Default to US code
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+91",
    flag: "https://flagcdn.com/in.svg", // Default to US flag
  });
  const [isCountryListVisible, setIsCountryListVisible] = useState(false); // Manage dropdown visibility
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
   // State to toggle the modal
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isMoreModalOpen, setIsMoreModalOpen] = useState(false);

   // Function to open and close the modal
   const toggleModal = () => {
     setIsModalOpen(!isModalOpen);
   };
   const toggleMoreModal = () => {
    setIsMoreModalOpen(!isMoreModalOpen);
  };
 

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=flags,idd,name")
      .then((response) => response.json())
      .then((data) => {
        const codes = data.map((country) => ({
          name: country.name.common,
          code: country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : ""),
          flag: country.flags.svg, // Add flag URL from API data
        })).filter(c => c.code); // Filter out countries without a code
        setCountryCodes(codes);
      })
      .catch((error) => console.error("Error fetching country codes:", error));
  }, []);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setSelectedCountryCode(country.code); // Update the country code
    setIsCountryListVisible(false); // Hide the list after selection
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query
  };

  const filteredCountries = countryCodes.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  ); // Filter countries based on search
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      option: "Buy",
      name: e.target.name.value,
      email: e.target.email.value,
      phone: `${selectedCountryCode} ${e.target.phone.value}`,
      project: property?.name,
      message: e.target.message.value,
    };

    fetch(`${endPoint}/inquire`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          toast.success("Successfully sent. We will contact you shortly.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error sending email to owner.");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // Handle click on a planType button
  const handlePlanClick = (plan) => {
    setSelectedPlan(plan);
  };

 // Helper function to calculate EMI
const calculateEMI = (amount, rate, tenure, tenureType) => {
  const monthlyRate = rate / 12 / 100;
  const months = tenureType === 'years' ? tenure * 12 : tenure;

  // Handle cases where the interest rate is 0
  if (monthlyRate === 0) {
    return amount / months; // EMI without interest
  }

  const emi =
    (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  return emi;
};

// Calculate EMI, Total Interest, and Total Payment
const emi = calculateEMI(loanAmount, interestRate, loanTenure, tenureType);
const totalMonths = tenureType === 'years' ? loanTenure * 12 : loanTenure;
const totalInterest = emi * totalMonths - loanAmount;
const totalPayment = loanAmount + totalInterest;

// Pie chart data
const chartData = [
  { name: 'Principal', value: loanAmount },
  { name: 'Interest', value: totalInterest },
];
  
// Get the current URL using useLocation
const locationUrl = useLocation(); // Correctly use useLocation
const currentUrl = `${window.location.origin}${locationUrl.pathname}`; // Use window.locations
const arrowClass = isCountryListVisible
  ? "after:content-['▲']"
  : "after:content-['▼']";
  
  return (
    <div className="overflow-hidden">
      <Header isDefault={false} />
      <FloatingIcons/>
      <Helmet>
                <meta charSet="utf-8" />
                <title>{`${property ? property.name : "Loading..."} - Trilokpropco`}</title>
                <meta name="description" content={ property ? property.metaDescription : 'Default Description'} />
        <meta name="og:title" content={ property ? property.metaTitle : 'Default Title'} />
        <meta name="og:description" content={ property ? property.metaDescription : 'Default Description'} />
        <meta name="og:image" content={ property ? property?.galleryImages?.[activeIndex] : 'default-image-url.jpg'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={ property ? property.metaTitle : 'Default Title'} />
        <meta name="twitter:description" content={ property ? property.metaDescription : 'Default Description'} />
        <meta name="twitter:image" content={ property ? property?.galleryImages?.[activeIndex] : 'default-image-url.jpg'} />
            </Helmet>
      <ToastContainer />
      {/* Custom Navigation Buttons and slider */}
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${property?.galleryImages?.[activeIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
        }} className="md:h-[550px] h-[250px]"
        onClick={() => setFullImageOpen(true)}
      >
        <div className="flex items-center justify-between pt-3 px-8">
          <div className="flex gap-2 text-[#ffffff77] text-4xl z-20">
            {/* Fav icon */}
            {isInFav ? (
              <div
                onClick={handleFavClick}
                className={`text-[#046307] text-4xl cursor-pointer z-20`}
              >
                <FaHeart className="" />
              </div>
            ) : (
              <div
                onClick={handleFavClick}
                className={` text-[#ffffff77] text-4xl cursor-pointer z-20`}
              >
                <FaRegHeart className="" />
              </div>
            )}
            <IoShareSocial onClick={toggleModalOpen} className="z-20"/>
             {/* Full image modal */}
             {activeIndex && 
        <Modal
        isOpen={fullImageOpen}
        onClose={() => setFullImageOpen(false)}
        images={property?.galleryImages}   
        initialIndex={activeIndex}        
      />}
            
            {/* Modal */}
      {modelOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl p-8 shadow-lg relative max-w-2xl w-full text-black">
            {/* Close button */}
            <button className="btn btn-circle mr-2" onClick={toggleModalOpen}>X</button>

            {/* Share icons from react-share-social */}
            <ShareSocial
              url={currentUrl}
              socialTypes={['facebook', 'twitter', 'linkedin', 'whatsapp']}  // Choose the platforms
              style={{ margin: '0 auto', width: '200px', height: '50px' }} // Optional styling
            />
          </div>
        </div>
      )}
          </div>
          <div>
            <img
              src={developer.image}
              alt={developer.name}
              className="md:w-[70px] w-[50px] h-[50px] md:h-[70px] object-cover rounded-full opacity-70 z-20"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
            {isHovering && (
              <div
                style={{
                  background: "rgba( 255, 255, 255, 0.25 )",
                  boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                  backdropFilter: "blur( 6px )",
                  borderRadius: "10px",
                  WebkitBackdropFilter: "blur( 6px )",
                  border: "1px solid rgba( 255, 255, 255, 0.18 )",
                }}
                className="md:w-[500px] mt-2 md:p-4 bg-white text-white shadow-lg rounded-md z-10 p-2 absolute right-10 flex items-center gap-3 ml-3"
              >
                <img
                  src={developer.image}
                  alt={developer.name}
                  className="w-[150px] h-[100px] object-cover"
                />
                <div>
                  <h5 className="font-semibold text-lg">{developer.name}</h5>
                  <p className="md:text-[16] text-[12px]">
                    {developer.details}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={handlePrev}
          className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-[#ffffff69] text-gray-800 p-3 rounded-full z-10"
          aria-label="Previous slide"
        >
          <FaAngleLeft size={20} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-[#ffffff69] text-gray-800 p-3 rounded-full z-10"
          aria-label="Next slide"
        >
          <FaAngleRight size={20} />
        </button>

        <div className="md:flex items-center justify-between mx-10">
          <div className="flex md:gap-5 gap-2 items-center  absolute md:bottom-14 bottom-6">
            <img
              src={type?.logo}
              alt={type?.type}
              className="md:w-[50px] md:h-[50px] w-[30px] h-[30px] bg-[#fff] p-2"
            />
            <h5 className="md:text-2xl text-[16px] font-semibold text-white">{type?.type}</h5>
          </div>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={12}
            breakpoints={{
              // Small devices
              0: {
                slidesPerView: 3.5,
              },
              // Medium devices
              640: {
                slidesPerView: 4,
              },
              768: {
                slidesPerView: 4.5,
              },
              900: {
                slidesPerView: 6,
              },
              // Large devices
              1000: {
                slidesPerView: 3.2,
              },
              1300: {
                slidesPerView: 3.2,
              },
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex);
            }}
            onSwiper={setSwiperInstance}
            className="swiper-container !mr-0  !absolute lg:!bottom-14 md:!bottom-32 !bottom-[-90px] md:!right-[-280px]"
          >
            {property?.galleryImages?.map((image, index) => (
              <SwiperSlide
                key={index}
                onClick={() => handleSlideClick(index)}
                className={`md:!w-[160px] !w-[100px] !h-[80px] md:!h-[100px] flex items-center justify-center gap-5 cursor-pointer ${
                  index === activeIndex
                    ? "border-[3px] border-[#046307] rounded-[10px] !h-[103px]"
                    : "rounded-[10px]"
                }`}
              >
                <img
                  src={image}
                  alt={property?.name}
                  className="w-full h-full object-cover rounded-[10px]"
                  style={{
                    opacity: index === activeIndex ? 1 : 0.9,
                    transition: "opacity 0.5s ease",
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="lg:flex gap-5 md:mt-10 mt-28 md:ml-10 md:mr-6">
        {/* Full left side details  */}
        <div className="lg:w-[65%] md:mx-0 mx-6 ">
          <h2 className="md:text-4xl text-2xl text-black font-semibold detailedProperty">
            {property?.name}
          </h2>
          <p className="text-[14px] text-black mb-2 detailedProperty">{location?.name}</p>
          <hr />
          <div className="md:flex gap-3 my-2">
            <div className="text-xl text-black flex gap-4 items-center detailedProperty md:mb-0 mb-2">
              <IoBedOutline className="text-2xl" />
              <p>{property?.configuration}</p>
            </div>

            <div className="text-xl text-black flex gap-4 items-center detailedProperty md:mb-0 mb-2">
              <IoResize className="text-2xl border-2 border-black rounded-[4px] header-text font-semibold" />
              <p>{property?.size}</p>
            </div>

            <div className="text-xl text-black flex gap-4 items-center detailedProperty md:mb-0 mb-2">
              <img
                src={status?.image}
                className="text-2xl font-semibold config-text"
                alt={status?.status}
              />
              <p>{status?.status}</p>
            </div>
          </div>
          <hr />
          {/* price, title and contact btn */}
          <div className="md:flex items-center justify-between gap-3 my-8 ">
            <div className="flex items-center gap-3 my-8">
            <button
        className="bg-black background-white-text-black text-white px-20 py-3 rounded-xl"
        onClick={toggleModal}
      >
        Contact
      </button>
      {isModalOpen && <ContactModel toggleModal={toggleModal} 
      property={property}/>}
              <button className="bg-[#dbdbdb] text-black px-3 py-3 rounded-xl" onClick={toggleMoreModal}>
                <span className="bg-white border-[1px] border-black text-[12px] p-1 rounded-md flex items-center justify-center">
                  <BsThreeDots />
                </span>
              </button>
              {isMoreModalOpen && 
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white rounded-xl p-8 shadow-lg relative max-w-md w-full text-black">
                <p className="font-semibold text-xl">More Ways To Contact.</p>
                <button
          className="absolute top-9 right-6 text-gray-800 font-bold hover:text-black"
          onClick={toggleMoreModal} // Make sure toggleModal is called correctly
        >
          ✕
        </button>
              <div className="p-10">
              <div className="md:ml-2 mt-3">
                <p className="text-[18px] text-black font-semibold">E-mail:</p>
                <a href={`mailto:${footer? footer[0]?.email :""}`}>
                  <p className="text-[#000] hover:bg-gray-200 p-2 rounded-lg">{footer? footer[0]?.email :""}</p>
                </a>
              </div>
              <div className="md:ml-2 mt-3">
                <p className="text-[18px] text-black font-semibold">Address:</p>
                  <p className="text-[#000]  hover:bg-gray-200 p-2 rounded-lg">{footer? footer[0]?.location :""}
                  </p>
              </div>
              <div className="md:ml-2 mt-3">
                <p className="text-[18px] text-black font-semibold">Phone:</p>
                <a href={`tel:${footer? footer[0]?.contact :""}`}>
                  <p className="text-[#000]  hover:bg-gray-200 p-2 rounded-lg">{footer? footer[0]?.contact :""}</p>
                </a>
              </div>
              </div>
            </div>
              </div>
              }
            </div>
            <h3 className="md:text-2xl text-[18px] flex gap-1 text-black items-center detailedProperty">
              PRICE RANGE:{" "}
              <span className="flex gap-1 font-bold items-center">
                <FaIndianRupeeSign />
                {property?.priceRange}
              </span>
            </h3>
          </div>
          {/* project overview section */}
          <div>
            <h2 className="md:text-3xl text-xl font-semibold text-black poppins detailedProperty">
              Project Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-6">
              <div className="text-center py-6 border rounded-2xl detailedProperty text-black">
                <h3 className="md:text-2xl text-[18px]  font-medium uppercase">
                  POSSESSION DATE
                </h3>
                <p className="uppercase md:text-[18px] text-[15px] font-light">
                  {property?.projectOverview?.possessionStart}
                </p>
              </div>

              <div className="text-center py-6 border rounded-2xl detailedProperty text-black">
                <h3 className="md:text-2xl text-[18px] font-medium uppercase">
                  LAND AREA
                </h3>
                <p className="uppercase md:text-[18px] text-[15px] font-light">
                  {property?.projectOverview?.landArea}
                </p>
              </div>

              <div className="text-center py-6 border rounded-2xl detailedProperty text-black">
                <h3 className="md:text-2xl text-[18px] detailedProperty text-black font-medium uppercase">
                  CONFIGURATION
                </h3>
                <p className="uppercase md:text-[18px] text-[15px] detailedProperty text-black font-light">
                  {property?.projectOverview?.configuration}
                </p>
              </div>

              <div className="text-center py-6 border rounded-2xl">
                <h3 className="md:text-2xl text-[18px] detailedProperty text-black font-medium uppercase">
                  FLAT AREA
                </h3>
                <p className="uppercase md:text-[18px] text-[15px] detailedProperty text-black font-light">
                  {property?.projectOverview?.flatArea}
                </p>
              </div>

              <div className="text-center py-6 border rounded-2xl">
                <h3 className="md:text-2xl text-[18px] detailedProperty text-black font-medium uppercase">
                  PRICE RANGE
                </h3>
                <p className="uppercase md:text-[18px] text-[15px] detailedProperty text-black font-light">
                  {property?.projectOverview?.priceRange}
                </p>
              </div>

              <div className="text-center py-6 border rounded-2xl">
                <h3 className="md:text-2xl text-[18px] detailedProperty text-black font-medium uppercase">
                  NO. OF BLOCKS
                </h3>
                <p className="uppercase md:text-[18px] text-[15px] detailedProperty text-black font-light">
                  {property?.projectOverview?.numberOfBlocks}
                </p>
              </div>

              <div className="text-center py-6 border rounded-2xl">
                <h3 className="md:text-2xl text-[18px] detailedProperty text-black font-medium uppercase">
                  ELEVATION
                </h3>
                <p className="uppercase md:text-[18px] text-[15px] detailedProperty text-black font-light">
                  {property?.projectOverview?.elevation}
                </p>
              </div>

              <div className="text-center py-6 border rounded-2xl">
                <h3 className="md:text-2xl text-[18px] detailedProperty text-black font-medium uppercase">
                  NO. OF UNITS
                </h3>
                <p className="uppercase md:text-[18px] text-[15px] detailedProperty text-black font-light">
                  {property?.projectOverview?.numberOfUnits}
                </p>
              </div>

             <div className="text-center py-6 border rounded-2xl">
                <h3 className="md:text-2xl text-[18px] detailedProperty text-black font-medium uppercase">
                  RERA Reg No.
                </h3>
                <p className="uppercase md:text-[18px] text-[15px] detailedProperty text-black font-light">
                  {property?.projectOverview?.RegistrationNo}
                </p>
              </div>
            </div>
          </div>

          {/* description section*/}
          <div>
            <h2 className="md:text-3xl text-xl font-semibold detailedProperty detailedProperty text-black poppins mt-10 mb-6">
              Description
            </h2>
            <p
              className="text-[16px] md:text-[18px] detailedProperty detailedProperty text-black font-normal"
              dangerouslySetInnerHTML={{ __html: property?.description }}
            />
          </div>

          {/* project video */}
          <div>
            <h2 className="md:text-3xl text-xl font-semibold detailedProperty text-black poppins mt-10 mb-6">
              Video
            </h2>
            <iframe
              width="100%"
              src={property?.video}
              title={property?.title}
              className="rounded-2xl md:h-[450px] h-[250px]"
              allowfullscreen
            ></iframe>
          </div>
          
          {/* Price Table */}
          <div>
          <h2 className="md:text-3xl text-xl font-semibold detailedProperty text-black poppins mt-10 mb-6">
              Price
            </h2>
            <table className="table text-center">
              <tr className="bg-[#046307] text-white text-xl font-medium border-0">
                <th className="border-[1px] border-[#ffffff35]">CONFIG.</th>
                <th className="border-[1px] border-[#ffffff35]">SIZE</th>
                <th className="border-[1px] border-[#ffffff35]">PRICE</th>
              </tr>
                {property?.priceDetails?.map(
                  (pd) => (
                    <tr key={pd._id} className="detailedProperty text-black font-normal text-[16px] border-[1px] border-[#00000035]">
                      <td className="border-[1px] border-[#00000035]">{pd?.configuration}</td>
                      <td className="border-[1px] border-[#00000035]">{pd?.size}</td>
                      <td className="border-[1px] border-[#00000035]">{pd?.price}</td>
                    </tr>
                  )
                )}
            </table>
          </div>

          {/* Plans section */}
          <div>
          <h2 className="md:text-3xl text-xl font-semibold detailedProperty text-black poppins mt-10 mb-6">
          Plans
            </h2>
            <div>
        {property?.plans?.map((plan) => (
          <button 
            key={plan._id} 
            onClick={() => handlePlanClick(plan)}
            style={{
              margin: '10px',
              backgroundColor: selectedPlan?._id === plan._id ? '#000' : '#046307',
              color: selectedPlan?._id === plan._id ? '#fff' : '#fff'
            }}
            className="btn btn-sm"
          >
            {plan?.planType}
          </button>
        ))}
      </div>

      {/* Display selected plan details */}
      {selectedPlan && (
        <div className="my-5 mx-5 border rounded-2xl">
          {selectedPlan?.image && <img src={selectedPlan?.image} alt={selectedPlan?.planType} className="!w-full  rounded-t-2xl" onClick={openPlanModal} />}
        <div className="bg-[#0000000e] rounded-b-2xl p-4 flex justify-between items-center md:text-2xl text-[14px]"> 
         {selectedPlan?.price && <p><strong>Price:</strong> {selectedPlan?.price || 'N/A'}</p>}
         {selectedPlan?.size &&<p><strong>Size:</strong> {selectedPlan?.size || 'N/A'}</p>}
         </div>
        </div>
      )}
{/* Modal */}
      {isPlanModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg overflow-hidden relative" style={{
          maxWidth: "90vw",
          maxHeight: "90vh",
        }}>
            <button className="absolute top-3 right-3 text-black rounded-full px-[11px] py-2 bg-[#ffffff69] text-gray-800" onClick={closePlanModal}>
              X
            </button>
            <img src={selectedPlan?.image} alt={selectedPlan?.planType} className="max-w-5xl w-full h-full" />
          </div>
        </div>
      )}

          </div>

          {/* Amenities section*/}
          <div>
          <h2 className="md:text-3xl text-xl font-semibold detailedProperty text-black poppins mt-10 mb-6">
          Amenities
            </h2>
          <div className="grid md:grid-cols-3 grid-cols-2 lg:grid-cols-4 gap-3 justify-center">
            {
              amenities?.map((amenity) =>
              (
                <div className="border text-center md:w-[200px] md:h-[200px] md:p-0 p-2 flex items-center justify-center flex-col relative overflow-hidden rounded-3xl gap-4" key={amenity._id}>
        <img src={amenity?.logo} alt={amenity?.name} />
        <img src={amenity?.logo} alt={amenity?.name}  className="absolute right-0 bottom-0 rotate-[-50deg] opacity-10"/>
        <p className="detailedProperty text-black text-[14px]">{amenity?.name}</p>
    </div>   )
              )
            }
          </div>

          <a href={property?.pdfDownload} target="_blank"><button className="bg-[#ec0000] text-white flex items-center md:px-6 md:py-4 relative md:gap-10 my-10 rounded-2xl px-6 py-4">
          <img src="https://i.ibb.co.com/w7HGyvB/Adobe-PDF.webp" alt="Download Brochure | Trilokpropco Real Estate Agent" className="md:w-[150px] w-[120px] absolute left-[-26px]"/><span className="md:ml-16 ml-12 md:text-2xl text-xl font-light ">Download Brochure</span></button></a>
          </div>

          {/* Nearby description section*/}
          <div>
            <h2 className="md:text-3xl text-xl font-semibold detailedProperty text-black poppins mt-10 mb-6">
            What s Nearby
            </h2>
            <p
              className="md:text-[18px] text-[16px] detailedProperty text-black font-normal"
              dangerouslySetInnerHTML={{ __html: property?.nearbyFacilities
              }}
            />
          </div>

          {/* Location Map section */}
          <div>
          <h2 className="md:text-3xl text-xl font-semibold detailedProperty text-black poppins mt-10 mb-6">
          Location Map
            </h2>
            <iframe
  src={property?.locationMap}
  title="Location Map"
  className="w-full md:h-[500px] h-[250px] rounded-3xl"
  frameBorder="0"
  allowFullScreen
/>

          </div>

          {/* specifications description section*/}
          <div>
            <h2 className="md:text-3xl text-xl font-semibold detailedProperty text-black poppins mt-10 mb-6">
            Specifications
            </h2>
            <p
              className="md:text-[18px] text-[16px] detailedProperty text-black font-normal"
              dangerouslySetInnerHTML={{ __html: property?.specifications
              }}
            />
          </div>

          {/* Bank Approve Images */}
          <div>
          <h2 className="md:text-3xl text-xl font-semibold detailedProperty text-black poppins mt-10 mb-6">
          Bank Approval
            </h2>
            <div className="grid lg:grid-cols-4 grid-cols-2 md:grid-cols-3 gap-3">
              {
                property?.bankImages?.map((bImg,index) =><img key={index} src={bImg} className="border w-full h-[80px] rounded-xl"
                style={{
                  objectFit:'cover'
                }}/>)
              }
            </div>
          </div>

        </div>

        {/* Form right side  */}
        <div className="lg:w-[35%] my-10 relative mx-5 lg:mx-0">
          <form
            onSubmit={handleSubmit}
            className="shadow-xl p-10 rounded-[30px] w-full  bg-black "
          >
            <div className="label text-white">
              <img
                src="https://i.ibb.co/f1L99L9/18a006575c097b8b99494b75da063caf-removebg-preview-2.webp"
                alt="Trilokpropco"
                className="w-1/4"
              />
            </div>

            <div>
              <div className="label mt-4">
                <span className="label-text text-white ">Your name</span>
              </div>
              <input
                type="text"
                required
                name="name"
                placeholder="Type name here"
                className="border-b-[2px]  p-3 focus:border-[#046307] border-[#b4b4b468] w-full focus:text-white bg-black"
              />
            </div>

            <div>
              <div className="label mt-4">
                <span className="label-text text-white ">Your email</span>
              </div>
              <input
                type="email"
                required
                name="email"
                placeholder="Type email here"
                className="border-b-[2px]  p-3 focus:border-[#046307] border-[#b4b4b468] w-full focus:text-white  bg-black"
              />
            </div>

            {/* Country and Phone field */}
          <div className="label mt-4">
            <span className="label-text border-b-[1px] w-full border-[#ffffff68] text-white">
              Your phone
            </span>
          </div>
          <div className="flex w-full text-white bg-black">
            {/* Custom Country Code Dropdown */}
            <div className="relative md:w-1/4 !w-full">
              <button
                type="button"
                onClick={() => setIsCountryListVisible(!isCountryListVisible)} // Toggle list visibility
                className={`flex items-center border-b-[3px] border-[#ffffff68] w-full focus:border-[#046307] p-3  justify-between ${arrowClass}`}
              >
                <img src={selectedCountry.flag} alt="flag" className="w-6 h-6 mr-2" />
                {selectedCountry.code}
              </button>
              
              {isCountryListVisible && ( // Show country list only when visible
                <div className="absolute top-full left-0 md:w-full w-[200px] max-h-60 overflow-y-auto z-10">
                  {/* Search Input */}
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search country"
                    className="w-full p-2 bg-gray-800 focus:outline-none text-white"
                  />

                  {filteredCountries.map((country, index) => (
                    <div
                      key={index}
                      onClick={() => handleCountrySelect(country)}
                      className="flex items-center p-2 hover:bg-[#046307] cursor-pointer text-white bg-black"
                    >
                      <img src={country.flag} alt={country.name} className="w-6 h-6 mr-2" />
                      <span>{country.name} ({country.code})</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Phone input */}
            <input
              type="text"
              name="phone"
              placeholder="Your phone number"
              className="border-b-[3px] p-3 focus:border-[#046307] border-[#ffffff68] w-3/4 text-white bg-black"
            />
          </div>

            <div>
              <div className="label mt-4">
                <span className="label-text text-white ">Your message</span>
              </div>
              <textarea
                className="border-[2px]  p-3 focus:border-[#046307] border-[#b4b4b468] text-area w-full mt-4 rounded-xl focus:text-white bg-black"
                placeholder="What is in your mind?"
                rows={3}
                name="message"
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn bg-[#046307] border-0 text-white w-full rounded-full mt-6"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send message"}
            </button>
          </form>
        </div>
      </div>

      {/* Loan Calculator Section */}
       <div className="loan-calculator grid lg:w-full md:w-1/2 md:mx-auto lg:grid-cols-3 grid-cols-1 items-center justify-center my-20 lg:mx-5">
    <div className="left-section bg-[#dadada91] rounded-3xl pb-4">
      <h2 className="bg-black text-white text-4xl text-medium text-center p-2 rounded-t-3xl">EMI Calculator</h2>
      <div className="p-3 px-12 pt-12 mb-4">
        <label>Loan Amount</label>
        <div className="relative flex items-center justify-center">
          <MdOutlineCurrencyRupee className="p-[6px] text-5xl rounded-l-lg bg-[#bdbdbd]" />
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="input !rounded-l-none w-full text-black bg-white"
          />
        </div>
      </div>

      <div className="p-3 px-12">
        <label>Interest Rate</label>
        <div className="relative flex items-center justify-center">
          <LiaPercentSolid className="p-[6px] text-5xl rounded-l-lg bg-[#bdbdbd]" />
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="input !rounded-l-none w-full text-black bg-white"
          />
        </div>
      </div>

      <div className="p-3 px-12">
        <label>Loan Tenure</label>
        <div className="relative flex items-center justify-center">
          <IoMdTime className="p-[6px] text-5xl rounded-l-lg bg-[#bdbdbd]" />
          <input
            type="number"
            value={loanTenure}
            onChange={(e) => setLoanTenure(Number(e.target.value))}
            className="input !rounded-l-none w-full text-black bg-white"
          />
          <select
            value={tenureType}
            onChange={(e) => setTenureType(e.target.value)}
            className="select md:ml-2 bg-[#046307] text-white md:text-xl text-[12px] text-black"
          >
            <option value="years">Years</option>
            <option value="months">Months</option>
          </select>
        </div>
      </div>
    </div>

    <div className="middle-section text-center border-r-[1px] mt-10">
      <div className="p-6 border-t-[1px]">
        <p className="text-xl text-[#818181]">Loan EMI</p>
        <h3 className="text-5xl detailedProperty text-black flex font-bold justify-center">
          <MdOutlineCurrencyRupee />
          {emi.toFixed(2)}
        </h3>
      </div>
      <div className="p-6 border-t-[1px]">
        <p className="text-xl text-[#818181]">Total Interest Payable</p>
        <h3 className="text-5xl detailedProperty text-black flex font-bold justify-center">
          <MdOutlineCurrencyRupee />
          {totalInterest.toFixed(2)}
        </h3>
      </div>
      <div className="p-6 border-t-[1px]">
        <p className="text-xl text-[#818181]">Total of Payments (Principal + Interest)</p>
        <h3 className="text-5xl detailedProperty text-black flex font-bold justify-center">
          <MdOutlineCurrencyRupee />
          {totalPayment.toFixed(2)}
        </h3>
      </div>
    </div>

    <div className="right-section lg:ml-8">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={(e, index) => setActiveIndex(index)}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#36A2EB' : '#FF6384'} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>

      <Footer />
     </div>
  );
};

export default DetailProperty;

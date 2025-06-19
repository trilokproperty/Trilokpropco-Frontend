import { useEffect, useState } from "react";
import { endPoint } from "./ForAll";
import { toast, ToastContainer } from "react-toastify";
import './Modal.css'
const ContactModel = ({ toggleModal, property }) => {
  const [loading, setLoading] = useState(false);
  const [countryCodes, setCountryCodes] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91"); // Default to India code
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+91",
    flag: "https://flagcdn.com/in.svg", // Default to India flag
  });
  const [isCountryListVisible, setIsCountryListVisible] = useState(false); // Manage dropdown visibility
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=flags,idd,name")
      .then((response) => response.json())
      .then((data) => {
        const codes = data
          .map((country) => ({
            name: country.name.common,
            code:
              country.idd.root +
              (country.idd.suffixes ? country.idd.suffixes[0] : ""),
            flag: country.flags.svg, // Add flag URL from API data
          }))
          .filter((c) => c.code); // Filter out countries without a code
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

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" id="contactPropertyForm">
      <div className="bg-white rounded-xl p-8 shadow-lg relative max-w-md w-full text-black">
        <ToastContainer />
        {/* Close Button */}
        <button
          className="absolute top-10 right-6 text-gray-800 font-bold hover:text-black"
          onClick={toggleModal} // Make sure toggleModal is called correctly
        >
          ✕
        </button>
        <p className="mb-4">Fill out the form below to reach out.</p>

        {/* Example form */}
        <form
          onSubmit={handleSubmit}
          className="shadow-xl p-2 rounded-[30px] w-full  bg-white "
        >
          <div className="label text-black">
            <img
              src="https://i.ibb.co/f1L99L9/18a006575c097b8b99494b75da063caf-removebg-preview-2.webp"
              alt="Trilokpropco"
              className="w-1/4"
            />
          </div>

          <div className="flex gap-3">
            <div className="w-full">
              <div className="label mt-3">
                <span className="label-text text-black ">Your Name</span>
              </div>
              <input
                type="text"
                required
                name="name"
                placeholder="Type name here"
                className="border-b-[2px]  p-3 focus:border-[#046307] border-[#b4b4b468] w-full focus:text-black"
              />
            </div>
          </div>
          
          <div className="flex gap-3">

            <div className="w-full">
              <div className="label mt-3">
                <span className="label-text text-black ">Your Email </span>
              </div>
              <input
                type="email"
                required
                name="email"
                placeholder="Type email here"
                className="border-b-[2px]  p-3 focus:border-[#046307] border-[#b4b4b468] w-full focus:text-black"
              />
            </div>
          </div>

          <div>
            <div className="label mt-3">
              <span className="label-text text-black ">Your Phone</span>
            </div>
            <div className="flex w-full">
              {/* Custom Country Code Dropdown */}
              <div className="relative w-1/4 phoneArea">
                <button
                  type="button"
                  id="countryDropdown"
                  onClick={() =>
                    setIsCountryListVisible(!isCountryListVisible)
                  } // Toggle list visibility
                  className="flex items-center bg-white border-b-[3px] border-[#ffffff68] w-full focus:border-[#046307] p-3 text-black"
                >
                  <img
                    src={selectedCountry.flag}
                    alt="flag"
                    className="w-6 h-6 mr-2"
                  />
                  {selectedCountry.code}

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`w-8 h-8 transition-transform ${
                      isCountryListVisible ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 15.75a.75.75 0 0 1-.53-.22l-5.5-5.5a.75.75 0 1 1 1.06-1.06L12 13.94l4.97-4.97a.75.75 0 0 1 1.06 1.06l-5.5 5.5a.75.75 0 0 1-.53.22Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {isCountryListVisible && (
                  <div className="absolute top-full left-0 text-black bg-white w-full max-h-60 overflow-y-auto z-10" 
                  id="countryDropdownSelect">
                    {/* Search Input */}
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      placeholder="Search country"
                      className="w-full p-2 text-black focus:outline-none"
                    />

                    {filteredCountries.map((country, index) => (
                      <div
                        key={index}
                        onClick={() => handleCountrySelect(country)}
                        className="flex items-center p-2 hover:bg-[#046307] bg-white cursor-pointer text-black"
                      >
                        <img
                          src={country.flag}
                          alt={country.name}
                          className="w-6 h-6 mr-2"
                        />
                        <span>
                          {country.name} ({country.code})
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Phone input */}
              <input
                type="text"
                name="phone"
                placeholder="Enter phone no."
                className="border-b-[3px] p-3 focus:border-[#046307] border-[#ffffff68] w-3/4 focus:text-black"
              />
            </div>
          </div>
          <div>
            <div className="label mt-3">
              <span className="label-text text-black ">Message</span>
            </div>
            <textarea
              className="border-[2px]  p-3 focus:border-[#046307] border-[#b4b4b468] text-area w-full mt-3 rounded-xl focus:text-black"
              placeholder="What is in your mind?"
              rows={2}
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
  );
};

export default ContactModel;

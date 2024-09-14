import React from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

const CompareDrawer = ({ isVisible, onClose }) => {
  const compareList = JSON.parse(localStorage.getItem("compareList")) || [];

  if (!isVisible) return null;

  console.log(compareList)

  return (
    <div className="fixed top-0 right-0 z-50 w-[50%] md:w-1/3 h-full bg-white shadow-lg flex flex-col overflow-y-auto text-center">
    <h3 className="text-lg font-semibold">Compare Properties</h3>
    <button onClick={onClose} className="text-4xl text-center flex justify-center">
      <IoClose />
    </button>
      <div className="p-4justify-between items-center border-b">
      </div>
      <div className="p-4">
        {compareList.length < 0 ? (
          <p>No properties to compare.</p>
        ) : (
         <div className="gap-2  grid lg:grid-cols-2 grid-cols-1 ">
            { compareList?.map((property, index) => (
            <div key={index} className="mb-4">
              <img
                src={property?.galleryImages[0] }
                alt={property?.name}
                className="w-full h-40 object-cover rounded-lg"
              />
              <div className="mt-2 flex justify-between items-center">
                <h4 className="text-md font-semibold">{property?.name}</h4>
                {/* Add more property details as needed */}
              </div>
            </div>
          ))}
         </div>
        )}
        {compareList.length > 1 && (
          <Link to='/compare'>
            <button className="w-full mt-4 bg-[#046307] text-white py-2 rounded-lg">
            Compare
          </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CompareDrawer;

import { IoMdQuote } from "react-icons/io";
import StarRatings from "react-star-ratings";

const TestimonialCard = (testimonial) => {
    // console.log(testimonial?.testimonial,1454)
    const truncateText = (str, numWords) => {
        const words = str.split(" ");
        if (words.length > numWords) {
          return words.slice(0, numWords).join(" ") + "...";
        }
        return str;
      };
    return (
    <div className="md:w-full md:mx-0 testimonial-card">
         <div><img src={testimonial?.testimonial?.image} alt={testimonial?.testimonial?.name} className="md:w-20 md:h-20 w-16 h-16 mb-[-50px] ml-8 shadow-md rounded-full"/></div>  
        <div className="border-[#c6c6c67d] border-[1px] p-3 pb-8 shadow-md rounded-lg">
            <h1 className="text-5xl text-[#1829412d] text-end flex justify-end w-full"><IoMdQuote/>
            </h1>
            <p className="testimonial-text text-[#301212] mb-6 text-[14px]">{truncateText((testimonial?.testimonial?.details), 19)} <span>more..</span></p>
            
            <hr />
            <div className="mt-4">
                <div>
                <h5 className="font-semibold">{testimonial?.testimonial?.name}</h5>
                <p className="text-[#929292]">{testimonial?.testimonial?.des}</p>
                </div>
                <StarRatings
                        rating={testimonial?.testimonial?.rating}
                        starRatedColor="gold"
                        numberOfStars={testimonial?.testimonial?.rating || 5}
                        starDimension="20px"
                        starSpacing="2px"
                        name='rating'
                    />
            </div>
        </div> 
    </div>
    );
};

export default TestimonialCard;
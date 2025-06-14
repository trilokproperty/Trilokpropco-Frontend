import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const BlogCard = (blog) => {
  // console.log(blog?.blog);
  const date = new Date(blog?.blog?.date);
const locationNameSlug = blog?.blog?.title?.replace(/\s+/g, '_');
  // Convert the date to the desired format
  const day = date.getUTCDate();
  const month = date.toLocaleString("default", { month: "short" });

  const stripHtmlTags = (str) => {
    if (str === null || str === "") return "";
    return str.replace(/<[^>]*>/g, "");
  };

  const truncateText = (str, numWords) => {
    const words = str.split(" ");
    if (words.length > numWords) {
      return words.slice(0, numWords).join(" ") + "...";
    }
    return str;
  };

  return (
    <div className="w-full">
      <div className="w-full relative mb-10">
        <img
          src={blog?.blog?.image}
          alt={blog?.blog?.title}
          className="md:w-[340px] h-[240px] w-full rounded-[30px] shadow-xl"
        />
        <p
          className="bg-white px-3 top-0 left-8
         absolute p-1 flex justify-center items-center flex-col gap-0 rounded-b-lg text-black"
        >
          <span className="mb-[-10px] font-bold">{day}</span>
          <span className="font-2xl">{month.toString()}</span>
        </p>
      </div>
      <div className="md:w-[340px]">
        <div>
        <h3 className="md:text-2xl text-[20px] font-medium blog-title text-black mb-2">{blog?.blog?.title}</h3>
            <p>{truncateText(stripHtmlTags(blog?.blog?.description), 10)}</p>
      </div>
      <Link to={`/blog/${encodeURIComponent(locationNameSlug)}`} > <div className="dark-mode-btn text-2xl w-[100px] bg-black text-white flex justify-center items-center rounded-full mt-8 ml-auto">
      <small className="text-[12px]">Explore</small><FiArrowRight />
      </div></Link>
      </div>
    </div>
  );
};

export default BlogCard;

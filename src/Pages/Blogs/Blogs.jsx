import { Helmet } from "react-helmet";
import Header from "../../Component/Navigation/Header";
import SectionTitle from "../../Component/ForAll/SectionTitle";
import Footer from "../../Component/Navigation/Footer";
import { useState, useEffect } from "react";
import { endPoint } from "../../Component/ForAll/ForAll";
import BlogCard from "../../Component/BlogCard/BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState(null);
  const [blogcategories, setBlogcategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null); // Track the selected category

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${endPoint}/blog`);
        const data = await response.json();
        setBlogs((data).sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();

    const fetchBlogCategories = async () => {
      try {
        const response = await fetch(`${endPoint}/blogCategory`);
        const data = await response.json();
        setBlogcategories(data);
      } catch (error) {
        console.error('Error fetching blog categories:', error);
      }
    };

    fetchBlogCategories();
  }, []);

  const handleCategory = (id) => {
    setSelectedCategory(id); // Set the selected category when clicking a category button
  };

  // Filter the blogs based on the selected category
  const filteredBlogs = selectedCategory
    ? blogs?.filter(blog => blog.category === selectedCategory)
    : blogs; // If no category is selected, show all blogs

  return (
    <div>
      <div
        className="pt-5 lg:h-96 h-40 md:h-56"
        style={{
          backgroundImage: `url(https://i.ibb.co/NT6PZjt/16406692-rm378-02c.webp)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Header />
        <Helmet>
          <meta charSet="utf-8" />
          <title>Explore Blogs - Trilokpropco</title>
        </Helmet>
        <SectionTitle value="Explore Blogs" color="white" />
      </div>

      {/* Blog categories with "All" button */}
      <div className="flex flex-wrap gap-3 justify-center mt-20 mx-5 lg:mx-0">
        {/* "All" Button */}
        <div
          style={{
            margin: '10px',
            backgroundColor: selectedCategory === null ? '#046307' : '#ccc',
            color: '#fff',
          }}
          onClick={() => setSelectedCategory(null)} // Show all blogs when clicked
          className="btn btn-sm"
        >
          All
        </div>

        {blogcategories?.map((category) => (
          <div
            key={category._id}
            style={{
              margin: '10px',
              backgroundColor: selectedCategory === category._id ? '#046307' : '#ccc',
              color: '#fff',
            }}
            onClick={() => handleCategory(category._id)}
            className="btn btn-sm"
          >
            {category.category}
          </div>
        ))}
      </div>

      {/* Filtered Blogs */}
      <div className="my-10 md:my-20 grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 lg:gap-10 gap-5 items-center justify-center mx-auto w-[90%]">
        {filteredBlogs?.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Blogs;

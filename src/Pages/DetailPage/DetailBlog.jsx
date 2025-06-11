import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To get the blog ID from URL
import { Helmet } from "react-helmet";
import Footer from "../../Component/Navigation/Footer";
import Header from "../../Component/Navigation/Header";
import { endPoint } from "../../Component/ForAll/ForAll";
import FloatingIcons from '../../Component/ForAll/FloatingIcons';

const DetailBlog = () => {
    const { title } = useParams(); // Get blog ID from URL params
    const [blog, setBlog] = useState(null); // State to store blog details
const cleanUrl = (url) => {
  return url.replace(/_/g, ' '); // This removes all hyphens from the URL
};
    useEffect(() => {
        // Fetch blog details using the ID
        const fetchBlogDetails = async () => {
             const cleanedName = cleanUrl(title);
            try {
                console.log(encodeURIComponent(cleanedName));
                const response = await fetch(`${endPoint}/blog/${encodeURIComponent(cleanedName)}`);
                const data = await response.json();
                setBlog(data);
            } catch (error) {
                console.error("Failed to fetch blog details:", error);
            }
        };

        fetchBlogDetails();
                console.log(title);
    }, [title]);

    return (
        <div>
            <FloatingIcons/>
            <Header isDefault={false} />
            <Helmet>
                <meta charSet="utf-8" />
                <title>{blog ? blog.title : "Loading..."} - Trilokpropco</title>
                <meta name="description" content={ blog ? blog.metaDescription : 'Default Description'} />
        <meta name="og:title" content={ blog ? blog.metaTitle : 'Default Title'} />
        <meta name="og:description" content={ blog ? blog.metaDescription : 'Default Description'} />
        <meta name="og:image" content={ blog ? blog.image : 'default-image-url.jpg'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={ blog ? blog.metaTitle : 'Default Title'} />
        <meta name="twitter:description" content={ blog ? blog.metaDescription : 'Default Description'} />
        <meta name="twitter:image" content={ blog ? blog.image : 'default-image-url.jpg'} />
            </Helmet>

            <div className="container mx-auto px-4 py-10">
                {blog ? (
                    <div className="prose lg:prose-xl mx-auto">
                        <h1 className="md:text-4xl text-2xl font-bold blogTitle text-[#046307] text-center my-8">{blog.title}</h1>
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="rounded-lg w-full h-full max-h-[500px] object-cover shadow-lg mb-6"
                        />
                        <div
                            className="bg-white rounded-lg p-6 shadow-lg mt-8 property-list-card"
                            dangerouslySetInnerHTML={{ __html: blog.description }}
                        />
                        <p className="mt-4 text-sm text-gray-500 text-right">
                            <strong>Date:</strong> {new Date(blog.date).toLocaleDateString()}
                        </p>
                    </div>
                ) : (
                    <div className="flex justify-center items-center">
                        <div className="btn btn-outline btn-primary loading">Loading...</div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default DetailBlog;

import { createBrowserRouter } from "react-router-dom";
import Main from "../Pages/Home/Main/Main";
import ResultsPage from "../Pages/SearchResultPage/ResultsPage";
import CompareLists from "../Pages/CompareLists/CompareLists";
import FavLists from "../Pages/FavLists/FavLists";
import { endPoint } from "../Component/ForAll/ForAll";
import DetailProperty from "../Pages/DetailPage/DetailProperty";
import AllProperties from "../Pages/AllProperties/AllProperties";
import About from "../Pages/About/About";
import ContactUs from "../Pages/Contact/ContactUs";
import Blogs from "../Pages/Blogs/Blogs";
import DetailBlog from "../Pages/DetailPage/DetailBlog";
import Services from "../Pages/Services/Services";
import PropertyWithLocation from "../Pages/PropertyWithLocation/PropertyWithLocation";
import PropertyWithType from "../Pages/PropertyWithType/PropertyWithType";
import ScrollToTop  from "../Component/ForAll/ScrollToTop";

export const router = createBrowserRouter([
    {
        path:'/',
        element: <Main/>,
        errorElement:<div>ERROR</div>,
        children:[
            {
                path:'/',
                element: <Main/>,
            },
            
        ]
    },
    {
        path:'/results',
        element:(<><ScrollToTop/><ResultsPage /></> ),
    }, 
    {
        path:'/compare',
        element:(<> <ScrollToTop/> <CompareLists/></> ),
    }, 
    {
        path:'/favourite',
        element:(<> <ScrollToTop/> <FavLists/></> ),
    },
    {
        path:'/properties',
        element: ( <><ScrollToTop/><AllProperties/></>),
    },
    {
        path:'/about',
        element:(<><ScrollToTop/> <About/></> ),
    },
    {
        path:'/contact',
        element:( <><ScrollToTop/> <ContactUs/></>),
    },
    {
        path:'/blog',
        element:( <><ScrollToTop/> <Blogs/></>),
    },
    {
        path:'/services',
        element:(<><ScrollToTop/> <Services/></> ),
    },
    {
        path: '/:category/:name',  // Include both the id and slug in the path
        element: (
            <>
                <ScrollToTop /> <DetailProperty /> </>),
        // loader: ({ params }) => fetch(`${endPoint}/${params.category}/${params.name}`),  // Fetch property by names
      },
      
      {
        path: '/blog/:title',
        element:(
            <>
            <ScrollToTop />  <DetailBlog /> </>),
        // loader: ({ params }) => fetch(`${endPoint}/blog/${params.title}`)
      },
      
      {
        path: '/property/location/:name',
        element: ( <><ScrollToTop/><PropertyWithLocation /></>),
        loader: ({ params }) => fetch(`${endPoint}/property/location/${params.name}`)
      },
      {
        path: '/property/type/:name',
        element:( <><ScrollToTop/> <PropertyWithType /></>),
        loader: ({ params }) => fetch(`${endPoint}/property/type/${params.name}`)
      }
])

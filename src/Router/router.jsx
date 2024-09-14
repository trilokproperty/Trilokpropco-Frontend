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
        element:<ResultsPage />
    }, 
    {
        path:'/compare',
        element: <CompareLists/>,
    }, 
    {
        path:'/favourite',
        element: <FavLists/>,
    },
    {
        path:'/properties',
        element: <AllProperties/>,
    },
    {
        path:'/about',
        element: <About/>,
    },
    {
        path:'/contact',
        element: <ContactUs/>,
    },
    {
        path:'/blog',
        element: <Blogs/>,
    },
    {
        path:'/services',
        element: <Services/>,
    },
    {
        path: '/property/:id',
        element: <DetailProperty />,
        loader: ({ params }) => fetch(`${endPoint}/property/${params._id}`)
      },
      {
        path: '/blog/:id',
        element: <DetailBlog />,
        loader: ({ params }) => fetch(`${endPoint}/blog/${params._id}`)
      }
])
import ErrorPage from "../components/ErrorPage";
import LandingPage from "../components/LandingPage";
import Layout from "../components/Layout";
import PropertyDetail from "../components/PropertyDetail";
import BookingProperty from "../components/BookingProperty";
import BookingList from "../components/BookingList";
import CreateUser from "../components/CreateUser";
import BookingConfirmation from "../components/BookingConfirmation";
import Login from "../components/Login";
import MyProfile from "../components/MyProfile";
import CreateProperty from "../components/CreateProperty";

export const routes = [
    {
        path: "/",
        element: (
            <Layout>
                <LandingPage />
            </Layout>
        ),
        errorElement: <ErrorPage />
    },
    {
        path: "/property/:id",
        element: (
            <Layout>
                <PropertyDetail />
            </Layout>
        ),
        errorElement: <ErrorPage />
    },
    {
        path: "/login",
        element: (
            <Layout>
                <Login />
            </Layout>
        ),
        errorElement: <ErrorPage />
    },
    {
        path: "/booking-property/:id",
        element: (
            <Layout>
                <BookingProperty />
            </Layout>
        ),
        errorElement: <ErrorPage />
    },
    {
        path: "/booking-list",
        element: (
            <Layout>
                <BookingList />
            </Layout>
        ),
        errorElement: <ErrorPage />
    },
    {
        path: "/booking-confirmation/:propertyId/:bookingId",
        element: (
            <Layout>
                <BookingConfirmation />
            </Layout>
        ),
        errorElement: <ErrorPage />
    },
    {
        path: "/create-user",
        element: (
            <Layout>
                <CreateUser />
            </Layout>
        ),
        errorElement: <ErrorPage />
    },
    {
        path: "/my-profile",
        element: (
            <Layout>
                <MyProfile />
            </Layout>
        ),
        errorElement: <ErrorPage />
    },
    {
        path: "/create-property",
        element: (
            <Layout>
                <CreateProperty />
            </Layout>
        ),
        errorElement: <ErrorPage />
    }
];
 
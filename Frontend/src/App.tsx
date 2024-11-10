
import { ChakraProvider, useToast } from "@chakra-ui/react";
import Axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Replies from "./component/replies";
import RepliesChildren from "./component/repliesChildren";
import { SET_USER } from "./features/auth/authSlice";
import { api } from "./libs/api";
import theme from './libs/chakra-theme';
import Follow from './pages/follow';
import ForgotPassword from "./pages/forgotPassword";
import Home from './pages/home';
import Login from './pages/login';
import OtherProfile from "./pages/otherProfile";
import Profile from './pages/profile';
import Register from './pages/register';
import ResetPassword from "./pages/resetPassword";
import Search from './pages/search';
import Status from './pages/status';
import { RootState } from "./redux/store";


export default function App() {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const PrivateRoute = () => {
      if(!isLoading) {

        if (currentUser.email) return <Outlet />;

        return <Navigate to={"/login"} />;
      }
  };

  async function authCheck() {
    try {
      const token = localStorage.token;
      const response = await Axios({
        method: "get",
        url: `${api}/check`,
        headers: { 
            "Content-Type": "multipart/form-data",
            'Authorization': `Bearer ${token}`
         },
    })

      dispatch(SET_USER(response.data));
      setIsLoading(false);
      PrivateRoute();
    } catch (error) {
      PrivateRoute();
      console.log(error)
      toast({
        title: "User not authenticated!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      <Navigate to={"/login"} />
    }
  }

  useEffect(() => {
    const token = localStorage.token;
    
    if (token) authCheck();
    else {
      setIsLoading(false);
      PrivateRoute();
    }
  }, []);

  return (
    <ChakraProvider theme={theme}>
        <Routes>
          <Route path="/register" element={<Register key={'registerPage'}/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:tokenReset" element={<ResetPassword />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/follow" element={<Follow />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/otherprofile/:id" element={<OtherProfile />} />
            <Route path="/threadsProfile" element={<Status/>} />
            <Route path="/threads/:id" element={<Replies/>} />
            <Route path="/replies/:id" element={<RepliesChildren/>} />
          </Route>
        </Routes>
    </ChakraProvider>
  )
}
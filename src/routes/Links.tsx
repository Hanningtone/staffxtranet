import {useState, useContext, useEffect} from "react";
import {BrowserRouter as Router, Route,Routes, useNavigate } from 'react-router-dom';
import { 
  LoginPage,
  HomePage,
  CategoriesPage,
  HotelsPage,
  HotelProfilePage,
  HotelRoomesPage,
  MarketsPage,
  BookingsPage,
  PaymentsPage,
  SettingsPage,
  CustomersPage,
  UsersPage,
  BusinessSettings,
  PromosPage
} from "../pages";
import ProtectedRoute from './ProtectedRoutes';
import { Context } from "../context";
import { setLocalStorage, getFromLocalStorage, removeItem } from '../utils/local-storage';
import Store from '../context';


const Logout = () => {
    let navigate = useNavigate();

    const out = useCallback(() => {
        localStorage.clear();
        navigate("/");
    }, [navigate]);

    useEffect(() => {
        out();
    }, [out]);
    return null;
}


const Links= () => {

  const [user, setUser] = useState<any>();

  useEffect(()=>{
    let userl = localStorage.getItem("user");
    setUser(JSON.parse(userl || '{}'));
  },[])
  return(
    <Store>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/home" element={<HomePage user={user}/>}/>
        <Route path="/categories" element={<CategoriesPage user={user}/>}/>
        <Route path="/markets" element={<MarketsPage user={user}/>}/>
        <Route path="/hotels" element={<HotelsPage user={user}/>}/>
        <Route path="/hotel-profile/:id" element={<HotelProfilePage user={user}/>}/>
        <Route path="/hotel-rooms" element={<HotelRoomesPage user={user}/>}/>
        <Route path="/bookings" element={<BookingsPage user={user}/>}/>
        <Route path="/promos" element={<PromosPage user={user}/>}/>
        <Route path="/payments" element={<PaymentsPage user={user}/>}/>
        <Route path="/settings" element={<SettingsPage user={user}/>}/>
        <Route path="/customers" element={<CustomersPage user={user}/>} />
        <Route path='/users' element={<UsersPage user={user}/>} />
        <Route path="/business-settings" element={<BusinessSettings user={user}/>} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
    </Store>
  )
};

export default Links;

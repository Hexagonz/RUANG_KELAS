import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { FormLogin, FormHome, NotFound, Dashboard, FormDetails } from "./components/pages"
import { Navigate } from 'react-router-dom';
import { useEffect } from "react";
export interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem('access_token');
  return token ? children : <Navigate to="/" />;
};


const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null; 
};

const App: React.FC = () => {
  return (
    <>
      <Router>
      <ScrollToTop/>
        <Routes>
            <Route path="/" element={<FormHome />} />
            <Route path="/login" element={<FormLogin />}/>
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }/>
              <Route path="/details" element={
                <PrivateRoute>
                  <FormDetails />
                </PrivateRoute>
              }/>

            {/* <Route path="/jadwal" element={<FormLogin />}/> */}
            <Route path="*" element={<NotFound />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;

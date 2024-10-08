import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FormLogin, FormHome, NotFound, Dashboard, FormDetails } from "./components/pages"
import { Navigate } from 'react-router-dom';

export interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem('access_token');
  return token ? children : <Navigate to="/" />;
};


const App: React.FC = () => {
  return (
    <Router>
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
  );
}

export default App;

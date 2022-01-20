import { AuthProvider } from "../contexts/AuthContext";
import SignUp from "./authentication/SignUp";
import { Routes, Route } from "react-router-dom";
import Login from "./authentication/Login";
import Dashboard from "./google-drive/Dashboard";
import PrivateRoute from "./authentication/PrivateRoute";
import UpdateProfile from "./profile/UpdateProfile";
import ForgotPassword from "./authentication/ForgotPassword";
import NotFound from "./NotFound";
import Profile from "./profile/Profile";
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/folder/:folderId" element={<Dashboard />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/update-profile" element={<UpdateProfile />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./features/core/HomePage";
import DashboardPage from "./features/core/DashboardPage";
import SignUpPage from "./features/auth/SignUpPage";
import LogInPage from "./features/auth/LogInPage";
import TermsOfService from "./features/misc/TermsOfService";
import PrivacyPolicy from "./features/misc/PrivacyPolicy";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route
          path="/dashboard"
          element={<DashboardPage></DashboardPage>}
        ></Route>
        <Route
          path="/terms-of-service"
          element={<TermsOfService></TermsOfService>}
        ></Route>
        <Route
          path="/privacy-policy"
          element={<PrivacyPolicy></PrivacyPolicy>}
        ></Route>
        <Route path="/signup" element={<SignUpPage></SignUpPage>}></Route>
        <Route path="/login" element={<LogInPage></LogInPage>}></Route>
      </Routes>
    </Router>
  );
}

export default App;

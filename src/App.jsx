import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./features/core/HomePage";
import DashboardPage from "./features/core/DashboardPage";
import SignUpPage from "./features/auth/SignUpPage";
import LogInPage from "./features/auth/LogInPage";
import TermsOfService from "./features/misc/TermsOfService";
import PrivacyPolicy from "./features/misc/PrivacyPolicy";
import Layout from "./features/core/Layout";
import ResourceNotFound from "./features/core/ResourceNotFound";

function App() {
  return (
    <Router>
      <Routes>
        {/* This layout components is rendered on every page */}
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={<HomePage redirect={true}></HomePage>}
          ></Route>
          <Route
            path="/home"
            element={<HomePage redirect={false}></HomePage>}
          ></Route>
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
          <Route
            path="*"
            element={<ResourceNotFound></ResourceNotFound>}
          ></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

import { Link } from "react-router-dom";
import MenuExcludedNavBar from "../components/MenuExcludedNavBar";

function TermsOfService() {
  return (
    <div className="">
      <MenuExcludedNavBar />
      <div className="w-full py-10 font-jakarta flex flex-col items-center scroll-smooth scrollbar-thin">
        <h1 className="text-4xl font-semibold">Terms of Service</h1>
        <p className="mt-2 text-gray-400">Updated June 2, 2025</p>
        <div className="w-[40%] text-lg">
          <div className="mt-10">
            <p className="">
              These Terms of Service ("Terms") govern your access to and use of
              Nebula ("the App"), a free and open-source note-taking platform
              developed and maintained by this{" "}
              <Link
                className="text-primary"
                to="https://github.com/delta6626"
                target="_blank"
              >
                individual
              </Link>
              {""} ("the Developer").
              <p className="mt-2">
                Please read these Terms and Conditions carefully before using
                the app. Your access to and use of the Service is conditioned on
                your acceptance of and compliance with these Terms. By accessing
                or using the app, you agree to be bound by these Terms. If you
                disagree with any part of the terms, then you may not access the
                app.
              </p>
            </p>
          </div>
          <div className="mt-10">
            <h2 className="text-2xl font-medium">1. Open Source License</h2>
            <p className="mt-4">
              This app is licensed under the{" "}
              <Link
                className="text-primary"
                to={"https://www.apache.org/licenses/LICENSE-2.0"}
                target={"_blank"}
              >
                Apache License, Version 2.0
              </Link>{" "}
              ("the License"). Unless required by applicable law or agreed to in
              writing, software distributed under the License is distributed on
              an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
              either express or implied. See the License for the specific
              language governing permissions and limitations under the License.
            </p>
          </div>
          <div className="mt-10">
            <h2 className="text-2xl font-medium">2. User Obligations</h2>
            <p className="mt-4">
              You must provide accurate, current, and complete information when
              creating an account. You agree not to use the App for unlawful,
              abusive, or disruptive purposes.
            </p>
          </div>
          <div className="mt-10">
            <h2 className="text-2xl font-medium">
              3. Account Registration and Access
            </h2>
            <p className="mt-4">
              Users may register via email/password or through Google OAuth.
              Authentication is securely managed through Firebase Authentication
              services.
            </p>
          </div>
          <div className="mt-10">
            <h2 className="text-2xl font-medium">
              4. Collection and Use of Data
            </h2>
            <p className="mt-4">
              We collect user data, including name, email, and newsletter
              preferences, solely for operational and user experience purposes.
              All notes are stored in Firebase Firestore and are private by
              default. These may be accessible to the admin for maintenance or
              abuse monitoring only and are never shared or exploited. Users may
              delete all stored data independently via the settings page without
              requiring manual intervention. During maintenance mode, access to
              data may be temporarily suspended.
            </p>
          </div>
          <div className="mt-10">
            <h2 className="text-2xl font-medium">
              5. Analytics and Monitoring
            </h2>
            <p className="mt-4">
              Firebase Analytics is employed to analyze aggregate usage patterns
              and optimize the application.
            </p>
          </div>
          <div className="mt-10">
            <h2 className="text-2xl font-medium">6. Pricing and Donations</h2>
            <p className="mt-4">
              Nebula is currently provided at no cost to users. Donations are
              accepted to help cover operational costs. Any transition to a paid
              tier will be transparently communicated in advance.
            </p>
          </div>
          <div className="mt-10">
            <h2 className="text-2xl font-medium">
              7. Third-Party Integrations
            </h2>
            <p className="mt-4">
              Nebula incorporates external services for speech recognition,
              including Google and Microsoft. Your use of these features
              constitutes agreement with their respective terms and privacy
              policies.
            </p>
          </div>
          <div className="mt-10">
            <h2 className="text-2xl font-medium">
              8. Open Source Acknowledgements
            </h2>
            <p className="mt-4">
              Nebula is built with contributions from the open-source community,
              notably utilizing Tiptap, a customizable text editor framework.
              Full credit is extended to all contributing developers.
            </p>
          </div>
          <div className="mt-10">
            <h2 className="text-2xl font-medium">9. Free Cloud Storage</h2>
            <p className="mt-4">
              Nebula provides free cloud storage for all users to save and sync
              their notes. While this service is offered at no cost, it is
              funded by community donations and maintained on a best-effort
              basis. We reserve the right to introduce usage limits or make
              changes to storage availability in the future to ensure long-term
              sustainability. In cases of unusually heavy usage, we may
              implement reasonable restrictions to preserve fair access for all
              users. Any such changes will be communicated in advance.
            </p>
          </div>
          <div className="mt-10">
            <h2 className="text-2xl font-medium">10. Account Termination</h2>
            <p className="mt-4">
              Users may discontinue use at any time. Accounts found in violation
              of these Terms may be restricted or terminated at the discretion
              of the developer.
            </p>
          </div>
          <div className="mt-10">
            <h2 className="text-2xl font-medium">11. Contact Information</h2>
            <p className="mt-4">
              For questions, feedback, or concerns regarding the Terms of
              Service or the{" "}
              <Link to={"/privacy-policy"} className="text-primary">
                Privacy Policy
              </Link>
              {", "}
              please contact{" "}
              <Link
                className="text-primary"
                to={"mailto:hasan04.asm@gmail.com"}
              >
                the developer
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsOfService;

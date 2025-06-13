import { Link } from "react-router-dom";
import MenuExcludedNavBar from "../components/MenuExcludedNavBar";

function PrivacyPolicy() {
  return (
    <div className="">
      <MenuExcludedNavBar />
      <div className="w-full py-10 font-jakarta flex flex-col items-center scroll-smooth scrollbar-thin">
        <h1 className="text-4xl font-semibold">Privacy Policy</h1>
        <p className="mt-2 text-secondary">Updated May 30, 2025</p>
        <div className="w-[85%] sm:w-[80%] md:w-[70%] lg:[w-60%] xl:w-[50%] 2xl:w-[40%] text-lg">
          <div className="mt-10">
            <p className="">
              This Privacy Policy outlines how Nebula ("the App") collects,
              uses, stores, and protects your personal information. The app is
              committed to transparency and ensuring that your data is handled
              responsibly in compliance with applicable privacy regulations.
            </p>
          </div>
          <div className="mt-10">
            <h2 className="text-2xl font-medium">
              1. Information the App Collects
            </h2>
            <p className="mt-4">
              <ul className="list-disc ml-4">
                <li>
                  Personal Data: Includes name, email address, and newsletter
                  subscription preference.
                </li>
                <li>
                  Content Data: All notes created are stored securely in
                  Firebase Firestore.
                </li>
                <li>
                  Usage Data: Collected anonymously through Firebase Analytics.
                </li>
              </ul>
            </p>
          </div>
          <div className="mt-10">
            <h2 className="text-2xl font-medium">2. Use of Collected Data</h2>
            <p className="mt-4">
              <ul className="list-disc ml-4">
                <li>To provide, maintain, and improve app functionality.</li>
                <li>To communicate updates and new features (if opted in).</li>
                <li>To monitor usage trends and improve user experience.</li>
              </ul>
            </p>
          </div>
          <div className="mt-10">
            <h2 className="text-2xl font-medium">3. Data Sharing Policy</h2>
            <p className="mt-4">
              <ul className="list-disc ml-4">
                <li>
                  No personal or content data is sold or shared with third
                  parties.
                </li>
                <li>
                  Admin access to user content is restricted to technical
                  maintenance or violation investigations and is exercised with
                  care and discretion.
                </li>
                <li>
                  Analytics data is collected and processed in aggregate form
                  only; Individual users are not tracked or identified when data
                  is analyzed. Instead, information is grouped together to look
                  at trends and app usage overall, without tying any data to
                  specific individuals.
                </li>
              </ul>
            </p>
          </div>
          <div className="mt-10">
            <h2 className="text-2xl font-medium">
              4. Data Control and Retention
            </h2>
            <p className="mt-4">
              Users may delete their data at any time directly from the settings
              page. Deleted data is removed from all systems under our control
              in accordance with industry practices.
            </p>
          </div>
          <div className="mt-10">
            <h2 className="text-2xl font-medium">
              5. External Service Dependencies
            </h2>
            <p className="mt-4">
              Speech recognition is facilitated by services from Google and
              Microsoft. Users agree to their respective privacy policies when
              using such features.
            </p>
          </div>
          <div className="mt-10">
            <h2 className="text-2xl font-medium">6. Contact Information</h2>
            <p className="mt-4">
              For questions, feedback, or concerns regarding the Privacy Policy
              or the{" "}
              <Link to={"/terms-of-service"} className="text-primary">
                Terms of Service
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

export default PrivacyPolicy;

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "../../assets/GoogleIcon";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import {
  getAuthenticatedUser,
  googleAuthSignIn,
  logInWithEmailAndPassword,
  resetPassword,
} from "../../firebase/services";
import { useThemeStore } from "../../store/themeStore";
import validateEmail from "../../utils/validateEmail";
import MenuExcludedNavBar from "../components/MenuExcludedNavBar";

function LogInPage() {
  const navigate = useNavigate();
  const { theme } = useThemeStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [databaseError, setDatabaseError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [resetMailSent, setResetMailSent] = useState(false);
  const [authenticating, setAuthenticating] = useState(APP_CONSTANTS.NULL);

  function handleEmailChange(e) {
    const value = e.target.value;
    setEmail(value);

    if (value.length === 0 || !validateEmail(value)) {
      setEmailError(true);
      setErrorMessage(APP_CONSTANTS.EMAIL_INVALID);
    } else {
      setEmailError(false);
      setErrorMessage("");
    }
  }

  function handlePasswordChange(e) {
    const value = e.target.value;
    setPassword(value);
  }

  function logIn() {
    setAuthenticating(APP_CONSTANTS.WITH_EMAIL);
    setDatabaseError(false);
    logInWithEmailAndPassword(email, password)
      .then(() => {
        setAuthenticating(APP_CONSTANTS.NULL);
        navigate("/dashboard");
      })
      .catch((error) => {
        setAuthenticating(APP_CONSTANTS.NULL);
        setDatabaseError(true);
        switch (error.code) {
          case "auth/invalid-email":
            setErrorMessage(APP_CONSTANTS.EMAIL_INVALID);
            break;
          case "auth/user-disabled":
            setErrorMessage(APP_CONSTANTS.USER_DISABLED);
            break;
          case "auth/too-many-requests":
            setErrorMessage(APP_CONSTANTS.TOO_MANY_ATTEMPTS);
            break;
          case "auth/invalid-credential":
            setErrorMessage(APP_CONSTANTS.INVALID_CREDENTIALS);
            break;
          case "auth/network-request-failed":
            setErrorMessage(APP_CONSTANTS.BAD_NETWORK);
            break;
          default:
            setErrorMessage(APP_CONSTANTS.UNKNOWN_ERROR);
            break;
        }
      });
  }

  function handlePasswordReset() {
    resetPassword(email)
      .then(() => {
        setResetMailSent(true);
      })
      .catch((error) => {
        setDatabaseError(true);
        switch (error.code) {
          case "auth/invalid-email":
            setErrorMessage(APP_CONSTANTS.EMAIL_INVALID);
            break;
          case "auth/user-disabled":
            setErrorMessage(APP_CONSTANTS.USER_DISABLED);
            break;
          case "auth/too-many-requests":
            setErrorMessage(APP_CONSTANTS.TOO_MANY_ATTEMPTS);
            break;
          case "auth/invalid-credential":
            setErrorMessage(APP_CONSTANTS.INVALID_CREDENTIALS);
            break;
          case "auth/network-request-failed":
            setErrorMessage(APP_CONSTANTS.BAD_NETWORK);
            break;
          default:
            setErrorMessage(APP_CONSTANTS.UNKNOWN_ERROR);
            break;
        }
      });
  }

  function handleLogin(e) {
    e.preventDefault();

    // Final safety check when user clicks login
    if (!validateEmail(email)) {
      setEmailError(true);
      setErrorMessage(APP_CONSTANTS.EMAIL_INVALID);
      return;
    }

    if (password.length < 8) {
      setPasswordError(true);
      setErrorMessage(APP_CONSTANTS.PASSWORD_LENGTH_SHORT);
      return;
    }

    logIn();
  }

  function handleLogInWithGoogle() {
    setAuthenticating(APP_CONSTANTS.WITH_GOOGLE);
    setDatabaseError(false);
    googleAuthSignIn(theme)
      .then(() => {
        setAuthenticating(APP_CONSTANTS.NULL);
        navigate("/dashboard");
      })
      .catch((error) => {
        setAuthenticating(APP_CONSTANTS.NULL);
        setDatabaseError(true);
        switch (error.code) {
          case "auth/account-exists-with-different-credential":
            setErrorMessage(
              APP_CONSTANTS.ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL,
            );
            break;
          case "auth/popup-blocked":
            setErrorMessage(APP_CONSTANTS.POPUP_BLOCKED);
            break;
          case "auth/popup-closed-by-user":
            setErrorMessage(APP_CONSTANTS.POPUP_CLOSED_BY_USER);
            break;
          case "auth/unauthorized-domain":
            setErrorMessage(APP_CONSTANTS.UNAUTHORIZED_DOMAIN);
            break;
          case "auth/network-request-failed":
            setErrorMessage(APP_CONSTANTS.BAD_NETWORK);
            break;
          default:
            setErrorMessage(APP_CONSTANTS.UNKNOWN_ERROR);
            break;
        }
      });
  }

  useEffect(() => {
    getAuthenticatedUser().then((result) => {
      if (result == APP_CONSTANTS.UNAUTHENTICATED) {
        return;
      } else {
        navigate("/dashboard");
      }
    });
  }, [navigate]);

  return (
    <div className="">
      <MenuExcludedNavBar />
      <div className="flex w-full h[100vh] justify-center lg:absolute lg:top-[50%] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[-50%]">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-md border w-xs sm:w-sm md:w-md lg:w-lg xl:w-xl p-4 font-jakarta">
          <h1 className="text-2xl font-bold text-center">Hey, Welcome back.</h1>
          <p className="text-center text-sm mb-4">
            Fill in your details to continue.
          </p>
          <label className="label">Email</label>
          <input
            type="email"
            className={
              !emailError ? "input w-full" : "input input-error w-full"
            }
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />

          <label className="label">Password</label>
          <input
            type="password"
            minLength={8}
            maxLength={64}
            className={
              !passwordError ? "input w-full" : "input input-error w-full"
            }
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          {(emailError || passwordError || databaseError) && (
            <p className="text-error text-sm">{errorMessage}</p>
          )}
          <button
            className="btn btn-primary mt-4"
            onClick={handleLogin}
            disabled={
              authenticating == APP_CONSTANTS.WITH_EMAIL ||
              authenticating == APP_CONSTANTS.WITH_GOOGLE
            }
          >
            {authenticating == APP_CONSTANTS.NULL ||
            authenticating == APP_CONSTANTS.WITH_GOOGLE ? (
              "Log In"
            ) : (
              <span className="loading loading-spinner"></span>
            )}
          </button>
          <button
            className="btn bg-white mt-2 text-black"
            onClick={handleLogInWithGoogle}
            disabled={
              authenticating == APP_CONSTANTS.WITH_EMAIL ||
              authenticating == APP_CONSTANTS.WITH_GOOGLE
            }
          >
            {authenticating == APP_CONSTANTS.NULL ||
            authenticating == APP_CONSTANTS.WITH_EMAIL ? (
              <>
                <GoogleIcon></GoogleIcon>
                Log in with Google
              </>
            ) : (
              <span className="loading loading-spinner"></span>
            )}
          </button>
          {resetMailSent ? (
            <p className="text-center text-sm mt-2">
              Password reset email sent! Check your inbox.
            </p>
          ) : (
            <p className="text-center text-sm mt-2">
              Forgot password?{" "}
              <button
                className={
                  validateEmail(email)
                    ? "text-primary cursor-pointer"
                    : "text-secondary"
                }
                onClick={handlePasswordReset}
                disabled={!validateEmail(email)}
              >
                Reset it.
              </button>
            </p>
          )}
          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link className="text-primary" to={"/signup"}>
              Sign up.
            </Link>
          </p>
        </fieldset>
      </div>
    </div>
  );
}

export default LogInPage;

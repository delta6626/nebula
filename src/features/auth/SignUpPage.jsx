import NavBar from "../components/NavBar";
import GoogleIcon from "../../assets/GoogleIcon";
import { Link } from "react-router-dom";
import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import validateEmail from "../../utils/validateEmail";
import {
  createNewUserWithEmailAndPassword,
  getAuthenticatedUser,
  googleAuthSignIn,
} from "../../firebase/services";
import { useThemeStore } from "../../store/themeStore";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";

function SignUpPage() {
  const navigate = useNavigate();
  const { theme } = useThemeStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [databaseError, setDatabaseError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [authenticating, setAuthenticating] = useState(APP_CONSTANTS.NULL);

  function handleNameChange(e) {
    const value = e.target.value;
    setName(value);
    if (value.length === 0) {
      setNameError(true);
      setErrorMessage(APP_CONSTANTS.NAME_EMPTY);
    } else {
      setNameError(false);
      setErrorMessage("");
    }
  }

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

    if (value.length >= 0 && value.length < 8) {
      setPasswordError(true);
      setErrorMessage(APP_CONSTANTS.PASSWORD_LENGTH_SHORT);
    } else {
      setPasswordError(false);
      setErrorMessage("");
    }
  }

  function handleConfirmPasswordChange(e) {
    const value = e.target.value;
    setConfirmPassword(value);

    if (value !== password) {
      setConfirmPasswordError(true);
      setErrorMessage(APP_CONSTANTS.PASSWORD_MISMATCH);
    } else {
      setConfirmPasswordError(false);
      setErrorMessage("");
    }
  }

  function createUser() {
    setAuthenticating(APP_CONSTANTS.WITH_EMAIL);
    setDatabaseError(false);
    createNewUserWithEmailAndPassword(
      name,
      email,
      password,
      APP_CONSTANTS.WITH_EMAIL,
      theme
    )
      .then(() => {
        setAuthenticating(APP_CONSTANTS.NULL);
        navigate("/dashboard");
      })
      .catch((error) => {
        setDatabaseError(true);
        setAuthenticating(APP_CONSTANTS.NULL);
        switch (error.code) {
          case "auth/invalid-email":
            setErrorMessage(APP_CONSTANTS.EMAIL_INVALID);
            break;
          case "auth/email-already-in-use":
            setErrorMessage(APP_CONSTANTS.EMAIL_TAKEN);
            break;
          case "auth/weak-password":
            setErrorMessage(APP_CONSTANTS.PASSWORD_LENGTH_SHORT);
            break;
          case "auth/too-many-requests":
            setErrorMessage(APP_CONSTANTS.TOO_MANY_ATTEMPTS);
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

  function handleSignUp(e) {
    e.preventDefault();

    // Final safety check when user clicks sign up
    if (name.length === 0) {
      setNameError(true);
      setErrorMessage(APP_CONSTANTS.NAME_EMPTY);
      return;
    }

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

    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      setErrorMessage(APP_CONSTANTS.PASSWORD_MISMATCH);
      return;
    }

    createUser();
  }

  function handleSignUpWithGoogle() {
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
              APP_CONSTANTS.ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL
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
  }, []);

  return (
    <div className="">
      <NavBar></NavBar>
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-md border w-md p-4 font-jakarta">
          <h1 className="text-2xl font-bold text-center">
            Hi there, Welcome to Nebula.
          </h1>
          <p className="text-center text-sm mb-4">
            Fill in your details to continue.
          </p>

          <label className="label">Name</label>
          <input
            type="text"
            maxLength={150}
            className={!nameError ? "input w-md" : "input input-error w-md"}
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
          />

          <label className="label">Email</label>
          <input
            type="email"
            className={!emailError ? "input w-md" : "input input-error w-md"}
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />

          <label className="label">Password</label>
          <input
            type="password"
            minLength={8}
            maxLength={64}
            className={!passwordError ? "input w-md" : "input input-error w-md"}
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />

          <label className="label">Confirm password</label>
          <input
            type="password"
            minLength={8}
            maxLength={64}
            className={
              !confirmPasswordError ? "input w-md" : "input input-error w-md"
            }
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />

          {(nameError ||
            emailError ||
            passwordError ||
            confirmPasswordError ||
            databaseError) && (
            <p className="text-error text-sm">{errorMessage}</p>
          )}

          <button
            className="btn btn-primary mt-4"
            onClick={handleSignUp}
            disabled={
              authenticating == APP_CONSTANTS.WITH_EMAIL ||
              authenticating == APP_CONSTANTS.WITH_GOOGLE
            }
          >
            {authenticating == APP_CONSTANTS.NULL ||
            authenticating == APP_CONSTANTS.WITH_GOOGLE ? (
              "Sign Up"
            ) : (
              <span className="loading loading-spinner"></span>
            )}
          </button>

          <button
            className="btn bg-secondary mt-2 text-secondary-content"
            onClick={handleSignUpWithGoogle}
            disabled={
              authenticating == APP_CONSTANTS.WITH_EMAIL ||
              authenticating == APP_CONSTANTS.WITH_GOOGLE
            }
          >
            {authenticating == APP_CONSTANTS.NULL ||
            authenticating == APP_CONSTANTS.WITH_EMAIL ? (
              <>
                <GoogleIcon></GoogleIcon>
                Sign up with Google
              </>
            ) : (
              <span className="loading loading-spinner"></span>
            )}
          </button>

          <p className="text-center text-gray-400 text-sm mt-2">
            Already have an account?{" "}
            <Link className="text-primary" to={"/login"}>
              Login.
            </Link>
          </p>

          <p className="text-sm text-gray-400 mt-4">
            By signing up, you acknowledge that you have read, understood and
            agree to our{" "}
            <Link className="text-primary" to={"/terms-of-service"}>
              Terms of service
            </Link>{" "}
            and{" "}
            <Link className="text-primary" to={"/privacy-policy"}>
              Privacy Policy
            </Link>
            .
          </p>
        </fieldset>
      </div>
    </div>
  );
}

export default SignUpPage;

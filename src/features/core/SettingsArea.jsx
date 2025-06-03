import { useState } from "react";
import { ArrowBigUp, Command, Info, Plus } from "lucide-react";
import { THEMES } from "../../constants/THEMES";
import { useUserStore } from "../../store/userStore";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import { useUserVerifiedStore } from "../../store/userVerifiedStore";
import { useMessageStore } from "../../store/messageStore";
import { useNotesStore } from "../../store/notesStore";
import { useNotebooksStore } from "../../store/notebooksStore";
import { useActiveTabStore } from "../../store/activeTabStore";
import { hasEmptyStringValue } from "../../utils/hasEmptyStringValue";
import {
  softDeleteAllNotes,
  updateUserData,
  softDeleteAllNotebooks,
  deleteUserAccount,
  signOutUser,
  sendVerificationEmail,
} from "../../firebase/services";
import { Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function SettingsArea() {
  const navigate = useNavigate();

  const { user, setUser } = useUserStore();
  const { userVerified } = useUserVerifiedStore();
  const { setMessage } = useMessageStore();
  const { setNotebooks } = useNotebooksStore();
  const { setNotes } = useNotesStore();
  const { setActiveTab } = useActiveTabStore();

  // State variables
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [autoSaveTriggerTime, setAutoSaveTriggerTime] = useState(
    user.preferences.autoSaveTriggerTime
  );
  const [strictTagMatching, setStrictTagMatching] = useState(
    user.preferences.strictTagMatching
  );
  const [autoSpacing, setAutoSpacing] = useState(user.preferences.autoSpacing);
  const [language, setLanguage] = useState(user.preferences.language);
  const [theme, setTheme] = useState(user.preferences.theme);
  const [subscribed, setSubscribed] = useState(
    user.preferences.subscribedToEmailNotifications
  );
  const [shortcuts, setShortcuts] = useState({ ...user.shortcuts });
  const [updating, setUpdating] = useState(false);
  const [deletingNotes, setDeletingNotes] = useState(false);
  const [deletingNotebooks, setDeletingNotebooks] = useState(false);
  const [sendingMail, setSendingMail] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);

  function isUserDataChanged() {
    return (
      name !== user.name ||
      email !== user.email ||
      strictTagMatching != user.preferences.strictTagMatching ||
      autoSpacing !== user.preferences.autoSpacing ||
      autoSaveTriggerTime !== user.preferences.autoSaveTriggerTime ||
      language !== user.preferences.language ||
      theme !== user.preferences.theme ||
      subscribed !== user.preferences.subscribedToEmailNotifications ||
      JSON.stringify(shortcuts) !== JSON.stringify(user.shortcuts)
    );
  }

  function emptyFields() {
    return name == "" || hasEmptyStringValue(shortcuts);
  }

  // Update handler
  function handleUpdate() {
    if (!isUserDataChanged()) {
      return;
    }

    if (emptyFields()) {
      setMessage({
        title: APP_CONSTANTS.ERROR_MODAL_TITLE,
        textContent: APP_CONSTANTS.FIELD_EMPTY,
        firstButtonClassName: "btn btn-error",
        secondButtonClassName: "hidden",
        firstButtonText: APP_CONSTANTS.OK,
        secondButtonText: "",
        firstButtonOnClick: function () {
          document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close();
        },
        secondButtonOnClick: function () {},
      });
      document.getElementById(APP_CONSTANTS.GENERIC_MODAL).showModal();
      return;
    }

    setUpdating(true);

    const updatedUser = {
      ...user,
      name,
      email,
      preferences: {
        ...user.preferences,
        strictTagMatching,
        autoSpacing,
        autoSaveTriggerTime,
        language,
        theme,
        subscribedToEmailNotifications: subscribed,
      },
      shortcuts: {
        ...shortcuts,
      },
    };

    setUser(updatedUser);

    updateUserData(updatedUser)
      .then(() => {
        setUpdating(false);
        setMessage({
          title: APP_CONSTANTS.SUCCESS_MODAL_TITLE,
          textContent: APP_CONSTANTS.SUCCESS_MODAL_TEXT_CONTENT,
          firstButtonClassName: "btn btn-primary",
          secondButtonClassName: "hidden",
          firstButtonText: APP_CONSTANTS.OK,
          secondButtonText: "",
          firstButtonOnClick: function () {
            document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close();
          },
          secondButtonOnClick: function () {},
        });
        document.getElementById(APP_CONSTANTS.GENERIC_MODAL).showModal();
      })
      .catch((error) => {
        setUpdating(false);
        console.error(error);
      });
  }

  function handleSignOut() {
    setSigningOut(true);
    document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close();
    signOutUser()
      .then(() => {
        setSigningOut(false);
        setActiveTab(APP_CONSTANTS.DASHBOARD_PAGE);
        navigate("/signup");
      })
      .catch((error) => {
        setMessage({
          title: APP_CONSTANTS.ERROR_MODAL_TITLE,
          textContent: APP_CONSTANTS.ERROR_MODAL_TEXT_CONTENT + "\n" + error,
          firstButtonClassName: "btn btn-error",
          secondButtonClassName: "hidden",
          firstButtonText: APP_CONSTANTS.OK,
          secondButtonText: "",
          firstButtonOnClick: function () {
            document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close();
          },
          secondButtonOnClick: function () {},
        });
        document.getElementById(APP_CONSTANTS.GENERIC_MODAL).showModal();
      });
  }

  function updateMassDeletionTime() {
    const updatedUser = {
      ...user,
      lastMassDeletionTime: new Date(),
    };

    setUser(updatedUser);

    updateUserData(updatedUser)
      .then(() => {
        setUpdating(false);
      })
      .catch((error) => {
        setUpdating(false);
        setMessage({
          title: APP_CONSTANTS.ERROR_MODAL_TITLE,
          textContent: APP_CONSTANTS.ERROR_MODAL_TEXT_CONTENT + "\n" + error,
          firstButtonClassName: "btn btn-error",
          secondButtonClassName: "hidden",
          firstButtonText: APP_CONSTANTS.OK,
          secondButtonText: "",
          firstButtonOnClick: function () {
            document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close();
          },
          secondButtonOnClick: function () {},
        });
        document.getElementById(APP_CONSTANTS.GENERIC_MODAL).showModal();
      });
  }

  function canDelete() {
    const last = user.lastMassDeletionTime;

    if (!last) {
      return true; // If there's no last mass deletion time, allow deletion
    }

    const lastTimestamp = new Timestamp(last.seconds, last.nanoseconds);
    const elapsed = Date.now() - lastTimestamp.toMillis();

    return elapsed >= APP_CONSTANTS.HOUR;
  }

  function handleSendVerificationMail() {
    setSendingMail(!sendingMail);
    sendVerificationEmail()
      .then(() => {
        setSendingMail(false);
        setMessage({
          title: APP_CONSTANTS.EMAIL_VERIFICATION_MODAL_SUCCESS,
          textContent:
            APP_CONSTANTS.EMAIL_VERIFICATION_MODAL_SUCCESS_TEXT_CONTENT,
          firstButtonClassName: "btn btn-primary",
          secondButtonClassName: "hidden",
          firstButtonText: APP_CONSTANTS.OK,
          secondButtonText: "",
          firstButtonOnClick: function () {
            document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close();
          },
          secondButtonOnClick: function () {},
        });
        document.getElementById(APP_CONSTANTS.GENERIC_MODAL).showModal();
      })
      .catch(() => {
        setSendingMail(false);
        setMessage({
          title: APP_CONSTANTS.ERROR_MODAL_TITLE,
          textContent: APP_CONSTANTS.ERROR_MODAL_TEXT_CONTENT + "\n" + error,
          firstButtonClassName: "btn btn-error",
          secondButtonClassName: "hidden",
          firstButtonText: APP_CONSTANTS.OK,
          secondButtonText: "",
          firstButtonOnClick: function () {
            document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close();
          },
          secondButtonOnClick: function () {},
        });
        document.getElementById(APP_CONSTANTS.GENERIC_MODAL).showModal();
      });
  }

  function deleteAllNotes() {
    document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close();
    setDeletingNotes(true);
    softDeleteAllNotes()
      .then(() => {
        setDeletingNotes(false);
        updateMassDeletionTime();
        setNotes([]); // Clear all notes from zustand store.
        setMessage({
          title: APP_CONSTANTS.SUCCESS_MODAL_TITLE,
          textContent: APP_CONSTANTS.SUCCESS_MODAL_TEXT_CONTENT,
          firstButtonClassName: "btn btn-primary",
          secondButtonClassName: "hidden",
          firstButtonText: APP_CONSTANTS.OK,
          secondButtonText: "",
          firstButtonOnClick: function () {
            document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close();
          },
          secondButtonOnClick: function () {},
        });
        document.getElementById(APP_CONSTANTS.GENERIC_MODAL).showModal();
      })
      .catch((error) => {
        setDeletingNotes(false);
        setMessage({
          title: APP_CONSTANTS.ERROR_MODAL_TITLE,
          textContent: APP_CONSTANTS.ERROR_MODAL_TEXT_CONTENT + "\n" + error,
          firstButtonClassName: "btn btn-error",
          secondButtonClassName: "hidden",
          firstButtonText: APP_CONSTANTS.OK,
          secondButtonText: "",
          firstButtonOnClick: function () {
            document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close();
          },
          secondButtonOnClick: function () {},
        });
        document.getElementById(APP_CONSTANTS.GENERIC_MODAL).showModal();
      });
  }

  function deleteAllNotebooks() {
    document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close();
    setDeletingNotebooks(true);
    softDeleteAllNotebooks()
      .then(() => {
        setDeletingNotebooks(false);
        updateMassDeletionTime();
        setNotes([]);
        setNotebooks([]);
        setMessage({
          title: APP_CONSTANTS.SUCCESS_MODAL_TITLE,
          textContent: APP_CONSTANTS.SUCCESS_MODAL_TEXT_CONTENT,
          firstButtonClassName: "btn btn-primary",
          secondButtonClassName: "hidden",
          firstButtonText: APP_CONSTANTS.OK,
          secondButtonText: "",
          firstButtonOnClick: function () {
            document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close();
          },
          secondButtonOnClick: function () {},
        });
        document.getElementById(APP_CONSTANTS.GENERIC_MODAL).showModal();
      })
      .catch((error) => {
        setDeletingNotes(false);
        setMessage({
          title: APP_CONSTANTS.ERROR_MODAL_TITLE,
          textContent: APP_CONSTANTS.ERROR_MODAL_TEXT_CONTENT + "\n" + error,
          firstButtonClassName: "btn btn-error",
          secondButtonClassName: "hidden",
          firstButtonText: APP_CONSTANTS.OK,
          secondButtonText: "",
          firstButtonOnClick: function () {
            document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close();
          },
          secondButtonOnClick: function () {},
        });
        document.getElementById(APP_CONSTANTS.GENERIC_MODAL).showModal();
      });
  }

  function deleteAccount() {
    document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close();

    setDeletingAccount(true);

    const updatedUser = {
      ...user,
      deleted: true,
    };

    updateUserData(updatedUser)
      .then(() => {
        deleteUserAccount()
          .then(() => {
            setDeletingAccount(false);
            navigate("/");
          })
          .catch((error) => {
            setDeletingAccount(false);
            setMessage({
              title: APP_CONSTANTS.ERROR_MODAL_TITLE,
              textContent:
                APP_CONSTANTS.ERROR_MODAL_TEXT_CONTENT + "\n" + error,
              firstButtonClassName: "btn btn-error",
              secondButtonClassName: "hidden",
              firstButtonText: APP_CONSTANTS.OK,
              secondButtonText: "",
              firstButtonOnClick: function () {
                document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close();
              },
              secondButtonOnClick: function () {},
            });
            document.getElementById(APP_CONSTANTS.GENERIC_MODAL).showModal();
          });
      })
      .catch((error) => {
        setDeletingAccount(false);
        setMessage({
          title: APP_CONSTANTS.ERROR_MODAL_TITLE,
          textContent: APP_CONSTANTS.ERROR_MODAL_TEXT_CONTENT + "\n" + error,
          firstButtonClassName: "btn btn-error",
          secondButtonClassName: "hidden",
          firstButtonText: APP_CONSTANTS.OK,
          secondButtonText: "",
          firstButtonOnClick: function () {
            document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close();
          },
          secondButtonOnClick: function () {},
        });
        document.getElementById(APP_CONSTANTS.GENERIC_MODAL).showModal();
      });
  }

  return (
    <div className="flex-1 bg-base-300 h-[100vh] py-4 font-jakarta overflow-y-scroll scroll-smooth scrollbar-thin">
      <div className="flex items-center justify-between px-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <button
          className={"btn btn-primary"}
          onClick={handleUpdate}
          disabled={updating ? true : false}
        >
          {!updating ? (
            "Update"
          ) : (
            <span className="loading loading-spinner"></span>
          )}
        </button>
      </div>
      <div className="divider"></div>

      {/* Profile */}
      <div className="px-8">
        <div className="bg-base-200 rounded-lg p-4">
          <p className="text-xl font-semibold">Profile</p>
          <p className="mt-4 text-neutral-400">
            Update your personal information
          </p>
          <div className="divider"></div>
          <div className="flex flex-col">
            <p className="font-medium">Name</p>
            <input
              className="input focus:input-primary mt-4 w-200 max-w-full"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col mt-4">
            <p className="font-medium">Email</p>
            <input
              className="input focus:input-primary mt-4 w-200 max-w-full"
              type="text"
              placeholder="Email"
              value={email}
              readOnly={true}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="px-8">
        <div className="bg-base-200 rounded-lg p-4 mt-4">
          <p className="text-xl font-semibold">Preferences</p>
          <p className="mt-4 text-neutral-400">Manage your preferences</p>
          <div className="divider"></div>

          {/* Autosave */}
          {/* Postponed for later */}
          {/* <div className="flex justify-between">
            <p className="font-medium">Trigger autosave every (in minutes)</p>
            <div className="w-full max-w-xs">
              <input
                type="range"
                min={0} // 0 indicates 'Off'
                max={10}
                value={autoSaveTriggerTime}
                onChange={(e) => setAutoSaveTriggerTime(Number(e.target.value))}
                className="range range-primary"
                step="1"
              />
              <div className="flex justify-between px-2.5 mt-4 text-xs">
                {[...Array(11)].map((_, i) => (
                  <span key={i}>|</span>
                ))}
              </div>
              <div className="flex justify-between px-2.5 mt-4 text-xs">
                {[...Array(11)].map((_, i) => (
                  <span key={i}>{i != 0 ? i : "Off"}</span>
                ))}
              </div>
            </div>
          </div> */}

          {/* Language selector. Postponed for later.
          <div className="flex items-center justify-between mt-4">
            <p className="font-medium">Default language</p>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="select focus:select-primary"
            >
              {Object.keys(LANGUAGES).map((lang, id) => (
                <option key={id} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div> 
          */}

          {/* Theme */}
          <div className="flex items-center justify-between mt-4">
            <p className="font-medium">Preferred theme</p>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="select focus:select-primary"
            >
              {THEMES.map((theme, id) => {
                return (
                  <option key={id} value={theme}>
                    {theme.charAt(0).toUpperCase() + theme.substring(1)}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Strict tag matching */}
          <div className="flex justify-between mt-4">
            <p className="font-medium">Strict tag matching</p>
            <div className="flex items-center">
              <p>On</p>
              <input
                type="radio"
                name="tag-matching"
                className="radio radio-primary mx-2"
                checked={strictTagMatching === true}
                onChange={() => setStrictTagMatching(true)}
              />
              <p>Off</p>
              <input
                type="radio"
                name="tag-matching"
                className="radio radio-primary ml-2"
                checked={strictTagMatching === false}
                onChange={() => setStrictTagMatching(false)}
              />
            </div>
          </div>

          {/* Auto spacing */}
          <div className="flex justify-between mt-4">
            <p className="font-medium">Auto spacing</p>
            <div className="flex items-center">
              <p>On</p>
              <input
                type="radio"
                name="auto-spacing"
                className="radio radio-primary mx-2"
                checked={autoSpacing === true}
                onChange={() => setAutoSpacing(true)}
              />
              <p>Off</p>
              <input
                type="radio"
                name="auto-spacing"
                className="radio radio-primary ml-2"
                checked={autoSpacing === false}
                onChange={() => setAutoSpacing(false)}
              />
            </div>
          </div>

          {/* Email Subscription */}
          <div className="flex justify-between mt-4">
            <p className="font-medium">
              Keep me informed with occasional emails about new features,
              updates, helpful tips, and special offers.
            </p>
            <div className="flex items-center">
              <p>Yes</p>
              <input
                type="radio"
                name="email-subscription"
                className="radio radio-primary mx-2"
                checked={subscribed === true}
                onChange={() => setSubscribed(true)}
              />
              <p>No</p>
              <input
                type="radio"
                name="email-subscription"
                className="radio radio-primary ml-2"
                checked={subscribed === false}
                onChange={() => setSubscribed(false)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Shortcuts */}
      <div className="px-8">
        <div className="bg-base-200 rounded-lg p-4 mt-4">
          <p className="text-xl font-semibold">Shortcuts</p>
          <p className="mt-4 text-neutral-400">Configure your shortcuts </p>
          <div className="text-warning flex mt-2 items-center">
            <Info size={20}></Info>
            <p className="ml-2">
              Your custom shortcut might not work due to existing browser
              shortcuts
            </p>
          </div>
          <div className="divider"></div>

          {[
            "DASHBOARD_PAGE",
            "NOTES_PAGE",
            "NOTEBOOKS_PAGE",
            "SETTINGS_PAGE",
          ].map((page) => (
            <div key={page} className="flex items-center justify-between mt-4">
              <p className="font-medium">
                Navigate to {page.replace("_", " ").toLowerCase()}
              </p>
              <div className="flex items-center">
                <button className="btn" disabled>
                  <Command />
                </button>
                <Plus />
                <button className="btn" disabled>
                  <ArrowBigUp />
                </button>
                <Plus />
                <input
                  className="input focus:input-primary w-20 uppercase"
                  maxLength={1}
                  value={shortcuts[page]}
                  onChange={(e) =>
                    setShortcuts({
                      ...shortcuts,
                      [page]: e.target.value.toUpperCase(),
                    })
                  }
                />
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between mt-4">
            <p className="font-medium">Navigate to Pinned page</p>
            <div className="flex items-center">
              <button className="btn" disabled>
                <ArrowBigUp />
              </button>
              <Plus />
              <input
                className="input focus:input-primary w-20 uppercase"
                maxLength={1}
                value={shortcuts["PINNED_PAGE"]}
                onChange={(e) =>
                  setShortcuts({
                    ...shortcuts,
                    ["PINNED_PAGE"]: e.target.value.toUpperCase(),
                  })
                }
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="font-medium">Navigate to Recent page</p>
            <div className="flex items-center">
              <button className="btn" disabled>
                <ArrowBigUp />
              </button>
              <Plus />
              <input
                className="input focus:input-primary w-20 uppercase"
                maxLength={1}
                value={shortcuts["RECENT_PAGE"]}
                onChange={(e) =>
                  setShortcuts({
                    ...shortcuts,
                    ["RECENT_PAGE"]: e.target.value.toUpperCase(),
                  })
                }
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="font-medium">Navigate to Tagged page</p>
            <div className="flex items-center">
              <button className="btn" disabled>
                <ArrowBigUp />
              </button>
              <Plus />
              <input
                className="input focus:input-primary w-20 uppercase"
                maxLength={1}
                value={shortcuts["TAGGED_PAGE"]}
                onChange={(e) =>
                  setShortcuts({
                    ...shortcuts,
                    ["TAGGED_PAGE"]: e.target.value.toUpperCase(),
                  })
                }
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="font-medium">Navigate to Untagged page</p>
            <div className="flex items-center">
              <button className="btn" disabled>
                <ArrowBigUp />
              </button>
              <Plus />
              <input
                className="input focus:input-primary w-20 uppercase"
                maxLength={1}
                value={shortcuts["UNTAGGED_PAGE"]}
                onChange={(e) =>
                  setShortcuts({
                    ...shortcuts,
                    ["UNTAGGED_PAGE"]: e.target.value.toUpperCase(),
                  })
                }
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="font-medium">New note</p>
            <div className="flex items-center">
              <button className="btn" disabled>
                <ArrowBigUp />
              </button>
              <Plus />
              <input
                className="input focus:input-primary w-20 uppercase"
                maxLength={1}
                value={shortcuts["NEW_NOTE"]}
                onChange={(e) =>
                  setShortcuts({
                    ...shortcuts,
                    ["NEW_NOTE"]: e.target.value.toUpperCase(),
                  })
                }
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="font-medium">New notebook</p>
            <div className="flex items-center">
              <button className="btn" disabled>
                <ArrowBigUp />
              </button>
              <Plus />
              <input
                className="input focus:input-primary w-20 uppercase"
                maxLength={1}
                value={shortcuts["NEW_NOTE_BOOK"]}
                onChange={(e) =>
                  setShortcuts({
                    ...shortcuts,
                    ["NEW_NOTE_BOOK"]: e.target.value.toUpperCase(),
                  })
                }
              />
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <p className="font-medium">Close note / notebook</p>
            <div className="flex items-center">
              <button className="btn" disabled>
                <Command />
              </button>
              <Plus />
              <input
                className="input focus:input-primary w-20 uppercase"
                maxLength={1}
                value={shortcuts["CLOSE"]}
                onChange={(e) =>
                  setShortcuts({
                    ...shortcuts,
                    ["CLOSE"]: e.target.value.toUpperCase(),
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Account management */}
      <div className="px-8">
        <div className={"bg-base-200 rounded-lg p-4 mt-4"}>
          <p className="text-xl font-semibold">Account</p>
          <p className="mt-4 text-neutral-400">Manage your account</p>
          <div className="divider"></div>
          <div className="flex justify-between">
            <p className="font-medium">Send verification mail</p>
            <button
              className="btn btn-primary"
              disabled={userVerified ? true : false}
              onClick={handleSendVerificationMail}
            >
              {userVerified ? (
                "Already verified"
              ) : !sendingMail ? (
                APP_CONSTANTS.SEND
              ) : (
                <span className="loading loading-spinner"></span>
              )}
            </button>
          </div>
          <div className="flex justify-between mt-4">
            <p className="font-medium">Sign out</p>
            <button
              className="btn btn-primary"
              disabled={signingOut}
              onClick={() => {
                setMessage({
                  title: APP_CONSTANTS.SIGN_OUT_MODAL_TITLE,
                  textContent: APP_CONSTANTS.SIGN_OUT_MODAL_TEXT_CONTENT,
                  firstButtonClassName: "btn btn-primary",
                  secondButtonClassName: "btn",
                  firstButtonText: APP_CONSTANTS.SIGN_OUT,
                  secondButtonText: APP_CONSTANTS.CANCEL,
                  firstButtonOnClick: function () {
                    handleSignOut();
                  },
                  secondButtonOnClick: function () {
                    if (
                      document.getElementById(APP_CONSTANTS.GENERIC_MODAL) !=
                      null
                    ) {
                      document
                        .getElementById(APP_CONSTANTS.GENERIC_MODAL)
                        .close();
                    }
                  },
                });
                document
                  .getElementById(APP_CONSTANTS.GENERIC_MODAL)
                  .showModal();
              }}
            >
              {!signingOut ? (
                APP_CONSTANTS.SIGN_OUT
              ) : (
                <span className="loading loading-spinner"></span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="px-8">
        <div className="bg-base-200 rounded-lg p-4 mt-4">
          <p className="text-xl font-semibold text-error">Danger zone</p>
          <p className="mt-4 text-neutral-400">You're walking on thin ice</p>
          <div className="divider"></div>

          <div className="flex justify-between">
            <p className="font-medium">Delete my notes</p>
            <button
              className="btn btn-error text-error-content"
              onClick={() => {
                setMessage({
                  title: APP_CONSTANTS.DELETE_NOTES_MODAL_TITLE,
                  textContent: APP_CONSTANTS.DELETE_NOTES_MODAL_TEXT_CONTENT,
                  firstButtonClassName: "btn btn-error",
                  secondButtonClassName: "btn",
                  firstButtonText: APP_CONSTANTS.DELETE,
                  secondButtonText: APP_CONSTANTS.CANCEL,
                  firstButtonOnClick: function () {
                    deleteAllNotes();
                  },
                  secondButtonOnClick: function () {
                    if (
                      document.getElementById(APP_CONSTANTS.GENERIC_MODAL) !=
                      null
                    ) {
                      document
                        .getElementById(APP_CONSTANTS.GENERIC_MODAL)
                        .close();
                    }
                  },
                });
                document
                  .getElementById(APP_CONSTANTS.GENERIC_MODAL)
                  .showModal();
              }}
              disabled={!canDelete() || deletingNotes}
            >
              {!deletingNotes ? (
                APP_CONSTANTS.DELETE
              ) : (
                <span className="loading loading-spinner"></span>
              )}
            </button>
          </div>

          <div className="flex justify-between mt-4">
            <p className="font-medium">Delete my notebooks</p>
            <button
              className="btn btn-error text-error-content"
              onClick={() => {
                setMessage({
                  title: APP_CONSTANTS.DELETE_NOTEBOOKS_MODAL_TITLE,
                  textContent:
                    APP_CONSTANTS.DELETE_NOTEBOOKS_MODAL_TEXT_CONTENT,
                  firstButtonClassName: "btn btn-error",
                  secondButtonClassName: "btn",
                  firstButtonText: APP_CONSTANTS.DELETE,
                  secondButtonText: APP_CONSTANTS.CANCEL,
                  firstButtonOnClick: function () {
                    deleteAllNotebooks();
                  },
                  secondButtonOnClick: function () {
                    if (
                      document.getElementById(APP_CONSTANTS.GENERIC_MODAL) !=
                      null
                    ) {
                      document
                        .getElementById(APP_CONSTANTS.GENERIC_MODAL)
                        .close();
                    }
                  },
                });
                document
                  .getElementById(APP_CONSTANTS.GENERIC_MODAL)
                  .showModal();
              }}
              disabled={!canDelete() || deletingNotebooks}
            >
              {!deletingNotebooks ? (
                APP_CONSTANTS.DELETE
              ) : (
                <span className="loading loading-spinner"></span>
              )}
            </button>
          </div>

          <div className="flex justify-between mt-4">
            <p className="font-medium">Delete my account</p>
            <button
              className="btn btn-error text-error-content"
              disabled={deletingAccount}
              onClick={() => {
                setMessage({
                  title: APP_CONSTANTS.DELETE_ACCOUNT_MODAL_TITLE,
                  textContent: APP_CONSTANTS.DELETE_ACCOUNT_MODAL_TEXT_CONTENT,
                  firstButtonClassName: "btn btn-error",
                  secondButtonClassName: "btn",
                  firstButtonText: APP_CONSTANTS.DELETE,
                  secondButtonText: APP_CONSTANTS.CANCEL,
                  firstButtonOnClick: function () {
                    deleteAccount();
                  },
                  secondButtonOnClick: function () {
                    if (
                      document.getElementById(APP_CONSTANTS.GENERIC_MODAL) !=
                      null
                    ) {
                      document
                        .getElementById(APP_CONSTANTS.GENERIC_MODAL)
                        .close();
                    }
                  },
                });
                document
                  .getElementById(APP_CONSTANTS.GENERIC_MODAL)
                  .showModal();
              }}
            >
              {!deletingAccount ? (
                APP_CONSTANTS.DELETE
              ) : (
                <span className="loading loading-spinner"></span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsArea;

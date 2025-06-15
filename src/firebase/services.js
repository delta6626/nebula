import { auth, firestore } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  getDoc,
  doc,
  setDoc,
  addDoc,
  getDocs,
  collection,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { APP_CONSTANTS } from "../constants/APP_CONSTANTS";

export function getUserData() {
  return getAuthenticatedUser().then((result) => {
    const currentUserId = result.uid;
    const userDocRef = doc(firestore, "users", currentUserId);

    return getDoc(userDocRef).then((docSnap) => {
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        return null;
      }
    });
  });
}

export function updateUserData(userObject) {
  return getAuthenticatedUser().then((result) => {
    return setDoc(doc(firestore, "users", result.uid), userObject, {
      merge: true,
    });
  });
}

function addUserToDatabase(uid, name, email, authenticationMethod, theme) {
  const basicUserSchema = {
    deleted: "false",
    lastMassDeletionTime: null,
    name: name,
    email: email,
    authenticationMethod: authenticationMethod,
    tierType: APP_CONSTANTS.BASIC_TIER,
    tags: [],
    pinnedNotes: [],
    shortcuts: {
      DASHBOARD_PAGE: "D", // ctrl+shift+__
      NOTES_PAGE: "N", // ctrl+shift+__
      NOTEBOOKS_PAGE: "B", // ctrl+shift+__
      SETTINGS_PAGE: "S", // ctrl+shift+__
      PINNED_PAGE: "P", // shift+__
      RECENT_PAGE: "R", // shift+__
      TAGGED_PAGE: "T", // shift+__
      UNTAGGED_PAGE: "U", // shift+__
      CLOSE: "X", // alt+__
      NEW_NOTE: "N", // shift+__
      NEW_NOTE_BOOK: "B", // shift+__
    },
    preferences: {
      theme: theme,
      autoSpacing: true,
      strictTagMatching: false,
      autoSaveTriggerTime: 1,
      language: APP_CONSTANTS.ENGLISH,
      subscribedToEmailNotifications: true,
    },
  };

  return setDoc(doc(firestore, "users", uid), basicUserSchema);
}

export function logInWithEmailAndPassword(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

/**
 * Creates a new user with email and password and adds them to Firestore
 */
export function createNewUserWithEmailAndPassword(
  name,
  email,
  password,
  authenticationMethod,
  theme,
) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      const uid = userCredentials.user.uid;
      return addUserToDatabase(uid, name, email, authenticationMethod, theme);
    })
    .then(() => {
      return APP_CONSTANTS.SUCCESS;
    })
    .catch((error) => {
      throw error;
    });
}

// Sign in with Google
export function googleAuthSignIn(theme) {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
    .then((result) => {
      const extraInformation = getAdditionalUserInfo(result);
      if (extraInformation.isNewUser) {
        return addUserToDatabase(
          result.user.uid,
          result.user.displayName,
          result.user.email,
          APP_CONSTANTS.WITH_GOOGLE,
          theme,
        );
      } else {
        return;
      }
    })
    .catch((error) => {
      throw error;
    });
}

export function resetPassword(email) {
  return sendPasswordResetEmail(auth, email);
}

export function getAuthenticatedUser() {
  return new Promise((resolve) => {
    // onAuthStateChanged will call this function when authentication state changes
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user); // If a user is authenticated, resolve with user info
      } else {
        resolve(APP_CONSTANTS.UNAUTHENTICATED); // If no user, resolve with 'Unauthenticated'
      }
    });
  });
}

export function getAllNotes() {
  return getAuthenticatedUser().then((user) => {
    const notesRef = collection(firestore, "users", user.uid, "notes");
    return getDocs(notesRef);
  });
}

export function getAllNotebooks() {
  return getAuthenticatedUser().then((user) => {
    const notebooksRef = collection(firestore, "users", user.uid, "notebooks");
    return getDocs(notebooksRef);
  });
}

export function addNoteToDatabase(noteName, assignedNotebook, tags) {
  const basicNoteSchema = {
    name: noteName,
    assignedTo: assignedNotebook,
    content: "",
    pinned: false,
    referencedBy: {},
    references: {},
    tags: tags,
    editorWidth: APP_CONSTANTS.ULTRA_LARGE,
    creationDate: new Date(),
    lastEditDate: new Date(),
  };

  return getAuthenticatedUser().then((user) => {
    const notesCollection = collection(firestore, "users", user.uid, "notes");
    return addDoc(notesCollection, basicNoteSchema);
  });
}

export function addNotebookToDatabase(notebookName, tags) {
  const basicNotebookSchema = {
    name: notebookName,
    tags: tags,
    pinned: false,
    creationDate: new Date(),
    lastEditDate: new Date(),
  };

  return getAuthenticatedUser().then((user) => {
    const notebooksCollection = collection(
      firestore,
      "users",
      user.uid,
      "notebooks",
    );
    return addDoc(notebooksCollection, basicNotebookSchema);
  });
}

export function updateNote(
  noteId,
  newNoteName,
  newAssignedTo,
  newTagList,
  newLastEditDate,
) {
  return getAuthenticatedUser().then((user) => {
    const noteDocRef = doc(firestore, "users", user.uid, "notes", noteId);
    return updateDoc(noteDocRef, {
      name: newNoteName,
      assignedTo: newAssignedTo,
      tags: newTagList,
      lastEditDate: newLastEditDate,
    });
  });
}

export function updateNoteFromEditor(noteId, updatedNotePropertiesObject) {
  return getAuthenticatedUser().then((user) => {
    const noteDocRef = doc(firestore, "users", user.uid, "notes", noteId);
    return updateDoc(noteDocRef, updatedNotePropertiesObject);
  });
}

export function updateNotebook(
  notebookId,
  oldNotebookName,
  newNotebookName,
  newTagList,
  newLastEditDate,
) {
  return getAuthenticatedUser().then((user) => {
    const notebookRef = doc(
      firestore,
      "users",
      user.uid,
      "notebooks",
      notebookId,
    );

    const notesRef = collection(firestore, "users", user.uid, "notes");
    const notesQuery = query(
      notesRef,
      where("assignedTo", "==", [notebookId, oldNotebookName]),
    );

    return getDocs(notesQuery).then((snapshots) => {
      const updatePromises = [];

      snapshots.forEach((noteDoc) => {
        updatePromises.push(
          updateDoc(noteDoc.ref, { assignedTo: [notebookId, newNotebookName] }),
        );
      });

      return Promise.all(updatePromises).then(() =>
        updateDoc(notebookRef, {
          name: newNotebookName,
          tags: newTagList,
          lastEditDate: newLastEditDate,
        }),
      );
    });
  });
}

export function hardDeleteNote(noteId) {
  return getAuthenticatedUser().then((user) => {
    const noteDocRef = doc(firestore, "users", user.uid, "notes", noteId);
    return deleteDoc(noteDocRef);
  });
}

export function hardDeleteNotebookAndLinkedNotes(notebookId, notebookName) {
  return getAuthenticatedUser().then((user) => {
    const notebookRef = doc(
      firestore,
      "users",
      user.uid,
      "notebooks",
      notebookId,
    );

    const notesRef = collection(firestore, "users", user.uid, "notes");
    const notesQuery = query(
      notesRef,
      where("assignedTo", "==", [notebookId, notebookName]),
    );

    return getDocs(notesQuery).then((snapshots) => {
      const deletePromises = [];

      snapshots.forEach((noteDoc) => {
        deletePromises.push(deleteDoc(noteDoc.ref));
      });

      return Promise.all(deletePromises).then(() => deleteDoc(notebookRef));
    });
  });
}

export function updatePinStatus(noteId, currentPinStatus) {
  return getAuthenticatedUser().then((user) => {
    const noteDocRef = doc(firestore, "users", user.uid, "notes", noteId);
    return updateDoc(noteDocRef, { pinned: !currentPinStatus });
  });
}

export function updateNotebookPinStatus(notebookId, currentPinStatus) {
  return getAuthenticatedUser().then((user) => {
    const notebookRef = doc(
      firestore,
      "users",
      user.uid,
      "notebooks",
      notebookId,
    );
    return updateDoc(notebookRef, { pinned: !currentPinStatus });
  });
}

export function softDeleteAllNotes() {
  return getAuthenticatedUser().then(function (user) {
    const notesRef = collection(firestore, "users", user.uid, "notes");

    return getDocs(notesRef).then(function (snapshot) {
      var updatePromises = [];

      snapshot.forEach(function (docSnap) {
        var updatePromise = updateDoc(docSnap.ref, {
          deleted: true,
        });
        updatePromises.push(updatePromise);
      });

      return Promise.all(updatePromises);
    });
  });
}

export function softDeleteAllNotebooks() {
  return getAuthenticatedUser().then(function (user) {
    const notebooksRef = collection(firestore, "users", user.uid, "notebooks");

    return getDocs(notebooksRef).then(function (snapshot) {
      var updatePromises = [];

      snapshot.forEach(function (docSnap) {
        var updatePromise = updateDoc(docSnap.ref, {
          deleted: true,
        });
        updatePromises.push(updatePromise);
      });

      return Promise.all(updatePromises);
    });
  });
}

export function sendVerificationEmail() {
  return sendEmailVerification(auth.currentUser);
}

export function signOutUser() {
  return signOut(auth);
}

export function deleteUserAccount() {
  return getAuthenticatedUser().then((user) => {
    return user.delete();
  });
}

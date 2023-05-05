import { db } from "../../firebase-config";
import {
  doc,
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";

const usersCollectionRef = collection(db, "users");

export const userService = {
  getAllUsers: () => {
    return getDocs(usersCollectionRef);
  },
  addUser: (newUser) => {
    return addDoc(usersCollectionRef, newUser);
  },
  deleteUser: (id) => {
    return deleteDoc(doc(db, "users", id));
  },
  updateUser: (id, newUser) => {
    return setDoc(doc(db, "users", id), newUser);
  },
};

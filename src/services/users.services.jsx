import { db } from "../../firebase-config";
import {
  doc,
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  setDoc,
  query,
  where,
  getDoc,
} from "firebase/firestore";

const usersCollectionRef = collection(db, "users");

export const userService = {
  getAllUsers: () => {
    return getDocs(usersCollectionRef);
  },
  addUser: async (newUser) => {
    let q = await getDocs(
      query(usersCollectionRef, where("email", "==", newUser.email))
    );
    let docs = q.docs;
    if (docs.length > 0) {
      return "0";
    } else {
      return addDoc(usersCollectionRef, newUser);
    }
  },
  deleteUser: (id) => {
    return deleteDoc(doc(db, "users", id));
  },
  updateUser: (id, newUser) => {
    return setDoc(doc(db, "users", id), newUser);
  },

  signIn: async (email, pass) => {
    let q = await getDocs(
      query(
        usersCollectionRef,
        where("email", "==", email),
        where("password", "==", pass)
      )
    );
    let docs = q.docs;
    if (docs.length > 0) {
      let keyArr = docs[0]._key.path.segments;
      let key = keyArr[keyArr.length - 1];
      let user = (await getDoc(doc(db, "users", key))).data();
      let isAdmin = Object.prototype.hasOwnProperty.call(user, "type");
      return [key, isAdmin];
    } else {
      return [0];
    }
  },
};

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

  signIn: (email, pass) => {
    console.log(email + " " + pass)
    return usersCollectionRef
      .where("email", "==", email)
      .where("password", "==", pass)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
      })
  }
};

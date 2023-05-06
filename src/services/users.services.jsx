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

  signIn: async (email, pass) => {
    console.log(email + " " + pass);
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

      return key;
    } else {
      return "0";
    }

    // return usersCollectionRef
    //   .where("email", "==", email)
    //   .where("password", "==", pass)
    //   .get()
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       console.log(doc.id, " => ", doc.data());
    //     });
    //   });
  },
};

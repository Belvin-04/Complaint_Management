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

const complaintsCollectionRef = collection(db, "complaints");

export const complaintService = {
  getAllComplaints: () => {
    return getDocs(complaintsCollectionRef);
  },
  getMyComplaints: async () => {
    let q = await getDocs(
      query(
        complaintsCollectionRef,
        where("user_id", "==", sessionStorage.getItem("user"))
      )
    );
    return q;
  },
  addComplaint: async (newComplaint) => {
    let q = await getDocs(
      query(
        complaintsCollectionRef,
        where("title", "==", newComplaint.title),
        where("user_id", "==", sessionStorage.getItem("user"))
      )
    );
    if (q.docs.length > 0) {
      return "0";
    } else {
      return addDoc(complaintsCollectionRef, newComplaint);
    }
  },
  deleteComplaint: (id) => {
    return deleteDoc(doc(db, "complaints", id));
  },
  updateComplaint: (id, newComplaint) => {
    return setDoc(doc(db, "complaints", id), newComplaint);
  },
};

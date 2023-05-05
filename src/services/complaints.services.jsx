import { db } from "../../firebase-config";
import {
  doc,
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";

const complaintsCollectionRef = collection(db, "complaints");

export const complaintService = {
  getAllComplaints: () => {
    return getDocs(complaintsCollectionRef);
  },
  addComplaint: (newComplaint) => {
    return addDoc(complaintsCollectionRef, newComplaint);
  },
  deleteComplaint: (id) => {
    return deleteDoc(doc(db, "complaints", id));
  },
  updateComplaint: (id, newComplaint) => {
    return setDoc(doc(db, "complaints", id), newComplaint);
  },
};

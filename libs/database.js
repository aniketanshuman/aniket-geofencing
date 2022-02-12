import firebase from "./firebase";

const firestore = firebase.firestore();

export function createUser(uid, data) {
    const _ = firestore
    .collection("current_locations")
    .doc(uid)
    .set({ 'lat':'0', 'long':'0' }, { merge: true });

  return firestore
    .collection("user_details")
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export function editLocation(uid, lat, long) {
    firestore.collection("current_locations").doc(uid).update({lat, long});
    console.log("Location added in firebase!");
}
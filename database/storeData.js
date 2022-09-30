import { auth, db } from '../firebase'


// Add a new user document to the users subcollection.
const usersRef = collection(db, "Users")
const userData = {
    firstName: input.firstName,
    lastName: input.lastName,
    status: input.status,
    email: formData.email,
}
await addDoc(usersRef, userData, "U.Id")
import { createContext, useEffect, useState } from "react";
import { app, auth } from "../config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getFirestore, getDoc } from "firebase/firestore";


const UserContext = createContext();
const db = getFirestore(app)

const UserProvider = ({ children }) => {
    const [user, setUser] = useState()
    const [profile, setProfile] = useState()
    const [logged, setLogged] = useState(false)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (UserConected) => {
            if (UserConected) {
                const userDocRef = doc(db, "users", UserConected.uid)
                try {
                    const docSnap = await getDoc(userDocRef)
                    if (!docSnap.exists()) {
                        setProfile({})
                    }
                    setProfile(docSnap.data())
                    setLogged(true)
                } catch (error) {
                    console.log(error)
                    setProfile({})
                }
            } else {
                setProfile({})
                setLogged(false)
            }
        })
        return () => unsubscribe()

    }, [])

    return (<UserContext value={{ user, setUser, profile, setProfile, logged }}> {children} </UserContext>)
}

export { UserContext, UserProvider }
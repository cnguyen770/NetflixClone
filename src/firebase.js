import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth,
    signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore} from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
    apiKey: "AIzaSyBPHXy4c64qPZ2jDy79JwL2Ol32A9smBTE",
    authDomain: "netflix-clone-60ae3.firebaseapp.com",
    projectId: "netflix-clone-60ae3",
    storageBucket: "netflix-clone-60ae3.appspot.com",
    messagingSenderId: "526852446790",
    appId: "1:526852446790:web:e8c566219f3d3708368847"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name, email, password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password)=>{
    try{
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, signUp, login, logout};
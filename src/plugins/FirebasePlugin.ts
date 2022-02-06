import Phaser from 'phaser'
import { getFirestore, Firestore, DocumentSnapshot, getDoc } from 'firebase/firestore'
import { onAuthStateChanged, Unsubscribe, GoogleAuthProvider } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
//import { getAnalytics } from 'firebase/analytics';
import { setDoc, doc } from 'firebase/firestore';
import {
    getAuth,
    createUserWithEmailAndPassword,
    Auth,
    signInWithEmailAndPassword,
    signInAnonymously,
    signInWithPopup
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC_enjE9sqq77shfsQspJS2WCg7jwQl3wE",
    authDomain: "rori-main.firebaseapp.com",
    projectId: "rori-main",
    storageBucket: "rori-main.appspot.com",
    messagingSenderId: "145565155435",
    appId: "1:145565155435:web:3acda600019144b711312e",
    measurementId: "G-7FWJP57NY6"
};

// Initialize Firebase

export default class FirebasePlugin extends Phaser.Plugins.BasePlugin {

    private readonly db: Firestore
    private readonly auth: Auth
    private authStateChangedUnsubscribe: Unsubscribe
    private onLoggedInCallback?: () => void;
    private googleProvider: GoogleAuthProvider;

    constructor(manager: Phaser.Plugins.PluginManager) {
        super(manager);

        const app = initializeApp(firebaseConfig);
        this.db = getFirestore(app);
        this.auth = getAuth(app);
        this.googleProvider = new GoogleAuthProvider();

        this.authStateChangedUnsubscribe = onAuthStateChanged(this.auth, (user) => {
            if (user && this.onLoggedInCallback) {
                console.log("user", this.auth.currentUser)
                this.onLoggedInCallback()
            }
        })
        //  let analytics = getAnalytics(app);

    }

    destroy() {
        this.authStateChangedUnsubscribe()
        super.destroy();

    }

    onLoggedIn(callback: () => void) {
        this.onLoggedInCallback = callback
    }


    async saveGameDate(userId: string, data: { name: string, score: number }) {
        await setDoc(doc(this.db, `game-data`, userId), data)
    }


    async loadGameData(userId: string) {
        const snap = await getDoc(doc(this.db, `game-data`, userId)) as DocumentSnapshot<{ name: string, score: number }>
        return snap.data()

    }


    async createUserWithEmailAndPassword(email: string, password: string) {
        const credentials = await createUserWithEmailAndPassword(this.auth, email, password)
        return credentials.user
    }

    async signInUser(email: string, password: string) {
        const credentials = await signInWithEmailAndPassword(this.auth, email, password)
        return credentials.user
    }


    async signInAnonymously() {
        const credentials = await signInAnonymously(this.auth)
        return credentials.user

    }

    async signInWithPopup() {
        const credentials = await signInWithPopup(this.auth, this.googleProvider)
        return credentials.user
    }
    getUser() {
        return this.auth.currentUser
    }


}
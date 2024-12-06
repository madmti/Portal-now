import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB6xbv3R_LTCcF8-8Wfa4HN3SXJbfWBakI",
    authDomain: "portal-now-b89fa.firebaseapp.com",
    projectId: "portal-now-b89fa",
    storageBucket: "portal-now-b89fa.firebasestorage.app",
    messagingSenderId: "761311632941",
    appId: "1:761311632941:web:c26c87ce7b99d293a662a4",
    measurementId: "G-0PFXFJJ3SH"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);

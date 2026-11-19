import { collection, doc, updateDoc, getDoc, getDocs, addDoc, deleteDoc } from "firebase/firestore";
import getFirebaseDB from "../Firebase";
import { PrefixStorage } from "../../constanst";

async function get() {
    try {
        const skupTehnika = collection(getFirebaseDB(), PrefixStorage.TEHNIKE);
        const tehnikeSnapshot = await getDocs(skupTehnika);
        return {
            success: true, 
            data: tehnikeSnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    sifra: doc.id,
                    ...data
                };
            }) 
        };
    } catch (e) {
        console.error("Greška kod dohvaćanja tehnika: ", e);
        return {
            success: false,
            message: e.message
        };
    }
}

async function dodaj(tehnika) {
    try {
        const skupTehnika = collection(getFirebaseDB(), PrefixStorage.TEHNIKE);
        const docRef = await addDoc(skupTehnika, tehnika);
        
        return {
            success: true,
            id: docRef.id
        };
    } catch (e) {
        console.error("Greška kod dodavanja tehnike: ", e);
        return {
            success: false,
            message: e.message
        };
    }
}

async function getBySifra(sifra) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.TEHNIKE, sifra);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                success: true,
                data: {
                    sifra: docSnap.id,
                    ...data
                }
            };
        } else {
            return { 
                success: false, 
                message: "Tehnika s tom šifrom ne postoji u bazi." 
            };
        }
    } catch (e) {
        console.error("Greška kod dohvaćanja tehnike po šifri: ", e);
        return { 
            success: false, 
            message: e.message 
        };
    }
}

async function promijeni(sifra, tehnika) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.TEHNIKE, sifra);
        await updateDoc(docRef, tehnika);

        return { success: true };
    } catch (e) {
        console.error("Greška kod promjene tehnike: ", e);
        return { success: false, message: e.message };
    }
}

async function obrisi(sifra) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.TEHNIKE, sifra);
        await deleteDoc(docRef);
        return {
            success: true,
            message: "Uspješno obrisano"
        };
    } catch (e) {
        console.error("Greška kod brisanja tehnike: ", e);
        return {
            success: false,
            message: e.message
        };
    }
}

export default {
    get,
    dodaj,
    promijeni,
    getBySifra,
    obrisi
}
import { collection, doc, updateDoc, getDoc, getDocs, addDoc, deleteDoc } from "firebase/firestore";
import getFirebaseDB from "../Firebase";
import { PrefixStorage } from "../../constanst";

async function get() {
    try {
        const skupOznaka = collection(getFirebaseDB(), PrefixStorage.OZNAKE);
        const oznakeSnapshot = await getDocs(skupOznaka);
        return {
            success: true, 
            data: oznakeSnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    sifra: doc.id,
                    ...data
                };
            }) 
        };
    } catch (e) {
        console.error("Greška kod dohvaćanja oznaka: ", e);
        return {
            success: false,
            message: e.message
        };
    }
}

async function dodaj(oznaka) {
    try {
        const skupOznaka = collection(getFirebaseDB(), PrefixStorage.OZNAKE);
        const docRef = await addDoc(skupOznaka, oznaka);
        
        return {
            success: true,
            id: docRef.id
        };
    } catch (e) {
        console.error("Greška kod dodavanja oznake: ", e);
        return {
            success: false,
            message: e.message
        };
    }
}

async function getBySifra(sifra) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.OZNAKE, sifra);
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
                message: "Oznaka s tom šifrom ne postoji u bazi." 
            };
        }
    } catch (e) {
        console.error("Greška kod dohvaćanja oznake po šifri: ", e);
        return { 
            success: false, 
            message: e.message 
        };
    }
}

async function promijeni(sifra, oznaka) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.OZNAKE, sifra);
        await updateDoc(docRef, oznaka);

        return { success: true };
    } catch (e) {
        console.error("Greška kod promjene oznake: ", e);
        return { success: false, message: e.message };
    }
}

async function obrisi(sifra) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.OZNAKE, sifra);
        await deleteDoc(docRef);
        return {
            success: true,
            message: "Uspješno obrisano"
        };
    } catch (e) {
        console.error("Greška kod brisanja oznake: ", e);
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
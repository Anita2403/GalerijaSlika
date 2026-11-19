import { collection, doc, updateDoc, getDoc, getDocs, addDoc, deleteDoc } from "firebase/firestore";
import getFirebaseDB from "../Firebase";
import { PrefixStorage } from "../../constanst";

async function get() {
    try {
        const skupSlika = collection(getFirebaseDB(), PrefixStorage.SLIKE);
        const slikeSnapshot = await getDocs(skupSlika);
        return {
            success: true, 
            data: slikeSnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    sifra: doc.id,
                    ...data
                };
            }) 
        };
    } catch (e) {
        console.error("Greška kod dohvaćanja slika: ", e);
        return {
            success: false,
            message: e.message
        };
    }
}

async function dodaj(slika) {
    try {
        const skupSlika = collection(getFirebaseDB(), PrefixStorage.SLIKE);
        const docRef = await addDoc(skupSlika, slika);
        
        return {
            success: true,
            id: docRef.id
        };
    } catch (e) {
        console.error("Greška kod dodavanja slike: ", e);
        return {
            success: false,
            message: e.message
        };
    }
}

async function getBySifra(sifra) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.SLIKE, sifra);
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
                message: "Slika s tom šifrom ne postoji u bazi." 
            };
        }
    } catch (e) {
        console.error("Greška kod dohvaćanja po šifri: ", e);
        return { 
            success: false, 
            message: e.message 
        };
    }
}

async function promijeni(sifra, slika) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.SLIKE, sifra);
        await updateDoc(docRef, slika);

        return { success: true };
    } catch (e) {
        console.error("Greška kod promjene: ", e);
        return { success: false, message: e.message };
    }
}

async function obrisi(sifra) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.SLIKE, sifra);
        await deleteDoc(docRef);
        return {
            success: true,
            message: "Uspješno obrisano"
        };
    } catch (e) {
        console.error("Greška kod brisanja: ", e);
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
};
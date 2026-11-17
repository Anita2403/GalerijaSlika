import { collection, doc, updateDoc, getDoc, getDocs, addDoc, deleteDoc } from "firebase/firestore";
import getFirebaseDB from "../Firebase";
import { PrefixStorage } from "../../constanst";

async function get() {
    try {
        const skupSlika = collection(getFirebaseDB(), PrefixStorage.SLIKE);
        const slikeSnapshot = await getDocs(skupSlika);
        
        const data = slikeSnapshot.docs.map(document => {
            const docData = document.data();
            return {
                sifra: document.id,
                ...docData
            };
        });

        return { data };
    } catch (e) {
        console.error("Greška kod dohvaćanja slika: ", e);
        return { data: [] };
    }
}

async function dodaj(slika) {
    try {
        const slikaZaSlanje = { ...slika };
        
        const skupSlika = collection(getFirebaseDB(), PrefixStorage.SLIKE);
        const docRef = await addDoc(skupSlika, slikaZaSlanje);
        
        return {
            success: true,
            sifra: docRef.id
        };
    } catch (e) {
        console.error("Greška kod dodavanja slike: ", e);
        throw e;
    }
}

async function getBySifra(sifra) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.SLIKE, sifra);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            const docData = docSnap.data();
            return {
                data: {
                    sifra: docSnap.id,
                    ...docData
                }
            };
        } else {
            throw new Error("Slika s tom šifrom ne postoji u bazi.");
        }
    } catch (e) {
        console.error("Greška kod dohvaćanja po šifri: ", e);
        throw e;
    }
}

async function promijeni(sifra, slika) {
    try {
        const slikaZaSlanje = { ...slika };
        delete slikaZaSlanje.sifra;

        const docRef = doc(getFirebaseDB(), PrefixStorage.SLIKE, sifra);
        await updateDoc(docRef, slikaZaSlanje);

        return { success: true };
    } catch (e) {
        console.error("Greška kod promjene slike: ", e);
        throw e;
    }
}

async function obrisi(sifra) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.SLIKE, sifra);
        await deleteDoc(docRef);
        return {
            success: true
        };
    } catch (e) {
        console.error("Greška kod brisanja slike: ", e);
        throw e;
    }
}

export default {
    get,
    dodaj,
    promijeni,
    getBySifra,
    obrisi
};
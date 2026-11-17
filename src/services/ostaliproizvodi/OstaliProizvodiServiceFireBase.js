import { collection, doc, updateDoc, getDoc, getDocs, addDoc, deleteDoc } from "firebase/firestore";
import getFirebaseDB from "../Firebase";
import { PrefixStorage } from "../../constanst";

async function get() {
    try {
        const skupOstaliProizvodi = collection(getFirebaseDB(), PrefixStorage.OSTALIPROIZVODI);
        const ostaliproizvodiSnapshot = await getDocs(skupOstaliProizvodi);
        
        const data = ostaliproizvodiSnapshot.docs.map(document => {
            const docData = document.data();
            return {
                sifra: document.id,
                ...docData
            };
        });

        return { data };
    } catch (e) {
        console.error("Greška kod dohvaćanja ostalih proizvoda: ", e);
        return { data: [] };
    }
}

async function dodaj(ostaliproizvodi) {
    try {
        const ostaliproizvodiZaSlanje = { ...ostaliproizvodi };
        
        const skupOstaliProizvodi = collection(getFirebaseDB(), PrefixStorage.OSTALIPROIZVODI);
        const docRef = await addDoc(skupOstaliProizvodi, ostaliproizvodiZaSlanje);
        
        return {
            success: true,
            sifra: docRef.id
        };
    } catch (e) {
        console.error("Greška kod dodavanja ostalih proizvoda: ", e);
        throw e;
    }
}

async function getBySifra(sifra) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.OSTALIPROIZVODI, sifra);
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
            throw new Error("Ostali proizvodi s tom šifrom ne postoji u bazi.");
        }
    } catch (e) {
        console.error("Greška kod dohvaćanja po šifri: ", e);
        throw e;
    }
}

async function promijeni(sifra, ostaliproizvodi) {
    try {
        const ostaliproizvodiZaSlanje = { ...ostaliproizvodi };
        delete ostaliproizvodiZaSlanje.sifra;

        const docRef = doc(getFirebaseDB(), PrefixStorage.OSTALIPROIZVODI, sifra);
        await updateDoc(docRef, ostaliproizvodiZaSlanje);

        return { success: true };
    } catch (e) {
        console.error("Greška kod promjene ostalih proizvoda: ", e);
        throw e;
    }
}

async function obrisi(sifra) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.OSTALIPROIZVODI, sifra);
        await deleteDoc(docRef);
        return {
            success: true
        };
    } catch (e) {
        console.error("Greška kod brisanja ostalih proizvoda: ", e);
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
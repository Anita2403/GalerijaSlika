import { collection, doc, updateDoc, getDoc, getDocs, addDoc, deleteDoc, query, orderBy, limit, startAfter, where } from "firebase/firestore";
import getFirebaseDB from "../Firebase";
import { PrefixStorage } from "../../constanst";

// 1/4 Read - dohvati sve
async function get() {
    try {
        const skupTehnika = collection(getFirebaseDB(), PrefixStorage.TEHNIKE);
        const snapshot = await getDocs(skupTehnika);
        const data = snapshot.docs.map(doc => ({
            sifra: doc.id,
            ...doc.data()
        }));
        return { success: true, data: data };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

// Dohvati jedan po šifri
async function getBySifra(sifra) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.TEHNIKE, sifra);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { success: true, data: { sifra: docSnap.id, ...docSnap.data() } };
        }
        return { success: false, message: "Tehnika nije pronađena" };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

// 2/4 Create - dodaj novi
async function dodaj(tehnika) {
    try {
        const skupTehnika = collection(getFirebaseDB(), PrefixStorage.TEHNIKE);
        const docRef = await addDoc(skupTehnika, tehnika);
        return { success: true, data: { sifra: docRef.id, ...tehnika } };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

// 3/4 Update - promjeni postojeći
async function promijeni(sifra, tehnika) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.TEHNIKE, sifra);
        await updateDoc(docRef, tehnika);
        return { success: true, data: { sifra, ...tehnika } };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

// 4/4 Delete - obriši
async function obrisi(sifra) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.TEHNIKE, sifra);
        await deleteDoc(docRef);
        return { success: true, message: 'Uspješno obrisano' };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

/**
 * Straničenje - dohvati stranicu polaznika
 * NAPOMENA: Firestore ne podržava "offset" na način kao SQL ili JS slice.
 * Ovdje koristimo pojednostavljenu verziju koja dohvaća podatke i filtrira ih.
 */
async function dohvatiStranicu(stranica = 1, velicinaStranice = 8, uvjetPretrazivanja = '') {
    try {
        const skupTehnika = collection(getFirebaseDB(), PrefixStorage.TEHNIKE);
        let q = query(skupTehnika, orderBy("prezime"));

        const snapshot = await getDocs(q);
        let tehnike = snapshot.docs.map(doc => ({
            sifra: doc.id,
            ...doc.data()
        }));
        // Filtriranje (budući da Firestore ne podržava kompleksni "OR" search na više polja s "includes")
        if (uvjetPretrazivanja && uvjetPretrazivanja.trim() !== '') {
            const lowerSearchTerm = uvjetPretrazivanja.toLowerCase().trim();
            tehnike = tehnike.filter(p =>
                (p.ime || '').toLowerCase().includes(lowerSearchTerm) ||
                (p.prezime || '').toLowerCase().includes(lowerSearchTerm) ||
                (p.email || '').toLowerCase().includes(lowerSearchTerm) ||
                (p.oib || '').toLowerCase().includes(lowerSearchTerm)
            );
        }
        
        const pocetniIndeks = (stranica - 1) * velicinaStranice;
        const zavrsniIndeks = pocetniIndeks + velicinaStranice;
        const stranicenjePodaci = tehnike.slice(pocetniIndeks, zavrsniIndeks);
        const ukupnoStavki = tehnike.length;
        const ukupnoStranica = Math.ceil(ukupnoStavki / velicinaStranice);
        return {
            data: stranicenjePodaci,
            ukupnoStranica: ukupnoStranica,
            ukupnoStavki: ukupnoStavki
        };
    } catch (e) {
        console.error("Greška kod dohvaćanja stranice tehnika: ", e);
        return { success: false, message: e.message };
    }
}

export default {
    get,
    dodaj,
    getBySifra,
    promijeni,
    obrisi,
    dohvatiStranicu
};
import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';

export default function OstaliProizvodiPDFGenerator({ ostaliproizvod, materijal, oznake }) {

    const fetchFontAsBase64 = async (url) => {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Font nije pronađen: ${url}`);
        const blob = await response.blob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]);
            reader.readAsDataURL(blob);
        });
    };

    const generirajPDF = async () => {
        try {
            const [regBase64, boldBase64] = await Promise.all([
                fetchFontAsBase64('/fonts/Roboto-Regular.ttf'),
                fetchFontAsBase64('/fonts/Roboto-Bold.ttf')
            ]);

            const doc = new jsPDF();

            doc.addFileToVFS('Roboto-Regular.ttf', regBase64);
            doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
            doc.addFileToVFS('Roboto-Bold.ttf', boldBase64);
            doc.addFont('Roboto-Bold.ttf', 'Roboto', 'bold');

            const primaryColor = [30, 86, 49];    // Zelena
            const secondaryColor = [100, 116, 139]; // Siva
            const textColor = [30, 41, 59];        // Tamno plava/siva

            // Zaglavlje dokumenta
            doc.setFont('Roboto', 'bold');
            doc.setFontSize(22);
            doc.setTextColor(...primaryColor);
            doc.text('GALERIJA OSTALIH PROIZVODA', 15, 20);

            doc.setFont('Roboto', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(...secondaryColor);
            doc.text('DETALJNI IZVJEŠTAJ O PROIZVODU', 15, 26);

            // Ukrasna linija
            doc.setDrawColor(...primaryColor);
            doc.setLineWidth(0.6);
            doc.line(15, 30, 195, 30);

            // Podnaslovi s osnovnim podacima
            doc.setFont('Roboto', 'bold');
            doc.setFontSize(15);
            doc.setTextColor(...textColor);
            doc.text(`Naziv: ${ostaliproizvod?.naziv || 'N/A'}`, 15, 42);

            doc.setFont('Roboto', 'normal');
            doc.setFontSize(11);
            doc.setTextColor(...secondaryColor);
            doc.text(`Materijal: ${materijal?.naziv || '-'}`, 15, 49);

            // Formatiranje oznaka u lijepi string
            const oznakeText = Array.isArray(oznake) 
                ? oznake.map(o => o.naziv || o).join(', ') 
                : (oznake?.naziv || '-');

            let currentY = 56;

            // Tablica s podacima
            autoTable(doc, {
                startY: currentY,
                margin: { left: 15, right: 15 },
                theme: 'grid',
                styles: { 
                    font: 'Roboto', 
                    fontSize: 9.5, 
                    textColor: textColor, 
                    cellPadding: 4 
                },
                columnStyles: {
                    0: { fontStyle: 'bold', textColor: primaryColor, cellWidth: 90 },
                    1: { cellWidth: 90 }
                },
                head: [['OSNOVNE INFORMACIJE', 'DIMENZIJE I STATUS']],
                body: [
                    [
                        `Naziv proizvoda: ${ostaliproizvod?.naziv || '-'}`,
                        `Širina: ${ostaliproizvod?.sirina ? `${ostaliproizvod.sirina} cm` : '-'}`
                    ],
                    [
                        `Materijal: ${materijal?.naziv || '-'}`,
                        `Visina: ${ostaliproizvod?.visina ? `${ostaliproizvod.visina} cm` : '-'}`
                    ],
                    [
                        `Godina izrade: ${ostaliproizvod?.godinaIzrade || '-'}`,
                        `Dostupnost: ${ostaliproizvod?.dostupnost ? 'Dostupno' : 'Nedostupno'}`
                    ],
                    [
                        `Oznake / Motivi: ${oznakeText}`,
                        ''
                    ]
                ],
                didParseCell: (data) => {
                    if (data.section === 'head') {
                        data.cell.styles.fillColor = [241, 245, 249];
                        data.cell.styles.textColor = primaryColor;
                        data.cell.styles.fontStyle = 'bold';
                    }
                }
            });

            // Pozicija nakon tablice
            let nextY = doc.lastAutoTable.finalY + 8;

            // ISPIS OPISA ISPOD TABLICE
            doc.setFont('Roboto', 'bold');
            doc.setFontSize(10);
            doc.setTextColor(...primaryColor);
            doc.text('Opis:', 15, nextY);

            doc.setFont('Roboto', 'normal');
            doc.setFontSize(9.5);
            doc.setTextColor(...textColor);
            
            const opisTekst = ostaliproizvod?.opis || 'Nema unesenog opisa za ovaj proizvod.';
            const splitOpis = doc.splitTextToSize(opisTekst, 180); // 180mm širina teksta
            doc.text(splitOpis, 15, nextY + 5);

            // Izračunaj novu poziciju za sliku ovisno o duljini opisa
            const imageY = nextY + 5 + (splitOpis.length * 5) + 5;

            // Dodavanje slike ako postoji
            if (ostaliproizvod?.image) {
                doc.addImage(ostaliproizvod.image, 'PNG', 15, imageY, 80, 0); 
            }

            // Otvaranje PDF-a u novom tabu
            const pdfBlob = doc.output('blob');
            const pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl, '_blank');

        } catch (error) {
            console.error('Greška prilikom generiranja PDF-a:', error);
        }
    };

    return generirajPDF;
}
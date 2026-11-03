import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';

export default function SlikePDFGenerator({ slika, tehnika, oznake}) {

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
        const [regBase64, boldBase64] = await Promise.all([
            fetchFontAsBase64('/fonts/Roboto-Regular.ttf'),
            fetchFontAsBase64('/fonts/Roboto-Bold.ttf')
        ]);

        const doc = new jsPDF();
        console.log('Krenuo PDF')

        doc.addFileToVFS('Roboto-Regular.ttf', regBase64);
        doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
        doc.addFileToVFS('Roboto-Bold.ttf', boldBase64);
        doc.addFont('Roboto-Bold.ttf', 'Roboto', 'bold');

        const primaryColor = [30, 86, 49];   
        const secondaryColor = [100, 116, 139]; 
        const textColor = [30, 41, 59];     

    
        doc.setFont('Roboto', 'bold');
        doc.setFontSize(22);
        doc.setTextColor(...primaryColor);
        doc.text('SLIKA', 15, 20);

        doc.setFont('Roboto', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...secondaryColor);
        doc.text('PODACI O SLICI', 15, 26);

    
        doc.setDrawColor(255, 0, 0);
        doc.setLineWidth(0.8);
        doc.line(15, 30, 195, 30);


        doc.setFont('Roboto', 'bold');
        doc.setFontSize(16);
        doc.setTextColor(...textColor);
        doc.text(`Izvješće za sliku: ${slika?.naziv || 'N/A'}`, 15, 42);

        doc.setFont('Roboto', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(...textColor);
        doc.text(`Tehnika: ${tehnika?.naziv || '-'}`, 15, 47);


        let currentY = 52;

        autoTable(doc, {
            startY: currentY,
            margin: { left: 15, right: 15 },
            theme: 'plain',
            styles: { font: 'Roboto', fontSize: 9.5, textColor: textColor, cellPadding: 3 },
            columnStyles: {
                0: { fontStyle: 'bold', textColor: primaryColor, width: 85 },
                1: { fontStyle: 'bold', textColor: primaryColor, width: 85 }
            },
            head: [['PODACI O SLICI','PODACI O TEHNICI']],
            body: [
                [
                    `Naziv: ${slika?.naziv || '-'}`,
                    `Tehnika: ${tehnika?.naziv || '-'}`
                ],
                [
                    `Broj oznake: ${oznake?.length || 0}`,
                    `Godina izrade: ${slika?.godinaIzrade ? `${slika?.godinaIzrade} sati` : '-'}`
                ],
                [
                    `Širina: ${slika?.sirina || '-'}`,
                    `Visina: ${slika?.visina || '-'}`,
                    
                ],
                [
                    '',
                    `Opis: ${slika?.opis || '-'}`
                ],
                [
                    '',
                    `Dostupnost: ${slika?.aktivan ? 'Aktivan' : 'Neaktivan'}`
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

        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, '_blank');

    };
    return generirajPDF;
}
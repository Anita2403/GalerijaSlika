import { Container } from "react-bootstrap";
import TehnikaService from "../services/tehnike/TehnikaService";
import SlikaService from "../services/slike/SlikaService";
import MaterijalService from "../services/materijali/MaterijalService"; 
import { useEffect, useState } from "react";
import Highcharts from 'highcharts';
import { HighchartsReact } from "highcharts-react-official";
import OstaliProizvodiService from "../services/ostaliproizvodi/OstaliProizvodiService";

export default function NadzornaPloca() {

   const [podaciSlike, setPodaciSlike] = useState([]);
   const [podaciMaterijali, setPodaciMaterijali] = useState([]);

    async function getPodaci() {
        // 1. Dohvat za slike i tehnike
        const odgovorTehnike = await TehnikaService.get();
        const odgovorSlike = await SlikaService.get();

        const rezultatSlike = odgovorTehnike.data.map((tehnika) => {
            const brojSlika = odgovorSlike.data.filter((slika) => slika.tehnika == tehnika.sifra).length;
            return {
                name: tehnika.naziv,
                y: brojSlika
            };
        });
        setPodaciSlike(rezultatSlike);

        // 2. Dohvat za proizvode i materijale
        const odgovorMaterijali = await MaterijalService.get();
        const odgovorostaliProizvodi = await OstaliProizvodiService.get();

        const rezultatMaterijali = odgovorMaterijali.data.map((materijal) => {
            // Prilagodi 'proizvod.materijal' i 'materijal.sifra' ovisno o tvojoj baza/API strukturi
            const brojostalihProizvoda = odgovorostaliProizvodi.data.filter((ostaliproizvod) => ostaliproizvod.materijal == materijal.sifra).length;
            return {
                name: materijal.naziv, // ili materijal.naziv ovisno o propertyju
                y: brojostalihProizvoda
            };
        });
        setPodaciMaterijali(rezultatMaterijali);
    }

    useEffect(() => {
        getPodaci();
    }, []);

   const fixedOptions = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        backgroundColor: 'transparent',
    },
    // OVDJE MORAJU BITI BOJE (na vršnoj razini, izvan chart, plotOptions i ostalih objekata)
    colors: [
        '#cb72dd', 
        '#b85bc8', 
        '#d15888', 
        '#e5b3cb', 
        '#df89ef', 
        '#c46cd4', 
        '#b14fc2'
    ],
    title: {
        text: 'Broj slika po tehnici',
        align: 'left',
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b> ({point.y})',
    },
    accessibility: {
        enabled: false,
        point: {
            valueSuffix: '%',
        },
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            borderWidth: 2,
            borderColor: '#ffffff',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.y}',
                style: {
                    color: '#4a4141',
                    textOutline: 'none'
                }
            },
        },
    },
};

    return (
        <>
            <Container className='mt-4'>
                {/* Prvi graf: Slike po tehnikama */}
                {podaciSlike.length > 0 && (
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={{
                            ...fixedOptions,
                            title: {
                                text: 'Broj slika po tehnici',
                                align: 'left',
                            },
                            series: [
                                {
                                    name: 'Slike',
                                    colorByPoint: true,
                                    data: podaciSlike,
                                },
                            ],
                        }}
                    />
                )}

                {/* Drugi graf: Proizvodi po materijalima */}
                {podaciMaterijali.length > 0 && (
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={{
                            ...fixedOptions,
                            title: {
                                text: 'Broj ostalih proizvoda po materijalu',
                                align: 'left',
                            },
                            series: [
                                {
                                    name: 'Ostali proizvodi',
                                    colorByPoint: true,
                                    data: podaciMaterijali,
                                },
                            ],
                        }}
                    />
                )}
            </Container>
        </>
    )
}
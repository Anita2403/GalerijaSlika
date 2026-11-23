import { Container } from "react-bootstrap";
import TehnikaService from "../services/tehnike/TehnikaService";
import { useEffect, useState } from "react";
import Highcharts from 'highcharts';
import {HighchartsReact} from "highcharts-react-official";
import SlikaService from "../services/slike/SlikaService";

export default function NadzornaPloca() {

   const [podaci, setPodaci] = useState([]);

    async function getPodaci() {
        const odgovorTehnike = await TehnikaService.get();
        const odgovorSlike = await SlikaService.get();


        const rezultat = odgovorTehnike.data.map((tehnika) => {
            const brojSlika = odgovorSlike.data.filter((slika) => slika.tehnika == tehnika.sifra).length;

            return {
                name: tehnika.naziv,
                y: brojSlika
            };
        });
      


        setPodaci(rezultat);
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
        },
        title: {
            text: 'Broj slika po tehnici',
            align: 'left',
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
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
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>',
                },
            },
        },
    };

    return (
           <>
           <Container className='mt-4'>
                {podaci.length > 0 && (
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={{
                            ...fixedOptions,
                            series: [
                                {
                                    name: 'Slike',
                                    colorByPoint: true,
                                    data: podaci,
                                },
                            ],
                        }}
                    />
                )}
            </Container>
           </>
    )
}

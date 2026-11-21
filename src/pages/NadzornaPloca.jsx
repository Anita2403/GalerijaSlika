import { Container } from "react-bootstrap";
import TehnikaService from "../services/tehnike/TehnikaService";
import { useEffect, useState } from "react";
import Highcharts from 'highcharts';
import HighchartsReact from "highcharts-react-official";

export default function NadzornaPloca() {

   const [podaci, setPodaci] = useState([]);

    async function getPodaci() {
        const odgovor = await TehnikaService.get();
        setPodaci(odgovor.data.map((tehnika) => {
            return {
                y: tehnika.slike.length,
                name: tehnika.naziv,
            };
        }));
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

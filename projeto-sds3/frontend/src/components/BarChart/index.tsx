import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { SaleSucess } from 'types/sale';
import { round } from 'utils/format';
import { BASE_URL } from 'utils/requests';

type SeriesData = {
    name: string;
    data: number[];
}

type ChartData = {
    labels: {
        categories: string[];
    };
    series: SeriesData[];
}


function BarChart() {

    const [chartData, setChartData] = useState<ChartData>({
        labels: {
            categories: []
        },
        series: [
            {
                name: "",
                data: []
            }
        ]
    });

    useEffect(() => {
        axios.get(`${BASE_URL}/sales/sucess-by-seller`).then(response => {
            const data = response.data as SaleSucess[];
            const myLabels = data.map(x => x.sellerName);
            const mySeries = data.map(x => round(100.0 * (x.deals / x.visited), 1));

            setChartData({
                labels: {
                    categories: myLabels
                },
                series: [
                    {
                        name: "% Sucess",
                        data: mySeries
                    }
                ]
            });
        });
    }, [])

    //estrutura do gráfico
    const options = {
        plotOptions: {
            bar: {
                horizontal: true,
            }
        },
    };

    //No return somente a estrutura de código visivel
    //estrutrua lógica antes do return
    return (
        <Chart
            options={{ ...options, xaxis: chartData.labels }}
            //valores do gráfico
            series={chartData.series}
            //tipo grafico
            type="bar"
            height="240"
        />
    );
}

export default BarChart;

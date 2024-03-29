import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { SaleSum } from 'types/sale';
import { BASE_URL } from 'utils/requests';

type ChartData = { 
    labels: string[];
    series: number[];
}

function DonutChart() {

    const [chartData, setchartData] = useState<ChartData>({labels: [], series: []}); 
    useEffect(() => {
        axios.get(`${BASE_URL}/sales/amount-by-seller`).then(response => {
            const data = response.data as SaleSum[];
            const myLabels = data.map(x => x.sellerName);
            const mySeries = data.map(x => x.sum);
    
            setchartData({ labels: myLabels, series: mySeries});
        });
    }, [])
    
    const options = {
        legend: {
            show: true
        }
    }
    //No return somente a estrutura de código visivel
    //estrutrua lógica antes do return
    return (
        <Chart 
            options = {{...options, labels: chartData.labels}}
            //valores do gráfico
            series = {chartData.series}
            //tipo grafico
            type = "donut"
            height = "240"
        />
    );
}

export default DonutChart;
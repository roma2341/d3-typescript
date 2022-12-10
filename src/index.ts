import * as d3 from "d3";

const totalWidth = 700;
const totalHeight = 500;

const margin = 60;
const chartWidth = totalWidth - 2 * margin;
const chartHeight = totalHeight - 2 * margin;

const sample = [
    {language: 'en', val: 10},
    {language: 'en', val: 15},
    {language: 'ru', val: 25},
    {language: 'ua', val: 25},
    {language: 'de', val: 45},
]

// Аналог document.querySelector('svg') или $('svg')
const svg = d3.select("body")
    .select('.chart-container')
    .append("svg")
    .attr('width',totalWidth)
    .attr('height',totalHeight);

const chart = svg.append('g').attr('transform',`translate(${margin},${margin})`);

const scaleY = d3.scaleLinear()
    .range([chartHeight,0])
    .domain([0, 100]);

const scaleX = d3.scaleBand()
    .range([0, chartWidth])
    .domain(sample.map(d => d.language))
    .padding(0.2);

chart.append('g')
    .attr("class", "vertical-axis")
    .call(d3.axisLeft(scaleY));
chart.append('g')
    .attr("class", "horizontal-axis")
    .call(d3.axisBottom(scaleX));

chart.selectAll()
    .data(sample)
    .enter()
    .append('rect')
    .attr('x', s=> scaleX(s.language))
    .attr('y', s=> scaleY(s.val))
    .attr('height', s=> chartHeight - scaleY(s.val))
    .attr('width', scaleX.bandwidth);

chart.append('g')
    .attr('class','grid')
    .call(d3.axisLeft(scaleY)
        .tickSize(-chartWidth))


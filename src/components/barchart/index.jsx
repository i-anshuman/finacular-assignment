import * as d3 from 'd3';
import {useEffect} from 'react';
import styles from '../../styles/components/graph.module.scss';

const BarChart = ({dataset, width, height}) => {

  const drawChart = data => {
    d3.select('#bar')
      .select('svg')
      .remove();

    const svg = d3.select('#bar')
                  .append('svg')
                  .attr('width', width+100)
                  .attr('height', height+60);

    const barWidth = (width / data.length) - 20;
    const padding = 55;

    const month = data.map(d => new Date('01-'+d.month));
    const value = data.map(d => d.value);
    const changePercent = data.map(d => d.changePercent).filter(d => d !== 'N/A');

    const xScale = d3.scaleBand().domain(month).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, d3.max(value)]).range([height, padding]);
    const yScale2 = d3.scaleLinear().domain([d3.min(changePercent), d3.max(changePercent)]).range([height, padding]);
    const worthScale = d3.scaleLinear().domain([0, d3.max(value)]).range([padding, height]);

    const xAxis = d3.axisBottom().scale(xScale).tickFormat(d3.timeFormat("%b-%y"));
    const yAxis = d3.axisLeft().scale(yScale);
    const yAxis2 = d3.axisRight().scale(yScale2);

    svg.append('g')
       .attr('transform', `translate(${padding}, ${height})`)
       .attr('id', 'x-axis')
       .call(xAxis);

    svg.append('g')
       .attr('transform', `translate(${padding}, 0)`)
       .attr('id', 'y-axis1')
       .call(yAxis);
    
    svg.append('g')
       .attr('transform', `translate(${width+padding}, 0)`)
       .attr('id', 'y-axis2')
       .call(yAxis2);
    
    svg.selectAll('rect')
       .data(data)
       .enter()
       .append('rect')
       .attr('x', (d, i) => xScale(month[i]) + 10)
       .attr('y', (d, i) => height + padding - worthScale(d.value))
       .attr('width', barWidth)
       .attr('height', (d) => worthScale(d.value)-padding)
       .attr('transform', `translate(${padding}, 0)`)
       .attr('class', styles.graph__bar);
    
    svg.selectAll('path')
      .datum(data)
      .enter()
      .append('path')
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr('d',
        d3.line()
        .x((d, i) => xScale(month[i]) + 10)
        .y((d, i) => yScale2(d.changePercent))
      );
  };

  useEffect(() => {
    drawChart(dataset);
  }, [dataset]);

  return (
    <div id="bar" className={styles.graph}>
    </div>
  );  
};

export default BarChart;

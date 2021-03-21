import * as d3 from 'd3';
import {useEffect} from 'react';
import styles from '../../styles/components/graph.module.scss';

const PieChart = ({data, outerRadius, innerRadius}) => {
  const margin = {
    top: 50, right: 50, bottom: 50, left: 50
  };

  const width = 2 * outerRadius + margin.left + margin.right;
  const height = 2 * outerRadius + margin.top + margin.bottom;

  const colorScale = 
      d3.scaleSequential()
      .interpolator(d3.interpolateCool)
      .domain([0, data.length]);

  const drawChart = data => {
    // Remove the old svg
    d3.select('#pie')
      .select('svg')
      .remove();

    const svg = 
      d3.select('#pie')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const arcGenerator =
      d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const pieGenerator =
      d3.pie()
      .padAngle(0)
      .value(d => d.allocation);

    const arc = svg
      .selectAll()
      .data(pieGenerator(data))
      .enter();

    // Append arcs
    arc
      .append('path') 
      .attr('d', arcGenerator)
      .style('fill', (_, i) => colorScale(i))
      .style('stroke', '#ffffff')
      .style('stroke-width', 0);

    // Append text labels
    arc
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text(d => d.data.sector)
      .style('fill', '#fff')
      .attr('transform', (d) => {
        const [x, y] = arcGenerator.centroid(d);
        const rotate = d.endAngle < Math.PI
                      ? (d.startAngle / 2 + d.endAngle / 2) * 180 / Math.PI
                      : (d.startAngle / 2 + d.endAngle / 2 + Math.PI) * 180 / Math.PI;
        return `translate(${x}, ${y}) rotate(-90) rotate(${rotate})`;
      });
  };

  useEffect(() => {
    drawChart(data);
  },[data]);

  return (
    <div id="pie" className={styles.graph}>
      <h2 className={styles.graph__title}>Sectrol Allocation</h2>
    </div>
  );
};

export default PieChart;

import { useRef, useEffect } from 'react';
import { flamegraph } from 'd3-flame-graph';
import data from './assets/data.json';
import { select } from 'd3';
import tip from 'd3-tip';
import _ from 'lodash';

import 'd3-flame-graph/dist/d3-flamegraph.css';

function getHex(value: number) {
  return value > 0 ? value < 255 ? _.padStart(value.toString(16), 2, '0') : 'ff' : '00';
}

function getRandomColor({ depth }: any) {
  return `#${getHex(230 + depth)}${getHex(200 - depth * 10)}00`; 
}

function Tooltip() {
  // @ts-ignore
  return tip()
    .attr('class', 'd3-flame-graph-tip d3-flame-graph-label')
    .html((d: any) => `${d.data.name} <br /> costTime: ${d.data.value}`);
}

export default function FlameGraph() {
  const nodeRef = useRef<HTMLDivElement>(null);
  const chart = flamegraph()
    .width(1280)
    .cellHeight(18)
    .transitionDuration(750)
    .sort(true)
    .title('')
    .selfValue(false)
    .setColorMapper(getRandomColor)
    .tooltip(Tooltip());

  useEffect(
    () => {
      nodeRef?.current && 
        select('#flameGraph').datum(data).call(chart);
    },
    [nodeRef, chart]
  );

  return (
    <div ref={nodeRef} id="flameGraph"></div>
  );
}

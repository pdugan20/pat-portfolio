'use client';

import { useEffect, useState, useRef } from 'react';
import { ParentSize } from '@visx/responsive';
import { scaleLinear, scaleTime, scaleBand } from '@visx/scale';
import { AreaClosed, LinePath, Bar } from '@visx/shape';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { Group } from '@visx/group';
import { curveMonotoneX } from '@visx/curve';
import { localPoint } from '@visx/event';
import { bisector } from '@visx/vendor/d3-array';
import { useTheme } from 'next-themes';
import type { TrendPoint } from '@/lib/rewind/types';

const margin = { top: 8, right: 0, bottom: 28, left: 40 };

function parsePeriod(period: string): Date {
  const [y, m] = period.split('-').map(Number);
  return new Date(y, m - 1, 1);
}

function formatMonth(period: string): string {
  const date = parsePeriod(period);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

const bisectDate = bisector<TrendPoint, Date>(d => parsePeriod(d.period)).left;

interface TooltipData {
  point: TrendPoint;
  x: number;
  y: number;
}

function Chart({
  data,
  width,
  height,
}: {
  data: TrendPoint[];
  width: number;
  height: number;
}) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  if (innerWidth <= 0 || innerHeight <= 0 || data.length === 0) return null;

  const dates = data.map(d => parsePeriod(d.period));
  const values = data.map(d => d.value);

  const xScale = scaleTime({
    domain: [dates[0], dates[dates.length - 1]],
    range: [0, innerWidth],
  });

  const yScale = scaleLinear({
    domain: [0, Math.max(...values) * 1.1],
    range: [innerHeight, 0],
    nice: true,
  });

  const tickColor = isDark ? 'hsl(0, 0%, 45%)' : 'hsl(0, 0%, 65%)';
  const lineColor = isDark ? '#3b82f6' : '#2563eb';

  function handleHover(event: React.MouseEvent<SVGRectElement>) {
    const point = localPoint(event);
    if (!point) return;

    const x0 = xScale.invert(point.x - margin.left);
    const idx = bisectDate(data, x0, 1);
    const d0 = data[idx - 1];
    const d1 = data[idx];
    const d =
      d1 &&
      x0.getTime() - parsePeriod(d0.period).getTime() >
        parsePeriod(d1.period).getTime() - x0.getTime()
        ? d1
        : d0;

    if (d) {
      setTooltip({
        point: d,
        x: xScale(parsePeriod(d.period)),
        y: yScale(d.value),
      });
    }
  }

  return (
    <svg ref={svgRef} width={width} height={height}>
      <Group left={margin.left} top={margin.top}>
        <AreaClosed
          data={data}
          x={d => xScale(parsePeriod(d.period))}
          y={d => yScale(d.value)}
          yScale={yScale}
          curve={curveMonotoneX}
          fill={lineColor}
          fillOpacity={0.1}
        />
        <LinePath
          data={data}
          x={d => xScale(parsePeriod(d.period))}
          y={d => yScale(d.value)}
          curve={curveMonotoneX}
          stroke={lineColor}
          strokeWidth={1.5}
        />
        <Bar
          x={0}
          y={0}
          width={innerWidth}
          height={innerHeight}
          fill='transparent'
          onMouseMove={handleHover}
          onMouseLeave={() => setTooltip(null)}
        />
        {tooltip && (
          <>
            <line
              x1={tooltip.x}
              x2={tooltip.x}
              y1={0}
              y2={innerHeight}
              stroke={tickColor}
              strokeWidth={1}
              strokeDasharray='3,3'
              pointerEvents='none'
            />
            <circle
              cx={tooltip.x}
              cy={tooltip.y}
              r={3}
              fill={lineColor}
              stroke={isDark ? '#1a1a1a' : '#fff'}
              strokeWidth={2}
              pointerEvents='none'
            />
          </>
        )}
        <AxisBottom
          top={innerHeight}
          scale={xScale}
          numTicks={width > 500 ? 8 : 4}
          tickStroke={tickColor}
          stroke={tickColor}
          tickLabelProps={{
            fill: tickColor,
            fontSize: 10,
            textAnchor: 'middle',
            fontFamily: 'var(--font-mono, monospace)',
          }}
        />
        <AxisLeft
          scale={yScale}
          numTicks={4}
          tickStroke={tickColor}
          stroke={tickColor}
          tickFormat={v => {
            const n = v as number;
            return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
          }}
          tickLabelProps={{
            fill: tickColor,
            fontSize: 10,
            textAnchor: 'end',
            dx: -4,
            fontFamily: 'var(--font-mono, monospace)',
          }}
        />
      </Group>
      {tooltip && (
        <Group left={margin.left + tooltip.x} top={margin.top + tooltip.y - 32}>
          <rect
            x={-40}
            y={-10}
            width={80}
            height={20}
            rx={4}
            fill={isDark ? 'hsl(0, 0%, 20%)' : 'hsl(0, 0%, 96%)'}
            stroke={isDark ? 'hsl(0, 0%, 30%)' : 'hsl(0, 0%, 85%)'}
            strokeWidth={0.5}
          />
          <text
            textAnchor='middle'
            dy='0.35em'
            fontSize={10}
            fontFamily='var(--font-mono, monospace)'
            fill={isDark ? 'hsl(0, 0%, 80%)' : 'hsl(0, 0%, 30%)'}
          >
            {formatMonth(tooltip.point.period)}:{' '}
            {tooltip.point.value.toLocaleString()}
          </text>
        </Group>
      )}
    </svg>
  );
}

const MONTH_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const barMargin = { top: 8, right: 16, bottom: 52, left: 52 };

function BarChart({
  data,
  width,
  height,
  onBarClick,
}: {
  data: TrendPoint[];
  width: number;
  height: number;
  onBarClick?: (month: number) => void;
}) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const innerWidth = width - barMargin.left - barMargin.right;
  const innerHeight = height - barMargin.top - barMargin.bottom;

  if (innerWidth <= 0 || innerHeight <= 0 || data.length === 0) return null;

  const maxValue = Math.max(...data.map(d => d.value));

  const yScale = scaleBand<string>({
    domain: data.map(d => d.period),
    range: [0, innerHeight],
    padding: 0.15,
  });

  const xScale = scaleLinear({
    domain: [0, maxValue * 1.1],
    range: [0, innerWidth],
    nice: true,
  });

  const labelColor = isDark ? '#9ca3af' : '#6e6e73';
  const gridColor = isDark ? '#1f1f1f' : '#e5e7eb';

  const xTicks = xScale.ticks(width > 400 ? 6 : 4);

  return (
    <svg width={width} height={height}>
      {/* Month labels — outside the chart background */}
      <Group left={0} top={barMargin.top}>
        {data.map(d => {
          const month = parseInt(d.period.split('-')[1]);
          const bandY = yScale(d.period) ?? 0;
          const bandH = yScale.bandwidth();
          return (
            <text
              key={d.period}
              x={barMargin.left - 8}
              y={bandY + bandH / 2}
              textAnchor='end'
              dominantBaseline='central'
              fontSize={11}
              fontFamily='var(--font-mono, monospace)'
              fill={labelColor}
            >
              {MONTH_SHORT[month - 1]}
            </text>
          );
        })}
      </Group>

      <Group left={barMargin.left} top={barMargin.top}>
        {/* Vertical gridlines */}
        {xTicks.map(tick => (
          <line
            key={tick}
            x1={xScale(tick)}
            x2={xScale(tick)}
            y1={0}
            y2={innerHeight}
            stroke={gridColor}
            strokeWidth={1}
          />
        ))}

        {/* Bars */}
        {data.map((d, i) => {
          const barHeight = yScale.bandwidth();
          const barWidth = Math.max(xScale(d.value), 2);
          const barY = yScale(d.period) ?? 0;
          const isHovered = hoveredIndex === i;
          const month = parseInt(d.period.split('-')[1]);

          const barFill = isDark ? '#3b82f6' : '#2563eb';

          return (
            <g
              key={d.period}
              style={{ cursor: onBarClick ? 'pointer' : 'default' }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => {
                if (onBarClick) onBarClick(month);
              }}
            >
              <Bar
                x={0}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill={barFill}
                opacity={isHovered ? 1 : 0.8}
                rx={3}
                style={{ transition: 'opacity 0.15s ease' }}
              />

              {/* Hover: play count tooltip */}
              {isHovered && (
                <text
                  x={barWidth + 8}
                  y={barY + barHeight / 2}
                  dominantBaseline='central'
                  fontSize={11}
                  fontFamily='var(--font-mono, monospace)'
                  fontWeight={600}
                  fill={isDark ? 'hsl(0, 0%, 80%)' : 'hsl(0, 0%, 30%)'}
                  pointerEvents='none'
                >
                  {d.value.toLocaleString()} plays
                </text>
              )}
            </g>
          );
        })}

        {/* X-axis — bottom, no top line */}
        <AxisBottom
          top={innerHeight}
          scale={xScale}
          numTicks={width > 400 ? 6 : 4}
          tickStroke={gridColor}
          stroke='transparent'
          tickLength={4}
          tickFormat={v => {
            const n = v as number;
            return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
          }}
          tickLabelProps={{
            fill: labelColor,
            fontSize: 10,
            textAnchor: 'middle',
            fontFamily: 'var(--font-mono, monospace)',
          }}
        />
        <text
          x={innerWidth / 2}
          y={innerHeight + 42}
          textAnchor='middle'
          fontSize={10}
          fontFamily='var(--font-mono, monospace)'
          fill={labelColor}
        >
          plays
        </text>
      </Group>
    </svg>
  );
}

interface ListeningTrendsProps {
  /** Pass data directly (year mode) or omit to fetch all-time from API */
  data?: TrendPoint[];
  /** When provided, renders bar chart and calls this on bar click */
  onBarClick?: (month: number) => void;
}

export default function ListeningTrends({
  data: propData,
  onBarClick,
}: ListeningTrendsProps) {
  const [fetchedData, setFetchedData] = useState<TrendPoint[]>([]);
  const [loading, setLoading] = useState(!propData);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (propData) return;
    async function fetchData() {
      try {
        const res = await fetch('/api/listening/trends');
        if (res.ok) {
          const json = await res.json();
          setFetchedData(json.data ?? []);
        }
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [propData]);

  const chartData = propData ?? fetchedData;

  if (!mounted) return null;

  if (loading) {
    return (
      <div className='bg-surface-secondary dark:bg-surface-dark-secondary h-[200px] animate-pulse rounded' />
    );
  }

  if (chartData.length === 0) return null;

  const useBarChart = propData !== undefined && chartData.length <= 12;

  return useBarChart ? (
    <div className='bg-bg-secondary dark:bg-bg-dark-secondary rounded-xl px-3 pt-5 pb-3'>
      <div className='h-[340px]'>
        <ParentSize>
          {({ width, height }) => (
            <BarChart
              data={chartData}
              width={width}
              height={height}
              onBarClick={onBarClick}
            />
          )}
        </ParentSize>
      </div>
    </div>
  ) : (
    <div className='h-[200px]'>
      <ParentSize>
        {({ width, height }) => (
          <Chart data={chartData} width={width} height={height} />
        )}
      </ParentSize>
    </div>
  );
}

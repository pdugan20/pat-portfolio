'use client';

import React, { useState, useMemo } from 'react';
import { ParentSize } from '@visx/responsive';
import { scaleBand, scaleLinear } from '@visx/scale';
import { BarStackHorizontal, Bar } from '@visx/shape';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { Group } from '@visx/group';
import { useTheme } from 'next-themes';
import type { GenrePeriod } from '@/lib/rewind/types';
import {
  consolidateGenres,
  buildGenreColorMap,
  getGenreKeys,
  type ColorScheme,
} from '@/lib/listening/genre-colors';

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

// --- Stacked view (year) ---

const stackMargin = { top: 8, right: 16, bottom: 52, left: 52 };

interface StackedChartProps {
  data: GenrePeriod[];
  width: number;
  height: number;
  colorMap: Map<string, string>;
  genreKeys: string[];
  onBarClick?: (month: number) => void;
}

function StackedChart({
  data,
  width,
  height,
  colorMap,
  genreKeys,
  onBarClick,
}: StackedChartProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const [tooltip, setTooltip] = useState<{
    genre: string;
    value: number;
    x: number;
    y: number;
  } | null>(null);

  const innerWidth = width - stackMargin.left - stackMargin.right;
  const innerHeight = height - stackMargin.top - stackMargin.bottom;

  if (innerWidth <= 0 || innerHeight <= 0) return null;

  const maxTotal = Math.max(...data.map(d => d.total));

  const yScale = scaleBand<string>({
    domain: data.map(d => d.period),
    range: [0, innerHeight],
    padding: 0.15,
  });

  const xScale = scaleLinear<number>({
    domain: [0, maxTotal * 1.1],
    range: [0, innerWidth],
    nice: true,
  });

  const labelColor = isDark ? '#9ca3af' : '#6e6e73';
  const gridColor = isDark ? '#1f1f1f' : '#e5e7eb';
  const xTicks = xScale.ticks(width > 400 ? 6 : 4);

  // Transform data for BarStackHorizontal
  const tableData = data.map(d => {
    const row: Record<string, number | string> = { period: d.period };
    for (const key of genreKeys) {
      row[key] = d.genres[key] ?? 0;
    }
    return row;
  });

  return (
    <svg width={width} height={height}>
      {/* Month labels outside chart */}
      <Group left={0} top={stackMargin.top}>
        {data.map(d => {
          const month = parseInt(d.period.split('-')[1]);
          const bandY = yScale(d.period) ?? 0;
          const bandH = yScale.bandwidth();
          return (
            <text
              key={d.period}
              x={stackMargin.left - 8}
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

      <Group left={stackMargin.left} top={stackMargin.top}>
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

        {/* Clip paths for rounded row ends */}
        <defs>
          {data.map(d => {
            const bandY = yScale(d.period) ?? 0;
            const bandH = yScale.bandwidth();
            const totalWidth = xScale(d.total);
            return (
              <clipPath key={`clip-${d.period}`} id={`clip-${d.period}`}>
                <rect
                  x={0}
                  y={bandY}
                  width={totalWidth}
                  height={bandH}
                  rx={3}
                />
              </clipPath>
            );
          })}
        </defs>

        {/* Stacked bars */}
        <BarStackHorizontal
          data={tableData}
          keys={genreKeys}
          y={d => d.period as string}
          xScale={xScale}
          yScale={yScale}
          color={key => colorMap.get(key) ?? '#9ca3af'}
        >
          {barStacks => {
            // Group bars by period so we can apply clip paths per row
            const barsByPeriod = new Map<string, React.ReactElement[]>();
            for (const barStack of barStacks) {
              for (const bar of barStack.bars) {
                const period = bar.bar.data.period as string;
                const month = parseInt(period.split('-')[1]);
                if (!barsByPeriod.has(period)) barsByPeriod.set(period, []);
                barsByPeriod.get(period)!.push(
                  <rect
                    key={`${barStack.index}-${bar.index}`}
                    x={bar.x}
                    y={bar.y}
                    width={bar.width}
                    height={bar.height}
                    fill={bar.color}
                    opacity={0.85}
                    shapeRendering='crispEdges'
                    style={{ cursor: onBarClick ? 'pointer' : 'default' }}
                    onMouseEnter={e => {
                      const svgRect = (
                        e.currentTarget.ownerSVGElement as SVGSVGElement
                      ).getBoundingClientRect();
                      setTooltip({
                        genre: barStack.key,
                        value: (bar.bar.data[barStack.key] as number) ?? 0,
                        x: e.clientX - svgRect.left,
                        y: e.clientY - svgRect.top,
                      });
                    }}
                    onMouseLeave={() => setTooltip(null)}
                    onClick={() => {
                      if (onBarClick) onBarClick(month);
                    }}
                  />
                );
              }
            }
            return [...barsByPeriod.entries()].map(([period, rects]) => (
              <g key={period} clipPath={`url(#clip-${period})`}>
                {rects}
              </g>
            ));
          }}
        </BarStackHorizontal>

        {/* X-axis */}
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

      {/* Tooltip */}
      {tooltip && tooltip.value > 0 && (
        <g
          transform={`translate(${tooltip.x + 12}, ${tooltip.y - 12})`}
          pointerEvents='none'
        >
          <rect
            x={0}
            y={-12}
            width={
              (tooltip.genre.length +
                tooltip.value.toLocaleString().length +
                3) *
                6.5 +
              16
            }
            height={24}
            rx={4}
            fill={isDark ? '#1f1f1f' : '#ffffff'}
            stroke={gridColor}
            strokeWidth={0.5}
          />
          <text
            x={8}
            y={1}
            fontSize={11}
            fontFamily='var(--font-mono, monospace)'
            fontWeight={600}
            fill={isDark ? '#e5e7eb' : '#111827'}
          >
            {tooltip.genre}: {tooltip.value.toLocaleString()}
          </text>
        </g>
      )}
    </svg>
  );
}

// --- Detail view (single month) ---

const detailMargin = { top: 8, right: 16, bottom: 52, left: 90 };

interface DetailChartProps {
  genres: Record<string, number>;
  width: number;
  height: number;
  colorMap: Map<string, string>;
}

function DetailChart({ genres, width, height, colorMap }: DetailChartProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const innerWidth = width - detailMargin.left - detailMargin.right;
  const innerHeight = height - detailMargin.top - detailMargin.bottom;

  if (innerWidth <= 0 || innerHeight <= 0) return null;

  // Sort genres by play count descending
  const sorted = Object.entries(genres)
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1]);

  if (sorted.length === 0) return null;

  const maxValue = sorted[0][1];

  const yScale = scaleBand<string>({
    domain: sorted.map(([genre]) => genre),
    range: [0, innerHeight],
    padding: 0.25,
  });

  const xScale = scaleLinear<number>({
    domain: [0, maxValue * 1.15],
    range: [0, innerWidth],
    nice: true,
  });

  const labelColor = isDark ? '#9ca3af' : '#6e6e73';
  const gridColor = isDark ? '#1f1f1f' : '#e5e7eb';
  const xTicks = xScale.ticks(width > 400 ? 6 : 4);

  return (
    <svg width={width} height={height}>
      <Group left={detailMargin.left} top={detailMargin.top}>
        {/* Gridlines */}
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
        {sorted.map(([genre, count], i) => {
          const barHeight = yScale.bandwidth();
          const barWidth = Math.max(xScale(count), 2);
          const barY = yScale(genre) ?? 0;
          const isHovered = hoveredIndex === i;

          return (
            <g
              key={genre}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Bar
                x={0}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill={colorMap.get(genre) ?? (isDark ? '#6b7280' : '#9ca3af')}
                opacity={isHovered ? 1 : 0.85}
                rx={3}
                style={{ transition: 'opacity 0.15s ease' }}
              />
              {isHovered && (
                <text
                  x={barWidth + 8}
                  y={barY + barHeight / 2}
                  dominantBaseline='central'
                  fontSize={11}
                  fontFamily='var(--font-mono, monospace)'
                  fontWeight={600}
                  fill={isDark ? '#e5e7eb' : '#111827'}
                  pointerEvents='none'
                >
                  {count.toLocaleString()} plays
                </text>
              )}
            </g>
          );
        })}

        {/* Y-axis — genre labels */}
        <AxisLeft
          scale={yScale}
          tickStroke='transparent'
          stroke='transparent'
          tickLabelProps={{
            fill: labelColor,
            fontSize: 11,
            textAnchor: 'end',
            fontFamily: 'var(--font-mono, monospace)',
            dy: '0.33em',
            dx: -4,
          }}
        />

        {/* X-axis */}
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

// --- Legend ---

function GenreLegend({
  genreKeys,
  colorMap,
}: {
  genreKeys: string[];
  colorMap: Map<string, string>;
}) {
  return (
    <div className='mb-3 flex flex-wrap gap-x-4 gap-y-1'>
      {genreKeys.map(genre => (
        <div key={genre} className='flex items-center gap-1.5'>
          <span
            className='inline-block h-2.5 w-2.5 rounded-sm'
            style={{ backgroundColor: colorMap.get(genre) }}
          />
          <span className='text-text-muted dark:text-text-dark-muted text-xs'>
            {genre}
          </span>
        </div>
      ))}
    </div>
  );
}

// --- Main component ---

interface GenreChartProps {
  data: GenrePeriod[];
  selectedMonth: number | null;
  onBarClick?: (month: number) => void;
  scheme?: ColorScheme;
}

export default function GenreChart({
  data: rawData,
  selectedMonth,
  onBarClick,
  scheme = 'blue-purple',
}: GenreChartProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  // Consolidate: only top 8 genres get colors, rest merge into "Other"
  const data = useMemo(() => consolidateGenres(rawData), [rawData]);

  const colorMap = useMemo(
    () => buildGenreColorMap(data, isDark, scheme),
    [data, isDark, scheme]
  );

  const genreKeys = useMemo(
    () => getGenreKeys(data, colorMap),
    [data, colorMap]
  );

  if (data.length === 0) return null;

  // Month detail: find the selected period and show individual bars
  const selectedPeriod = selectedMonth
    ? data.find(d => {
        const m = parseInt(d.period.split('-')[1]);
        return m === selectedMonth;
      })
    : null;

  const chartHeight = selectedPeriod
    ? Math.max(Object.keys(selectedPeriod.genres).length * 32 + 80, 200)
    : 340;

  return (
    <div className='bg-bg-secondary dark:bg-bg-dark-secondary rounded-xl px-3 pt-5 pb-3'>
      {/* <GenreLegend genreKeys={genreKeys} colorMap={colorMap} /> */}
      <div style={{ height: chartHeight }}>
        <ParentSize>
          {({ width, height }) =>
            selectedPeriod ? (
              <DetailChart
                genres={selectedPeriod.genres}
                width={width}
                height={height}
                colorMap={colorMap}
              />
            ) : (
              <StackedChart
                data={data}
                width={width}
                height={height}
                colorMap={colorMap}
                genreKeys={genreKeys}
                onBarClick={onBarClick}
              />
            )
          }
        </ParentSize>
      </div>
    </div>
  );
}

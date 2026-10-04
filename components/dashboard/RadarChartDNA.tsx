"use client";

import React from "react";

interface RadarChartProps {
  scores: {
    technical: number;
    analytical: number;
    communication: number;
    leadership: number;
    domainKnowledge: number;
  };
  size?: number;
}

export function RadarChartDNA({ scores, size = 200 }: RadarChartProps) {
  const baseSize = 220;
  const center = baseSize / 2;
  const radius = (baseSize / 2) * 0.68;

  const axes = [
    { key: "technical", label: "Tech", score: scores.technical, angle: -Math.PI / 2 },
    { key: "analytical", label: "Logic", score: scores.analytical, angle: -Math.PI / 2 + (2 * Math.PI) / 5 },
    { key: "communication", label: "Comm", score: scores.communication, angle: -Math.PI / 2 + (4 * Math.PI) / 5 },
    { key: "leadership", label: "Lead", score: scores.leadership, angle: -Math.PI / 2 + (6 * Math.PI) / 5 },
    { key: "domainKnowledge", label: "Domain", score: scores.domainKnowledge, angle: -Math.PI / 2 + (8 * Math.PI) / 5 },
  ];

  // Grid levels (20%, 40%, 60%, 80%, 100%)
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];

  const getCoordinates = (angle: number, value: number) => {
    const x = center + radius * value * Math.cos(angle);
    const y = center + radius * value * Math.sin(angle);
    return { x, y };
  };

  const polygonPoints = axes
    .map((axis) => {
      const { x, y } = getCoordinates(axis.angle, axis.score / 100);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="relative flex items-center justify-center w-full max-w-[220px] mx-auto aspect-square select-none">
      <svg
        viewBox={`0 0 ${baseSize} ${baseSize}`}
        className="w-full h-full overflow-visible"
      >
        <defs>
          <linearGradient id="dnaRadarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="var(--accent-hover, var(--accent))" stopOpacity="0.18" />
          </linearGradient>
        </defs>

        {/* Background Grid Pentagons / Net Mesh */}
        {levels.map((lvl, index) => {
          const points = axes
            .map((axis) => {
              const { x, y } = getCoordinates(axis.angle, lvl);
              return `${x},${y}`;
            })
            .join(" ");
          
          const isOuter = index === levels.length - 1;

          return (
            <polygon
              key={lvl}
              points={points}
              fill={isOuter ? "var(--bg-card-subtle)" : "none"}
              fillOpacity={isOuter ? 0.35 : 0}
              stroke="var(--border-strong)"
              strokeWidth={isOuter ? "1.5" : "1"}
              strokeOpacity={isOuter ? 0.8 : 0.45}
            />
          );
        })}

        {/* Axis Spokes from Center to Perimeter */}
        {axes.map((axis) => {
          const outer = getCoordinates(axis.angle, 1);
          return (
            <line
              key={axis.key}
              x1={center}
              y1={center}
              x2={outer.x}
              y2={outer.y}
              stroke="var(--border-strong)"
              strokeWidth="1.2"
              strokeDasharray="3 3"
              strokeOpacity={0.6}
            />
          );
        })}

        {/* Dynamic Data Polygon */}
        <polygon
          points={polygonPoints}
          fill="url(#dnaRadarGradient)"
          stroke="var(--accent)"
          strokeWidth="2.5"
          strokeLinejoin="round"
          className="transition-all duration-700 ease-out drop-shadow-md"
        />

        {/* Vertex Points */}
        {axes.map((axis) => {
          const { x, y } = getCoordinates(axis.angle, axis.score / 100);
          const labelCoord = getCoordinates(axis.angle, 1.22);

          return (
            <g key={`vertex-${axis.key}`}>
              {/* Point Indicator */}
              <circle
                cx={x}
                cy={y}
                r="4"
                fill="var(--bg-card)"
                stroke="var(--accent)"
                strokeWidth="2.5"
                className="transition-all duration-700 ease-out"
              />
              {/* Outer Axis Label */}
              <text
                x={labelCoord.x}
                y={labelCoord.y + 3}
                textAnchor="middle"
                dominantBaseline="central"
                fill="var(--text-secondary)"
                fontSize="9.5"
                fontWeight="700"
                className="transition-colors"
              >
                {axis.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

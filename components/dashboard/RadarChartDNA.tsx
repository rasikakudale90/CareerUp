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
  const baseSize = 200;
  const center = baseSize / 2;
  const radius = (baseSize / 2) * 0.72;

  const axes = [
    { key: "technical", label: "Technical", score: scores.technical, angle: -Math.PI / 2 },
    { key: "analytical", label: "Analytical", score: scores.analytical, angle: -Math.PI / 2 + (2 * Math.PI) / 5 },
    { key: "communication", label: "Communication", score: scores.communication, angle: -Math.PI / 2 + (4 * Math.PI) / 5 },
    { key: "leadership", label: "Leadership", score: scores.leadership, angle: -Math.PI / 2 + (6 * Math.PI) / 5 },
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
    <div className="relative flex items-center justify-center w-full max-w-[220px] mx-auto aspect-square">
      <svg
        viewBox={`0 0 ${baseSize} ${baseSize}`}
        className="w-full h-full overflow-visible"
      >
        {/* Background Grid Pentagons */}
        {levels.map((lvl) => {
          const points = axes
            .map((axis) => {
              const { x, y } = getCoordinates(axis.angle, lvl);
              return `${x},${y}`;
            })
            .join(" ");
          return (
            <polygon
              key={lvl}
              points={points}
              fill="none"
              stroke="rgba(239, 240, 248, 0.12)"
              strokeWidth="1"
            />
          );
        })}

        {/* Axis Lines */}
        {axes.map((axis) => {
          const outer = getCoordinates(axis.angle, 1);
          return (
            <line
              key={axis.key}
              x1={center}
              y1={center}
              x2={outer.x}
              y2={outer.y}
              stroke="rgba(239, 240, 248, 0.15)"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
          );
        })}

        {/* Dynamic Data Polygon */}
        <polygon
          points={polygonPoints}
          fill="rgba(142, 112, 90, 0.35)"
          stroke="#8E705A"
          strokeWidth="2"
          className="transition-all duration-700 ease-out"
        />

        {/* Vertex Points */}
        {axes.map((axis) => {
          const { x, y } = getCoordinates(axis.angle, axis.score / 100);
          return (
            <circle
              key={`dot-${axis.key}`}
              cx={x}
              cy={y}
              r="3.5"
              fill="#FFFFFF"
              stroke="#8E705A"
              strokeWidth="2"
              className="transition-all duration-700 ease-out shadow-lg"
            />
          );
        })}
      </svg>
    </div>
  );
}

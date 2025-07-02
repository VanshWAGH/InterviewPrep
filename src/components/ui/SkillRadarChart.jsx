import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';

const SkillRadarChart = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full h-80"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke="#374151" />
          <PolarAngleAxis 
            dataKey="skill" 
            tick={{ fontSize: 12, fill: '#6B7280' }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]} 
            tick={{ fontSize: 10, fill: '#6B7280' }}
          />
          <Radar
            name="Skills"
            dataKey="score"
            stroke="#3B82F6"
            fill="#3B82F6"
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default SkillRadarChart;

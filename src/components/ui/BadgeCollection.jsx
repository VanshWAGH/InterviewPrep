import React from 'react';
import { motion } from 'framer-motion';
import { Award, Star, Trophy, Target, Zap, Brain } from 'lucide-react';

const BadgeCollection = ({ badges, maxDisplay = 6 }) => {
  const iconMap = {
    award: Award,
    star: Star,
    trophy: Trophy,
    target: Target,
    zap: Zap,
    brain: Brain,
  };

  const displayBadges = badges.slice(0, maxDisplay);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {displayBadges.map((badge, index) => {
        const IconComponent = iconMap[badge.icon] || Award;

        return (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative group"
          >
            <div className={`p-4 rounded-xl bg-gradient-to-br ${badge.color} shadow-lg`}>
              <div className="text-center">
                <IconComponent className="h-8 w-8 text-white mx-auto mb-2" />
                <h3 className="text-white font-semibold text-sm">{badge.name}</h3>
              </div>
            </div>

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
                {badge.description}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default BadgeCollection;

import React, { useState } from 'react';
import { useWeather } from '../../context/WeatherContext';
import GlassContainer from '../ui/GlassContainer';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Bell, ChevronDown } from 'lucide-react';

const WeatherAlerts: React.FC = () => {
  const { weatherData } = useWeather();
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!weatherData || !weatherData.alerts || !weatherData.alerts.length) {
    return null;
  }
  
  const { alerts } = weatherData;
  const hasAlerts = alerts.length > 0;
  
  // Return null if no alerts
  if (!hasAlerts) return null;
  
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'severe':
        return 'text-red-500 bg-red-500/20';
      case 'moderate':
        return 'text-orange-500 bg-orange-500/20';
      case 'minor':
        return 'text-yellow-500 bg-yellow-500/20';
      default:
        return 'text-blue-500 bg-blue-500/20';
    }
  };
  
  return (
    <GlassContainer className="p-4">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <Bell className="w-5 h-5 text-yellow-500 mr-2" />
          <h3 className="text-xl font-semibold text-white">Weather Alerts</h3>
          <div className="ml-2 px-2 py-0.5 bg-yellow-500/20 rounded-full">
            <span className="text-xs font-medium text-yellow-500">{alerts.length}</span>
          </div>
        </div>
        <ChevronDown className={`w-5 h-5 text-white transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 space-y-3 overflow-hidden"
          >
            {alerts.map((alert, index) => (
              <motion.div
                key={`${alert.headline}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 rounded-lg bg-white/10 backdrop-blur-sm"
              >
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0 mt-1" />
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-medium text-white">{alert.event}</h4>
                      <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${getSeverityColor(alert.severity)}`}>
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-sm text-white/70 mt-1">{alert.headline}</p>
                    <p className="text-xs text-white/50 mt-2">
                      Valid until: {new Date(alert.expires).toLocaleString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </GlassContainer>
  );
};

export default WeatherAlerts;
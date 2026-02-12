import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { CLIMATE_DATA } from '../constants';

const ChartsSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 print:block print:space-y-8">
      {/* Chart 1: Trees */}
      <div className="bg-white p-6 rounded-xl shadow-md border-2 border-green-100 print:shadow-none print:border-2 print:border-black print:mb-8">
        <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center">
          <span className="bg-green-100 p-2 rounded-full mr-3">🌳</span>
          Cantidad de Árboles
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={CLIMATE_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTrees" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="year" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip labelStyle={{ color: 'black' }} />
              <Legend />
              <Area type="monotone" dataKey="trees" stroke="#16a34a" fillOpacity={1} fill="url(#colorTrees)" name="Miles de Árboles" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-green-800 mt-2 text-center bg-green-50 p-2 rounded">
            Fig 1. Mira cómo baja la montaña verde: ¡Hay menos árboles cada año!
        </p>
      </div>

      {/* Chart 2: Temperature */}
      <div className="bg-white p-6 rounded-xl shadow-md border-2 border-red-100 print:shadow-none print:border-2 print:border-black">
        <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center">
          <span className="bg-red-100 p-2 rounded-full mr-3">🌡️</span>
          Calor (Temperatura)
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={CLIMATE_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="year" />
              <YAxis domain={[23, 29]} />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip labelStyle={{ color: 'black' }} />
              <Legend />
              <Line type="monotone" dataKey="temperature" stroke="#dc2626" strokeWidth={4} dot={{ r: 6 }} activeDot={{ r: 8 }} name="Grados de calor (°C)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-red-800 mt-2 text-center bg-red-50 p-2 rounded">
            Fig 2. Mira cómo sube la línea roja: ¡Cada vez hace más calor!
        </p>
      </div>
    </div>
  );
};

export default ChartsSection;

import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

type NetworkData = {
  name: string;
  transactions: number;
  blockTime: number;
  hashRate: number;
  timestamp: number;
};

type NodeDistribution = {
  name: string;
  value: number;
};

const COLORS = ['#64FFDA', '#7928CA', '#00BFFF', '#8884d8'];

const NetworkTraffic = () => {
  const [trafficData, setTrafficData] = useState<NetworkData[]>([]);
  const [nodeDistribution, setNodeDistribution] = useState<NodeDistribution[]>([]);

  useEffect(() => {
    const initialData: NetworkData[] = Array.from({ length: 10 }, (_, i) => ({
      name: `${i}m ago`,
      transactions: 250 + Math.round(Math.random() * 200),
      blockTime: 0.5 + Math.random() * 1.5,
      hashRate: 75 + Math.round(Math.random() * 50),
      timestamp: Date.now() - (i * 60 * 1000)
    }));
    
    setTrafficData(initialData);
    
    const initialNodeDistribution: NodeDistribution[] = [
      { name: 'North America', value: 35 + Math.round(Math.random() * 10) },
      { name: 'Europe', value: 25 + Math.round(Math.random() * 10) },
      { name: 'Asia Pacific', value: 30 + Math.round(Math.random() * 10) },
      { name: 'Others', value: 10 + Math.round(Math.random() * 5) },
    ];
    
    setNodeDistribution(initialNodeDistribution);

    const interval = setInterval(() => {
      const now = Date.now();
      const newData: NetworkData = {
        name: 'now',
        transactions: 250 + Math.round(Math.random() * 200),
        blockTime: 0.5 + Math.random() * 1.5,
        hashRate: 75 + Math.round(Math.random() * 50),
        timestamp: now
      };
      
      setTrafficData(prevData => {
        const updatedData = prevData.map((data, index) => ({
          ...data,
          name: `${index + 1}m ago`
        }));

        return [newData, ...updatedData].slice(0, 10);
      });
      if (Math.random() > 0.7) {
        setNodeDistribution(prevDistribution => 
          prevDistribution.map(node => ({
            ...node,
            value: Math.max(5, node.value + Math.round((Math.random() - 0.5) * 5))
          }))
        );
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatYAxis = (value: number) => `${value}`;

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-xl font-bold text-trustvault-light text-glow mb-4">Network Traffic</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {}
        <div className="bg-trustvault-navy glass-panel rounded-xl p-4">
          <h3 className="text-trustvault-light mb-2">Transactions/Min</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={trafficData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" tickFormatter={formatYAxis} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(17, 34, 64, 0.9)',
                    border: '1px solid rgba(100, 255, 218, 0.5)',
                    borderRadius: '0.5rem'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="transactions" 
                  stroke="#64FFDA" 
                  fillOpacity={0.3}
                  fill="url(#colorTransactions)" 
                />
                <defs>
                  <linearGradient id="colorTransactions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#64FFDA" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#64FFDA" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {}
        <div className="bg-trustvault-navy glass-panel rounded-xl p-4">
          <h3 className="text-trustvault-light mb-2">Block Time (seconds)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={trafficData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" domain={[0, 3]} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(17, 34, 64, 0.9)',
                    border: '1px solid rgba(100, 255, 218, 0.5)',
                    borderRadius: '0.5rem'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="blockTime" 
                  stroke="#00BFFF" 
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#00BFFF', stroke: '#00BFFF', strokeWidth: 1 }}
                  activeDot={{ r: 6, stroke: '#00BFFF', strokeWidth: 1, fill: '#00BFFF' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {}
        <div className="bg-trustvault-navy glass-panel rounded-xl p-4">
          <h3 className="text-trustvault-light mb-2">Hash Rate (TH/s)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={trafficData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(17, 34, 64, 0.9)',
                    border: '1px solid rgba(100, 255, 218, 0.5)',
                    borderRadius: '0.5rem'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="hashRate" 
                  stroke="#7928CA" 
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#7928CA', stroke: '#7928CA', strokeWidth: 1 }}
                  activeDot={{ r: 6, stroke: '#7928CA', strokeWidth: 1, fill: '#7928CA' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {}
        <div className="bg-trustvault-navy glass-panel rounded-xl p-4">
          <h3 className="text-trustvault-light mb-2">Node Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={nodeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {nodeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(17, 34, 64, 0.9)',
                    border: '1px solid rgba(100, 255, 218, 0.5)',
                    borderRadius: '0.5rem'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkTraffic;

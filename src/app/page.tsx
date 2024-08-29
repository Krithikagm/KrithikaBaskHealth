"use client";

import React from 'react';
import useRealTimeData from "../hooks/useRealTimeData";
import ChartWidget from '../components/ChartWidget';
import TableWidget from '../components/TableWidget';
import MapWidget from '../components/MapWidget';
import Loader from '../components/Loader';
import Error from '../components/Error';

export default function Dashboard() {
  const data = useRealTimeData();

  if (!data) {
    return <Loader />; 
  }

  return (
    <>
      <header className="flex justify-center items-center bg-gradient-to-r from-yellow-400 via-red-300 to-pink-500 p-8 rounded-lg shadow-lg mb-8">
        <h1 className="text-4xl font-extrabold text-black tracking-wide drop-shadow-lg">
          BASK HEALTH
        </h1>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-gray-900 rounded-lg shadow-inner">
        {data && data.success ? (
          <>
            <div className="col-span-1">
              <ChartWidget chartType="salesOverTime" data={data.data} className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="col-span-1">
              <ChartWidget chartType="userEngagement" data={data.data} className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="col-span-1">
              <TableWidget tableType="recentTransactions" data={data.data} className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="col-span-1">
              <TableWidget tableType="topProducts" data={data.data} className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="col-span-1 md:col-span-2">
              <MapWidget data={data.data} className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300" />
            </div>
          </>
        ) : (
          <Error message="No data available"/>
        )}
      </div>
    </>
  );
}

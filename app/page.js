"use client";
import React from 'react';
import dynamic from 'next/dynamic';

const ClientDashboard = dynamic(() => import('../components/ClientDashboard'), {
    ssr: false,
    loading: () => (
        <div className="min-h-screen flex items-center justify-center font-sans antialiased bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 text-gray-800">
             <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
    )
});

export default function HomePage() {
  return (
    <div className="min-h-screen p-8 font-sans antialiased bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 text-gray-800">
        <div className="fixed inset-0 opacity-30 -z-10">
            <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
            <div className="absolute top-0 right-0 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
        <ClientDashboard />
    </div>
  );
}
"use client";
import "../app/globals.css";
import React, { useState, useEffect } from 'react';
import {
  Rocket,
  Download,
  CheckCircle,
  FileText,
  User,
  MessageCircle
} from 'lucide-react';

const mockApi = {
  getClientData: () => {
    return new Promise(resolve => {
      setTimeout(() => {
        const mockData = {
          clientName: 'Client Name', // CHANGE THIS for each client
          consultantName: 'Your Name', // CHANGE THIS to your consultant name
          marketingPlan: {
            title: "Digital Marketing Plan - August 2025", // CHANGE THIS to match client's plan
            tasks: [
              { id: 'task-1', name: 'Define Buyer Persona', completed: true },
              { id: 'task-2', name: 'Develop Social Media Strategy', completed: false },
              { id: 'task-3', name: 'Create 7-Day Content Plan', completed: false },
              { id: 'task-4', name: 'Launch Lead Generation Campaign', completed: false },
              { id: 'task-5', name: 'Schedule First 10 Social Posts', completed: false },
              // ADD MORE TASKS specific to this client
            ]
          },
          buyerPersona: {
            name: "The Target Customer", // CHANGE THIS to client's specific persona
            description: "Update this description to match the client's specific target customer and industry.", // CHANGE THIS
          },
          resources: [
            { name: "Brand Voice Guide.pdf", type: "PDF" },
            { name: "7-Day Content Calendar Template.xlsx", type: "File" },
            // ADD MORE RESOURCES specific to this client
          ]
        };
        resolve(mockData);
      }, 500);
    });
  }
};

export default function ClientDashboard() {
  const [clientData, setClientData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchClientData = async () => {
      setIsLoading(true);
      const data = await mockApi.getClientData();
      setClientData(data);
      updateProgress(data.marketingPlan.tasks);
      setIsLoading(false);
    };
    fetchClientData();
  }, []);

  const updateProgress = (tasks) => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const newProgress = Math.round((completedTasks / tasks.length) * 100);
    setProgress(newProgress);
  };

  const toggleTaskCompletion = (taskId) => {
    setClientData(prevData => {
      const updatedTasks = prevData.marketingPlan.tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      updateProgress(updatedTasks);
      return {
        ...prevData,
        marketingPlan: {
          ...prevData.marketingPlan,
          tasks: updatedTasks
        }
      };
    });
  };

  const glassStyle = {
    backdropFilter: 'blur(16px)',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)'
  };

  if (isLoading || !clientData) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center p-8 rounded-2xl" style={glassStyle}>
                <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                <p className="mt-4 text-lg text-gray-700">Loading your personalized dashboard...</p>
            </div>
        </div>
    );
  }

  return (
    <div className="relative z-10 max-w-5xl mx-auto">
        <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                    <Rocket className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
                        {clientData.consultantName}
                    </h1>
                    <p className="text-sm text-gray-600">Your Marketing Consultant</p>
                </div>
            </div>
            <div className="rounded-2xl p-6 shadow-xl bg-white/50 border-white/30" style={glassStyle}>
                <h2 className="text-2xl font-semibold text-gray-800">Hello, {clientData.clientName}!</h2>
                <p className="mt-2 text-gray-600">
                    Welcome to your personalized dashboard. Let's get your marketing plan implemented!
                </p>
            </div>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-medium text-gray-800">Your 7-Day Action Roadmap</h3>
                        <span className="text-sm text-gray-600">Progress: {progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                        <div
                            className="h-2.5 rounded-full transition-all duration-500 ease-out bg-gradient-to-r from-purple-500 to-teal-500"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <ul className="space-y-3">
                        {clientData.marketingPlan.tasks.map(task => (
                            <li
                                key={task.id}
                                className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-colors ${task.completed ? 'bg-green-100/80' : 'bg-white/50 hover:bg-white/70'}`}
                                onClick={() => toggleTaskCompletion(task.id)}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${task.completed ? 'border-green-500 bg-green-500' : 'border-gray-400'}`}>
                                        {task.completed && <CheckCircle className="w-4 h-4 text-white" />}
                                    </div>
                                    <span className={`text-sm font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                                        {task.name}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
                    <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2 mb-4">
                        <User className="w-5 h-5 text-purple-600" />
                        Your Target Persona
                    </h3>
                    <div className="bg-white/50 p-4 rounded-xl border border-white/20">
                        <h4 className="font-semibold text-gray-800">{clientData.buyerPersona.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{clientData.buyerPersona.description}</p>
                    </div>
                </div>
            </div>
            <div className="lg:col-span-1 space-y-8">
                <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
                    <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2 mb-4">
                        <FileText className="w-5 h-5 text-teal-600" />
                        Your Plan & Resources
                    </h3>
                    <div className="bg-white/50 p-4 rounded-xl border border-white/20">
                        <h4 className="font-semibold text-gray-800">{clientData.marketingPlan.title}</h4>
                        <div className="mt-4 space-y-2">
                            {clientData.resources.map((resource, index) => (
                                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-100/50">
                                    <span className="text-sm text-gray-700">{resource.name}</span>
                                    <button className="p-1 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors">
                                        <Download className="w-4 h-4 text-gray-600" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
                    <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2 mb-4">
                        <MessageCircle className="w-5 h-5 text-blue-600" />
                        Need a hand?
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        If you get stuck or have questions about your plan, don't hesitate to reach out.
                    </p>
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2">
                        <MessageCircle className="w-5 h-5" />
                        <span>Message {clientData.consultantName}</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
}

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
          clientName: 'Sarah Mitchell',
          consultantName: 'Josh W',
          companyName: 'Creative Wellness Studio',
          industry: 'Health & Wellness Coaching',
          marketingPlan: {
            title: "Digital Growth Strategy - September 2025",
            description: "A comprehensive 30-day plan to establish your online presence and attract your first 50 clients through strategic content marketing and lead generation.",
            tasks: [
              { id: 'task-1', name: 'Define Your Ideal Client Avatar & Pain Points', completed: true, description: 'Create detailed buyer persona for health-conscious professionals aged 28-45' },
              { id: 'task-2', name: 'Build Your Signature Wellness Program Framework', completed: true, description: 'Develop your 12-week transformation program structure' },
              { id: 'task-3', name: 'Create Your Content Pillars & Brand Voice', completed: false, description: 'Establish 4 core content themes: nutrition, mindset, movement, lifestyle' },
              { id: 'task-4', name: 'Set Up Your Lead Magnet: "7-Day Energy Reset Guide"', completed: false, description: 'Design and create downloadable PDF with email capture' },
              { id: 'task-5', name: 'Launch Instagram Content Strategy', completed: false, description: 'Post 5x/week with wellness tips, client stories, behind-the-scenes' },
              { id: 'task-6', name: 'Create Your Client Onboarding System', completed: false, description: 'Set up intake forms, welcome sequences, and booking system' },
              { id: 'task-7', name: 'Launch Your First Webinar: "Beat Afternoon Energy Crashes"', completed: false, description: 'Host live training to attract and convert prospects' },
            ]
          },
          buyerPersona: {
            name: "The Overwhelmed High Achiever",
            demographics: "Professional women, ages 28-45, earning $75K+",
            description: "Busy professionals who feel exhausted despite their success. They struggle with energy crashes, stress eating, and finding time for self-care. They want to feel vibrant and confident but don't know where to start with sustainable wellness habits.",
            painPoints: [
              "Constant afternoon energy crashes",
              "Stress eating during busy workdays", 
              "No time for meal planning or exercise",
              "Feeling guilty about not prioritizing health"
            ],
            goals: [
              "Sustained energy throughout the day",
              "Simple, healthy meal solutions",
              "Stress management techniques that work",
              "Work-life balance without guilt"
            ]
          },
          businessGoals: {
            monthOne: "Establish online presence and attract first 10 leads",
            monthThree: "Launch signature program with 5-8 clients",
            monthSix: "Scale to $8K/month with group coaching model",
            yearOne: "Build 6-figure wellness coaching business"
          },
          resources: [
            { name: "Brand Voice & Messaging Guide.pdf", type: "PDF", description: "Your complete brand personality and tone guidelines" },
            { name: "Content Calendar Template - Q4 2025.xlsx", type: "Excel", description: "90 days of planned posts with captions and hashtags" },
            { name: "Lead Magnet Design Templates.zip", type: "Design Files", description: "Canva templates for your 7-Day Energy Reset Guide" },
            { name: "Client Intake Forms & Contracts.docx", type: "Document", description: "Legal templates and assessment questionnaires" },
            { name: "Webinar Slide Template.pptx", type: "Presentation", description: "Professional slides for your first webinar" },
            { name: "Social Media Hashtag Bank.pdf", type: "PDF", description: "200+ relevant hashtags organized by category" }
          ],
          recentUpdates: [
            {
              date: "2 days ago",
              title: "Brand photoshoot scheduled",
              description: "Professional photos booked for October 15th - bring 3 outfit changes!"
            },
            {
              date: "5 days ago", 
              title: "Website domain secured",
              description: "creativewellnessstudio.com is now yours - hosting setup in progress"
            },
            {
              date: "1 week ago",
              title: "Business license approved", 
              description: "Official paperwork complete - you're legally ready to launch!"
            }
          ],
          nextSteps: [
            {
              priority: "HIGH",
              task: "Complete brand photoshoot prep",
              deadline: "Oct 12",
              description: "Gather props, outfits, and shot list for brand photos"
            },
            {
              priority: "MEDIUM", 
              task: "Finalize lead magnet content",
              deadline: "Oct 18",
              description: "Write the 7-Day Energy Reset Guide content"
            },
            {
              priority: "LOW",
              task: "Research podcast guest opportunities", 
              deadline: "Oct 25",
              description: "Find 10 health/wellness podcasts for future guest appearances"
            }
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
  const [activeTab, setActiveTab] = useState('tasks');

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
    <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                    <Rocket className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
                        {clientData.consultantName}
                    </h1>
                    <p className="text-sm text-gray-600">Your Marketing Strategist</p>
                </div>
            </div>
            <div className="rounded-2xl p-6 shadow-xl bg-white/50 border-white/30" style={glassStyle}>
                <h2 className="text-2xl font-semibold text-gray-800">Hello, {clientData.clientName}! 👋</h2>
                <p className="mt-2 text-gray-600">
                    Welcome to your {clientData.companyName} growth dashboard. Let's build your thriving {clientData.industry.toLowerCase()} business together!
                </p>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-white/30 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{progress}%</div>
                        <div className="text-xs text-gray-600">Complete</div>
                    </div>
                    <div className="text-center p-3 bg-white/30 rounded-lg">
                        <div className="text-2xl font-bold text-teal-600">{clientData.marketingPlan.tasks.filter(t => t.completed).length}</div>
                        <div className="text-xs text-gray-600">Tasks Done</div>
                    </div>
                    <div className="text-center p-3 bg-white/30 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{clientData.resources.length}</div>
                        <div className="text-xs text-gray-600">Resources</div>
                    </div>
                    <div className="text-center p-3 bg-white/30 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">30</div>
                        <div className="text-xs text-gray-600">Day Plan</div>
                    </div>
                </div>
            </div>
        </header>

        {/* Navigation Tabs */}
        <div className="mb-8">
            <div className="flex gap-2 p-1 bg-white/20 rounded-lg" style={glassStyle}>
                {['tasks', 'persona', 'resources', 'goals'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-md transition-all text-sm font-medium ${
                            activeTab === tab 
                                ? 'bg-white/80 text-gray-800 shadow-md' 
                                : 'text-gray-600 hover:bg-white/40'
                        }`}
                    >
                        {tab === 'tasks' && 'Action Plan'}
                        {tab === 'persona' && 'Target Audience'}
                        {tab === 'resources' && 'Resources'}
                        {tab === 'goals' && 'Business Goals'}
                    </button>
                ))}
            </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                {/* Tasks Tab */}
                {activeTab === 'tasks' && (
                    <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold text-gray-800">{clientData.marketingPlan.title}</h3>
                            <span className="text-sm text-gray-600">Progress: {progress}%</span>
                        </div>
                        <p className="text-gray-600 mb-6">{clientData.marketingPlan.description}</p>
                        <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                            <div
                                className="h-3 rounded-full transition-all duration-500 ease-out bg-gradient-to-r from-purple-500 to-teal-500"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <ul className="space-y-4">
                            {clientData.marketingPlan.tasks.map(task => (
                                <li
                                    key={task.id}
                                    className={`p-5 rounded-xl cursor-pointer transition-all duration-200 ${
                                        task.completed 
                                            ? 'bg-green-100/80 border-l-4 border-green-500' 
                                            : 'bg-white/50 hover:bg-white/70 border-l-4 border-gray-300'
                                    }`}
                                    onClick={() => toggleTaskCompletion(task.id)}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors mt-1 ${
                                            task.completed ? 'border-green-500 bg-green-500' : 'border-gray-400'
                                        }`}>
                                            {task.completed && <CheckCircle className="w-4 h-4 text-white" />}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className={`font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                                                {task.name}
                                            </h4>
                                            <p className={`text-sm mt-1 ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                                                {task.description}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Persona Tab */}
                {activeTab === 'persona' && (
                    <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
                        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-6">
                            <User className="w-6 h-6 text-purple-600" />
                            Your Ideal Client Profile
                        </h3>
                        <div className="bg-white/50 p-6 rounded-xl border border-white/20 mb-6">
                            <h4 className="text-lg font-bold text-gray-800 mb-2">{clientData.buyerPersona.name}</h4>
                            <p className="text-sm text-purple-600 mb-3">{clientData.buyerPersona.demographics}</p>
                            <p className="text-gray-700 mb-4">{clientData.buyerPersona.description}</p>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h5 className="font-semibold text-red-600 mb-3">😰 Pain Points</h5>
                                    <ul className="space-y-2">
                                        {clientData.buyerPersona.painPoints.map((point, idx) => (
                                            <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                                <span className="text-red-500 mt-1">•</span>
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h5 className="font-semibold text-green-600 mb-3">🎯 Goals</h5>
                                    <ul className="space-y-2">
                                        {clientData.buyerPersona.goals.map((goal, idx) => (
                                            <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                                <span className="text-green-500 mt-1">•</span>
                                                {goal}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Resources Tab */}
                {activeTab === 'resources' && (
                    <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
                        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-6">
                            <FileText className="w-6 h-6 text-teal-600" />
                            Your Marketing Toolkit
                        </h3>
                        <div className="space-y-4">
                            {clientData.resources.map((resource, index) => (
                                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-white/50 border border-white/20 hover:bg-white/70 transition-colors">
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-800">{resource.name}</h4>
                                        <p className="text-sm text-gray-600">{resource.description}</p>
                                        <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                            {resource.type}
                                        </span>
                                    </div>
                                    <button className="p-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors">
                                        <Download className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Goals Tab */}
                {activeTab === 'goals' && (
                    <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
                        <h3 className="text-xl font-semibold text-gray-800 mb-6">Your Business Growth Timeline</h3>
                        <div className="space-y-6">
                            <div className="p-4 bg-white/50 rounded-lg border-l-4 border-purple-500">
                                <h4 className="font-semibold text-purple-700">Month 1 Goal</h4>
                                <p className="text-gray-700">{clientData.businessGoals.monthOne}</p>
                            </div>
                            <div className="p-4 bg-white/50 rounded-lg border-l-4 border-blue-500">
                                <h4 className="font-semibold text-blue-700">Month 3 Goal</h4>
                                <p className="text-gray-700">{clientData.businessGoals.monthThree}</p>
                            </div>
                            <div className="p-4 bg-white/50 rounded-lg border-l-4 border-teal-500">
                                <h4 className="font-semibold text-teal-700">Month 6 Goal</h4>
                                <p className="text-gray-700">{clientData.businessGoals.monthSix}</p>
                            </div>
                            <div className="p-4 bg-white/50 rounded-lg border-l-4 border-green-500">
                                <h4 className="font-semibold text-green-700">Year 1 Vision</h4>
                                <p className="text-gray-700">{clientData.businessGoals.yearOne}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
                {/* Contact Card */}
                <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                        <MessageCircle className="w-5 h-5 text-blue-600" />
                        Need Support?
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Questions about your strategy? Stuck on a task? I'm here to help you succeed!
                    </p>
                    <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2">
                        <MessageCircle className="w-5 h-5" />
                        <span>Message Josh W</span>
                    </button>
                    <div className="mt-4 pt-4 border-t border-white/20">
                        <p className="text-xs text-gray-500">Response time: Usually within 4 hours</p>
                    </div>
                </div>

                {/* Recent Updates */}
                <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Updates</h3>
                    <div className="space-y-3">
                        {clientData.recentUpdates.map((update, idx) => (
                            <div key={idx} className="p-3 bg-white/30 rounded-lg">
                                <div className="text-xs text-gray-500 mb-1">{update.date}</div>
                                <h4 className="font-medium text-gray-800 text-sm">{update.title}</h4>
                                <p className="text-xs text-gray-600 mt-1">{update.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Next Steps */}
                <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Priorities</h3>
                    <div className="space-y-3">
                        {clientData.nextSteps.map((step, idx) => (
                            <div key={idx} className="p-3 bg-white/30 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                        step.priority === 'HIGH' ? 'bg-red-100 text-red-700' :
                                        step.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-green-100 text-green-700'
                                    }`}>
                                        {step.priority}
                                    </span>
                                    <span className="text-xs text-gray-500">{step.deadline}</span>
                                </div>
                                <h4 className="font-medium text-gray-800 text-sm">{step.task}</h4>
                                <p className="text-xs text-gray-600 mt-1">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Users, BookOpen, Settings, TrendingUp, Plus, Edit, Trash2, Eye, Search, Filter, Download, Menu, X, Bell, User, DollarSign } from 'lucide-react';
import AnimatedBackground from './AnimatedGridBackground';



const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [payments, setPayments] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch registrations
 useEffect(() => {
  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://tradingserver.onrender.com/api/registration/all');
      if (!response.ok) {
        throw new Error('Failed to fetch registrations');
      }
      const data = await response.json();
      setRegistrations(Array.isArray(data.registrations) ? data.registrations : []);
    } catch (err) {
      console.error('Failed to fetch registrations:', err);
      setError('Failed to load registrations');
      setRegistrations([]);
    } finally {
      setLoading(false);
    }
  };

  fetchRegistrations();
}, []);


  // Fetch payments
 useEffect(() => {
  const fetchPayments = async () => {
    try {
      const response = await fetch('https://trading-server-ten.vercel.app/api/payments/all');
      if (!response.ok) {
        throw new Error('Failed to fetch payments');
      }
      const data = await response.json();
      setPayments(Array.isArray(data.payments) ? data.payments : []); // ✅ This will set payments to []
    } catch (err) {
      console.error('Failed to fetch payments:', err);
      setPayments([]);
    }
  };

  fetchPayments();
}, []);

  const [courses, setCourses] = useState([
    { id: 1, title: 'Basic Trading Fundamentals', duration: '4 weeks', price: '₹5,999', students: 156, status: 'active', description: 'Learn the basics of stock market trading' },
    { id: 2, title: 'Advanced Trading Strategies', duration: '6 weeks', price: '₹8,999', students: 89, status: 'active', description: 'Master advanced trading techniques' },
    { id: 3, title: 'Options Trading Mastery', duration: '8 weeks', price: '₹12,999', students: 67, status: 'active', description: 'Complete guide to options trading' },
    { id: 4, title: 'Cryptocurrency Trading', duration: '5 weeks', price: '₹7,499', students: 123, status: 'draft', description: 'Digital currency trading strategies' },
  ]);

  const stats = {
    totalStudents: registrations.length,
    activeCourses: courses.filter(c => c.status === 'active').length,
    totalRevenue: payments.reduce((sum, payment) => sum + (payment.amount || 0), 0),
    completionRate: '78%'
  };

  const filteredRegistrations = registrations.filter(reg => {
    if (!reg) return false;
    const matchesSearch = (reg.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                         (reg.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                         (reg.course?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || reg.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredPayments = payments.filter(payment => {
    if (!payment) return false;
    return (payment.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
           (payment.email?.toLowerCase() || '').includes(searchTerm.toLowerCase());
  });

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setShowEditModal(true);
  };

  const handleSaveCourse = (updatedCourse) => {
    setCourses(courses.map(c => c.id === updatedCourse.id ? updatedCourse : c));
    setShowEditModal(false);
    setEditingCourse(null);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'success': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'success':
      case 'completed':
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed':
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = () => {
      if (sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <AnimatedBackground>
      {/* Top Navbar */}
      {/* <nav className="fixed top-0 left-0 right-0 bg-white/10 backdrop-blur-md border-b border-white/20 z-50"> */}
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side */}
            <div className="flex items-center mt-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSidebarOpen(!sidebarOpen);
                }}
                className="lg:hidden p-2 rounded-md text-white hover:bg-white/20 transition-colors"
              >
                {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              <div className="flex items-center ml-2 lg:ml-0 mt-8">
                <TrendingUp className="h-8 w-8 text-blue-400 mr-2" />
                <span className="text-xl font-bold text-white hidden sm:block">Trading Academy</span>
              </div>
            </div>

            {/* Right side */}
            {/* <div className="flex items-center space-x-4">
              <button className="p-2 text-white hover:bg-white/20 rounded-md">
                <Bell className="h-6 w-6" />
              </button>
              <button className="p-2 text-white hover:bg-white/20 rounded-md">
                <User className="h-6 w-6" />
              </button>
            </div> */}
          </div>
        </div>
      {/* </nav> */}

      {/* Sidebar */}
      <div className={`fixed mt-8 inset-y-0 left-0 w-64 bg-white/10 backdrop-blur-md border-r border-white/20 transform transition-transform duration-300 ease-in-out z-40 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 pt-16`}>
        <div className="p-6">
          <nav className="space-y-2">
            <button
              onClick={() => {
                setActiveTab('overview');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                activeTab === 'overview' 
                  ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' 
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Settings className="h-5 w-5 mr-3" />
              Overview
            </button>
            <button
              onClick={() => {
                setActiveTab('registrations');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                activeTab === 'registrations' 
                  ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' 
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Users className="h-5 w-5 mr-3" />
              Student Registrations
            </button>
            <button
              onClick={() => {
                setActiveTab('courses');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                activeTab === 'courses' 
                  ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' 
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <BookOpen className="h-5 w-5 mr-3" />
              Course Management
            </button>
            <button
              onClick={() => {
                setActiveTab('payments');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                activeTab === 'payments' 
                  ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' 
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <DollarSign className="h-5 w-5 mr-3" />
              Payments
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 pt-16 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-white">Admin Dashboard</h2>
          <p className="text-white/70 mt-2">Manage your trading academy efficiently</p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300">
            {error}
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
              <div className="bg-white/10 backdrop-blur-md p-4 lg:p-6 rounded-xl border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/70">Total Students</p>
                    <p className="text-2xl lg:text-3xl font-bold text-white">{stats.totalStudents}</p>
                  </div>
                  <Users className="h-8 lg:h-10 w-8 lg:w-10 text-blue-400" />
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 lg:p-6 rounded-xl border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/70">Active Courses</p>
                    <p className="text-2xl lg:text-3xl font-bold text-white">{stats.activeCourses}</p>
                  </div>
                  <BookOpen className="h-8 lg:h-10 w-8 lg:w-10 text-green-400" />
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 lg:p-6 rounded-xl border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/70">Total Revenue</p>
                    <p className="text-2xl lg:text-3xl font-bold text-white">₹{stats.totalRevenue.toLocaleString()}</p>
                  </div>
                  <TrendingUp className="h-8 lg:h-10 w-8 lg:w-10 text-purple-400" />
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 lg:p-6 rounded-xl border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/70">Completion Rate</p>
                    <p className="text-2xl lg:text-3xl font-bold text-white">{stats.completionRate}</p>
                  </div>
                  <Settings className="h-8 lg:h-10 w-8 lg:w-10 text-orange-400" />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 lg:p-6">
              <h3 className="text-lg lg:text-xl font-semibold text-white mb-4">Recent Registrations</h3>
              {loading ? (
                <p className="text-white/70">Loading...</p>
              ) : registrations.length === 0 ? (
                <p className="text-white/70">No registrations found</p>
              ) : (
                <div className="space-y-3 lg:space-y-4">
                  {registrations.slice(0, 3).map(reg => (
                    <div key={reg.id || reg._id} className="flex items-center justify-between p-3 lg:p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-3 lg:space-x-4">
                        <div className="w-8 lg:w-10 h-8 lg:h-10 bg-blue-600/20 rounded-full flex items-center justify-center">
                          <span className="text-blue-300 font-semibold text-sm lg:text-base">{reg.name?.charAt(0) || 'N'}</span>
                        </div>
                        <div>
                          <p className="font-medium text-white text-sm lg:text-base">{reg.name || 'Unknown'}</p>
                          <p className="text-xs lg:text-sm text-white/70">{reg.course || 'No course'}</p>
                        </div>
                      </div>
                      <span className={`px-2 lg:px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(reg.status || 'pending')}`}>
                        {reg.status || 'pending'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Registrations Tab */}
        {activeTab === 'registrations' && (
          <div>
            {/* Filters */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 lg:p-6 mb-4 lg:mb-6">
              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                    <input
                      type="text"
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 lg:px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                  <button className="px-3 lg:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                    <Download className="h-4 w-4 mr-1 lg:mr-2" />
                    <span className="hidden sm:inline">Export</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Students Table - Mobile Cards / Desktop Table */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden">
              {loading ? (
                <div className="p-8 text-center text-white/70">Loading registrations...</div>
              ) : filteredRegistrations.length === 0 ? (
                <div className="p-8 text-center text-white/70">No registrations found</div>
              ) : (
                <>
                  {/* Mobile View - Cards */}
                  <div className="lg:hidden">
                    {filteredRegistrations.map(reg => (
                      <div key={reg.id || reg._id} className="p-4 border-b border-white/10 last:border-b-0">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                               
                            <div>
                              <p className="font-medium text-white">{reg.firstName|| 'Unknown'}</p>
                              <p className="text-sm text-white/70">{reg.email || 'No email'}</p>
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reg.status || 'pending')}`}>
                            {reg.status || 'pending'}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                          <div>
                            <span className="text-white/70">Course:</span>
                            <p className="text-white">{reg.courseName || 'No course'}</p>
                          </div>
                          <div>
                            <span className="text-white/70">Join Date:</span>
                            <p className="text-white">{reg.joinDate || reg.createdAt ? new Date(reg.joinDate || reg.createdAt).toLocaleDateString() : 'Unknown'}</p>
                          </div>
                        </div>
                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-white/70">Progress</span>
                            <span className="text-white">{reg.progress || 0}%</span>
                          </div>
                          <div className="w-full bg-white/20 rounded-full h-2">
                            <div
                              className="bg-blue-400 h-2 rounded-full"
                              style={{ width: `${reg.progress || 0}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 text-blue-400 hover:bg-blue-600/20 rounded">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-green-400 hover:bg-green-600/20 rounded">
                            <Edit className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop View - Table */}
                  <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-white/5">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-medium text-white">Student</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-white">Contact</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-white">Course</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-white">Join Date</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-white">Progress</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-white">Status</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-white">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {filteredRegistrations.map(reg => (
                          <tr key={reg.id || reg._id} className="hover:bg-white/5">
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center">
                                  <span className="text-blue-300 font-medium text-sm">{reg.name?.charAt(0) || 'N'}</span>
                                </div>
                                <span className="font-medium text-white">{reg.name || 'Unknown'}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm">
                                <p className="text-white">{reg.email || 'No email'}</p>
                                <p className="text-white/70">{reg.phone || 'No phone'}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-white">{reg.course || 'No course'}</td>
                            <td className="px-6 py-4 text-sm text-white">{reg.joinDate || reg.createdAt ? new Date(reg.joinDate || reg.createdAt).toLocaleDateString() : 'Unknown'}</td>
                            <td className="px-6 py-4">
                              <div className="w-full bg-white/20 rounded-full h-2">
                                <div
                                  className="bg-blue-400 h-2 rounded-full"
                                  style={{ width: `${reg.progress || 0}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-white/70 mt-1">{reg.progress || 0}%</span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(reg.status || 'pending')}`}>
                                {reg.status || 'pending'}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex space-x-2">
                                <button className="p-1 text-blue-400 hover:bg-blue-600/20 rounded">
                                  <Eye className="h-4 w-4" />
                                </button>
                                <button className="p-1 text-green-400 hover:bg-green-600/20 rounded">
                                  <Edit className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h3 className="text-xl lg:text-2xl font-bold text-white">Course Management</h3>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add New Course
              </button>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
              {courses.map(course => (
                <div key={course.id} className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 lg:p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-semibold text-white pr-2">{course.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)} flex-shrink-0`}>
                      {course.status}
                    </span>
                  </div>
                  
                  <p className="text-white/70 text-sm mb-4">{course.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Duration:</span>
                      <span className="text-white">{course.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Price:</span>
                      <span className="text-white font-semibold">{course.price}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Students:</span>
                      <span className="text-white">{course.students}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditCourse(course)}
                      className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </button>
                    <button className="px-3 py-2 text-red-400 hover:bg-red-600/20 rounded-lg transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h3 className="text-xl lg:text-2xl font-bold text-white">Payment Records</h3>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Export Payments
              </button>
            </div>

            {/* Filters */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 lg:p-6 mb-4 lg:mb-6">
              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                    <input
                      type="text"
                      placeholder="Search payments..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 lg:px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="success">Success</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payments Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
              <div className="bg-white/10 backdrop-blur-md p-4 lg:p-6 rounded-xl border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/70">Total Payments</p>
                    <p className="text-2xl lg:text-3xl font-bold text-white">{payments.length}</p>
                  </div>
                  <DollarSign className="h-8 lg:h-10 w-8 lg:w-10 text-green-400" />
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 lg:p-6 rounded-xl border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/70">Successful Payments</p>
                    <p className="text-2xl lg:text-3xl font-bold text-white">
                      {payments.filter(p => p.paymentStatus?.toLowerCase() === 'success' || p.status?.toLowerCase() === 'success').length}
                    </p>
                  </div>
                  <TrendingUp className="h-8 lg:h-10 w-8 lg:w-10 text-blue-400" />
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 lg:p-6 rounded-xl border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/70">Total Revenue</p>
                    <p className="text-2xl lg:text-3xl font-bold text-white">
                      ₹{payments.filter(p => p.paymentStatus?.toLowerCase() === 'success' || p.status?.toLowerCase() === 'success')
                        .reduce((sum, payment) => sum + (payment.amount || 0), 0).toLocaleString()}
                    </p>
                  </div>
                  <Users className="h-8 lg:h-10 w-8 lg:w-10 text-purple-400" />
                </div>
              </div>
            </div>

            {/* Payments Table */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden">
              {payments.length === 0 ? (
                <div className="p-8 text-center text-white/70">No payment records found</div>
              ) : (
                <>
                  {/* Mobile View - Cards */}
                  <div className="lg:hidden">
                    {filteredPayments.map((payment, idx) => (
                      <div key={payment.id || payment._id || idx} className="p-4 border-b border-white/10 last:border-b-0">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-600/20 rounded-full flex items-center justify-center">
                              <DollarSign className="h-5 w-5 text-green-300" />
                            </div>
                            <div>
                              <p className="font-medium text-white">{payment.
userName || 'Unknown'}</p>
                              <p className="text-sm text-white/70">{payment.email || 'No email'}</p>
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(payment.paymentStatus || payment.status)}`}>
                            {payment.paymentStatus || payment.paymentStatus
                            
                            
                            || 'unknown'}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                          <div>
                            <span className="text-white/70">Amount:</span>
                            <p className="text-white font-semibold">₹{payment.amount?.toLocaleString() || '0'}</p>
                          </div>
                          <div>
                            <span className="text-white/70">Date:</span>
                            <p className="text-white">{payment.createdAt ? new Date(payment.createdAt).toLocaleDateString() : 'Unknown'}</p>
                          </div>
                        </div>
                        <div className="text-sm">
                          <span className="text-white/70">Course:</span>
                          <p className="text-white">{payment.courseName || 'No course specified'}</p>
                        </div>
                        {payment.transactionId && (
                          <div className="text-sm mt-2">
                            <span className="text-white/70">Transaction ID:</span>
                            <p className="text-white text-xs font-mono">{payment.transactionId}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Desktop View - Table */}
                  <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-white/5">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-medium text-white">Customer</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-white">Amount</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-white">Course</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-white">Status</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-white">Date</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-white">Transaction ID</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-white">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {filteredPayments.map((payment, idx) => (
                          <tr key={payment.id || payment._id || idx} className="hover:bg-white/5">
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-green-600/20 rounded-full flex items-center justify-center">
                                  <span className="text-green-300 font-medium text-sm">{payment.name?.charAt(0) || 'U'}</span>
                                </div>
                                <div>
                                  <p className="font-medium text-white">{payment.name || 'Unknown'}</p>
                                  <p className="text-sm text-white/70">{payment.email || 'No email'}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-lg font-semibold text-white">₹{payment.amount?.toLocaleString() || '0'}</span>
                            </td>
                            <td className="px-6 py-4 text-sm text-white">{payment.course || 'No course specified'}</td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(payment.paymentStatus || payment.status)}`}>
                                {payment.paymentStatus || payment.status || 'unknown'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-white">
                              {payment.createdAt ? new Date(payment.createdAt).toLocaleDateString() : 'Unknown'}
                            </td>
                            <td className="px-6 py-4 text-sm text-white font-mono">
                              {payment.transactionId ? payment.transactionId.substring(0, 12) + '...' : 'N/A'}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex space-x-2">
                                <button className="p-1 text-blue-400 hover:bg-blue-600/20 rounded">
                                  <Eye className="h-4 w-4" />
                                </button>
                                <button className="p-1 text-green-400 hover:bg-green-600/20 rounded">
                                  <Download className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Edit Course Modal */}
        {showEditModal && editingCourse && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-white mb-4">Edit Course</h3>
              <div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">Course Title</label>
                    <input
                      type="text"
                      value={editingCourse.title}
                      onChange={(e) => setEditingCourse({...editingCourse, title: e.target.value})}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">Description</label>
                    <textarea
                      value={editingCourse.description}
                      onChange={(e) => setEditingCourse({...editingCourse, description: e.target.value})}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-20 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">Duration</label>
                    <input
                      type="text"
                      value={editingCourse.duration}
                      onChange={(e) => setEditingCourse({...editingCourse, duration: e.target.value})}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">Price</label>
                    <input
                      type="text"
                      value={editingCourse.price}
                      onChange={(e) => setEditingCourse({...editingCourse, price: e.target.value})}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">Status</label>
                    <select
                      value={editingCourse.status}
                      onChange={(e) => setEditingCourse({...editingCourse, status: e.target.value})}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => handleSaveCourse(editingCourse)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 px-4 py-2 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AnimatedBackground>
  );
};

export default AdminDashboard;
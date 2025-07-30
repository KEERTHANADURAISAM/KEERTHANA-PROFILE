import React, { useState, useEffect } from 'react';
import { Users, BookOpen, Settings, TrendingUp, Plus, Edit, Trash2, Eye, Search, Filter, Download, Menu, X, Bell, User, DollarSign, FileImage, FileText } from 'lucide-react';

// Simple animated background component
const AnimatedBackground = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,0.7),rgba(17,24,39,0.9))]" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

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
  const [showFileModal, setShowFileModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Fetch registrations with proper error handling
  useEffect(() => {
    const fetchRegistrations = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://tradingserver.onrender.com/api/registration/all');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Registration data:', data); // Debug log
        console.log('Sample registration:', data.registrations?.[0] || data[0]); // Debug individual record
        
        // Handle different possible response structures
        let registrationData = [];
        if (data.registrations && Array.isArray(data.registrations)) {
          registrationData = data.registrations;
        } else if (Array.isArray(data)) {
          registrationData = data;
        } else if (data.data && Array.isArray(data.data)) {
          registrationData = data.data;
        }
        
        setRegistrations(registrationData);
      } catch (err) {
        console.error('Failed to fetch registrations:', err);
        setError(`Failed to load registrations: ${err.message}`);
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
        setPayments(Array.isArray(data.payments) ? data.payments : []);
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
    const searchFields = [
      reg.firstName, reg.lastName, reg.name, reg.email, 
      reg.phone, reg.courseName, reg.course
    ].filter(Boolean).join(' ').toLowerCase();
    
    const matchesSearch = searchFields.includes(searchTerm.toLowerCase());
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

  const handleViewFile = (fileUrl, fileName) => {
    setSelectedFile({ url: fileUrl, name: fileName });
    setShowFileModal(true);
  };

  const handleDownloadFile = async (fileUrl, fileName) => {
    try {
      // Check if it's a valid URL
      if (!fileUrl || typeof fileUrl !== 'string') {
        throw new Error('Invalid file URL');
      }

      // For same-origin or properly configured files
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName || 'download';
      link.target = '_blank';
      
      // Add to DOM temporarily
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error('Download failed:', error);
      // Show user-friendly error
      alert('File download not supported. The file will open in a new tab instead.');
      // Fallback: open in new tab
      if (fileUrl) {
        window.open(fileUrl, '_blank');
      }
    }
  };

  const getFileExtension = (url) => {
    if (!url || typeof url !== 'string') return '';
    return url.split('.').pop()?.toLowerCase() || '';
  };

  const isImageFile = (url) => {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
    return imageExtensions.includes(getFileExtension(url));
  };

  const isPdfFile = (url) => {
    return getFileExtension(url) === 'pdf';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    try {
      return new Date(dateString).toLocaleDateString('en-IN');
    } catch {
      return 'Invalid Date';
    }
  };

  const getStudentName = (reg) => {
    if (reg.firstName && reg.lastName) {
      return `${reg.firstName} ${reg.lastName}`;
    }
    return reg.name || reg.firstName || reg.lastName || 'Unknown';
  };

  // Enhanced file URL getter with better field detection
  const getFileUrl = (reg, fileType) => {
    if (!reg) return null;
    
    // Check multiple possible field names for files
    const possibleFields = {
      aadhar: [
        'aadharCard', 'aadharCardFile', 'aadhar', 'aadhaarCard', 
        'aadhaarCardFile', 'idProof', 'adhaarCard', 'adharCard',
        'aadharUrl', 'aadharFile', 'aadharCardUrl'
      ],
      signature: [
        'signature', 'signatureFile', 'sign', 'signFile',
        'signatureUrl', 'signUrl', 'studentSignature'
      ]
    };
    
    const fields = possibleFields[fileType] || [];
    
    for (const field of fields) {
      if (reg[field] && reg[field] !== '' && reg[field] !== null && reg[field] !== undefined) {
        console.log(`Found ${fileType} file in field "${field}":`, reg[field]); // Debug log
        return reg[field];
      }
    }
    
    // Additional debug logging
    console.log(`No ${fileType} file found for registration:`, Object.keys(reg));
    return null;
  };

  const getStudentInitials = (reg) => {
    const name = getStudentName(reg);
    return name.split(' ').map(n => n.charAt(0)).join('').substring(0, 2).toUpperCase();
  };

  const hasFiles = (reg) => {
    const aadharFile = getFileUrl(reg, 'aadhar');
    const signatureFile = getFileUrl(reg, 'signature');
    return !!(aadharFile || signatureFile);
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
      <nav className="fixed top-0 left-0 right-0 bg-white/10 backdrop-blur-md border-b border-white/20 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side */}
            <div className="flex items-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSidebarOpen(!sidebarOpen);
                }}
                className="lg:hidden p-2 rounded-md text-white hover:bg-white/20 transition-colors"
              >
                {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              <div className="flex items-center ml-2 lg:ml-0">
                <TrendingUp className="h-8 w-8 text-blue-400 mr-2" />
                <span className="text-xl font-bold text-white hidden sm:block">Trading Academy</span>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-white hover:bg-white/20 rounded-md">
                <Bell className="h-6 w-6" />
              </button>
              <button className="p-2 text-white hover:bg-white/20 rounded-md">
                <User className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-white/10 backdrop-blur-md border-r border-white/20 transform transition-transform duration-300 ease-in-out z-40 ${
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
                          <span className="text-blue-300 font-semibold text-sm lg:text-base">{getStudentInitials(reg)}</span>
                        </div>
                        <div>
                          <p className="font-medium text-white text-sm lg:text-base">{getStudentName(reg)}</p>
                          <p className="text-xs lg:text-sm text-white/70">{reg.courseName || reg.course || 'No course'}</p>
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
                            <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center">
                              <span className="text-blue-300 font-semibold text-sm">{getStudentInitials(reg)}</span>
                            </div>
                            <div>
                              <p className="font-medium text-white">{getStudentName(reg)}</p>
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
                            <p className="text-white">{reg.courseName || reg.course || 'No course'}</p>
                          </div>
                          <div>
                            <span className="text-white/70">Phone:</span>
                            <p className="text-white">{reg.phone || 'No phone'}</p>
                          </div>
                          <div>
                            <span className="text-white/70">Join Date:</span>
                            <p className="text-white">{formatDate(reg.createdAt || reg.joinDate)}</p>
                          </div>
                          <div>
                            <span className="text-white/70">Experience:</span>
                            <p className="text-white">{reg.tradingExperience || 'Not specified'}</p>
                          </div>
                        </div>
                        {(hasFiles(reg)) && (
                          <div className="mb-3">
                            <span className="text-white/70 text-sm">Files:</span>
                            <div className="flex gap-2 mt-1">
                              {getFileUrl(reg, 'aadhar') && (
                                <div className="flex">
                                  <button
                                    onClick={() => handleViewFile(getFileUrl(reg, 'aadhar'), 'Aadhar Card')}
                                    className="px-2 py-1 bg-blue-600/20 text-blue-300 rounded-l text-xs flex items-center"
                                  >
                                    <FileImage className="h-3 w-3 mr-1" />
                                    Aadhar
                                  </button>
                                  <button
                                    onClick={() => handleDownloadFile(getFileUrl(reg, 'aadhar'), `${getStudentName(reg)}_Aadhar.${getFileExtension(getFileUrl(reg, 'aadhar'))}`)}
                                    className="px-1 py-1 bg-blue-700/20 text-blue-300 rounded-r text-xs hover:bg-blue-600/30"
                                    title="Download Aadhar Card"
                                  >
                                    <Download className="h-3 w-3" />
                                  </button>
                                </div>
                              )}
                              {getFileUrl(reg, 'signature') && (
                                <div className="flex">
                                  <button
                                    onClick={() => handleViewFile(getFileUrl(reg, 'signature'), 'Signature')}
                                    className="px-2 py-1 bg-green-600/20 text-green-300 rounded-l text-xs flex items-center"
                                  >
                                    <FileText className="h-3 w-3 mr-1" />
                                    Signature
                                  </button>
                                  <button
                                    onClick={() => handleDownloadFile(getFileUrl(reg, 'signature'), `${getStudentName(reg)}_Signature.${getFileExtension(getFileUrl(reg, 'signature'))}`)}
                                    className="px-1 py-1 bg-green-700/20 text-green-300 rounded-r text-xs hover:bg-green-600/30"
                                    title="Download Signature"
                                  >
                                    <Download className="h-3 w-3" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
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
                          <th className="px-6 py-4 text-left text-sm font-medium text-white">Files</th>
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
                                  <span className="text-blue-300 font-medium text-sm">{getStudentInitials(reg)}</span>
                                </div>
                                <span className="font-medium text-white">{getStudentName(reg)}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm">
                                <p className="text-white">{reg.email || 'No email'}</p>
                                <p className="text-white/70">{reg.phone || 'No phone'}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-white">{reg.courseName || reg.course || 'No course'}</td>
                            <td className="px-6 py-4 text-sm text-white">{formatDate(reg.createdAt || reg.joinDate)}</td>
                            <td className="px-6 py-4">
                              <div className="flex gap-1">
                                {getFileUrl(reg, 'aadhar') && (
                                  <div className="flex">
                                    <button
                                      onClick={() => handleViewFile(getFileUrl(reg, 'aadhar'), 'Aadhar Card')}
                                      className="p-1 text-blue-400 hover:bg-blue-600/20 rounded-l"
                                      title="View Aadhar Card"
                                    >
                                      <FileImage className="h-4 w-4" />
                                    </button>
                                    <button
                                      onClick={() => handleDownloadFile(getFileUrl(reg, 'aadhar'), `${getStudentName(reg)}_Aadhar.${getFileExtension(getFileUrl(reg, 'aadhar'))}`)}
                                      className="p-1 text-blue-400 hover:bg-blue-600/20 rounded-r border-l border-blue-500/30"
                                      title="Download Aadhar Card"
                                    >
                                      <Download className="h-3 w-3" />
                                    </button>
                                  </div>
                                )}
                                {getFileUrl(reg, 'signature') && (
                                  <div className="flex ml-1">
                                    <button
                                      onClick={() => handleViewFile(getFileUrl(reg, 'signature'), 'Signature')}
                                      className="p-1 text-green-400 hover:bg-green-600/20 rounded-l"
                                      title="View Signature"
                                    >
                                      <FileText className="h-4 w-4" />
                                    </button>
                                    <button
                                      onClick={() => handleDownloadFile(getFileUrl(reg, 'signature'), `${getStudentName(reg)}_Signature.${getFileExtension(getFileUrl(reg, 'signature'))}`)}
                                      className="p-1 text-green-400 hover:bg-green-600/20 rounded-r border-l border-green-500/30"
                                      title="Download Signature"
                                    >
                                      <Download className="h-3 w-3" />
                                    </button>
                                  </div>
                                )}
                                {!hasFiles(reg) && (
                                  <span className="text-white/50 text-xs">No files</span>
                                )}
                              </div>
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
                              <p className="font-medium text-white">{payment.userName || payment.name || 'Unknown'}</p>
                              <p className="text-sm text-white/70">{payment.email || 'No email'}</p>
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(payment.paymentStatus || payment.status)}`}>
                            {payment.paymentStatus || payment.status || 'unknown'}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                          <div>
                            <span className="text-white/70">Amount:</span>
                            <p className="text-white font-semibold">₹{payment.amount?.toLocaleString() || '0'}</p>
                          </div>
                          <div>
                            <span className="text-white/70">Date:</span>
                            <p className="text-white">{formatDate(payment.createdAt)}</p>
                          </div>
                        </div>
                        <div className="text-sm">
                          <span className="text-white/70">Course:</span>
                          <p className="text-white">{payment.courseName || payment.course || 'No course specified'}</p>
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
                                  <span className="text-green-300 font-medium text-sm">{(payment.userName || payment.name || 'U').charAt(0)}</span>
                                </div>
                                <div>
                                  <p className="font-medium text-white">{payment.userName || payment.name || 'Unknown'}</p>
                                  <p className="text-sm text-white/70">{payment.email || 'No email'}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-lg font-semibold text-white">₹{payment.amount?.toLocaleString() || '0'}</span>
                            </td>
                            <td className="px-6 py-4 text-sm text-white">{payment.courseName || payment.course || 'No course specified'}</td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(payment.paymentStatus || payment.status)}`}>
                                {payment.paymentStatus || payment.status || 'unknown'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-white">
                              {formatDate(payment.createdAt)}
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

        {/* File View Modal */}
        {showFileModal && selectedFile && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">{selectedFile.name}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDownloadFile(selectedFile.url, selectedFile.name)}
                    className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                    title="Download File"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => window.open(selectedFile.url, '_blank')}
                    className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                    title="Open in New Tab"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => {
                      setShowFileModal(false);
                      setSelectedFile(null);
                    }}
                    className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <div className="flex justify-center">
                {isImageFile(selectedFile.url) ? (
                  <img
                    src={selectedFile.url}
                    alt={selectedFile.name}
                    className="max-w-full max-h-[70vh] object-contain rounded-lg"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                ) : isPdfFile(selectedFile.url) ? (
                  <iframe
                    src={selectedFile.url}
                    className="w-full h-[70vh] rounded-lg"
                    title={selectedFile.name}
                  />
                ) : (
                  <div className="text-white/70 text-center py-8">
                    <FileImage className="h-16 w-16 mx-auto mb-4" />
                    <p className="mb-2 text-lg font-semibold">File not supported for preview</p>
                    <p className="mb-4 text-sm">This file type cannot be displayed in the browser.</p>
                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={() => handleDownloadFile(selectedFile.url, selectedFile.name)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download File
                      </button>
                      <button
                        onClick={() => window.open(selectedFile.url, '_blank')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Open in New Tab
                      </button>
                    </div>
                  </div>
                )}
                
                <div style={{ display: 'none' }} className="text-white/70 text-center py-8">
                  <FileImage className="h-16 w-16 mx-auto mb-4" />
                  <p className="mb-2 text-lg font-semibold">Unable to display file</p>
                  <p className="mb-4 text-sm">The file could not be loaded or displayed.</p>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => handleDownloadFile(selectedFile.url, selectedFile.name)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download File
                    </button>
                    <button
                      onClick={() => window.open(selectedFile.url, '_blank')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Open in New Tab
                    </button>
                  </div>
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
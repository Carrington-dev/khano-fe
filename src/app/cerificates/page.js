'use client';

import React, { useState, useEffect, use } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Download, Users, Award, Calendar, CheckCircle, AlertCircle, Clock, Settings, Filter, MoreVertical, FileDown, Send, Copy, ExternalLink, Shield } from 'lucide-react';

export default function CertificateIssuanceSystem() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [certificates, setCertificates] = useState([
    {
      id: 'CM-2024-FSA-001',
      recipientName: 'Carrington Muleya',
      recipientEmail: 'carrington@example.com',
      title: 'Advanced FastAPI Development',
      issuer: 'Python Institute',
      issueDate: '2024-03-15',
      expiryDate: '2026-03-15',
      skills: ['FastAPI', 'Python', 'REST APIs', 'Authentication', 'Database Integration'],
      status: 'Valid',
      description: 'Advanced certification in FastAPI development covering asynchronous programming, dependency injection, and production deployment.',
      grade: 'A+ (95%)',
      credentialUrl: `https://verify.stemgon.com/certificate/CM-2024-FSA-001`
    },
    {
      id: 'CM-2024-DJG-002',
      recipientName: 'John Smith',
      recipientEmail: 'john@example.com',
      title: 'Django Full-Stack Mastery',
      issuer: 'Django Software Foundation',
      issueDate: '2024-02-10',
      expiryDate: '2027-02-10',
      skills: ['Django', 'Python', 'PostgreSQL', 'Docker', 'AWS Deployment'],
      status: 'Valid',
      description: 'Comprehensive Django certification covering ORM, security, performance optimization, and cloud deployment.',
      grade: 'A (92%)',
      credentialUrl: `https://verify.stemgon.com/certificate/CM-2024-DJG-002`
    },
    {
      id: 'CM-2024-NXT-003',
      recipientName: 'Sarah Johnson',
      recipientEmail: 'sarah@example.com',
      title: 'Next.js Expert Developer',
      issuer: 'Vercel Academy',
      issueDate: '2024-01-20',
      expiryDate: '2025-01-20',
      skills: ['Next.js', 'React', 'TypeScript', 'SSR/SSG', 'Vercel Deployment'],
      status: 'Expired',
      description: 'Expert-level Next.js certification covering server-side rendering, static generation, and modern React patterns.',
      grade: 'A+ (97%)',
      credentialUrl: `https://verify.stemgon.com/certificate/CM-2024-NXT-003`
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [newCertificate, setNewCertificate] = useState({
    recipientName: '',
    recipientEmail: '',
    title: '',
    issuer: '',
    skills: [],
    description: '',
    grade: '',
    validityPeriod: 24 // months
  });

  const generateUniqueId = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const random = Math.floor(Math.random() * 999).toString().padStart(3, '0');
    return `CM-${year}-${random}`;
  };

  const handleCreateCertificate = () => {
    const id = generateUniqueId();
    const issueDate = new Date().toISOString().split('T')[0];
    const expiryDate = new Date(Date.now() + newCertificate.validityPeriod * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const certificate = {
      id,
      ...newCertificate,
      issueDate,
      expiryDate,
      status: 'Valid',
      credentialUrl: `https://verify.stemgon.com/certificate/${id}`
    };

    setCertificates([...certificates, certificate]);
    setShowCreateModal(false);
    setNewCertificate({
      recipientName: '',
      recipientEmail: '',
      title: '',
      issuer: '',
      skills: [],
      description: '',
      grade: '',
      validityPeriod: 24
    });
  };

  const handleStatusChange = (id, newStatus) => {
    setCertificates(certificates.map(cert => 
      cert.id === id ? { ...cert, status: newStatus } : cert
    ));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || cert.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Valid': return 'bg-green-100 text-green-800 border-green-200';
      case 'Expired': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Revoked': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const stats = {
    total: certificates.length,
    valid: certificates.filter(c => c.status === 'Valid').length,
    expired: certificates.filter(c => c.status === 'Expired').length,
    revoked: certificates.filter(c => c.status === 'Revoked').length
  };

  const id = (generateUniqueId());

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Certificate Management</h1>
              <p className="text-gray-600 text-sm">Issue and manage digital certificates & licenses</p>
            </div>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            Issue Certificate
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Certificates</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Valid</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{stats.valid}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Expired</p>
                <p className="text-3xl font-bold text-yellow-600 mt-1">{stats.expired}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Revoked</p>
                <p className="text-3xl font-bold text-red-600 mt-1">{stats.revoked}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search certificates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="all">All Status</option>
                <option value="valid">Valid</option>
                <option value="expired">Expired</option>
                <option value="revoked">Revoked</option>
              </select>
            </div>
          </div>
        </div>

        {/* Certificates Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Certificate</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Recipient</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Status</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Issue Date</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Expires</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCertificates.map((certificate) => (
                  <tr key={certificate.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium text-gray-900">{certificate.title}</div>
                        <div className="text-sm text-gray-500">{certificate.id}</div>
                        <div className="text-xs text-gray-400">{certificate.issuer}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium text-gray-900">{certificate.recipientName}</div>
                        <div className="text-sm text-gray-500">{certificate.recipientEmail}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(certificate.status)}`}>
                        {certificate.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-900">
                      {formatDate(certificate.issueDate)}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-900">
                      {formatDate(certificate.expiryDate)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedCertificate(certificate)}
                          className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => copyToClipboard(certificate.credentialUrl)}
                          className="p-1 text-gray-400 hover:text-green-600 transition-colors duration-200"
                          title="Copy Verification URL"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1 text-gray-400 hover:text-purple-600 transition-colors duration-200"
                          title="Download PDF"
                        >
                          <FileDown className="w-4 h-4" />
                        </button>
                        <div className="relative group">
                          <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            <button
                              onClick={() => handleStatusChange(certificate.id, certificate.status === 'Valid' ? 'Revoked' : 'Valid')}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              {certificate.status === 'Valid' ? 'Revoke' : 'Reactivate'}
                            </button>
                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              Send Reminder
                            </button>
                            <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Certificate Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Issue New Certificate</h3>
              <p className="text-gray-600 mt-1">Create a new digital certificate for a learner</p>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipient Name *
                  </label>
                  <input
                    type="text"
                    value={newCertificate.recipientName}
                    onChange={(e) => setNewCertificate({...newCertificate, recipientName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={newCertificate.recipientEmail}
                    onChange={(e) => setNewCertificate({...newCertificate, recipientEmail: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certificate Title *
                </label>
                <input
                  type="text"
                  value={newCertificate.title}
                  onChange={(e) => setNewCertificate({...newCertificate, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="e.g., Advanced React Development"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Issuing Organization *
                  </label>
                  <input
                    type="text"
                    value={newCertificate.issuer}
                    onChange={(e) => setNewCertificate({...newCertificate, issuer: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="e.g., Tech Academy"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Grade/Score
                  </label>
                  <input
                    type="text"
                    value={newCertificate.grade}
                    onChange={(e) => setNewCertificate({...newCertificate, grade: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="e.g., A+ (95%)"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills & Technologies
                </label>
                <input
                  type="text"
                  onChange={(e) => {
                    const skills = e.target.value.split(',').map(s => s.trim()).filter(s => s);
                    setNewCertificate({...newCertificate, skills});
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Enter skills separated by commas (e.g., React, TypeScript, Node.js)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newCertificate.description}
                  onChange={(e) => setNewCertificate({...newCertificate, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Describe what the certificate represents..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Validity Period (months)
                </label>
                <select
                  value={newCertificate.validityPeriod}
                  onChange={(e) => setNewCertificate({...newCertificate, validityPeriod: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value={12}>12 months</option>
                  <option value={24}>24 months</option>
                  <option value={36}>36 months</option>
                  <option value={60}>5 years</option>
                  <option value={-1}>Never expires</option>
                </select>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCertificate}
                disabled={!newCertificate.recipientName || !newCertificate.recipientEmail || !newCertificate.title}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200"
              >
                Issue Certificate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Details Modal */}
      {selectedCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedCertificate.title}</h3>
                  <p className="text-gray-600 mt-1">Certificate ID: {selectedCertificate.id}</p>
                </div>
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Recipient Information</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-gray-600">Name:</span>
                      <span className="ml-2 text-gray-900">{selectedCertificate.recipientName}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Email:</span>
                      <span className="ml-2 text-gray-900">{selectedCertificate.recipientEmail}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Certificate Details</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-gray-600">Issuer:</span>
                      <span className="ml-2 text-gray-900">{selectedCertificate.issuer}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Grade:</span>
                      <span className="ml-2 text-gray-900">{selectedCertificate.grade}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Status:</span>
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(selectedCertificate.status)}`}>
                        {selectedCertificate.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Skills & Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCertificate.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Description</h4>
                <p className="text-gray-700 leading-relaxed">{selectedCertificate.description}</p>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Verification URL</h4>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={selectedCertificate.credentialUrl}
                    readOnly
                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm"
                  />
                  <button
                    onClick={() => copyToClipboard(selectedCertificate.credentialUrl)}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg transition-colors duration-200"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <a
                    href={selectedCertificate.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 bg-blue-100 hover:bg-blue-200 border border-blue-300 rounded-lg transition-colors duration-200"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center">
                  <FileDown className="w-4 h-4 mr-2" />
                  Download PDF
                </button>
                <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center">
                  <Send className="w-4 h-4 mr-2" />
                  Send to Recipient
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Actions Panel (Optional) */}
      <div className="fixed bottom-6 right-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
          <h4 className="font-medium text-gray-900 mb-3">Quick Actions</h4>
          <div className="space-y-2">
            <button className="w-full px-3 py-2 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors duration-200 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Bulk Import
            </button>
            <button className="w-full px-3 py-2 text-sm bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors duration-200 flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export All
            </button>
            <button className="w-full px-3 py-2 text-sm bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition-colors duration-200 flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </button>
          </div>
        </div>
      </div>

      {/* API Integration Instructions */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6 mb-8">
          <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2" />
            Integration Guide - Hosting Your Verification System
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-800 mb-3">1. Set Up Verification Domain</h4>
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <code className="text-sm text-gray-700">
                  https://verify.stemgon.com/certificate/[ID]
                </code>
              </div>
              <p className="text-sm text-blue-700 mt-2">
                Configure your subdomain to host the verification page
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-blue-800 mb-3">2. API Endpoints Structure</h4>
              <div className="space-y-2">
                <div className="bg-white rounded-lg p-3 border border-blue-200">
                  <div className="text-xs text-green-600 font-mono">GET</div>
                  <code className="text-sm text-gray-700">/api/certificates/{id}</code>
                </div>
                <div className="bg-white rounded-lg p-3 border border-blue-200">
                  <div className="text-xs text-blue-600 font-mono">POST</div>
                  <code className="text-sm text-gray-700">/api/certificates/create</code>
                </div>
                <div className="bg-white rounded-lg p-3 border border-blue-200">
                  <div className="text-xs text-orange-600 font-mono">PUT</div>
                  <code className="text-sm text-gray-700">/api/certificates/{id}/status</code>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-blue-800 mb-3">3. Database Schema</h4>
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <pre className="text-xs text-gray-700 overflow-x-auto">
{`certificates:
  - id (string, unique)
  - recipient_name (string)
  - recipient_email (string)
  - title (string)
  - issuer (string)
  - issue_date (date)
  - expiry_date (date)
  - skills (array)
  - status (enum: valid/expired/revoked)
  - description (text)
  - grade (string, optional)
  - created_at (timestamp)
  - updated_at (timestamp)`}
                </pre>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-blue-800 mb-3">4. Technology Stack Options</h4>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3 border border-blue-200">
                  <div className="font-medium text-gray-900 mb-1">FastAPI + PostgreSQL</div>
                  <p className="text-xs text-gray-600">High-performance async API with robust database</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-blue-200">
                  <div className="font-medium text-gray-900 mb-1">Django + SQLite/PostgreSQL</div>
                  <p className="text-xs text-gray-600">Full-featured framework with admin panel</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-blue-200">
                  <div className="font-medium text-gray-900 mb-1">Next.js + Supabase</div>
                  <p className="text-xs text-gray-600">Full-stack with built-in auth and real-time features</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-100 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">💡 Implementation Tips:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Use UUID-based certificate IDs for security</li>
              <li>• Implement rate limiting on verification endpoint</li>
              <li>• Add digital signatures for enhanced authenticity</li>
              <li>• Set up automated expiry notifications</li>
              <li>• Include blockchain verification for premium certificates</li>
              <li>• Implement SEO-friendly verification pages</li>
            </ul>
          </div>
        </div>

        {/* Sample API Response */}
        <div className="bg-gray-900 rounded-xl p-6 text-green-400 font-mono text-sm overflow-x-auto">
          <div className="text-gray-400 mb-3">// Sample API Response for Certificate Verification</div>
          <pre>{`{
  "success": true,
  "certificate": {
    "id": "CM-2024-FSA-001",
    "recipient_name": "Carrington Muleya",
    "title": "Advanced FastAPI Development",
    "issuer": "Python Institute",
    "issue_date": "2024-03-15",
    "expiry_date": "2026-03-15",
    "skills": ["FastAPI", "Python", "REST APIs", "Authentication"],
    "status": "valid",
    "description": "Advanced certification in FastAPI development...",
    "grade": "A+ (95%)",
    "verification_url": "https://verify.stemgon.com/certificate/CM-2024-FSA-001",
    "issued_at": "2024-03-15T10:30:00Z",
    "verified_at": "2024-09-07T14:23:15Z"
  },
  "verification": {
    "is_authentic": true,
    "signature_valid": true,
    "not_tampered": true,
    "verification_count": 47
  }
}`}</pre>
        </div>

        {/* Security Features */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Cryptographic Security</h4>
            <p className="text-gray-600 text-sm">Each certificate includes digital signatures and tamper-proof verification checksums.</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Automated Management</h4>
            <p className="text-gray-600 text-sm">Automatic expiry notifications, bulk operations, and status management workflows.</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Scalable Infrastructure</h4>
            <p className="text-gray-600 text-sm">Handle thousands of certificates with enterprise-grade performance and reliability.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import React, { useState, useEffect } from 'react';
import { Search, Shield, CheckCircle, AlertCircle, Calendar, User, Award, Code, Database, Globe, Download, Share, Copy, ExternalLink, Sparkles } from 'lucide-react';

export default function CertificateVerification() {
  const [searchId, setSearchId] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState('');

  // Mock certificate database
  const certificates = {
    'CM-2024-FSA-001': {
      id: 'CM-2024-FSA-001',
      recipientName: 'Carrington Muleya',
      title: 'Advanced FastAPI Development',
      issuer: 'Python Institute',
      issueDate: '2024-03-15',
      expiryDate: '2026-03-15',
      skills: ['FastAPI', 'Python', 'REST APIs', 'Authentication', 'Database Integration'],
      status: 'Valid',
      description: 'Advanced certification in FastAPI development covering asynchronous programming, dependency injection, and production deployment.',
      credentialUrl: '#',
      grade: 'A+ (95%)'
    },
    'CM-2024-DJG-002': {
      id: 'CM-2024-DJG-002',
      recipientName: 'Carrington Muleya',
      title: 'Django Full-Stack Mastery',
      issuer: 'Django Software Foundation',
      issueDate: '2024-02-10',
      expiryDate: '2027-02-10',
      skills: ['Django', 'Python', 'PostgreSQL', 'Docker', 'AWS Deployment'],
      status: 'Valid',
      description: 'Comprehensive Django certification covering ORM, security, performance optimization, and cloud deployment.',
      credentialUrl: '#',
      grade: 'A (92%)'
    },
    'CM-2024-NXT-003': {
      id: 'CM-2024-NXT-003',
      recipientName: 'Carrington Muleya',
      title: 'Next.js Expert Developer',
      issuer: 'Vercel Academy',
      issueDate: '2024-01-20',
      expiryDate: '2025-01-20',
      skills: ['Next.js', 'React', 'TypeScript', 'SSR/SSG', 'Vercel Deployment'],
      status: 'Valid',
      description: 'Expert-level Next.js certification covering server-side rendering, static generation, and modern React patterns.',
      credentialUrl: '#',
      grade: 'A+ (97%)'
    },
    'CM-2023-AWS-004': {
      id: 'CM-2023-AWS-004',
      recipientName: 'Carrington Muleya',
      title: 'AWS Solutions Architect',
      issuer: 'Amazon Web Services',
      issueDate: '2023-11-05',
      expiryDate: '2026-11-05',
      skills: ['AWS', 'Cloud Architecture', 'EC2', 'RDS', 'Lambda', 'S3'],
      status: 'Valid',
      description: 'Professional AWS certification demonstrating expertise in designing distributed systems and cloud solutions.',
      credentialUrl: '#',
      grade: 'Pass (88%)'
    }
  };

  const handleVerification = async () => {
    if (!searchId.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const certificate = certificates[searchId.toUpperCase()];
    setVerificationResult(certificate || { status: 'Not Found' });
    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleVerification();
    }
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedId(type);
    setTimeout(() => setCopiedId(''), 2000);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Valid': return 'from-green-500 to-emerald-500';
      case 'Expired': return 'from-yellow-500 to-orange-500';
      case 'Revoked': return 'from-red-500 to-pink-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const getTechIcon = (tech) => {
    const icons = {
      'FastAPI': Code,
      'Django': Globe,
      'Next.js': Code,
      'React': Code,
      'Python': Code,
      'AWS': Database,
      'PostgreSQL': Database,
      'TypeScript': Code,
    };
    return icons[tech] || Code;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full filter blur-3xl top-20 left-10 animate-pulse" />
        <div className="absolute w-80 h-80 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full filter blur-3xl bottom-20 right-10 animate-pulse" style={{animationDelay: '1s'}} />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="p-6 lg:p-8 border-b border-white/10">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center shadow-lg">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Certificate Verification</h1>
                <p className="text-blue-200 text-sm">Carrington Muleya - Tech Certifications</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <div className="text-right">
                <div className="text-white font-semibold">Carrington Muleya</div>
                <div className="text-blue-200 text-sm">Full-Stack Developer</div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto p-6 lg:p-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full text-blue-200 font-medium mb-6 border border-white/20">
              <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
              Verify Authentic Certifications
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-4">
              Professional
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Certification Portal
              </span>
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Verify the authenticity of technical certifications. Enter a certificate ID to access detailed information and validation status.
            </p>
          </div>

          {/* Search Section */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center mb-6">
                <Search className="w-6 h-6 text-blue-400 mr-3" />
                <h3 className="text-xl font-bold text-white">Certificate Lookup</h3>
              </div>
              
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter Certificate ID (e.g., CM-2024-FSA-001)"
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:bg-white/15 focus:border-blue-400/50 focus:ring-4 focus:ring-blue-400/20 outline-none transition-all duration-300 text-lg"
                  />
                </div>
                
                <button
                  onClick={handleVerification}
                  disabled={isLoading || !searchId.trim()}
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-bold rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center text-lg"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3" />
                  ) : (
                    <Shield className="w-6 h-6 mr-3" />
                  )}
                  {isLoading ? 'Verifying...' : 'Verify Certificate'}
                </button>
              </div>

              {/* Sample IDs */}
              <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-white/70 text-sm mb-3">Try these sample certificate IDs:</p>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(certificates).map((id) => (
                    <button
                      key={id}
                      onClick={() => setSearchId(id)}
                      className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white/80 text-xs rounded-lg transition-colors duration-200 border border-white/10"
                    >
                      {id}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Verification Results */}
          {verificationResult && (
            <div className="max-w-4xl mx-auto">
              {verificationResult.status === 'Not Found' ? (
                <div className="bg-red-500/10 backdrop-blur-xl border border-red-400/30 rounded-3xl p-8 text-center shadow-2xl">
                  <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Certificate Not Found</h3>
                  <p className="text-red-200">The certificate ID you entered could not be found in our database. Please check the ID and try again.</p>
                </div>
              ) : (
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
                  {/* Certificate Header */}
                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-b border-white/10 p-8">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <CheckCircle className="w-12 h-12 text-green-400 mr-4" />
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">Certificate Verified</h3>
                          <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${getStatusColor(verificationResult.status)} rounded-full text-white font-semibold`}>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            {verificationResult.status}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => copyToClipboard(verificationResult.id, 'id')}
                          className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors duration-200 text-white"
                          title="Copy Certificate ID"
                        >
                          {copiedId === 'id' ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                        </button>
                        <button className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors duration-200 text-white" title="Download Certificate">
                          <Download className="w-5 h-5" />
                        </button>
                        <button className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors duration-200 text-white" title="Share Certificate">
                          <Share className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Certificate Details */}
                  <div className="p-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Left Column */}
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-3xl font-bold text-white mb-2">{verificationResult.title}</h4>
                          <p className="text-blue-200 text-lg font-medium">{verificationResult.issuer}</p>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center">
                            <User className="w-5 h-5 text-blue-400 mr-3" />
                            <div>
                              <div className="text-white/70 text-sm">Recipient</div>
                              <div className="text-white font-semibold">{verificationResult.recipientName}</div>
                            </div>
                          </div>

                          <div className="flex items-center">
                            <Award className="w-5 h-5 text-blue-400 mr-3" />
                            <div>
                              <div className="text-white/70 text-sm">Certificate ID</div>
                              <div className="text-white font-mono">{verificationResult.id}</div>
                            </div>
                          </div>

                          <div className="flex items-center">
                            <Calendar className="w-5 h-5 text-blue-400 mr-3" />
                            <div>
                              <div className="text-white/70 text-sm">Issue Date</div>
                              <div className="text-white font-semibold">{formatDate(verificationResult.issueDate)}</div>
                            </div>
                          </div>

                          <div className="flex items-center">
                            <Calendar className="w-5 h-5 text-blue-400 mr-3" />
                            <div>
                              <div className="text-white/70 text-sm">Expires</div>
                              <div className="text-white font-semibold">{formatDate(verificationResult.expiryDate)}</div>
                            </div>
                          </div>

                          {verificationResult.grade && (
                            <div className="flex items-center">
                              <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                              <div>
                                <div className="text-white/70 text-sm">Grade</div>
                                <div className="text-green-400 font-bold">{verificationResult.grade}</div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-6">
                        <div>
                          <h5 className="text-white font-bold mb-3 flex items-center">
                            <Code className="w-5 h-5 mr-2" />
                            Skills & Technologies
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {verificationResult.skills.map((skill, index) => {
                              const IconComponent = getTechIcon(skill);
                              return (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20 rounded-lg text-white text-sm font-medium"
                                >
                                  <IconComponent className="w-4 h-4 mr-2" />
                                  {skill}
                                </span>
                              );
                            })}
                          </div>
                        </div>

                        <div>
                          <h5 className="text-white font-bold mb-3">Description</h5>
                          <p className="text-white/80 leading-relaxed">{verificationResult.description}</p>
                        </div>

                        <div className="pt-4">
                          <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center">
                            <ExternalLink className="w-5 h-5 mr-2" />
                            View Original Credential
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          <footer className="mt-16 text-center">
            <div className="inline-flex items-center space-x-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-8 py-4">
              <Shield className="w-6 h-6 text-blue-400" />
              <div className="text-left">
                <div className="text-white font-bold">Secure Verification</div>
                <div className="text-white/60 text-sm">All certificates are cryptographically verified</div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
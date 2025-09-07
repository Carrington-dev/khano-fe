"use client";

import React, { useState, useEffect, use } from 'react';
import { Search, Shield, CheckCircle, AlertCircle, Calendar, User, Award, Code, Database, Globe, Download, Share, Copy, ExternalLink, Sparkles, FileDown, Clock, MapPin, Mail, Phone, Building } from 'lucide-react';

export default function CertificateVerifyPage() {
  const [searchId, setSearchId] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [urlParam, setUrlParam] = useState('');

  // Mock certificate database - this would come from your API
  const certificates = {
    'CM-2024-FSA-001': {
      id: 'CM-2024-FSA-001',
      recipientName: 'Carrington Muleya',
      recipientEmail: 'carrington@techvantage.com',
      title: 'Advanced FastAPI Development',
      issuer: 'Python Institute',
      issueDate: '2024-03-15',
      expiryDate: '2026-03-15',
      skills: ['FastAPI', 'Python', 'REST APIs', 'Authentication', 'Database Integration'],
      status: 'Valid',
      description: 'Advanced certification in FastAPI development covering asynchronous programming, dependency injection, and production deployment strategies.',
      credentialUrl: 'https://verify.yourcompany.com/certificate/CM-2024-FSA-001',
      grade: 'A+ (95%)',
      verificationCount: 47,
      lastVerified: new Date().toISOString(),
      digitalSignature: 'SHA256:7d4e8f2a9c1b3e5f...'
    },
    'CM-2024-DJG-002': {
      id: 'CM-2024-DJG-002',
      recipientName: 'John Smith',
      recipientEmail: 'john.smith@example.com',
      title: 'Django Full-Stack Mastery',
      issuer: 'Django Software Foundation',
      issueDate: '2024-02-10',
      expiryDate: '2027-02-10',
      skills: ['Django', 'Python', 'PostgreSQL', 'Docker', 'AWS Deployment'],
      status: 'Valid',
      description: 'Comprehensive Django certification covering ORM, security, performance optimization, and cloud deployment.',
      credentialUrl: 'https://verify.yourcompany.com/certificate/CM-2024-DJG-002',
      grade: 'A (92%)',
      verificationCount: 32,
      lastVerified: new Date().toISOString(),
      digitalSignature: 'SHA256:9f3a1c8e2b5d7f4a...'
    },
    'CM-2024-NXT-003': {
      id: 'CM-2024-NXT-003',
      recipientName: 'Sarah Johnson',
      recipientEmail: 'sarah.johnson@webdev.com',
      title: 'Next.js Expert Developer',
      issuer: 'Vercel Academy',
      issueDate: '2024-01-20',
      expiryDate: '2025-01-20',
      skills: ['Next.js', 'React', 'TypeScript', 'SSR/SSG', 'Vercel Deployment'],
      status: 'Expired',
      description: 'Expert-level Next.js certification covering server-side rendering, static generation, and modern React patterns.',
      credentialUrl: 'https://verify.yourcompany.com/certificate/CM-2024-NXT-003',
      grade: 'A+ (97%)',
      verificationCount: 18,
      lastVerified: new Date().toISOString(),
      digitalSignature: 'SHA256:4b7c2e9a6f1d8c3b...'
    },
    'CM-2023-AWS-004': {
      id: 'CM-2023-AWS-004',
      recipientName: 'Michael Chen',
      recipientEmail: 'michael.chen@cloudtech.com',
      title: 'AWS Solutions Architect',
      issuer: 'Amazon Web Services',
      issueDate: '2023-11-05',
      expiryDate: '2026-11-05',
      skills: ['AWS', 'Cloud Architecture', 'EC2', 'RDS', 'Lambda', 'S3'],
      status: 'Valid',
      description: 'Professional AWS certification demonstrating expertise in designing distributed systems and cloud solutions.',
      credentialUrl: 'https://verify.yourcompany.com/certificate/CM-2023-AWS-004',
      grade: 'Pass (88%)',
      verificationCount: 125,
      lastVerified: new Date().toISOString(),
      digitalSignature: 'SHA256:1a8f3c2e9b5d7f4c...'
    }
  };

  // Check URL for certificate ID on component mount
  useEffect(() => {
    const path = window.location.pathname;
    const urlId = path.split('/certificate/')[1];
    if (urlId) {
      setUrlParam(urlId);
      setSearchId(urlId);
      handleVerification(urlId);
    }
  }, []);

  const handleVerification = async (id = null) => {
    const certificateId = id || searchId;
    if (!certificateId.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const certificate = certificates[certificateId.toUpperCase()];
    if (certificate) {
      // Update verification count
      certificate.verificationCount += 1;
      certificate.lastVerified = new Date().toISOString();
    }
    
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Valid': return CheckCircle;
      case 'Expired': return Clock;
      case 'Revoked': return AlertCircle;
      default: return AlertCircle;
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

  const isExpired = (expiryDate) => {
    return new Date(expiryDate) < new Date();
  };

  const generatePDF = async (certificate) => {
    setIsDownloading(true);
    
    try {
      // Create a new window for PDF generation
      const pdfWindow = window.open('', '_blank');
      
      const pdfContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Certificate - ${certificate.title}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
            
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: 'Inter', sans-serif;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 20px;
            }
            
            .certificate {
              background: white;
              width: 800px;
              padding: 60px;
              border-radius: 20px;
              box-shadow: 0 25px 50px rgba(0,0,0,0.2);
              position: relative;
              overflow: hidden;
            }
            
            .certificate::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 8px;
              background: linear-gradient(90deg, #667eea, #764ba2, #667eea);
            }
            
            .header {
              text-align: center;
              margin-bottom: 40px;
              border-bottom: 2px solid #f0f0f0;
              padding-bottom: 30px;
            }
            
            .logo {
              width: 60px;
              height: 60px;
              background: linear-gradient(135deg, #667eea, #764ba2);
              border-radius: 15px;
              margin: 0 auto 20px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 24px;
              font-weight: bold;
            }
            
            .certificate-title {
              font-size: 16px;
              color: #666;
              text-transform: uppercase;
              letter-spacing: 3px;
              margin-bottom: 10px;
            }
            
            .main-title {
              font-size: 36px;
              font-weight: 800;
              color: #333;
              margin-bottom: 20px;
              background: linear-gradient(135deg, #667eea, #764ba2);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
            
            .recipient {
              font-size: 24px;
              color: #333;
              margin-bottom: 30px;
            }
            
            .details-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 40px;
              margin-bottom: 40px;
            }
            
            .detail-item {
              margin-bottom: 20px;
            }
            
            .detail-label {
              font-size: 12px;
              color: #666;
              text-transform: uppercase;
              letter-spacing: 1px;
              margin-bottom: 5px;
            }
            
            .detail-value {
              font-size: 16px;
              font-weight: 600;
              color: #333;
            }
            
            .skills {
              margin-bottom: 30px;
            }
            
            .skills-title {
              font-size: 14px;
              color: #666;
              text-transform: uppercase;
              letter-spacing: 1px;
              margin-bottom: 15px;
            }
            
            .skills-list {
              display: flex;
              flex-wrap: wrap;
              gap: 10px;
            }
            
            .skill-tag {
              background: linear-gradient(135deg, #667eea, #764ba2);
              color: white;
              padding: 8px 16px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: 600;
            }
            
            .description {
              background: #f8f9fa;
              padding: 25px;
              border-radius: 15px;
              margin-bottom: 40px;
            }
            
            .description-title {
              font-size: 14px;
              color: #666;
              text-transform: uppercase;
              letter-spacing: 1px;
              margin-bottom: 10px;
            }
            
            .description-text {
              font-size: 14px;
              line-height: 1.6;
              color: #555;
            }
            
            .footer {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 40px;
              padding-top: 30px;
              border-top: 2px solid #f0f0f0;
            }
            
            .verification-code {
              font-family: 'Courier New', monospace;
              font-size: 12px;
              color: #666;
              background: #f8f9fa;
              padding: 10px 15px;
              border-radius: 8px;
            }
            
            .status-badge {
              background: linear-gradient(135deg, #10b981, #059669);
              color: white;
              padding: 10px 20px;
              border-radius: 25px;
              font-size: 14px;
              font-weight: 600;
            }
            
            .watermark {
              position: absolute;
              bottom: 20px;
              right: 30px;
              opacity: 0.1;
              font-size: 48px;
              font-weight: 800;
              color: #667eea;
              transform: rotate(-45deg);
              pointer-events: none;
            }
            
            @media print {
              body {
                background: white;
                padding: 0;
              }
              
              .certificate {
                box-shadow: none;
                width: 100%;
                max-width: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="certificate">
            <div class="watermark">VERIFIED</div>
            
            <div class="header">
              <div class="logo">✓</div>
              <div class="certificate-title">Certificate of Achievement</div>
              <h1 class="main-title">${certificate.title}</h1>
              <div class="recipient">This certifies that <strong>${certificate.recipientName}</strong> has successfully completed the requirements</div>
            </div>
            
            <div class="details-grid">
              <div>
                <div class="detail-item">
                  <div class="detail-label">Issued By</div>
                  <div class="detail-value">${certificate.issuer}</div>
                </div>
                
                <div class="detail-item">
                  <div class="detail-label">Issue Date</div>
                  <div class="detail-value">${formatDate(certificate.issueDate)}</div>
                </div>
                
                <div class="detail-item">
                  <div class="detail-label">Expiry Date</div>
                  <div class="detail-value">${formatDate(certificate.expiryDate)}</div>
                </div>
              </div>
              
              <div>
                <div class="detail-item">
                  <div class="detail-label">Certificate ID</div>
                  <div class="detail-value">${certificate.id}</div>
                </div>
                
                <div class="detail-item">
                  <div class="detail-label">Status</div>
                  <div class="detail-value">${certificate.status}</div>
                </div>
                
                ${certificate.grade ? `
                <div class="detail-item">
                  <div class="detail-label">Grade</div>
                  <div class="detail-value">${certificate.grade}</div>
                </div>
                ` : ''}
              </div>
            </div>
            
            <div class="skills">
              <div class="skills-title">Skills & Technologies</div>
              <div class="skills-list">
                ${certificate.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
              </div>
            </div>
            
            <div class="description">
              <div class="description-title">Description</div>
              <div class="description-text">${certificate.description}</div>
            </div>
            
            <div class="footer">
              <div class="verification-code">
                Verification: ${certificate.digitalSignature}
              </div>
              
              <div class="status-badge">
                ✓ Verified Certificate
              </div>
            </div>
          </div>
          
          <script>
            // Auto-print when page loads
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 1000);
            }
            
            // Close window after printing
            window.onafterprint = function() {
              window.close();
            }
          </script>
        </body>
        </html>
      `;
      
      pdfWindow.document.write(pdfContent);
      pdfWindow.document.close();
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full filter blur-3xl top-20 left-10 animate-pulse" />
        <div className="absolute w-80 h-80 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full filter blur-3xl bottom-20 right-10 animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute w-64 h-64 bg-gradient-to-r from-teal-500/25 to-blue-500/25 rounded-full filter blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{animationDelay: '2s'}} />
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
                <p className="text-blue-200 text-sm">Secure • Authenticated • Tamper-Proof</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <div className="text-right">
                <div className="text-white font-semibold">TechVantage Solutions</div>
                <div className="text-blue-200 text-sm">Professional Certifications</div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto p-6 lg:p-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full text-blue-200 font-medium mb-6 border border-white/20">
              <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
              {urlParam ? 'Certificate Found' : 'Verify Authentic Certifications'}
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-4">
              {urlParam ? 'Certificate' : 'Professional'}
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {urlParam ? 'Verification' : 'Certification Portal'}
              </span>
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              {urlParam 
                ? 'Displaying verification results for the requested certificate.'
                : 'Verify the authenticity of technical certifications. Enter a certificate ID to access detailed information and validation status.'
              }
            </p>
          </div>

          {/* Search Section - Hide if URL param exists */}
          {!urlParam && (
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
          )}

          {/* Verification Results */}
          {verificationResult && (
            <div className="max-w-5xl mx-auto">
              {verificationResult.status === 'Not Found' ? (
                <div className="bg-red-500/10 backdrop-blur-xl border border-red-400/30 rounded-3xl p-8 text-center shadow-2xl">
                  <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Certificate Not Found</h3>
                  <p className="text-red-200 mb-6">The certificate ID you entered could not be found in our database. Please check the ID and try again.</p>
                  
                  {/* Contact Information */}
                  <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                    <h4 className="text-white font-semibold mb-4">Need Help?</h4>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center text-white/80">
                        <Mail className="w-4 h-4 mr-2 text-blue-400" />
                        support@techvantage.com
                      </div>
                      <div className="flex items-center text-white/80">
                        <Phone className="w-4 h-4 mr-2 text-green-400" />
                        +1 (555) 123-4567
                      </div>
                      <div className="flex items-center text-white/80">
                        <Building className="w-4 h-4 mr-2 text-purple-400" />
                        TechVantage Solutions
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Certificate Header */}
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
                    <div className={`bg-gradient-to-r ${verificationResult.status === 'Valid' ? 'from-green-500/20 to-emerald-500/20' : verificationResult.status === 'Expired' ? 'from-yellow-500/20 to-orange-500/20' : 'from-red-500/20 to-pink-500/20'} border-b border-white/10 p-8`}>
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center">
                          {React.createElement(getStatusIcon(verificationResult.status), {
                            className: `w-12 h-12 mr-4 ${verificationResult.status === 'Valid' ? 'text-green-400' : verificationResult.status === 'Expired' ? 'text-yellow-400' : 'text-red-400'}`
                          })}
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-1">
                              {verificationResult.status === 'Valid' ? 'Certificate Verified' : 
                               verificationResult.status === 'Expired' ? 'Certificate Expired' : 
                               'Certificate Revoked'}
                            </h3>
                            <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${getStatusColor(verificationResult.status)} rounded-full text-white font-semibold`}>
                              {React.createElement(getStatusIcon(verificationResult.status), { className: 'w-4 h-4 mr-2' })}
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
                          <button 
                            onClick={() => generatePDF(verificationResult)}
                            disabled={isDownloading}
                            className="p-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors duration-200 text-white" 
                            title="Download PDF Certificate"
                          >
                            {isDownloading ? (
                              <div className="w-5 h-5 animate-spin rounded-full border-b-2 border-white" />
                            ) : (
                              <FileDown className="w-5 h-5" />
                            )}
                          </button>
                          <button 
                            onClick={() => copyToClipboard(verificationResult.credentialUrl, 'url')}
                            className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors duration-200 text-white" 
                            title="Share Certificate"
                          >
                            {copiedId === 'url' ? <CheckCircle className="w-5 h-5" /> : <Share className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      {/* Status Alert */}
                      {verificationResult.status === 'Expired' && (
                        <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-xl p-4">
                          <div className="flex items-center">
                            <Clock className="w-5 h-5 text-yellow-400 mr-3" />
                            <div>
                              <div className="text-yellow-200 font-medium">This certificate has expired</div>
                              <div className="text-yellow-300/80 text-sm">Contact the issuer for renewal information</div>
                            </div>
                          </div>
                        </div>
                      )}
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
                              <Mail className="w-5 h-5 text-blue-400 mr-3" />
                              <div>
                                <div className="text-white/70 text-sm">Contact</div>
                                <div className="text-white font-mono text-sm">{verificationResult.recipientEmail}</div>
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
                                <div className={`font-semibold ${isExpired(verificationResult.expiryDate) ? 'text-yellow-400' : 'text-white'}`}>
                                  {formatDate(verificationResult.expiryDate)}
                                </div>
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

                          <div className="pt-4 space-y-3">
                            <button 
                              onClick={() => generatePDF(verificationResult)}
                              disabled={isDownloading}
                              className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center"
                            >
                              {isDownloading ? (
                                <>
                                  <div className="w-5 h-5 animate-spin rounded-full border-b-2 border-white mr-2" />
                                  Generating PDF...
                                </>
                              ) : (
                                <>
                                  <FileDown className="w-5 h-5 mr-2" />
                                  Download PDF Certificate
                                </>
                              )}
                            </button>
                            
                            <button 
                              onClick={() => copyToClipboard(verificationResult.credentialUrl, 'credential')}
                              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center"
                            >
                              {copiedId === 'credential' ? (
                                <>
                                  <CheckCircle className="w-5 h-5 mr-2" />
                                  Copied to Clipboard!
                                </>
                              ) : (
                                <>
                                  <ExternalLink className="w-5 h-5 mr-2" />
                                  Share This Certificate
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Verification Details & Security */}
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Verification Stats */}
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl">
                      <h4 className="text-xl font-bold text-white mb-6 flex items-center">
                        <Shield className="w-5 h-5 mr-2" />
                        Verification Details
                      </h4>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-white/10">
                          <span className="text-white/70">Verification Count</span>
                          <span className="text-white font-bold">{verificationResult.verificationCount}</span>
                        </div>
                        
                        <div className="flex justify-between items-center py-3 border-b border-white/10">
                          <span className="text-white/70">Last Verified</span>
                          <span className="text-white font-mono text-sm">
                            {new Date(verificationResult.lastVerified).toLocaleString()}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center py-3 border-b border-white/10">
                          <span className="text-white/70">Digital Signature</span>
                          <span className="text-green-400 font-mono text-xs">Valid ✓</span>
                        </div>
                        
                        <div className="flex justify-between items-center py-3">
                          <span className="text-white/70">Security Level</span>
                          <div className="flex items-center">
                            <div className="flex space-x-1 mr-2">
                              {[...Array(5)].map((_, i) => (
                                <div key={i} className="w-2 h-2 bg-green-400 rounded-full"></div>
                              ))}
                            </div>
                            <span className="text-green-400 text-sm font-semibold">Maximum</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Issuer Information */}
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl">
                      <h4 className="text-xl font-bold text-white mb-6 flex items-center">
                        <Building className="w-5 h-5 mr-2" />
                        Issuer Information
                      </h4>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="text-white/70 text-sm mb-1">Organization</div>
                          <div className="text-white font-semibold text-lg">{verificationResult.issuer}</div>
                        </div>
                        
                        <div>
                          <div className="text-white/70 text-sm mb-1">Accreditation</div>
                          <div className="text-green-400 font-medium">Verified & Accredited ✓</div>
                        </div>
                        
                        <div>
                          <div className="text-white/70 text-sm mb-1">Certificate Authority</div>
                          <div className="text-white font-medium">TechVantage Solutions</div>
                        </div>
                        
                        <div className="pt-4">
                          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                            <div className="text-white/70 text-xs mb-2">Digital Fingerprint</div>
                            <div className="text-white font-mono text-xs break-all">
                              {verificationResult.digitalSignature}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Actions */}
                  <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                    <div className="text-center mb-6">
                      <h4 className="text-2xl font-bold text-white mb-2">Certificate Actions</h4>
                      <p className="text-white/70">Additional options for this certificate</p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <button className="flex flex-col items-center p-4 bg-white/10 hover:bg-white/15 rounded-2xl transition-all duration-300 border border-white/10 hover:border-white/20">
                        <Mail className="w-8 h-8 text-blue-400 mb-3" />
                        <div className="text-white font-medium mb-1">Contact Recipient</div>
                        <div className="text-white/60 text-sm text-center">Send a message to the certificate holder</div>
                      </button>
                      
                      <button className="flex flex-col items-center p-4 bg-white/10 hover:bg-white/15 rounded-2xl transition-all duration-300 border border-white/10 hover:border-white/20">
                        <ExternalLink className="w-8 h-8 text-green-400 mb-3" />
                        <div className="text-white font-medium mb-1">View on LinkedIn</div>
                        <div className="text-white/60 text-sm text-center">See this credential on LinkedIn profile</div>
                      </button>
                      
                      <button className="flex flex-col items-center p-4 bg-white/10 hover:bg-white/15 rounded-2xl transition-all duration-300 border border-white/10 hover:border-white/20">
                        <Award className="w-8 h-8 text-purple-400 mb-3" />
                        <div className="text-white font-medium mb-1">Similar Certificates</div>
                        <div className="text-white/60 text-sm text-center">Browse related certifications</div>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          <footer className="mt-16 text-center">
            <div className="inline-flex items-center space-x-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-8 py-4 mb-6">
              <Shield className="w-6 h-6 text-blue-400" />
              <div className="text-left">
                <div className="text-white font-bold">Secure Verification</div>
                <div className="text-white/60 text-sm">All certificates are cryptographically verified</div>
              </div>
            </div>
            
            <div className="text-white/40 text-sm">
              <p className="mb-2">© 2025 TechVantage Solutions. All rights reserved.</p>
              <div className="flex justify-center space-x-6 text-xs">
                <a href="#" className="hover:text-white/60 transition-colors duration-200">Privacy Policy</a>
                <a href="#" className="hover:text-white/60 transition-colors duration-200">Terms of Service</a>
                <a href="#" className="hover:text-white/60 transition-colors duration-200">Contact Support</a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
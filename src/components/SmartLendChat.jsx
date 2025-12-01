import React, { useState, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Send, Upload, CheckCircle, Circle, Loader, Download, FileText, CreditCard, TrendingUp, FileCheck, Award, Menu, X } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import SanctionLetter from './SanctionLetter';

// Particle creation function
const createParticles = () => {
  const particles = [];
  for (let i = 0; i < 20; i++) {
    particles.push({
      id: i,
      left: Math.random() * 100 + '%',
      animationDelay: Math.random() * 15 + 's',
      animationDuration: (15 + Math.random() * 10) + 's'
    });
  }
  return particles;
};

// Confetti creation function
const createConfetti = () => {
  const colors = ['#7AC142', '#0033A0', '#FFD700', '#FF6B6B', '#4ECDC4'];
  const confetti = [];
  for (let i = 0; i < 50; i++) {
    confetti.push({
      id: i,
      left: Math.random() * 100 + '%',
      backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      animationDelay: Math.random() * 0.5 + 's',
      borderRadius: Math.random() > 0.5 ? '50%' : '0'
    });
  }
  return confetti;
};

export default function SmartLendUnified() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'text',
      text: "Hello! I'm your AI Loan Assistant. I'll guide you through your personal loan application. Let's get started!",
      sender: 'assistant',
      timestamp: new Date()
    },
    {
      id: 2,
      type: 'text',
      text: "To begin, please provide your full name.",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [borrowerDetails, setBorrowerDetails] = useState({
    name: '',
    pan: '',
    mobile: '',
    email: ''
  });
  const [detailStep, setDetailStep] = useState(0);
  const [requestedLoanAmount, setRequestedLoanAmount] = useState(null);
  const [creditScore, setCreditScore] = useState(null);
  const [eligibility, setEligibility] = useState(null);
  const messagesEndRef = useRef(null);

  const loanSteps = [
    { name: 'Inquiry', description: 'Loan request', icon: FileText },
    { name: 'Verification', description: 'Document check', icon: FileCheck },
    { name: 'Credit Check', description: 'Score assessment', icon: CreditCard },
    { name: 'Underwriting', description: 'Risk evaluation', icon: TrendingUp },
    { name: 'Approval', description: 'Final decision', icon: Award }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (message) => {
    setMessages(prev => [...prev, { ...message, id: prev.length + 1, timestamp: new Date() }]);
  };

  const handleSend = () => {
    if (inputText.trim() === '') return;

    const userMessage = {
      type: 'text',
      text: inputText,
      sender: 'user'
    };

    addMessage(userMessage);
    const userInput = inputText;
    setInputText('');

    // Simulate conversation flow for collecting user details
    setTimeout(() => {
      if (detailStep === 0) {
        // After name
        setBorrowerDetails(prev => ({ ...prev, name: userInput }));
        addMessage({
          type: 'text',
          text: `Thank you, ${userInput}! Now please provide your PAN number.`,
          sender: 'assistant'
        });
        setDetailStep(1);
      } else if (detailStep === 1) {
        // After PAN
        setBorrowerDetails(prev => ({ ...prev, pan: userInput }));
        addMessage({
          type: 'text',
          text: 'Great! Now please provide your registered mobile number.',
          sender: 'assistant'
        });
        setDetailStep(2);
      } else if (detailStep === 2) {
        // After mobile
        setBorrowerDetails(prev => ({ ...prev, mobile: userInput }));
        addMessage({
          type: 'text',
          text: 'Perfect! Now please provide your email address.',
          sender: 'assistant'
        });
        setDetailStep(3);
      } else if (detailStep === 3) {
        // After email
        setBorrowerDetails(prev => ({ ...prev, email: userInput }));
        addMessage({
          type: 'text',
          text: 'Excellent! Now, how much loan amount would you like to apply for?',
          sender: 'assistant'
        });
        setDetailStep(4);
      } else if (detailStep === 4) {
        // After loan amount
        const loanAmount = parseInt(userInput.replace(/[^\d]/g, ''));
        setRequestedLoanAmount(loanAmount);
        addMessage({
          type: 'text',
          text: `Great! You're applying for ₹${loanAmount.toLocaleString('en-IN')}. Now I need to verify your identity.`,
          sender: 'assistant'
        });

        setTimeout(() => {
          addMessage({
            type: 'upload',
            text: 'Please upload your PAN Card or Aadhaar for verification',
            sender: 'assistant'
          });
          setCurrentStep(1);
        }, 1000);
      } else {
        addMessage({
          type: 'text',
          text: 'Thank you for the information. Processing your request...',
          sender: 'assistant'
        });
      }
    }, 500);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      
      addMessage({
        type: 'text',
        text: `Document uploaded: ${file.name}`,
        sender: 'user'
      });

      // Show verification loading
      setTimeout(() => {
        addMessage({
          type: 'loading',
          text: 'Verifying your document...',
          sender: 'assistant'
        });

        // Show verification success
        setTimeout(() => {
          addMessage({
            type: 'verified',
            text: 'PAN Card Verified ✓',
            sender: 'assistant'
          });
          setCurrentStep(2);

          // Show credit check
          setTimeout(() => {
            addMessage({
              type: 'credit-score',
              text: 'Running credit check...',
              sender: 'assistant'
            });
            setCurrentStep(3);

            // Show eligibility
            setTimeout(() => {
              const eligibilityData = {
                amount: requestedLoanAmount,
                rate: 10.5,
                tenure: 48,
                emi: Math.round(requestedLoanAmount * 10.5 / 100 / 12 * Math.pow(1 + 10.5 / 100 / 12, 48) / (Math.pow(1 + 10.5 / 100 / 12, 48) - 1))
              };
              setEligibility(eligibilityData);
              addMessage({
                type: 'eligibility',
                text: 'Loan eligibility calculated',
                sender: 'assistant'
              });
              setCurrentStep(4);
            }, 2000);
          }, 2000);
        }, 3000);
      }, 1000);
    }
  };

  const handleGenerateLetter = () => {
    addMessage({
      type: 'text',
      text: 'Generating your sanction letter...',
      sender: 'assistant'
    });

    setTimeout(() => {
      addMessage({
        type: 'download',
        text: 'Your sanction letter is ready!',
        sender: 'assistant'
      });
      setCurrentStep(5);
    }, 2000);
  };

  const generateEMISchedule = (principal, annualRate, tenureMonths) => {
    const monthlyRate = annualRate / 100 / 12;
    const emi = Math.round(principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths) / (Math.pow(1 + monthlyRate, tenureMonths) - 1));

    let balance = principal;
    let schedule = '';

    for (let month = 1; month <= Math.min(tenureMonths, 5); month++) {
      const interest = Math.round(balance * monthlyRate);
      const principalPortion = Math.round(emi - interest);
      balance = Math.round(balance - principalPortion);

      schedule += `
        <tr>
          <td style="border: 1px solid #d1d5db; padding: 8px;">${month}</td>
          <td style="border: 1px solid #d1d5db; padding: 8px; text-align: right;">${principalPortion.toLocaleString('en-IN')}</td>
          <td style="border: 1px solid #d1d5db; padding: 8px; text-align: right;">${interest.toLocaleString('en-IN')}</td>
          <td style="border: 1px solid #d1d5db; padding: 8px; text-align: right;">${emi.toLocaleString('en-IN')}</td>
          <td style="border: 1px solid #d1d5db; padding: 8px; text-align: right;">${balance.toLocaleString('en-IN')}</td>
        </tr>
      `;
    }

    if (tenureMonths > 5) {
      schedule += `
        <tr>
          <td colspan="5" style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-style: italic;">• • •</td>
        </tr>
      `;
    }

    return schedule;
  };

  const handleDownload = () => {
    // Generate HTML string for the sanction letter
    const htmlContent = `
      <div style="max-width: 800px; margin: 0 auto; background-color: white; padding: 32px; font-family: Inter, Arial, sans-serif; position: relative; color: #333;">
        <!-- Watermark -->
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-45deg); font-size: 72px; font-weight: bold; color: #e5e7eb; opacity: 0.1; pointer-events: none; z-index: 1;">
          TATA CAPITAL
        </div>

        <!-- Header -->
        <div style="text-align: center; margin-bottom: 32px; position: relative; z-index: 10;">
          <div style="width: 200px; height: 80px; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center;">
            <img src="https://www.chryseum.in/wp-content/uploads/2023/05/Website-News-Images-1200-%C3%97-800-px-12.png" alt="Tata Capital Logo" style="max-width: 100%; max-height: 100%; object-fit: contain;" />
          </div>
          <p style="font-size: 16px; color: #6b7280; margin-bottom: 8px;">Count on us</p>
          <h1 style="font-size: 24px; font-weight: bold; color: #1f2937; margin-bottom: 8px;">
            TATA CAPITAL - PERSONAL LOAN SANCTION LETTER
          </h1>
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 14px; color: #6b7280;">
            <span>Reference Number: PL/TC/2025/XXXX</span>
            <span>Date of Issue: 30/11/2025</span>
          </div>
        </div>

        <!-- Borrower Details -->
        <div style="margin-bottom: 32px; position: relative; z-index: 10;">
          <h2 style="font-size: 18px; font-weight: 600; color: #1f2937; margin-bottom: 16px;">
            Borrower Details
          </h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 14px;">
            <div>
              <span style="font-weight: 500; color: #374151;">Name:</span>
              <span style="margin-left: 8px;">${borrowerDetails.name || 'N/A'}</span>
            </div>
            <div>
              <span style="font-weight: 500; color: #374151;">Registered Mobile:</span>
              <span style="margin-left: 8px;">${borrowerDetails.mobile || 'N/A'}</span>
            </div>
            <div>
              <span style="font-weight: 500; color: #374151;">PAN:</span>
              <span style="margin-left: 8px;">${borrowerDetails.pan || 'N/A'}</span>
            </div>
            <div>
              <span style="font-weight: 500; color: #374151;">Email:</span>
              <span style="margin-left: 8px;">${borrowerDetails.email || 'N/A'}</span>
            </div>
          </div>
        </div>

        <!-- Loan Details -->
        <div style="margin-bottom: 32px; position: relative; z-index: 10;">
          <h2 style="font-size: 18px; font-weight: 600; color: #1f2937; margin-bottom: 16px;">
            Loan Details
          </h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 14px;">
            <div>
              <span style="font-weight: 500; color: #374151;">Sanctioned Loan Amount:</span>
              <span style="margin-left: 8px; font-weight: 600;">₹${eligibility?.amount?.toLocaleString('en-IN') || 'N/A'}</span>
            </div>
            <div>
              <span style="font-weight: 500; color: #374151;">Interest Rate:</span>
              <span style="margin-left: 8px;">${eligibility?.rate || 'N/A'}% per annum (reducing balance)</span>
            </div>
            <div>
              <span style="font-weight: 500; color: #374151;">Processing Fee:</span>
              <span style="margin-left: 8px;">₹1,500 + GST</span>
            </div>
            <div>
              <span style="font-weight: 500; color: #374151;">Repayment Mode:</span>
              <span style="margin-left: 8px;">NACH/Auto-Debit</span>
            </div>
            <div>
              <span style="font-weight: 500; color: #374151;">Tenure:</span>
              <span style="margin-left: 8px;">${eligibility?.tenure || 'N/A'} months</span>
            </div>
            <div>
              <span style="font-weight: 500; color: #374151;">EMI Amount:</span>
              <span style="margin-left: 8px;">₹${eligibility?.emi?.toLocaleString('en-IN') || 'N/A'}</span>
            </div>
            <div style="grid-column: span 2;">
              <span style="font-weight: 500; color: #374151;">Disbursement Amount:</span>
              <span style="margin-left: 8px;">₹${((eligibility?.amount || 0) - 1500).toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        <!-- EMI Schedule -->
        <div style="margin-bottom: 32px; position: relative; z-index: 10;">
          <h2 style="font-size: 18px; font-weight: 600; color: #1f2937; margin-bottom: 16px;">
            EMI Schedule
          </h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
            <thead>
              <tr style="background-color: #f3f4f6;">
                <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left; font-weight: 600;">Month</th>
                <th style="border: 1px solid #d1d5db; padding: 8px; text-align: right; font-weight: 600;">Principal (₹)</th>
                <th style="border: 1px solid #d1d5db; padding: 8px; text-align: right; font-weight: 600;">Interest (₹)</th>
                <th style="border: 1px solid #d1d5db; padding: 8px; text-align: right; font-weight: 600;">Total EMI (₹)</th>
                <th style="border: 1px solid #d1d5db; padding: 8px; text-align: right; font-weight: 600;">Outstanding (₹)</th>
              </tr>
            </thead>
            <tbody>
              ${generateEMISchedule(eligibility?.amount || 300000, eligibility?.rate || 10.5, eligibility?.tenure || 48)}
            </tbody>
          </table>
        </div>

        <!-- Terms and Conditions -->
        <div style="margin-bottom: 32px; position: relative; z-index: 10;">
          <h2 style="font-size: 18px; font-weight: 600; color: #1f2937; margin-bottom: 16px;">
            Terms and Conditions
          </h2>
          <ul style="font-size: 14px; color: #374151; line-height: 1.5;">
            <li>• The loan is sanctioned subject to verification of documents.</li>
            <li>• Interest is charged on reducing balance.</li>
            <li>• Late EMI will attract penalty of 24% annualized.</li>
            <li>• Borrower authorizes Tata Capital to run bureau checks.</li>
            <li>• This sanction letter is system-generated and does not require physical signature.</li>
          </ul>
        </div>

        <!-- Digital Signature -->
        <div style="margin-bottom: 32px; position: relative; z-index: 10;">
          <div style="text-align: center;">
            <div style="display: inline-block; border: 2px solid #d1d5db; padding: 16px; border-radius: 8px;">
              <p style="font-size: 14px; font-weight: 500; color: #374151; margin-bottom: 8px;">
                Digitally Signed by
              </p>
              <p style="font-size: 18px; font-weight: bold; color: #1f2937;">
                Tata Capital Financial Services Ltd.
              </p>
              <div style="margin-top: 8px; width: 128px; height: 32px; display: flex; align-items: center; justify-content: center; margin: 8px auto 0;">
                <img src="https://www.clipartmax.com/png/middle/352-3527401_clipart-free-library-signatures-for-free-download-on-sample-digital-signature-png.png" alt="Digital Signature" style="max-width: 100%; max-height: 100%; object-fit: contain;" />
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="border-top: 1px solid #d1d5db; padding-top: 24px; position: relative; z-index: 10;">
          <div style="text-align: center; font-size: 14px; color: #6b7280;">
            <p style="font-weight: 600; margin-bottom: 8px;">Tata Capital Financial Services Ltd.</p>
            <p style="margin-bottom: 8px;">Registered Office: Bombay House, 24, Homi Mody Street, Fort, Mumbai - 400001</p>
            <p style="margin-bottom: 8px;">Customer Support: customercare@tatacapital.com | 1800-209-6060</p>
            <p style="font-size: 12px; font-style: italic;">
              This is a system-generated sanction letter and requires no physical signature.
            </p>
          </div>
        </div>
      </div>
    `;

    // Generate PDF using html2pdf
    const options = {
      margin: 0.5,
      filename: 'Sanction_Letter.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(options).from(htmlContent).save();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderMessage = (message) => {
    const isUser = message.sender === 'user';

    switch (message.type) {
      case 'upload':
        return (
          <div className="max-w-[70%] rounded-2xl px-5 py-4 shadow-sm text-white"
               style={{ background: 'linear-gradient(135deg, #0033A0 0%, #0047CC 100%)' }}>
            <p className="text-sm mb-4">{message.text}</p>
            <div className="bg-white rounded-xl p-4">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Upload size={32} style={{ color: '#0033A0' }} />
              </div>
              <input
                type="file"
                id="fileUpload"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
              />
              <label
                htmlFor="fileUpload"
                className="block w-full text-center px-4 py-2 rounded-lg text-white font-medium cursor-pointer transition-all duration-200 hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg, #0033A0 0%, #0047CC 100%)' }}
              >
                Choose File
              </label>
              <p className="text-xs text-gray-500 text-center mt-2">
                PDF, JPG, PNG • Max 5MB
              </p>
            </div>
          </div>
        );

      case 'loading':
        return (
          <div className="max-w-[70%] rounded-2xl px-5 py-4 shadow-sm text-white"
               style={{ background: 'linear-gradient(135deg, #0033A0 0%, #0047CC 100%)' }}>
            <div className="flex items-center gap-3">
              <Loader className="animate-spin" size={20} />
              <p className="text-sm">{message.text}</p>
            </div>
            <div className="mt-3 bg-white bg-opacity-20 rounded-full h-2">
              <div className="h-2 rounded-full bg-green-400 animate-pulse" style={{ width: '75%' }} />
            </div>
          </div>
        );

      case 'verified':
        return (
          <div className="max-w-[70%] rounded-2xl px-5 py-4 shadow-sm"
               style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}>
            <div className="flex items-center gap-3 text-white">
              <CheckCircle size={24} />
              <p className="text-sm font-semibold">{message.text}</p>
            </div>
            <p className="text-xs text-green-50 mt-2">Document authenticated successfully</p>
          </div>
        );

      case 'credit-score':
        return (
          <div className="max-w-[70%] rounded-2xl px-5 py-4 shadow-sm text-white"
               style={{ background: 'linear-gradient(135deg, #0033A0 0%, #0047CC 100%)' }}>
            <p className="text-sm mb-3">{message.text}</p>
            <div className="bg-white rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Credit Score</span>
                <span className="text-3xl font-bold" style={{ color: '#7AC142' }}>760</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <TrendingUp size={14} style={{ color: '#7AC142' }} />
                <span>Excellent Score</span>
              </div>
            </div>
          </div>
        );

      case 'eligibility':
        return (
          <div className="max-w-[70%] rounded-2xl px-5 py-4 shadow-sm text-white"
               style={{ background: 'linear-gradient(135deg, #0033A0 0%, #0047CC 100%)' }}>
            <p className="text-sm mb-3 font-semibold">🎉 Congratulations! You're eligible for the loan</p>
            <div className="bg-white rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Loan Amount</span>
                <span className="text-lg font-bold" style={{ color: '#0033A0' }}>
                  ₹{eligibility?.amount?.toLocaleString('en-IN') || '5,00,000'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Interest Rate</span>
                <span className="text-lg font-semibold" style={{ color: '#7AC142' }}>
                  {eligibility?.rate || 10.5}% p.a.
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Monthly EMI</span>
                <span className="text-lg font-semibold text-gray-800">
                  ₹{eligibility?.emi?.toLocaleString('en-IN') || '13,493'}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-sm text-gray-600">Tenure</span>
                <span className="text-sm font-medium text-gray-800">
                  {eligibility?.tenure || 48} months
                </span>
              </div>
            </div>
            <button
              onClick={handleGenerateLetter}
              className="w-full mt-4 px-4 py-3 rounded-lg text-white font-medium transition-all duration-200 hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, #7AC142 0%, #65A838 100%)' }}
            >
              Generate Sanction Letter
            </button>
          </div>
        );

      case 'download':
        return (
          <div className="max-w-[70%] rounded-2xl px-5 py-4 shadow-sm text-white"
               style={{ background: 'linear-gradient(135deg, #0033A0 0%, #0047CC 100%)' }}>
            <p className="text-sm mb-3 font-semibold">{message.text}</p>
            <div className="bg-white rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                     style={{ backgroundColor: '#FEF3F2' }}>
                  <FileText size={24} style={{ color: '#DC2626' }} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">Sanction_Letter.pdf</p>
                  <p className="text-xs text-gray-500">245 KB</p>
                </div>
              </div>
              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-medium transition-all duration-200 hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg, #0033A0 0%, #0047CC 100%)' }}
              >
                <Download size={20} />
                Download Letter
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div
            className={`max-w-[70%] rounded-2xl px-5 py-3 shadow-sm ${
              isUser ? 'bg-gray-200 text-gray-800' : 'text-white'
            }`}
            style={
              !isUser
                ? { background: 'linear-gradient(135deg, #0033A0 0%, #0047CC 100%)' }
                : {}
            }
          >
            <p className="text-sm leading-relaxed">{message.text}</p>
            <span className={`text-xs mt-2 block ${
              isUser ? 'text-gray-600' : 'text-blue-100'
            }`}>
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        );
    }
  };

  const [showSidebar, setShowSidebar] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const particles = createParticles();

  // Trigger confetti when loan is approved
  useEffect(() => {
    if (currentStep === 5 && !showConfetti) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [currentStep, showConfetti]);

  return (
    <div className="flex h-screen bg-white font-sans relative">
      {/* Particle Background */}
      <div className="particles fixed inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle absolute"
            style={{
              left: particle.left,
              animationDelay: particle.animationDelay,
              animationDuration: particle.animationDuration,
            }}
          />
        ))}
      </div>

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {createConfetti().map((confetti) => (
            <div
              key={confetti.id}
              className="confetti absolute"
              style={{
                left: confetti.left,
                backgroundColor: confetti.backgroundColor,
                borderRadius: confetti.borderRadius,
                animationDelay: confetti.animationDelay,
              }}
            />
          ))}
        </div>
      )}

      {/* Main Chat Area - 70% on desktop, full width on mobile */}
      <div className="flex-1 flex flex-col lg:w-[70%] w-full relative z-10">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 shadow-sm pulse-glow">
          <div className="flex items-center justify-between">
            <div className="float-animation">
              <h1 className="text-xl lg:text-2xl font-bold" style={{ color: '#0033A0' }}>
                SmartLend
              </h1>
              <p className="text-xs lg:text-sm text-gray-600 mt-1">AI-Powered Loan Approval Assistant</p>
            </div>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 ripple"
              style={{ color: '#0033A0' }}
            >
              {showSidebar ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto px-3 lg:px-6 py-4 lg:py-6 bg-gray-50">
          <div className="max-w-4xl mx-auto space-y-3 lg:space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} message-enter`}
              >
                {renderMessage(message)}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Bar */}
        <div className="bg-white border-t border-gray-200 px-3 lg:px-6 py-3 lg:py-4 shadow-sm">
          <div className="max-w-4xl mx-auto flex gap-2 lg:gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-3 lg:px-4 py-2 lg:py-3 text-sm lg:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent card-hover"
            />
            <button
              onClick={handleSend}
              className="px-4 lg:px-6 py-2 lg:py-3 rounded-xl text-white font-medium transition-all duration-200 hover:shadow-lg hover:scale-105 flex items-center gap-2 btn-shine ripple"
              style={{ background: 'linear-gradient(135deg, #0033A0 0%, #0047CC 100%)' }}
            >
              <Send size={18} className="lg:w-5 lg:h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Sidebar - 30% on desktop, slide-over on mobile */}
      <div className={`
        ${showSidebar ? 'fixed inset-0 z-50 lg:relative' : 'hidden lg:block'}
        lg:w-[30%] bg-white border-l border-gray-200 overflow-y-auto
      `}>
        {/* Mobile overlay */}
        {showSidebar && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowSidebar(false)}
          />
        )}
        
        {/* Sidebar content */}
        <div className={`
          ${showSidebar ? 'fixed right-0 top-0 bottom-0 w-80 lg:relative lg:w-full' : ''}
          bg-white p-4 lg:p-6 z-50 overflow-y-auto card-hover
        `}>
          {/* Close button for mobile */}
          {showSidebar && (
            <button
              onClick={() => setShowSidebar(false)}
              className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 ripple"
              style={{ color: '#0033A0' }}
            >
              <X size={24} />
            </button>
          )}

          <h2 className="text-lg lg:text-xl font-bold mb-2 float-animation" style={{ color: '#0033A0' }}>
            Loan Progress
          </h2>
          <p className="text-xs lg:text-sm text-gray-600 mb-4 lg:mb-6">Track your application journey</p>

        <div className="space-y-4 lg:space-y-6">
          {loanSteps.map((step, index) => {
            const StepIcon = step.icon;
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const isUpcoming = index > currentStep;

            return (
              <div key={index} className="relative card-hover">
                {/* Connecting Line */}
                {index < loanSteps.length - 1 && (
                  <div
                    className={`absolute left-4 top-10 w-0.5 h-10 lg:h-12 transition-colors duration-500 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                )}

                {/* Step Content */}
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 pulse-glow ${
                    isCompleted ? 'bg-green-500' : isCurrent ? 'bg-blue-500' : 'bg-gray-300'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle size={18} color="white" fill="white" />
                    ) : isCurrent ? (
                      <StepIcon size={14} color="white" />
                    ) : (
                      <Circle size={18} color="white" />
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className={`font-semibold text-sm lg:text-base transition-colors duration-300 ${
                      isUpcoming ? 'text-gray-400' : 'text-gray-900'
                    }`}>
                      {step.name}
                    </h3>
                    <p className={`text-xs lg:text-sm transition-colors duration-300 ${
                      isUpcoming ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {step.description}
                    </p>
                    {isCurrent && (
                      <span className="inline-block mt-2 text-xs font-medium px-2 lg:px-3 py-1 rounded-full pulse-glow"
                            style={{ backgroundColor: '#E6F0FF', color: '#0033A0' }}>
                        In Progress
                      </span>
                    )}
                    {isCompleted && (
                      <span className="inline-block mt-2 text-xs font-medium text-green-700 px-2 lg:px-3 py-1 rounded-full btn-shine"
                            style={{ backgroundColor: '#F0FDF4' }}>
                        Completed ✓
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="mt-6 lg:mt-8 p-3 lg:p-4 rounded-xl card-hover" style={{ backgroundColor: '#F0F9FF' }}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs lg:text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-xs lg:text-sm font-bold float-animation" style={{ color: '#0033A0' }}>
              {Math.round((currentStep / loanSteps.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 lg:h-2.5 progress-bar">
            <div
              className="h-2 lg:h-2.5 rounded-full transition-all duration-500 btn-shine"
              style={{
                width: `${(currentStep / loanSteps.length) * 100}%`,
                backgroundColor: '#7AC142'
              }}
            />
          </div>
          <p className="text-xs text-gray-600 mt-2 text-center">
            {currentStep === 0 && "Just getting started"}
            {currentStep === 1 && "Verifying your identity"}
            {currentStep === 2 && "Checking creditworthiness"}
            {currentStep === 3 && "Evaluating loan terms"}
            {currentStep === 4 && "Finalizing approval"}
            {currentStep === 5 && "Application complete!"}
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';

const SanctionLetter = ({ borrowerDetails, eligibility }) => {
  const today = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: 'white',
      padding: '32px',
      fontFamily: 'Inter, Arial, sans-serif',
      position: 'relative',
      color: '#333'
    }}>
      {/* Watermark */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) rotate(-45deg)',
        fontSize: '72px',
        fontWeight: 'bold',
        color: '#e5e7eb',
        opacity: 0.1,
        pointerEvents: 'none',
        zIndex: 1
      }}>
        TATA CAPITAL
      </div>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px', position: 'relative', zIndex: 10 }}>
        <div style={{
          width: '128px',
          height: '64px',
          backgroundColor: '#2563eb',
          margin: '0 auto 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px'
        }}>
          <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="120" height="40" rx="8" fill="#0033A0"/>
            <text x="60" y="25" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="Arial">TATA CAPITAL</text>
          </svg>
        </div>
        <h1 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '8px'
        }}>
          TATA CAPITAL – PERSONAL LOAN SANCTION LETTER
        </h1>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '14px',
          color: '#6b7280'
        }}>
          <span>Reference Number: PL/TC/2025/XXXX</span>
          <span>Date of Issue: {today}</span>
        </div>
      </div>

      {/* Borrower Details */}
      <div style={{ marginBottom: '32px', position: 'relative', zIndex: 10 }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#1f2937',
          marginBottom: '16px'
        }}>
          Borrower Details
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          fontSize: '14px'
        }}>
          <div>
            <span style={{ fontWeight: '500', color: '#374151' }}>Name:</span>
            <span style={{ marginLeft: '8px' }}>{borrowerDetails?.name || '[Borrower Name]'}</span>
          </div>
          <div>
            <span style={{ fontWeight: '500', color: '#374151' }}>PAN:</span>
            <span style={{ marginLeft: '8px' }}>{borrowerDetails?.pan || '[ABCDE1234F]'}</span>
          </div>
          <div>
            <span style={{ fontWeight: '500', color: '#374151' }}>Registered Mobile:</span>
            <span style={{ marginLeft: '8px' }}>{borrowerDetails?.mobile || '[+91-XXXXXXXXXX]'}</span>
          </div>
          <div>
            <span style={{ fontWeight: '500', color: '#374151' }}>Email:</span>
            <span style={{ marginLeft: '8px' }}>{borrowerDetails?.email || '[borrower@example.com]'}</span>
          </div>
        </div>
      </div>

      {/* Loan Details */}
      <div style={{ marginBottom: '32px', position: 'relative', zIndex: 10 }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#1f2937',
          marginBottom: '16px'
        }}>
          Loan Details
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          fontSize: '14px'
        }}>
          <div>
            <span style={{ fontWeight: '500', color: '#374151' }}>Sanctioned Loan Amount:</span>
            <span style={{ marginLeft: '8px', fontWeight: '600' }}>
              ₹{eligibility?.amount?.toLocaleString('en-IN') || '3,00,000'}
            </span>
          </div>
          <div>
            <span style={{ fontWeight: '500', color: '#374151' }}>Tenure:</span>
            <span style={{ marginLeft: '8px' }}>48 months</span>
          </div>
          <div>
            <span style={{ fontWeight: '500', color: '#374151' }}>Interest Rate:</span>
            <span style={{ marginLeft: '8px' }}>{eligibility?.rate || 10.5}% per annum (reducing balance)</span>
          </div>
          <div>
            <span style={{ fontWeight: '500', color: '#374151' }}>EMI Amount:</span>
            <span style={{ marginLeft: '8px' }}>
              ₹{Math.round((eligibility?.amount || 300000) * (eligibility?.rate || 10.5) / 100 / 12 * Math.pow(1 + (eligibility?.rate || 10.5) / 100 / 12, 48) / (Math.pow(1 + (eligibility?.rate || 10.5) / 100 / 12, 48) - 1)).toLocaleString('en-IN') || '7,500'}
            </span>
          </div>
          <div>
            <span style={{ fontWeight: '500', color: '#374151' }}>Processing Fee:</span>
            <span style={{ marginLeft: '8px' }}>₹1,500 + GST</span>
          </div>
          <div>
            <span style={{ fontWeight: '500', color: '#374151' }}>Disbursement Amount:</span>
            <span style={{ marginLeft: '8px' }}>
              ₹{(eligibility?.amount ? (eligibility.amount - 1500).toLocaleString('en-IN') : '2,97,350')}
            </span>
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <span style={{ fontWeight: '500', color: '#374151' }}>Repayment Mode:</span>
            <span style={{ marginLeft: '8px' }}>NACH / Auto-Debit</span>
          </div>
        </div>
      </div>

      {/* EMI Table */}
      <div style={{ marginBottom: '32px', position: 'relative', zIndex: 10 }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#1f2937',
          marginBottom: '16px'
        }}>
          EMI Schedule (Sample)
        </h2>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          border: '1px solid #d1d5db',
          fontSize: '14px'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f3f4f6' }}>
              <th style={{ border: '1px solid #d1d5db', padding: '8px 16px', textAlign: 'left' }}>Month</th>
              <th style={{ border: '1px solid #d1d5db', padding: '8px 16px', textAlign: 'left' }}>Principal (₹)</th>
              <th style={{ border: '1px solid #d1d5db', padding: '8px 16px', textAlign: 'left' }}>Interest (₹)</th>
              <th style={{ border: '1px solid #d1d5db', padding: '8px 16px', textAlign: 'left' }}>Total EMI (₹)</th>
              <th style={{ border: '1px solid #d1d5db', padding: '8px 16px', textAlign: 'left' }}>Outstanding (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #d1d5db', padding: '8px 16px' }}>1</td>
              <td style={{ border: '1px solid #d1d5db', padding: '8px 16px' }}>7,240</td>
              <td style={{ border: '1px solid #d1d5db', padding: '8px 16px' }}>2,500</td>
              <td style={{ border: '1px solid #d1d5db', padding: '8px 16px' }}>9,740</td>
              <td style={{ border: '1px solid #d1d5db', padding: '8px 16px' }}>2,92,760</td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ border: '1px solid #d1d5db', padding: '8px 16px' }}>2</td>
              <td style={{ border: '1px solid #d1d5db', padding: '8px 16px' }}>7,320</td>
              <td style={{ border: '1px solid #d1d5db', padding: '8px 16px' }}>2,420</td>
              <td style={{ border: '1px solid #d1d5db', padding: '8px 16px' }}>9,740</td>
              <td style={{ border: '1px solid #d1d5db', padding: '8px 16px' }}>2,85,440</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d1d5db', padding: '8px 16px' }}>3</td>
              <td style={{ border: '1px solid #d1d5db', padding: '8px 16px' }}>7,400</td>
              <td style={{ border: '1px solid #d1d5db', padding: '8px 16px' }}>2,340</td>
              <td style={{ border: '1px solid #d1d5db', padding: '8px 16px' }}>9,740</td>
              <td style={{ border: '1px solid #d1d5db', padding: '8px 16px' }}>2,78,040</td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ border: '1px solid #d1d5db', padding: '8px 16px' }}>4</td>
              <td style={{ border: '1px solid #d1d5db', padding: '8px 16px' }}>7,480</td>
              <td style={{ border: '1px solid #d1d5db', padding: '8px 16px' }}>2,260</td>
              <td style={{ border: '1px solid #d1d5db', padding: '8px 16px' }}>9,740</td>
              <td style={{ border: '1px solid #d1d5db', padding: '8px 16px' }}>2,70,560</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d1d5db', padding: '8px 16px' }}>5</td>
              <td style={{ border: '1px solid #d1d5db', padding: '8px 16px' }}>7,560</td>
              <td style={{ border: '1px solid #d1d5db', padding: '8px 16px' }}>2,180</td>
              <td style={{ border: '1px solid #d1d5db', padding: '8px 16px' }}>9,740</td>
              <td style={{ border: '1px solid #d1d5db', padding: '8px 16px' }}>2,63,000</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Terms and Conditions */}
      <div style={{ marginBottom: '32px', position: 'relative', zIndex: 10 }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#1f2937',
          marginBottom: '16px'
        }}>
          Terms and Conditions
        </h2>
        <ul style={{
          fontSize: '14px',
          color: '#374151',
          lineHeight: '1.5'
        }}>
          <li>• The loan is sanctioned subject to verification of documents.</li>
          <li>• Interest is charged on reducing balance.</li>
          <li>• Late EMI will attract penalty of 24% annualized.</li>
          <li>• Borrower authorizes Tata Capital to run bureau checks.</li>
          <li>• This sanction letter is system-generated and does not require physical signature.</li>
        </ul>
      </div>

      {/* Digital Signature */}
      <div style={{ marginBottom: '32px', position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            display: 'inline-block',
            border: '2px solid #d1d5db',
            padding: '16px',
            borderRadius: '8px'
          }}>
            <p style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '8px'
            }}>
              Digitally Signed by
            </p>
            <p style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#1f2937'
            }}>
              Tata Capital Financial Services Ltd.
            </p>
            <div style={{
              marginTop: '8px',
              width: '128px',
              height: '32px',
              backgroundColor: '#e5e7eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '8px auto 0',
              fontSize: '12px',
              color: '#6b7280'
            }}>
              [Digital Signature]
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        borderTop: '1px solid #d1d5db',
        paddingTop: '24px',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          textAlign: 'center',
          fontSize: '14px',
          color: '#6b7280'
        }}>
          <p style={{ fontWeight: '600', marginBottom: '8px' }}>Tata Capital Financial Services Ltd.</p>
          <p style={{ marginBottom: '8px' }}>Registered Office: Bombay House, 24, Homi Mody Street, Fort, Mumbai - 400001</p>
          <p style={{ marginBottom: '8px' }}>Customer Support: customercare@tatacapital.com | 1800-209-6060</p>
          <p style={{
            fontSize: '12px',
            fontStyle: 'italic'
          }}>
            This is a system-generated sanction letter and requires no physical signature.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SanctionLetter;

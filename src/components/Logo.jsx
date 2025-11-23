import React from 'react';

export default function Logo() {
  return (
    <div className="h-24 flex items-center px-6 border-b border-gray-200">
      <div className="flex items-center space-x-3">
        <svg className="w-14 h-14" viewBox="0 0 200 200" fill="none">
          <circle cx="60" cy="100" r="50" fill="#0066CC"/>
          <path d="M110 50 Q150 50 170 80 Q190 110 170 140 Q150 170 110 170" stroke="#00BCD4" strokeWidth="20" fill="none"/>
        </svg>
        <div>
          <h1 className="text-xl font-bold" style={{ color: '#0066CC' }}>Genericlab</h1>
          <p className="text-sm text-gray-500">CAPA Management</p>
        </div>
      </div>
    </div>
  );
}

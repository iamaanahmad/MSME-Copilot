import React, { useState } from 'react';
import { BusinessProfile, Language } from '../types';
import { generateComplianceChecklist } from '../services/ai';
import ReactMarkdown from 'react-markdown';
import { FileCheck, Loader2, Building2, Users, IndianRupee, MapPin } from 'lucide-react';

interface ChecklistProps {
  language: Language;
}

export default function Checklist({ language }: ChecklistProps) {
  const [profile, setProfile] = useState<BusinessProfile>({
    type: 'Retail',
    turnover: 5000000,
    employees: 10,
    state: 'Maharashtra',
  });
  const [checklist, setChecklist] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    const result = await generateComplianceChecklist(profile, language);
    setChecklist(result);
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2.5 bg-indigo-50 rounded-xl">
            <Building2 className="w-6 h-6 text-indigo-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Business Profile</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-gray-400" />
              Business Type
            </label>
            <select
              value={profile.type}
              onChange={(e) => setProfile({ ...profile, type: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            >
              <option value="Retail">Retail</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="IT Services">IT Services</option>
              <option value="Freelancer">Freelancer / Professional</option>
              <option value="E-commerce">E-commerce</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-gray-400" />
              Annual Turnover (₹)
            </label>
            <input
              type="number"
              value={profile.turnover}
              onChange={(e) => setProfile({ ...profile, turnover: Number(e.target.value) })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-400" />
              Number of Employees
            </label>
            <input
              type="number"
              value={profile.employees}
              onChange={(e) => setProfile({ ...profile, employees: Number(e.target.value) })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              State
            </label>
            <select
              value={profile.state}
              onChange={(e) => setProfile({ ...profile, state: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            >
              <option value="Maharashtra">Maharashtra</option>
              <option value="Delhi">Delhi</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Gujarat">Gujarat</option>
            </select>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <FileCheck className="w-5 h-5" />
            )}
            <span>{isLoading ? 'Generating...' : 'Generate AI Checklist'}</span>
          </button>
        </div>
      </div>

      {checklist && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-emerald-600" />
            Your Compliance Checklist
          </h3>
          <div className="prose prose-indigo max-w-none">
            <ReactMarkdown>{checklist}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

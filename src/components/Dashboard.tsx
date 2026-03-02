import React, { useEffect, useState } from 'react';
import { MOCK_DEADLINES } from '../constants';
import { Language } from '../types';
import { translateText } from '../services/ai';
import { AlertCircle, Calendar, CheckCircle2, Clock } from 'lucide-react';

interface DashboardProps {
  language: Language;
}

export default function Dashboard({ language }: DashboardProps) {
  const [deadlines, setDeadlines] = useState(MOCK_DEADLINES);
  const [translatedTitles, setTranslatedTitles] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function translateDeadlines() {
      if (language === 'en') {
        setTranslatedTitles({});
        return;
      }
      
      setIsLoading(true);
      const translations: Record<string, string> = {};
      
      // Translate all titles in parallel
      await Promise.all(
        MOCK_DEADLINES.map(async (deadline) => {
          const translated = await translateText(deadline.title, language);
          translations[deadline.id] = translated;
        })
      );
      
      setTranslatedTitles(translations);
      setIsLoading(false);
    }

    translateDeadlines();
  }, [language]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'overdue': return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'completed': return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      default: return <Clock className="w-5 h-5 text-amber-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'overdue': return 'bg-red-50 text-red-700 border-red-200';
      case 'completed': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">
          {language === 'en' ? 'Upcoming Deadlines' : isLoading ? '...' : translatedTitles['header'] || 'Upcoming Deadlines'}
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {deadlines.map((deadline) => (
          <div 
            key={deadline.id}
            className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {deadline.type}
                  </span>
                  <h3 className="font-medium text-gray-900 mt-0.5">
                    {isLoading ? '...' : translatedTitles[deadline.id] || deadline.title}
                  </h3>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <span className="text-sm font-medium text-gray-600">
                {new Date(deadline.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(deadline.status)}`}>
                {getStatusIcon(deadline.status)}
                <span className="ml-1.5 capitalize">{deadline.status}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

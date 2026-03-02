import React, { useEffect, useState } from 'react';
import { MOCK_SCHEMES } from '../constants';
import { Language } from '../types';
import { translateText } from '../services/ai';
import { ExternalLink, Landmark, Loader2 } from 'lucide-react';

interface SchemesProps {
  language: Language;
}

export default function Schemes({ language }: SchemesProps) {
  const [translatedSchemes, setTranslatedSchemes] = useState<Record<string, { name: string; description: string; eligibility: string }>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function translateSchemes() {
      if (language === 'en') {
        setTranslatedSchemes({});
        return;
      }
      
      setIsLoading(true);
      const translations: Record<string, { name: string; description: string; eligibility: string }> = {};
      
      await Promise.all(
        MOCK_SCHEMES.map(async (scheme) => {
          const [name, description, eligibility] = await Promise.all([
            translateText(scheme.name, language),
            translateText(scheme.description, language),
            translateText(scheme.eligibility, language),
          ]);
          translations[scheme.id] = { name, description, eligibility };
        })
      );
      
      setTranslatedSchemes(translations);
      setIsLoading(false);
    }

    translateSchemes();
  }, [language]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-3">
          <Landmark className="w-6 h-6 text-indigo-600" />
          {language === 'en' ? 'Government Schemes' : isLoading ? '...' : 'Government Schemes'}
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {MOCK_SCHEMES.map((scheme) => {
          const t = translatedSchemes[scheme.id];
          return (
            <div 
              key={scheme.id}
              className="flex flex-col p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">
                {isLoading ? (
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
                ) : (
                  t?.name || scheme.name
                )}
              </h3>
              
              <p className="text-sm text-gray-600 mb-4 flex-grow">
                {isLoading ? (
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                  </div>
                ) : (
                  t?.description || scheme.description
                )}
              </p>
              
              <div className="mb-6 p-3 bg-indigo-50/50 rounded-xl border border-indigo-100/50">
                <span className="text-xs font-semibold text-indigo-800 uppercase tracking-wider mb-1 block">
                  Eligibility
                </span>
                <p className="text-sm text-indigo-900/80">
                  {isLoading ? (
                    <div className="h-4 bg-indigo-100 rounded animate-pulse w-2/3"></div>
                  ) : (
                    t?.eligibility || scheme.eligibility
                  )}
                </p>
              </div>
              
              <a 
                href={scheme.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium rounded-xl transition-colors border border-gray-200"
              >
                <span>Apply Now</span>
                <ExternalLink className="w-4 h-4 ml-2 text-gray-400" />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

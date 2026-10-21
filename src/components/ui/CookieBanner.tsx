import React, { useState, useEffect } from 'react';
import { loadAnalytics } from '../../lib/analytics';
import { Link } from 'react-router-dom';

export function CookieBanner() {
  const [show, setShow] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  
  const [preferences, setPreferences] = useState({
    essential: true, // Always true
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem('cookieConsent');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Load analytics based on stored consent
        loadAnalytics(parsed);
      } else {
        setShow(true);
      }
    } catch (e) {
      console.warn("Could not read cookie consent", e);
      setShow(true);
    }

    // Custom event listener for reopening preferences from the footer
    const handleReopen = () => {
      try {
        const stored = localStorage.getItem('cookieConsent');
        if (stored) {
          setPreferences({ essential: true, ...JSON.parse(stored) });
        }
      } catch (e) {}
      setShowPreferences(true);
      setShow(true);
    };

    window.addEventListener('reopenCookiePreferences', handleReopen);
    return () => window.removeEventListener('reopenCookiePreferences', handleReopen);
  }, []);

  const saveConsent = (consentObj: typeof preferences) => {
    try {
      localStorage.setItem('cookieConsent', JSON.stringify({
        analytics: consentObj.analytics,
        marketing: consentObj.marketing
      }));
    } catch (e) {
      console.warn("Could not save cookie consent", e);
    }
    loadAnalytics(consentObj);
    setShow(false);
    setShowPreferences(false);
  };

  const acceptAll = () => {
    saveConsent({ essential: true, analytics: true, marketing: true });
  };

  const rejectNonEssential = () => {
    saveConsent({ essential: true, analytics: false, marketing: false });
  };

  const saveCustom = () => {
    saveConsent(preferences);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 p-4 md:p-6 pointer-events-none">
      <div className="bg-white border border-line rounded-2xl shadow-xl max-w-2xl mx-auto p-6 pointer-events-auto">
        {!showPreferences ? (
          <div>
            <h3 className="text-lg font-bold text-ink-900 mb-2">We respect your privacy</h3>
            <p className="text-sm text-ink-600 mb-4">
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
              By clicking "Accept All", you consent to our use of cookies. 
              Read our <Link to="/privacy" className="text-brand-600 hover:underline">Privacy Policy</Link> for more information.
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={acceptAll} className="px-5 py-2.5 bg-brand-600 text-white text-sm font-semibold rounded-pill hover:bg-brand-700 transition-colors">
                Accept All
              </button>
              <button onClick={rejectNonEssential} className="px-5 py-2.5 border border-line text-ink-900 text-sm font-semibold rounded-pill hover:bg-mist transition-colors">
                Reject Non-Essential
              </button>
              <button onClick={() => setShowPreferences(true)} className="px-5 py-2.5 border border-transparent text-ink-600 text-sm font-semibold rounded-pill hover:bg-mist transition-colors">
                Preferences
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-bold text-ink-900 mb-4">Cookie Preferences</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <input type="checkbox" checked disabled className="mt-1" />
                <div>
                  <p className="font-semibold text-sm text-ink-900">Essential (Strictly Necessary)</p>
                  <p className="text-xs text-ink-500">Required for the website to function properly. Cannot be disabled.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <input 
                  type="checkbox" 
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({...preferences, analytics: e.target.checked})}
                  className="mt-1" 
                />
                <div>
                  <p className="font-semibold text-sm text-ink-900">Analytics</p>
                  <p className="text-xs text-ink-500">Helps us understand how visitors interact with the website.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <input 
                  type="checkbox" 
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences({...preferences, marketing: e.target.checked})}
                  className="mt-1" 
                />
                <div>
                  <p className="font-semibold text-sm text-ink-900">Marketing</p>
                  <p className="text-xs text-ink-500">Used to deliver advertisements more relevant to you and your interests.</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={saveCustom} className="px-5 py-2.5 bg-brand-600 text-white text-sm font-semibold rounded-pill hover:bg-brand-700 transition-colors">
                Save Preferences
              </button>
              <button onClick={rejectNonEssential} className="px-5 py-2.5 border border-line text-ink-900 text-sm font-semibold rounded-pill hover:bg-mist transition-colors">
                Reject All
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

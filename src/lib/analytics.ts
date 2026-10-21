import { SITE_CONFIG } from '../config/site';

export function loadAnalytics(consent: { marketing: boolean; analytics: boolean }) {
  if (typeof window === 'undefined') return;

  // Google Analytics
  if (consent.analytics && SITE_CONFIG.analyticsIds.googleAnalytics) {
    const gaId = SITE_CONFIG.analyticsIds.googleAnalytics;
    if (!document.getElementById('ga-script')) {
      const script = document.createElement('script');
      script.id = 'ga-script';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script);

      const initScript = document.createElement('script');
      initScript.id = 'ga-init';
      initScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}');
      `;
      document.head.appendChild(initScript);
    }
  }

  // Microsoft Clarity / Meta Pixel / Marketing
  if (consent.marketing && SITE_CONFIG.analyticsIds.clarityId) {
    const clarityId = SITE_CONFIG.analyticsIds.clarityId;
    if (!document.getElementById('clarity-script')) {
      const script = document.createElement('script');
      script.id = 'clarity-script';
      script.type = 'text/javascript';
      script.innerHTML = `
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${clarityId}");
      `;
      document.head.appendChild(script);
    }
  }
}

export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }
}

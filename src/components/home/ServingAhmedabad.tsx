import React, { useState } from 'react';
import { Container } from '../ui/Container';
import { MapPin, Navigation } from 'lucide-react';
import { MapSkeleton } from '../ui/Skeleton';
import { SITE_CONFIG } from '../../config/site';
import { generatedImages } from '../../data/images.generated';
import { ImageFallback } from '../image/ImageFallback';

export function ServingAhmedabad() {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapUrl = SITE_CONFIG.googleMapsEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.0!2d72.6!3d23.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sGanesh+Glory+Jagatpur+Ahmedabad!5e0!3m2!1sen!2sin!4v1000000000000";
  const getDirections = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(SITE_CONFIG.address.full)}`;

  const skylineGen = generatedImages["p10"];

  return (
    <section className="bg-white">
      {/* p10 Ahmedabad skyline — wide banner with gradient overlay */}
      {skylineGen ? (
        <div className="skyline-overlay relative overflow-hidden" style={{ height: "340px", borderRadius: 0 }}>
          <picture>
            <source type="image/avif" srcSet={skylineGen.avifSrcset} sizes="100vw" />
            <source type="image/webp" srcSet={skylineGen.webpSrcset} sizes="100vw" />
            <img
              src={skylineGen.fallbackSrc}
              alt="Aerial view of Ahmedabad city skyline showing modern commercial buildings"
              width={skylineGen.width}
              height={skylineGen.height}
              loading="lazy"
              decoding="async"
              style={{
                width: "100%",
                height: "340px",
                objectFit: "cover",
                objectPosition: "center 50%",
                filter: "saturate(0.9)",
                display: "block",
              }}
            />
          </picture>
          {/* brand-900 gradient overlay — left to transparent so text is readable */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to right, rgba(3,43,26,0.88) 0%, rgba(3,43,26,0.5) 50%, rgba(3,43,26,0.1) 100%)",
            }}
            aria-hidden="true"
          />
          {/* Floating map card */}
          <Container className="absolute inset-0 flex items-center">
            <div className="text-white max-w-lg">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-brand-300 text-sm font-bold tracking-wide uppercase mb-4 backdrop-blur-sm">
                <MapPin size={14} />
                Local Advisory
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white mb-3">
                Serving customers across Ahmedabad
              </h2>
              <p className="text-white/75 text-sm leading-relaxed">
                Operating from Jagatpur — serving Gota, SG Highway, Sola, Chandkheda, Gandhinagar and beyond.
              </p>
              <p className="text-[10px] text-white/40 mt-2">Illustrative image</p>
            </div>
          </Container>
        </div>
      ) : (
        <ImageFallback ratio="16/5" label="Ahmedabad skyline" />
      )}

      <Container>
        <div className="py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 text-brand-700 text-sm font-bold tracking-wide uppercase mb-6">
              <MapPin size={16} />
              Local Advisory
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-ink-900 mb-6">
              Serving customers across Ahmedabad and nearby areas
            </h2>
            <div className="prose text-ink-600 mb-8">
              <p className="mb-4">
                Operating from our office in Jagatpur, we are deeply rooted in the local community. We do not operate a widespread branch network; instead, we provide personalized, in-depth advisory from a single hub to ensure high-quality service.
              </p>
              <p>
                Whether you reside in Jagatpur, Chenpur, Gota, Sola, SG Highway, Ranip, Thaltej, Bopal, Chandkheda, or Gandhinagar, our team is equipped to understand your specific financial needs and property nuances in these regions.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 bg-mist p-6 rounded-2xl border border-line">
                <h3 className="font-bold text-ink-900 mb-2">Office Address</h3>
                <p className="text-sm text-ink-600 mb-4">{SITE_CONFIG.address.full}</p>
                <a 
                  href={getDirections} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors group"
                >
                  <Navigation size={16} className="group-hover:translate-x-1 transition-transform" />
                  Get directions
                </a>
              </div>
              
              {SITE_CONFIG.googleReviewUrl && (
                <div className="flex-1 bg-mist p-6 rounded-2xl border border-line flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-ink-900 mb-2">Hear from our customers</h3>
                    <p className="text-sm text-ink-600 mb-4">Read our independent reviews on Google.</p>
                  </div>
                  <a 
                    href={SITE_CONFIG.googleReviewUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-10 px-4 rounded-pill bg-white border border-line text-sm font-semibold text-ink-900 hover:border-brand-600 hover:text-brand-600 transition-colors"
                  >
                    View Reviews
                  </a>
                </div>
              )}
            </div>
          </div>
          
          <div className="relative rounded-3xl overflow-hidden shadow-lg border border-line h-[400px] lg:h-[500px]">
            {!isMapLoaded && (
              <div className="absolute inset-0 z-10">
                <MapSkeleton className="h-full rounded-none" />
              </div>
            )}
            <iframe
              src={mapUrl}
              title="Revolut Money office location"
              width="100%"
              height="100%"
              loading="lazy"
              onLoad={() => setIsMapLoaded(true)}
              referrerPolicy="no-referrer-when-downgrade"
              className={`border-0 transition-opacity duration-500 ${isMapLoaded ? 'opacity-100' : 'opacity-0'}`}
              aria-label="Map showing Revolut Money office at Ganesh Glory, Jagatpur, Ahmedabad"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

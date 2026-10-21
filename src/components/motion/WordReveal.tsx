import React from 'react';
import { motion, useInView } from 'framer-motion';
import { prefersReducedMotion } from '../../config/motion';

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function WordReveal({ text, className = '', delay = 0 }: WordRevealProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reducedMotion = prefersReducedMotion();

  let words: string[] = [];
  // @ts-ignore
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    // @ts-ignore
    const segmenter = new Intl.Segmenter(undefined, { granularity: 'word' });
    words = Array.from(segmenter.segment(text)).map((s: any) => s.segment);
  } else {
    words = text.split(' ');
  }

  if (reducedMotion) {
    return <span className={className}>{text}</span>;
  }

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay }
    }
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={`inline-block ${className}`}
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={child} className="inline-block">
          {word === ' ' ? '\u00A0' : word}
        </motion.span>
      ))}
    </motion.span>
  );
}

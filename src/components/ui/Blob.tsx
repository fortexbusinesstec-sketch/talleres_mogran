'use client';

import { motion } from 'motion/react';

interface BlobProps {
  color?: string;
  className?: string;
  /** Soft blurred ambient blob (true) or crisp solid shape (false) */
  blur?: boolean;
  /** Slow morphing/floating animation */
  animate?: boolean;
}

// Organic blob path — soft, asymmetric.
const BLOB_PATH =
  'M44.7,-67.1C57.4,-59.3,66.5,-45.6,71.8,-30.7C77.1,-15.8,78.6,0.3,74.8,15.1C71,29.9,61.9,43.4,49.8,53.9C37.7,64.4,22.6,71.9,5.9,75.3C-10.8,78.7,-29.1,78,-44.2,70.5C-59.3,63,-71.2,48.7,-76.7,32.4C-82.2,16.1,-81.3,-2.2,-75.8,-18.6C-70.3,-35,-60.2,-49.5,-46.8,-57.6C-33.4,-65.7,-16.7,-67.4,0.3,-67.9C17.3,-68.4,34.6,-67.7,44.7,-67.1Z';

export function Blob({
  color = '#F81443',
  className = '',
  blur = false,
  animate = true,
}: BlobProps) {
  return (
    <motion.svg
      viewBox="-100 -100 200 200"
      className={className}
      aria-hidden="true"
      style={blur ? { filter: 'blur(40px)' } : undefined}
      animate={
        animate
          ? { scale: [1, 1.08, 0.96, 1], rotate: [0, 8, -6, 0] }
          : undefined
      }
      transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
    >
      <path fill={color} d={BLOB_PATH} />
    </motion.svg>
  );
}

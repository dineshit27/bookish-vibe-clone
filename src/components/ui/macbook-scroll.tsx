import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface MacbookScrollProps {
  title: React.ReactNode;
  badge?: React.ReactNode;
  src: string;
  showGradient?: boolean;
}

export function MacbookScroll({
  title,
  badge,
  src,
  showGradient = true,
}: MacbookScrollProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div ref={ref} className="relative flex flex-col items-center py-12">
      <div className="mb-4 flex items-center gap-2">
        {badge}
        <h2 className="text-2xl md:text-4xl font-bold text-center">{title}</h2>
      </div>
      <motion.div style={{ y }} className="relative w-full max-w-2xl mx-auto">
        <div className="relative z-10">
          <img
            src={src}
            alt="Macbook Demo"
            className="w-full rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800"
            draggable={false}
          />
        </div>
        {showGradient && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent to-white dark:to-[#0B0B0F] pointer-events-none" />
        )}
      </motion.div>
    </div>
  );
}

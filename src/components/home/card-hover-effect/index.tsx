'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        'rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-50',
        className,
      )}
    >
      <div className="relative z-50">
        <div className="p-4 flex space-x-4">{children}</div>
      </div>
    </div>
  );
}

export function CardTitle({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <h4 className={cn('text-zinc-100 font-bold tracking-wide', className)}>{children}</h4>;
}

export function CardDescription({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p className={cn('mt-2 text-zinc-400 tracking-wide leading-relaxed text-sm', className)}>
      {children}
    </p>
  );
}

export function HoverEffect({
  items,
  className,
}: {
  items: {
    title: ReactNode;
    description: ReactNode;
    icon: string;
    link: string;
  }[];
  className?: string;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  py-10', className)}>
      {items.map((item, idx) => (
        <Link
          key={item?.link + idx}
          className="relative block w-full h-full p-2 group"
          href={item?.link}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200/10 dark:bg-slate-800/[0.8] block  rounded-3xl"
                initial={{ opacity: 0 }}
                layoutId="hoverBackground"
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <img className="rounded-[6px] w-1/4" src={item.icon} />
            <div className="flex flex-col justify-center w-3/4">
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}

"use client";

import { cn, getTechLogos } from '@/lib/utils';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface TechIconProps {
  techstack: string[];
}

const DisplayTechIcons = ({ techstack }: TechIconProps) => {
  const [techIcons, setTechIcons] = useState<{ tech: string; url: string }[]>([]);

  useEffect(() => {
    getTechLogos(techstack).then(setTechIcons);
  }, [techstack]);

  return (
    <div className='flex flex-row gap-1 items-center'>
      {techIcons.slice(0, 3).map(({ tech, url }, index) => (
        <div key={tech} className={cn('relative group bg-dark-300 rounded-full flex-center', index >= 1 && '-ml-3')}>
          <span className='tech-tooltip'>{tech}</span>
          <Image src={url} alt={tech} width={24} height={24} className='size-5' />
        </div>
      ))}
    </div>
  );
};

export default DisplayTechIcons;

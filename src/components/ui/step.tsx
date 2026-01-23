import Image from 'next/image';
import React, { ReactNode } from 'react'


interface HowItWorksStepProps {
  stepNumber?: number;
  title: string;
  description: string;
  children: ReactNode;
  image: string;
}

const HowItWorksStepNew = ({
  stepNumber,
  title,
  description,
  children,
  image,
}: HowItWorksStepProps) => {
  return (
    <div className="text-center space-y-6">
      <div className="relative mx-auto max-w-xs">
        <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-100 w-full ">
          <Image
            src={image}
            alt={title}
            width={100}
            height={100}
            className="w-full !h-full object-cover"
            unoptimized
            quality={100}
          />
        </div>

        {children}


      </div>
      <div className="space-y-2">
        <span className="text-sm text-gray-400 font-medium">Step - 0{stepNumber}</span>
        <h3 className="text-[20px] font-bold">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}

export default HowItWorksStepNew;
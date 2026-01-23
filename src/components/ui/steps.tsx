import type { ReactNode } from "react";

interface HowItWorksStepProps {
  stepNumber: number;
  title: string;
  description: string;
  children: ReactNode;
  backgroundColor: string;
}

const HowItWorksStep = ({
  stepNumber,
  title,
  description,
  children,
  backgroundColor,
}: HowItWorksStepProps) => {
  return (
    <div className="flex flex-col">
      {/* Step Number */}
      <div className="mb-6">
        <div className="w-8 h-8 bg-black text-white flex items-center justify-center text-sm font-bold">
          {stepNumber}
        </div>
      </div>

      {/* Step Content */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-black mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>

      {/* Visual Content */}
      <div
        className={`${backgroundColor} rounded-2xl p-8 flex-1 flex items-center justify-center min-h-[300px]`}
      >
        {children}
      </div>
    </div>
  );
};

export default HowItWorksStep;

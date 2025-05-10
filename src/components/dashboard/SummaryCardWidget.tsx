import React from 'react';
import Link from 'next/link';
import { ArrowRightCircle } from 'lucide-react'; // Example icon

interface SummaryCardWidgetProps {
  title: string;
  count: string | number;
  linkText: string;
  linkHref: string;
  icon?: React.ElementType; // Optional icon component
  iconColor?: string; // Optional tailwind color class for icon
}

const SummaryCardWidget: React.FC<SummaryCardWidgetProps> = ({
  title,
  count,
  linkText,
  linkHref,
  icon: IconComponent,
  iconColor = 'text-primary',
}) => {
  return (
    <div className='bg-white p-6 rounded-lg shadow h-full flex flex-col'>
      <div className='flex justify-between items-start mb-2'>
        <h3 className='text-lg font-semibold text-gray-700'>{title}</h3>
        {IconComponent && <IconComponent className={`h-6 w-6 ${iconColor}`} />}
      </div>
      <p className='text-4xl font-bold text-primary mb-4 mt-auto'>{count}</p>
      <Link href={linkHref} className='text-sm text-primary-dark hover:underline flex items-center'>
        {linkText} <ArrowRightCircle size={16} className='ml-1' />
      </Link>
    </div>
  );
};

export default SummaryCardWidget; 
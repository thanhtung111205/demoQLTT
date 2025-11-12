// src/components/ui/ScrollAnimateWrapper.jsx
import React from 'react';
import { useInView } from 'react-intersection-observer';

const ScrollAnimateWrapper = ({ children, animationClass, delay = 0, threshold = 0.1 }) => { // Thêm threshold
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: threshold,
  });

  const baseClasses = 'transition-all duration-700 ease-out'; // Dùng duration ngắn hơn
  
  const finalClass = inView 
    ? `${baseClasses} ${animationClass}` // animationClass sẽ là opacity-100 translate-y-0
    : 'opacity-0 translate-y-12'; // Bắt đầu từ dưới và ẩn đi, translate ít hơn
    
  return (
    // Dùng inline style cho delay
    <div ref={ref} className={finalClass} style={{ transitionDelay: `${delay}ms` }}> 
      {children}
    </div>
  );
};

export default ScrollAnimateWrapper;
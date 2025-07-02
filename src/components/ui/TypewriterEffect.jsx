import React from 'react';
import Typewriter from 'typewriter-effect';

const TypewriterEffect = ({ strings, className = '' }) => {
  return (
    <div className={`text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 ${className}`}>
      <Typewriter
        options={{
          strings,
          autoStart: true,
          loop: true,
          delay: 50,
          deleteSpeed: 30,
        }}
      />
    </div>
  );
};

export default TypewriterEffect;

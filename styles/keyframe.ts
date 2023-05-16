import { keyframes as keyframe } from '@emotion/react';

const rotate = keyframe`
  100% {
    transform: rotate(360deg);
  }
`;

const fadeIn = keyframe` 
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  `;

const fadeOut = keyframe` 
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  `;

const slideUp = keyframe` 
    0% {
      transform: translateY(100vh);
    }
    100% {
      transform: translateY(0vh);
    }
  `;

const slideDown = keyframe` 
    0% {
      transform: translateY(0vh);
    }
    100% {
      transform: translateY(100vh);
    }
  `;

const keyframes = { rotate, fadeIn, fadeOut, slideUp, slideDown };

export default keyframes;

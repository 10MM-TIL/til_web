export const breakpoints = {
  desktop: 1194,
};

export const mq = (n: keyof typeof breakpoints) => `@media (min-width: ${breakpoints[n]}px)`;

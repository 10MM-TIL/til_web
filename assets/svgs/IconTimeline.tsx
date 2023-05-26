export const IconTimeline = () => {
  return (
    <svg width='21' height='127' viewBox='0 0 21 127' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g filter='url(#filter0_d_938_13557)'>
        <circle cx='10.2381' cy='10.2381' r='5.2381' fill='#22FFA2' />
      </g>
      <line x1='10.4883' y1='10' x2='10.4883' y2='127' stroke='url(#paint0_linear_938_13557)' strokeWidth='2.5' />
      <defs>
        <filter
          id='filter0_d_938_13557'
          x='0'
          y='0'
          width='20.4766'
          height='20.4761'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset />
          <feGaussianBlur stdDeviation='2.5' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix type='matrix' values='0 0 0 0 0.211771 0 0 0 0 0.891667 0 0 0 0 0.891667 0 0 0 0.45 0' />
          <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_938_13557' />
          <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_938_13557' result='shape' />
        </filter>
        <linearGradient
          id='paint0_linear_938_13557'
          x1='8.23817'
          y1='128.376'
          x2='8.23817'
          y2='12.7529'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#00A8A8' stopOpacity='0.15' />
          <stop offset='0.0001' stopColor='#00A8A8' stopOpacity='0.15' />
          <stop offset='1' stopColor='#22FFA2' />
        </linearGradient>
      </defs>
    </svg>
  );
};

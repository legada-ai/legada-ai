export function LegadaMark({ size = 34 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round">
        <path d="M32 5 45 18 32 31 19 18 32 5Z" />
        <path d="M46 19 59 32 46 45 33 32 46 19Z" />
        <path d="M32 33 45 46 32 59 19 46 32 33Z" />
        <path d="M18 19 31 32 18 45 5 32 18 19Z" />
      </g>
      <path d="M25 25v14h12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="54" cy="10" r="2.8" fill="var(--accent)" />
    </svg>
  );
}

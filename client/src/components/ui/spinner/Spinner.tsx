type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";

interface SpinnerProps {
  size: SpinnerSize;
}

const sizeMap: Record<SpinnerSize, number> = {
  xs: 16,
  sm: 24,
  md: 32,
  lg: 48,
  xl: 64,
};

export default function Spinner({ size = "md" }: SpinnerProps) {
  const dimension = sizeMap[size];

  return (
    <div
      style={{
        width: dimension,
        height: dimension,
        border: `${Math.max(2, dimension * 0.1)}px solid #e5e7eb`,
        borderTopColor: "#3b82f6",
        borderRadius: "50%",
        animation: "spinner-rotate 0.9s linear infinite",
      }}
    />
  );
}

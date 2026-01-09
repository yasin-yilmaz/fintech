type Props = {
  points?: { x: number; y: number }[];
  height?: number;
};

export const WorkingCapitalCursor = ({ points, height }: Props) => {
  if (!points?.length || !height) return null;

  const x = points[0].x;
  const bandW = 48;

  return (
    <g>
      <defs>
        <linearGradient id="wc-cursor-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FAFBFE" stopOpacity={0} />
          <stop offset="100%" stopColor="#F2F6FC" stopOpacity={1} />
        </linearGradient>
      </defs>

      <rect
        x={x - bandW / 2}
        y={0}
        width={bandW}
        height={height}
        rx={12}
        ry={12}
        fill="url(#wc-cursor-grad)"
      />
    </g>
  );
};

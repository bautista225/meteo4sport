interface Props extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
}

export default function Metric({ children, className }: Props) {
  return (
    <p
      className={`text-4xl md:text-6xl font-semibold text-gray-900 dark:text-gray-50 ${className}`}
    >
      {children}
    </p>
  );
}

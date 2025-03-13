interface Props extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
}

export default function Metric({ children, className }: Props) {
  return (
    <p
      className={`${className} text-6xl font-semibold text-gray-900 dark:text-gray-50`}
    >
      {children}
    </p>
  );
}

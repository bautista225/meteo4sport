interface Props extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
}

export default function Title({ children, className }: Props) {
  return (
    <p
      className={`text-5xl font-semibold text-gray-900 dark:text-gray-50 ${className}`}
    >
      {children}
    </p>
  );
}

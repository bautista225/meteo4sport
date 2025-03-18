interface Props extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
}

export default function Title({ children, className }: Props) {
  return (
    <p
      className={`md:text-4xl 2xl:text-5xl text-2xl font-semibold text-gray-900 dark:text-gray-50 ${className}`}
    >
      {children}
    </p>
  );
}

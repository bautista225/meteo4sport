interface Props extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
}

export default function Text({ children, className }: Props) {
  return (
    <p className={`${className} text-gray-900 dark:text-gray-50`}>{children}</p>
  );
}

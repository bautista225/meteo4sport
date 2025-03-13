"use client";

type Props = {
  leftTitle?: string;
  leftValue?: string;
  rightTitle?: string;
  rightValue?: string;
};

export default function ToolCard({
  leftTitle,
  leftValue,
  rightTitle,
  rightValue,
}: Props) {
  return (
    <div className="relative rounded-md border border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <span
        className="absolute inset-x-0 top-1/2 h-10 w-1 -translate-y-1/2 rounded-r-md bg-blue-500 dark:bg-blue-500"
        aria-hidden="true"
      />
      <div>
        <p className="flex items-center justify-between gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-500">
            {leftTitle || null}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-500">
            {leftValue || null}
          </span>
        </p>
        <p className="flex items-center justify-between gap-2">
          <span className="text-lg font-medium text-gray-900 dark:text-gray-50">
            {rightTitle || null}
          </span>
          <span className="text-base font-medium text-gray-500 dark:text-gray-500">
            {rightValue || null}
          </span>
        </p>
      </div>
    </div>
  );
}

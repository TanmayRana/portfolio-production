interface StatusBadgeProps {
  status: "Published" | "Draft" | string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const isPublished = status === "Published";
  return (
    <span className={`text-xs px-2 py-1 rounded-full font-medium ${isPublished ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'}`}>
      {status}
    </span>
  );
}

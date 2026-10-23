"use client";

interface TopicCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  href?: string;
  children?: React.ReactNode;
  className?: string;
}

export function TopicCard({
  title,
  description,
  icon,
  href,
  children,
  className = "",
}: TopicCardProps) {
  const content = (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6 hover:border-blue-300 dark:hover:border-blue-700 transition-colors duration-200 h-full flex flex-col">
      {icon && (
        <div className="text-blue-600 dark:text-blue-400 mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
        {title}
      </h3>
      <p className="text-zinc-600 dark:text-zinc-400 flex-1 mb-4">
        {description}
      </p>
      {children && (
        <div className="mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-700">
          {children}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <a href={href} className={className}>
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
}

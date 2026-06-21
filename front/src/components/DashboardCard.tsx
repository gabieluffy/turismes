import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function DashboardCard({ title, description, children, className = "" }: DashboardCardProps) {
  return (
    <div
      className={`bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/40 flex flex-col ${className}`}
    >
      <div className="mb-3">
        <h3 className="text-base font-extrabold text-on-surface tracking-tight">{title}</h3>
        {description && (
          <p className="text-xs text-on-surface-variant mt-1">{description}</p>
        )}
      </div>
      <div className="flex-1 min-h-[280px]">{children}</div>
    </div>
  );
}

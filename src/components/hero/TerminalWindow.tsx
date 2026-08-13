import React from 'react';

interface TerminalWindowProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  statusBadge?: string;
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({
  title = 'devansh@portfolio:~',
  children,
  className = '',
  statusBadge,
}) => {
  return (
    <div
      className={`rounded-xl border border-white/10 bg-neutral-950/80 backdrop-blur-xl shadow-xl font-mono text-xs overflow-hidden hover:border-sky-500/30 transition-all duration-300 ${className}`}
    >
      {/* Simplify Terminal Header */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-neutral-900/80 border-b border-white/10 select-none">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block opacity-90" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block opacity-90" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block opacity-90" />
          </div>
          <span className="text-[11px] text-neutral-400 font-medium tracking-wide">
            {title}
          </span>
        </div>

        {statusBadge && (
          <span className="flex items-center gap-1.5 text-[10px] text-sky-400 font-semibold bg-sky-950/50 px-2 py-0.5 rounded border border-sky-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            {statusBadge}
          </span>
        )}
      </div>

      {/* Terminal Content */}
      <div className="p-4 sm:p-5 text-neutral-300">
        {children}
      </div>
    </div>
  );
};

export default TerminalWindow;

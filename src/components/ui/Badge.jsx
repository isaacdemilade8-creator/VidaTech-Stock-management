import { cn } from "@/lib/utils";

export const Badge = ({ children, className, variant = "default", ...props }) => {
  const variants = {
    default:
      "inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-800 transition-colors",
    secondary:
      "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-200",
    destructive:
      "border-transparent bg-red-100 text-red-900 hover:bg-red-200",
    outline: "text-slate-950",
    success:
      "border-transparent bg-green-100 text-green-900 hover:bg-green-200",
  };

  return (
    <div
      className={cn(variants[variant] || variants.default, className)}
      {...props}
    >
      {children}
    </div>
  );
};

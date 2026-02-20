import { cn } from "@/lib/utils";

export const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/50"
        onClick={() => onOpenChange(false)}
      />
      <div className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] shadow-lg duration-200">
        {children}
      </div>
    </>
  );
};

export const DialogContent = ({ className, children, ...props }) => (
  <div
    className={cn(
      "relative bg-white p-6 rounded-lg border border-slate-200 shadow-lg",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export const DialogHeader = ({ className, ...props }) => (
  <div
    className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
    {...props}
  />
);

export const DialogTitle = ({ className, ...props }) => (
  <h2
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
);

export const DialogDescription = ({ className, ...props }) => (
  <p className={cn("text-sm text-slate-500", className)} {...props} />
);

export const DialogFooter = ({ className, ...props }) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props}
  />
);

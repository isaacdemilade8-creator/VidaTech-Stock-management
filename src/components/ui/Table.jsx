import { cn } from "@/lib/utils";

export const Table = ({ className, ...props }) => (
  <div className="w-full overflow-auto">
    <table
      className={cn(
        "w-full caption-bottom text-sm",
        className
      )}
      {...props}
    />
  </div>
);

export const TableHeader = ({ className, ...props }) => (
  <thead className={cn("border-b", className)} {...props} />
);

export const TableBody = ({ className, ...props }) => (
  <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
);

export const TableFooter = ({ className, ...props }) => (
  <tfoot
    className={cn(
      "border-t bg-slate-100 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
);

export const TableRow = ({ className, ...props }) => (
  <tr
    className={cn(
      "border-b border-slate-200 transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100",
      className
    )}
    {...props}
  />
);

export const TableHead = ({ className, ...props }) => (
  <th
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-slate-600 [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
);

export const TableCell = ({ className, ...props }) => (
  <td
    className={cn(
      "p-4 align-middle [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
);

export const TableCaption = ({ className, ...props }) => (
  <caption
    className={cn("mt-4 text-sm text-slate-500", className)}
    {...props}
  />
);

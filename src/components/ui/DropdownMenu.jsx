import { Menu } from "@headlessui/react";
import { cn } from "@/lib/utils";

export const DropdownMenu = ({ children }) => (
  <Menu as="div" className="relative inline-block text-left">
    {children}
  </Menu>
);

export const DropdownMenuTrigger = ({ asChild, children, className }) => {
  if (asChild) {
    const child = children;
    return (
      <Menu.Button as="div" className={className}>
        {child}
      </Menu.Button>
    );
  }
  return (
    <Menu.Button className={cn("inline-flex items-center justify-center", className)}>
      {children}
    </Menu.Button>
  );
};

export const DropdownMenuContent = ({ children, className, align = "left" }) => (
  <Menu.Items
    className={cn(
      "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border border-slate-200 bg-white p-1 shadow-md",
      align === "right" ? "right-0" : "left-0",
      className
    )}
  >
    {children}
  </Menu.Items>
);

export const DropdownMenuItem = ({ children, className, onClick, ...props }) => (
  <Menu.Item>
    {({ active }) => (
      <button
        onClick={onClick}
        className={cn(
          "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-slate-100 focus:bg-slate-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          active && "bg-slate-100",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )}
  </Menu.Item>
);

export const DropdownMenuCheckboxItem = ({ children, checked, onCheckedChange, className }) => (
  <Menu.Item>
    {({ active }) => (
      <button
        onClick={() => onCheckedChange?.(!checked)}
        className={cn(
          "relative flex cursor-pointer select-none items-center rounded-sm pl-8 pr-2 py-1.5 text-sm outline-none hover:bg-slate-100 focus:bg-slate-100",
          active && "bg-slate-100",
          className
        )}
      >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          {checked && <span>✓</span>}
        </span>
        {children}
      </button>
    )}
  </Menu.Item>
);

export const DropdownMenuLabel = ({ className, ...props }) => (
  <div className={cn("px-2 py-1.5 text-sm font-semibold", className)} {...props} />
);

export const DropdownMenuSeparator = ({ className }) => (
  <div className={cn("-mx-1 my-1 h-px bg-slate-200", className)} />
);

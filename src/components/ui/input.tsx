import * as React from "react";
import { cn } from "@/lib/utils";

const fieldStyles = [
  // 16px font prevents iOS focus zoom
  "w-full rounded-xl border border-line bg-surface px-4 py-3 text-base text-ink shadow-(--shadow-hairline)",
  // muted (4.8:1), not faint (2.6:1) — placeholders must stay readable.
  "placeholder:text-gray",
  "transition-[border-color,box-shadow] duration-200 ease-(--ease-1)",
  "hover:border-line-soft",
  "focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15",
  "aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-500/15",
  "disabled:cursor-not-allowed disabled:opacity-60",
].join(" ");

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn(fieldStyles, className)} {...props} />
));
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn(fieldStyles, "min-h-32 resize-y", className)} {...props} />
));
Textarea.displayName = "Textarea";

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      fieldStyles,
      "appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%221.75%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m4%206%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[position:right_1rem_center] bg-no-repeat pr-11",
      className,
    )}
    {...props}
  />
));
Select.displayName = "Select";

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className={cn("mb-1.5 block text-sm font-medium text-ink", className)} {...props} />
  );
}

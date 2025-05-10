import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class values using clsx and processes them with tailwind-merge
 * to handle conflicting tailwind classes properly.
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

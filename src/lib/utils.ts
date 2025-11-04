import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Extracts numeric values from MongoDB BSON wrappers ($numberDouble, $numberInt)
 * or returns the number directly if already a number.
 * @param val - The value to extract (can be MongoDB BSON wrapper, number, or other)
 * @returns Extracted number or null if not a valid numeric value
 */
export function extractNumber(val: any): number | null {
  if (val === null || val === undefined) {
    return null;
  }
  
  // If it's already a number, return it
  if (typeof val === 'number') {
    return val;
  }
  
  // Check for MongoDB BSON wrappers
  if (typeof val === 'object') {
    if ('$numberDouble' in val) {
      const parsed = parseFloat(val.$numberDouble);
      return isNaN(parsed) ? null : parsed;
    }
    if ('$numberInt' in val) {
      const parsed = parseInt(val.$numberInt, 10);
      return isNaN(parsed) ? null : parsed;
    }
  }
  
  // Try to parse as number if it's a string
  if (typeof val === 'string') {
    const parsed = parseFloat(val);
    return isNaN(parsed) ? null : parsed;
  }
  
  return null;
}

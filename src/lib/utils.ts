import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function gerarSlug(value: string) {
  return value
  .toString().toLowerCase()
  .normalize('NFD')            // Remove diacríticos
  .trim()
  .replace(/\s+/g, '-')       // Substitui espaços por hífens
  .replace(/[^\w\-]+/g, '')   // Remove caracteres não alfanuméricos
  .replace(/\-\-+/g, '-')     // Substitui múltiplos hífens por um único hífen
  .replace(/^-+/, '')         // Remove hífens do início do texto
  .replace(/-+$/, '');        // Remove hífens do final do texto
}

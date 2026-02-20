export function cn(...classes) {
  return classes
    .filter(value => value && typeof value === 'string')
    .join(' ')
    .trim();
}

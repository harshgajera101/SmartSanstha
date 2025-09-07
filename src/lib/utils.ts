export const cls = (...s: (string | false | undefined)[]) => s.filter(Boolean).join(' ')

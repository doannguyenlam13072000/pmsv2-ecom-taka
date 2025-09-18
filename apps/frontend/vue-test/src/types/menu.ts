export interface Menu {
  title: string
  path: string
  meta?: Record<string, any>
  subs?: Menu[]
} 
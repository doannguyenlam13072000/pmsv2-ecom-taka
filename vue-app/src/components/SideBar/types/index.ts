export interface Menu {
  title: string
  path: string
  meta: object
  subs: Array<Menu>
}

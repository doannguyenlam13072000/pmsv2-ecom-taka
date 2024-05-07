import type { Menu } from '@/components/SideBar/types'

const menu_items = [
  {
    title: 'Home',
    path: '/',
    meta: {},
    subs: []
  },
  {
    title: 'Sub menu',
    path: '/sub',
    meta: {},
    subs: [
      {
        title: 'Sub menu 1',
        path: '/sub-1',
        meta: {},
        subs: []
      },
      {
        title: 'Sub menu 2',
        path: '/sub-2',
        meta: {},
        subs: [
          {
            title: 'Sub menu 2-1',
            path: '/sub-2-1',
            meta: {},
            subs: []
          },
          {
            title: 'Sub menu 2-2',
            path: '/sub-2-2',
            meta: {},
            subs: []
          },
          {
            title: 'Sub menu 2-3',
            path: '/sub-2-3',
            meta: {},
            subs: [
              {
                title: 'Sub menu 2-3-1',
                path: '/sub-2-3-1',
                meta: {},
                subs: []
              },
              {
                title: 'Sub menu 2-3-2',
                path: '/sub-2-3-2',
                meta: {},
                subs: []
              },
              {
                title: 'Sub menu 2-3-3',
                path: '/sub-2-3-3',
                meta: {},
                subs: []
              }
            ]
          }
        ]
      },
      {
        title: 'Sub menu 3',
        path: '/sub-3',
        meta: {},
        subs: []
      },
      {
        title: 'Sub menu 4',
        path: '/sub-4',
        meta: {},
        subs: []
      }
    ]
  },
  {
    title: 'About',
    path: '/about',
    meta: {},
    subs: []
  }
]

export const menus: Array<Menu> = menu_items.map((menu) => menu)

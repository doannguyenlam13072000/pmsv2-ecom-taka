import { type App } from 'vue'
import highlight from './highlight'
import custom from './custom'

export const registerGolbalDirective = (app: App<Element>) => {
  highlight(app)
  custom(app)
}

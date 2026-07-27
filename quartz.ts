import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { PageTypeDispatcher } from "./quartz/plugins/pageTypes/dispatcher"
import { QuartzComponent } from "./quartz/components/types"
import { MainNav } from "./quartz/components/MainNav"

const config = await loadQuartzConfig()

// Insère le menu juste avant le dernier élément de la colonne de gauche
// (l'Explorer, qui s'affiche en dernier).
function withNav(arr?: QuartzComponent[]): QuartzComponent[] {
  const left = arr ?? []
  return left.length > 0 ? [...left.slice(0, -1), MainNav, left[left.length - 1]] : [MainNav]
}

const baseLayout = await loadQuartzLayout()

const navDefaults = { ...baseLayout.defaults, left: withNav(baseLayout.defaults.left) }
const navByPageType: typeof baseLayout.byPageType = {}
for (const [pageType, ptLayout] of Object.entries(baseLayout.byPageType)) {
  if (pageType === "404") {
    navByPageType[pageType] = ptLayout // pas de menu sur la page 404
  } else {
    navByPageType[pageType] = { ...ptLayout, left: withNav(ptLayout.left) }
  }
}

// IMPORTANT: loadQuartzConfig() a déjà enregistré un PageTypeDispatcher construit
// avec le layout de base — on le remplace par un dispatcher utilisant notre layout.
const dispatcherIdx = config.plugins.emitters.findIndex((e) => e.name === "PageTypeDispatcher")
if (dispatcherIdx !== -1) {
  config.plugins.emitters[dispatcherIdx] = PageTypeDispatcher({
    defaults: navDefaults,
    byPageType: navByPageType,
  })
}

export default config
export const layout = { defaults: navDefaults, byPageType: navByPageType }

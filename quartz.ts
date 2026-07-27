import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { QuartzComponent } from "./quartz/components/types"
import { MainNav } from "./quartz/components/MainNav"

const config = await loadQuartzConfig()
export default config

const baseLayout = await loadQuartzLayout()

// Insère le menu juste avant le dernier élément de la colonne de gauche
// (l'Explorer, qui a la priorité la plus haute donc s'affiche en dernier).
function withNav(arr?: QuartzComponent[]): QuartzComponent[] {
  const left = arr ?? []
  return left.length > 0 ? [...left.slice(0, -1), MainNav, left[left.length - 1]] : [MainNav]
}

// Chaque type de page (content, folder, tag, canvas, bases...) a sa PROPRE
// colonne de gauche déjà construite depuis quartz.config.yaml — modifier
// seulement "defaults" ne suffit pas, il faut aussi surcharger byPageType.
const byPageTypeOverride: Record<string, { left: QuartzComponent[] }> = {}
for (const [pageType, ptLayout] of Object.entries(baseLayout.byPageType)) {
  if (pageType === "404") continue // pas de barre latérale sur la page 404
  byPageTypeOverride[pageType] = { left: withNav(ptLayout.left) }
}

export const layout = await loadQuartzLayout({
  defaults: {
    left: withNav(baseLayout.defaults.left),
  },
  byPageType: byPageTypeOverride,
})

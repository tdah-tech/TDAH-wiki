import { FullSlug, resolveRelative } from "../util/path"
import { QuartzComponent, QuartzComponentProps } from "./types"

const links: { slug: FullSlug; title: string }[] = [
  {
    slug: "toutes-les-notes-publiées/qu'est-ce-que-le-tdah-" as FullSlug,
    title: "Qu'est-ce-que le TDAH ?",
  },
  {
    slug: "toutes-les-notes-publiées/neurosciences-du-tdah" as FullSlug,
    title: "Neurosciences du TDAH",
  },
  {
    slug: "toutes-les-notes-publiées/l'alimentation-et-le-tdah" as FullSlug,
    title: "L'alimentation et le TDAH",
  },
  {
    slug: "toutes-les-notes-publiées/le-sommeil-et-le-tdah" as FullSlug,
    title: "Le sommeil et le TDAH",
  },
  {
    slug: "toutes-les-notes-publiées/parentalité-et-tdah" as FullSlug,
    title: "Parentalité et TDAH",
  },
  {
    slug: "toutes-les-notes-publiées/la-scolarité-et-le-tdah" as FullSlug,
    title: "La scolarité et le TDAH",
  },
  {
    slug: "toutes-les-notes-publiées/vivre-avec-un-tdah" as FullSlug,
    title: "Vivre avec un TDAH",
  },
  {
    slug: "toutes-les-notes-publiées/bonnes-pratiques,-outils,-astuces-et-méthodes-du-quotidien" as FullSlug,
    title: "Les outils - astuces - méthodes pour les TDAH",
  },
]

export const MainNav: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  return (
    <div class="main-nav">
      <h3>Thématiques</h3>
      <ul>
        {links.map((link) => (
          <li>
            <a href={resolveRelative(fileData.slug!, link.slug)} class="internal">
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

MainNav.css = `
.main-nav {
  margin: 0.5em 0;
}
.main-nav h3 {
  font-size: 1rem;
  margin: 0 0 0.3rem 0;
}
.main-nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.main-nav li {
  margin: 0.25rem 0;
  line-height: 1.3;
}
`

export default MainNav

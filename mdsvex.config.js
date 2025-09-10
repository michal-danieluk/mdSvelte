import { visit } from 'unist-util-visit'
import autolinkHeadings from 'rehype-autolink-headings'
import slugPlugin from 'rehype-slug'
import relativeImages from 'mdsvex-relative-images'
import remarkHeadings from '@vcarl/remark-headings'

// Polish character slugification function
function slugifyPolish(text) {
  return text
    .toLowerCase()
    .replace(/ą/g, 'a')
    .replace(/ć/g, 'c')
    .replace(/ę/g, 'e')
    .replace(/ł/g, 'l')
    .replace(/ń/g, 'n')
    .replace(/ó/g, 'o')
    .replace(/ś/g, 's')
    .replace(/ź/g, 'z')
    .replace(/ż/g, 'z')
    .replace(/\s/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

export default {
  extensions: ['.svx', '.md'],
  smartypants: {
    dashes: 'oldschool'
  },
  remarkPlugins: [videos, relativeImages, headings],
  rehypePlugins: [
    [slugPlugin, { prefix: '', slugify: (value) => slugifyPolish(value) }],
    [
      autolinkHeadings,
      {
        behavior: 'wrap'
      }
    ]
  ]
}

/**
 * Adds support to video files in markdown image links
 */
function videos() {
  const extensions = ['mp4', 'webm']
  return function transformer(tree) {
    visit(tree, 'image', (node) => {
      if (extensions.some((ext) => node.url.endsWith(ext))) {
        node.type = 'html'
        node.value = `
            <video
              src="${node.url}"
              autoplay
              muted
              playsinline
              loop
              title="${node.alt}"
            ></video>
          `
      }
    })
  }
}

/**
 * Parses headings and includes the result in metadata
 */
function headings() {
  return function transformer(tree, vfile) {
    // run remark-headings plugin
    remarkHeadings()(tree, vfile)

    // include the headings data in mdsvex frontmatter
    vfile.data.fm ??= {}
    vfile.data.fm.headings = vfile.data.headings.map((heading) => ({
      ...heading,
      // slugify heading.value using the same function as rehype-slug
      id: slugifyPolish(heading.value)
    }))
  }
}

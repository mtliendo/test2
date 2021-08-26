import { getPlaiceholder } from 'plaiceholder'
import { format, parseISO } from 'date-fns'

// example imageMarkdown: ![carbon code](https://user-images.githubusercontent.com/5106417/130181612-db2eff06-1b78-4cfd-b0a4-96bd285bd665.png)

export const parseImageMarkdown = async (imageMarkdown) => {
  const regExpForMarkdownImageLink = /\(([^)]+)\)/
  const regExpForMarkdownImageAltText = /\[([^)]+)\]/
  let imageDetails = {}

  if (imageMarkdown) {
    imageDetails.src =
      imageMarkdown && imageMarkdown.match(regExpForMarkdownImageLink)[1]
    imageDetails.alt = imageMarkdown.match(regExpForMarkdownImageAltText)[1]

    const { base64, img } = await getPlaiceholder(`${imageDetails.src}`)
    imageDetails.base64 = base64
    imageDetails.img = img
  }

  return imageDetails
}

export async function formatBlogPosts(blogPosts) {
  const formattedBlogPosts = []

  for (let blogPost of blogPosts) {
    const id = blogPost.number
    const createdAt = format(parseISO(blogPost.createdAt), 'MMMM do, yyyy')
    const author = blogPost.author.login
    const title = blogPost.title
    const headerImageString = blogPost.comments.nodes[0].body
    const tags = blogPost.labels.nodes.map((label) => ({
      tag: label.name,
      color: label.color,
    }))
    const parsedHeaderImage = await parseImageMarkdown(headerImageString)
    formattedBlogPosts.push({
      id,
      createdAt,
      author,
      title,
      tags,
      headerImage: parsedHeaderImage,
    })
  }

  return formattedBlogPosts
}

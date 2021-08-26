/* eslint-disable react/no-children-prop */
import React from 'react'
import { fetchBlogPost, fetchBlogPostsIDs } from '../../graphql/queries'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import { parseImageMarkdown } from '../../utils'
import { Center, Container, Heading, Text } from '@chakra-ui/react'

const OptimizedImage = (node) => {
  return node.children[0].tagName === 'img' ? (
    <Image
      alt={node.children[0].props.alt}
      src={node.children[0].props.src}
      layout="fill"
      objectFit="contain"
    />
  ) : (
    <Center>
      <Text>{node.children[0]}</Text>
    </Center>
  )
}

const FormattedCode = ({ className, children }) => {
  // Removing "language-" because React-Markdown already added "language-"
  const language = className.replace('language-', '')
  return (
    <SyntaxHighlighter
      style={materialDark}
      language={language}
      children={children[0]}
    />
  )
}

const MarkdownHeader = (node) => {
  return <Heading textAlign="center">{node.children[0]}</Heading>
}

function Post({ blogData = {} }) {
  return (
    <Container>
      {blogData.headerImage?.src && (
        <div>
          <Image
            src={blogData.headerImage.src}
            blurDataURL={blogData.headerImage.base64}
            placeholder="blur"
            width={blogData.headerImage.img.width}
            height={blogData.headerImage.img.height}
            alt={blogData.headerImage.alt}
          />
        </div>
      )}
      <div>
        <ReactMarkdown
          components={{
            h1: MarkdownHeader,
            p: OptimizedImage,
            code: FormattedCode,
          }}
        >
          {blogData.body}
        </ReactMarkdown>
      </div>
    </Container>
  )
}

export default Post

export async function getStaticPaths() {
  const blogPosts = await fetchBlogPostsIDs(
    process.env.GITHUB_USERNAME,
    process.env.GITHUB_REPO,
    process.env.GITHUB_TOKEN
  )
  const paths = blogPosts.map((blogPost) => ({
    params: { blogId: blogPost.number.toString() },
  }))

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const blogPost = await fetchBlogPost(
    process.env.GITHUB_USERNAME,
    process.env.GITHUB_REPO,
    process.env.GITHUB_TOKEN,
    params.blogId
  )
  const id = blogPost.number
  const author = blogPost.author.login
  const title = blogPost.title
  const body = blogPost.body
  const tags = blogPost.labels.nodes.map((label) => ({
    tag: label.name,
    color: label.color,
  }))

  const headerImageString = blogPost.comments.nodes[0]?.body || null
  return {
    props: {
      blogData: {
        id,
        author,
        title,
        body,
        tags,
        headerImage: await parseImageMarkdown(headerImageString),
      },
    },
    revalidate: 10,
  }
}

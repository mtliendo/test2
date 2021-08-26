export async function fetchBlogPosts(user, repo, githubToken) {
  const fetchBlogPostsResponse = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${githubToken}`,
    },
    body: JSON.stringify({
      query: `
      query blogPosts {
        repository(name: "${repo}", owner: "${user}") {
          issues(first: 10, states: OPEN, orderBy: {field: CREATED_AT, direction: DESC}) {
            nodes {
              title
              number
              createdAt
              author {
                login
              }
              body
              labels(first: 3) {
                nodes {
                  color
                  name
                }
              }
              comments(first: 1) {
                nodes {
                  body
                }
              }
            }
          }
        }
      }`,
    }),
  })
  const blogsData = await fetchBlogPostsResponse.json()

  return blogsData.data.repository.issues.nodes
}

export const fetchBlogPostsIDs = async (user, repo, githubToken) => {
  const fetchBlogPostsResponse = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${githubToken}`,
    },
    body: JSON.stringify({
      query: `
        query blogPostsNumber {
          repository(name: "${repo}", owner: "${user}") {
            issues(first: 10, states: OPEN, orderBy: {field: CREATED_AT, direction: DESC}) {
              nodes {
                number    
              }
            }
          }
        }`,
    }),
  })

  const blogPosts = await fetchBlogPostsResponse.json()
  return blogPosts.data.repository.issues.nodes
}

export async function fetchBlogPost(user, repo, githubToken, blogId) {
  const res = await fetch(`https://api.github.com/graphql`, {
    method: 'post',
    headers: {
      Authorization: `bearer ${githubToken}`,
    },
    body: JSON.stringify({
      query: `
        query blogPost {
          repository(name: "${repo}", owner: "${user}") {
            issue(number: ${blogId}) {
              author {
                login
              }
              body
              comments(first: 1) {
                nodes {
                  body
                }
              }
              createdAt
              updatedAt
              title
              number
              labels(first: 3) {
                nodes {
                  color
                  name
                }
              }
            }
          }
        }`,
    }),
  })
  const blogPostData = await res.json()
  return blogPostData.data.repository.issue
}

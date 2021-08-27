module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['user-images.githubusercontent.com', 'images.unsplash.com'],
  },
  env: {
    GITHUB_REPO: process.env.GITHUB_REPO,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    GITHUB_USERNAME: process.env.GITHUB_USERNAME,
  },
}

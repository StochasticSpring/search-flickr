module.exports = {
  async rewrites() {
    return [
      {
        source: '/flickr/:path*',
        destination: 'https://www.flickr.com/:path*'
      }
    ]
  }
}

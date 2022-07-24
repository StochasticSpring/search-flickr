# Search Flickr

[![Netlify Status](https://api.netlify.com/api/v1/badges/46648482-644c-4c80-bafb-872057e51b6b/deploy-status)](https://app.netlify.com/sites/next-dev-starter/deploys)

## Documentation

- [Introduction](#introduction)
- [Dependencies](#dependencies)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Code Style](#code-style)
- [Todos](#todos)
- [Requirements](#requirements)

## Introduction

This is a simple React SPA written to satisfy these [requirements](#requirements). It was bootstrapped using Netlify's Next.js + create-react-app option.

## Dependencies

### Libraries in use and their major versions:

 - React 18
 - Material UI 5 (React component library)
 - Next.js 12 (React framework)
 - Jest 28 (Unit testing)
 - Cypress 10 (Integration testing)

To install dependencies, run:

```
$ yarn
```

## Development

Run the following to start development server:

```
$ yarn dev
```

## Testing

### Unit Tests

Run the following to execute unit tests:

```
$ yarn jest
```
Unit tests are not _yet_ automated through Netlify

### Integration Tests

To execute integration tests locally, first make sure dev server is running, then run the following:

```
$ yarn cypress run
```

Integration tests are automated through Netlify

## Deployment

Deployment is managed through Netlify. 

Every PR is automatically deployed to the preview environment. Merged PRs are deployed to the production environment.

## Code Style
 - [ESLint](https://eslint.org/)
 - [Prettier](https://prettier.io/)

## Todos

These are the things I would like to see done if I had more time to spend on this project: (in descending priority)

 - automate jest in Netlify, probably with [this](https://github.com/UWHealth/netlify-plugin-jest)
 - replace proxy/rewrite in package.json with proper CORS config
 - handle Flickr API status error or timeout
 - unit tests for `ListitemWithExpansion`
 - integration tests covering search return and no-result case
 - cosmetic improvements
   - font sizes
   - more precise layout
   - make tags more prominent (chips perhaps?)
 - solution for when there are so many tags it overflows the bar (not common)
 - allow hitting "enter" to submit search query
 - fix a slight glitch with the MUI animation with Chrome on iPhone

## Requirements

```
Create a web page using the Flickr public feed (https://www.flickr.com/services/feeds/docs/photos_public/) that allows users to search Flickr and see matching results.
Results should be updated as the user types and should include the following attributes:

● A thumbnail image
● The author
● The date taken
● The tags
● A link through to the full size image

We value responsive UI/UX as well as modular/testable code.

1) Please share the source code repository (e.g. on Github)
2) Please host a live demo on any service you like (e.g. on Netlify)
3) Please use React for the UI implementation
4) Feel free to use a bootstrapper if you like (e.g. Create React App)
5) Use the testing framework of your choice (e.g. Jest) 
```

<div align="center">
    <img src="src/assets/logos/wbp-color-vertical.svg#gh-light-mode-only" alt="logo"  width="200" height="auto" />
    <img src="src/assets/logos/wbp-color-vertical-white-text.svg#gh-dark-mode-only" alt="logo" width="200" height="auto" />
  <h1>Woodwork Bike Park Management System</h1>
  
  
<!-- Badges -->
<p>
  <!-- <a href="https://github.com/vpomerleau/bike-park-client/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/vpomerleau/bike-park-client" alt="contributors" />
  </a> -->
  <a href="">
    <img src="https://img.shields.io/github/last-commit/vpomerleau/bike-park-client" alt="last update" />
  </a>
  <!-- <a href="https://github.com/vpomerleau/bike-park-client/network/members">
    <img src="https://img.shields.io/github/forks/vpomerleau/bike-park-client" alt="forks" />
  </a>
  <a href="https://github.com/vpomerleau/bike-park-client/stargazers">
    <img src="https://img.shields.io/github/stars/vpomerleau/bike-park-client" alt="stars" />
  </a>
  <a href="https://github.com/vpomerleau/bike-park-client/issues/">
    <img src="https://img.shields.io/github/issues/vpomerleau/bike-park-client" alt="open issues" />
  </a> -->
  <a href="https://github.com/vpomerleau/bike-park-client/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/vpomerleau/bike-park-client" alt="license" />
  </a>
</p>

<h4>
    <!-- <a href="https://github.com/Louis3797/awesome-readme-template/">View Demo</a>
  <span> · </span>
    <a href="https://github.com/Louis3797/awesome-readme-template">Documentation</a>
  <span> · </span> -->
    <a href="https://github.com/vpomerleau/bike-park-client/issues/">Report Bug</a>
  <span> · </span>
    <a href="https://github.com/vpomerleau/bike-park-client/issues/">Request Feature</a>
  </h4>

</div>

<br />

# Client-side Repository

<a href="https://github.com/vpomerleau/bike-park-client">
  <p>https://github.com/vpomerleau/bike-park-client</p>
</a>

# Server-side Repository
<a href="https://github.com/vpomerleau/bike-park-server">
  <p>https://github.com/vpomerleau/bike-park-server</p>
</a>

<br />

<!-- Table of Contents -->
# Table of Contents

- [About the Project](#about-the-project)
  * [Screenshots](#screenshots)
  * [Dependencies](#dependencies)
  * [Features](#features)
  * [Color Reference](#color-reference)
  * [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Run Locally](#run-locally)
- [Roadmap](#roadmap)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)
  

<!-- About the Project -->
# About the Project


<!-- Screenshots -->
### Screenshots

<div align="center"> 
  <img src="https://placehold.co/600x400?text=Your+Screenshot+here" alt="screenshot" />
</div>


<!-- Dependencies -->
## Dependencies

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://reactjs.org/">React.js</a></li>
    <li><a href="https://sass-lang.com/">Sass</a></li>
    <li><a href="https://axios-http.com/">Axios</a></li>
    <li><a href="https://auth0.com/">Auth0</a></li>
    <li><a href="https://stripe.com/en-ca">Stripe</a></li>
  </ul>
</details>

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="https://expressjs.com/">Express.js</a></li>
    <li><a href="https://knexjs.org/">Knex.js</a></li>
  </ul>
</details>

<details>
<summary>Database</summary>
  <ul>
    <li><a href="https://www.mysql.com/">MySQL</a></li>
  </ul>
</details>

<!-- Features -->
## Features

- Authentication with Auth0
- Payments with Stripe

<!-- Color Reference -->
## Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Brand Color (light) | ![#D67A00](https://via.placeholder.com/10/D67A00?text=+) #D67A00 |
| Brand Color (dark) | ![#EBA13F](https://via.placeholder.com/10/EBA13F?text=+) #EBA13F |
| Accent Color | ![#2e845d](https://via.placeholder.com/10/2e845d?text=+) #2e845d |
| Text Color (on dark) | ![#FFFFFF](https://via.placeholder.com/10/FFFFFF?text=+) #FFFFFF |
| Text Color (on white) | ![#000000](https://via.placeholder.com/10/#000000?text=+) #000000 |


<!-- Env Variables -->
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_SERVER_URL`

`AUTH0_DOMAIN`

`AUTH0_CLIENT_ID`

`AUTH0_CALLBACK_URL`

`AUTH0_LOGOUT_RETURN_URL`

`STRIPE_PUBLISHABLE_KEY`

<!-- Getting Started -->
# Getting Started

<!-- Prerequisites -->
## Prerequisites

This project uses Node as package manager 

[See Node intallation instructions](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

```bash
 npm install -g npm
```

<!-- Installation -->
<!-- ### Installation

Install bike-park-client with npm

```bash
  yarn install my-project
  cd my-project
``` -->
   
<!-- Running Tests -->
<!-- ### Running Tests

To run tests, run the following command

```bash
  yarn test test
``` -->

<!-- Run Locally -->
## Install a local copy of the project

Make a top level project directory to hold the client and server-side code

 ```bash
  mkdir bike-park-project
  cd bike-park-project
 ```

Clone the client and server into the top level folder (two new folders will be created)

```bash
  git clone https://github.com/vpomerleau/bike-park-client.git
  ```

```bash
  git clone https://github.com/vpomerleau/bike-park-server.git
```

## Client setup

[See Server-side readme](https://github.com/vpomerleau/bike-park-server/blob/develop/README.md) for detailed server installation instructions.

Go to the client directory

```bash
  cd bike-park-client
```

Install dependencies

```bash
  npm install
```

[Set up the environment variables](#environment-variables) by creating a new .env file from .env.sample

Modify your .gitignore file to cover your needs - [Toptal's gitignore.io](https://www.toptal.com/developers/gitignore) is a useful tool to get a template by searching for package manager, OS, etc. For this project, recommended to at least include Node.

Run the client-side

```bash
  npm start
```


<!-- Deployment -->
<!-- ### Deployment

To deploy this project run

```bash
  yarn deploy
``` -->


<!-- Usage -->
<!-- ## Usage

Use this space to tell a little more about your project and how it can be used. Show additional screenshots, code samples, demos or link to other resources. -->

<!-- Roadmap -->
# Roadmap

* [x] Proof of concept homepage
* [x] Auth0 integration (dev mode)
* [x] Stripe integration (dev mode)
* [ ] User profile updates
* [ ] User controlled booking management (incl. transferring tickets to other riders)
* [ ] Unit testing
* [ ] Phases 2 to 1,000 to build a full-featured bike park management system

<!-- FAQ -->
<!-- ## FAQ

- Question 1

  + Answer 1

- Question 2

  + Answer 2 -->


<!-- License -->
# License

Distributed under the MIT License. See LICENSE.txt for more information.

# Contact

Valerie Pomerleau - [Twitter @PomerleauVal](https://twitter.com/PomerleauVal) - [LinkedIn @valeriepomerleau](https://www.linkedin.com/in/valeriepomerleau/) 

## Project Link

(client): [https://github.com/vpomerleau/bike-park-client](https://github.com/vpomerleau/bike-park-client)

(server): [https://github.com/vpomerleau/bike-park-server](https://github.com/vpomerleau/bike-park-server)

# Acknowledgements

Thank you to BrainStation for the knowledge, wisdom and support! In particular, I'd like to thank my May 2022 Web Dev cohort's educators ([Daniil Molodkov](https://daniil.ca), [Michael Ti](https://michaelti.ca/), [Andrew Carolan](https://github.com/andrewcarolan)) and TAs ([Brishan King](https://github.com/brishan3) and [Slobodan Zaja](https://github.com/brunash)).

## Useful resources 

 - Bike Lorem Ipsum from [Bicycle Ipsum](https://cogdog.github.io/bicycle-ipsum/)
 - Logo design with [Canva](https://www.canva.com/)
 - Mountain bike animation adapted from: [Pure CSS bike animation](https://codepen.io/lucawater/pen/VwQVyj)
 - Database schema planning with [LucidChart](https://lucid.app/lucidchart/5ad69e98-8a23-448b-a979-63d8dca1a07b/edit?viewport_loc=-515%2C-100%2C2616%2C1481%2C0_0&invitationId=inv_a0392367-744c-4dc4-97de-515ca6583dd1#)
 - [Auth0 API docs](https://auth0.com/docs/)
 - [Stripe API docs](https://stripe.com/docs/api)
 - [Stripe Dev Support on Discord](https://discord.com/invite/stripe)
 - [Shields.io](https://shields.io/)
 - [Awesome README template](https://github.com/Louis3797/awesome-readme-template)
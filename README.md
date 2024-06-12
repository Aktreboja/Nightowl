<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
<!--   <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

  <h1 align="center"><i>Nightowl</i></h1>

  <p align="center">
    A Web application focused on improving music exploration within spotify
  </p>
</div>

<!-- TABLE OF CONTENTS -->
  <h3>Table of Contents</h3>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#prerequisites">Prerequisites</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>



<!-- ABOUT THE PROJECT -->

## About The Project

Nighowl is a web application that improves the way you discover music through Spotify. This web application takes your analytical data, such as your top tracks and artists, and provides an almost rabbit hole experience when searching for new music. It is clearly meant to keep you up all night listening to music. 

Current features include: 

1. Viewing and analyzing top tracks and artists based on timeline.
2. Preview tracks to enhance and speed up music discovery.
3. Ability to select and save tracks to their Spotify account.
4. Retrieving track recommendations based on the selected track. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<h3 name = "built-with"> Built With</h3>

- [![Next][Next.js]][Next-url]
- [![React][React.js]][React-url]
- [![Tailwind][Tailwind]][Tailwind-url]
- [![TypeScript][TypeScript]][TypeScript-url]
- [![Redux][Redux]][Redux-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Technologies -->

## Technologies and Concepts

### Application Structure

- For this application, I went with a true single page application, centered around using multiple "containers" as different views.

### Redux State management

- Due to the web application structure including numerous containers at various levels of the component tree, decided to go with Redux as the global state management system for Nightowl.

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites and Installation

In order to get started by using Nightowl locally

1. Clone the repo
   ```sh
   git clone https://github.com/Aktreboja/Nightowl.git
   ```
2. Register your app with Spotify

   _link get started: https://developer.spotify.com/documentation/web-api/tutorials/getting-started_

![image](https://github.com/Aktreboja/Nightowl/assets/15055373/5d977e26-5226-41e5-8d59-7b5c9a68cdc7)

Note: When setting up the redirect uris, `http://localhost:3000`, or the uri that runs your devlopment instance will be for development purposes, and the live site url will be for production.

3. Add in environment variables

   ```env
   NEXT_PUBLIC_SPOTIFY_API_BASE = https://api.spotify.com/v1

   # Client id comes from registering the application on Spotify's developer dashboard
   NEXT_PUBLIC_SPOTIFY_CLIENT_ID = ""

   # The scope that the access token you requested will have. This will be dependent on which APIs you call. Please refer to the API route's documentation for more information
   NEXT_PUBLIC_SPOTIFY_SCOPE = "user-top-read user-library-modify playlist-read-private playlist-modify-public playlist-modify-private playlist-read-private user-library-read"

   # The endpoints that will provide you the access and refresh tokens
   NEXT_PUBLIC_SPOTIFY_AUTH_ENDPOINT = https://accounts.spotify.com/authorize
   NEXT_PUBLIC_SPOTIFY_TOKEN_ENDPOINT = https://accounts.spotify.com/api/token

   # This will be different based on various environments, redirects you to this url once you have authorized your Spotify account from the AUTH endpoint
   NEXT_PUBLIC_SPOTIFY_REDIRECT_URL = "http://localhost:3000"

   ```

   Note: `NEXT_PUBLIC_SPOTIFY_SCOPE` may or may not be similar, depending on what kind of routes you will be using or if you plan to add more. Please refer to the individual API routes to confirm.

4. Install the necessary packages and run the application

   ```sh
       # Install dependencies
       npm install

       # Run the application
       npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->

## Roadmap

- [x] Fix unaligned hover outlines on trackArt components
- [x] Add previews to artists by playing their top track
- [x] Fix UI errors from playback state changes
- [x] Add modal to initialize UI for audio previewing
- [ ] Fix persisted state functionality (token refresh)
- [x] Add to playlist functionality
- [x] Add notification components for enhanced user experience
- [ ] Implement recommended playlist feature
- [ ] Convert from REST to GraphQL api.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Aldrich Reboja - aktreboja@gmail.com

Project Link: [https://github.com/aktreboja/Nightowl](https://github.com/aktreboja/Nightowl)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/aktreboja
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Tailwind]: https://img.shields.io/badge/tailwindcss-0F172A?style=for-the-badge&logo=tailwindcss
[Tailwind-url]: https://tailwindcss.com/
[Redux]: https://img.shields.io/badge/redux-593d88?style=for-the-badge&logo=redux
[Redux-url]: https://www.redux.js.org

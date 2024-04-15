
<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
<!--   <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

  <h3 align="center">Nightowl</h3>

  <p align="center">
    A Web application focused on improving music exploration within spotify
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Nighowl is a web application that improves the way you discover music through Spotify.


Some current features include:
    1. Viewing and analyzing top tracks and artists based on timeline.
    2. Preview tracks to enhance and speed up music discovery.
    3. Retrieving track recommendations based on the selected track.
    4. Ability to select and save tracks to their Spotify account.



<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![Tailwind][Tailwind]][Tailwind-url]
* [![TypeScript][TypeScript]][TypeScript-url]
* [![Redux][Redux]][Redux-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites and Installation

In order to get started by using Nightowl locally

1. Clone the repo
   ```sh
   git clone https://github.com/Aktreboja/spotify.git
   ```
2. Register your app with Spotify

    _link get started: https://developer.spotify.com/documentation/web-api/tutorials/getting-started_

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

4. Install the necessary packages and run the application

    ```sh
        # Install dependencies
        npm install

        # Run the application
        npm run dev
    ```  

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Previews

### Landing Page


![image](https://github.com/Aktreboja/spotify/assets/15055373/36f4927b-1a6d-4e9a-90ed-54ecb8ff21c1)


### Authorize Page (Spotify authorize)

![image](https://github.com/Aktreboja/spotify/assets/15055373/1772601b-a014-4692-9045-44be65bbe410)

### Notes

The following url will also contain query parameters

2. Client ID: The client id of the application
3. scope: The scope of what the access token received will be able to use
4. redirect_uri: Where the authorize page will redirect to once authorization is completed
   

### Dashboard Page (Top Stats)

![image](https://github.com/Aktreboja/spotify/assets/15055373/18662b29-bfd1-41a6-baa7-8febd5187717)



### Notes

1. Hover over a track to view it's information and listen to a preview
2. Select a track to learn more about the track (artist(s) and similar tracks


### Dashboard Page (Hovered Track)

![image](https://github.com/Aktreboja/spotify/assets/15055373/fc80efcc-e77c-48b2-932e-f073452b71be)


### Dashboard Page (Selected Track)

![image](https://github.com/Aktreboja/spotify/assets/15055373/73ccfafd-f086-4984-be1b-67eb19e2433d)

### Notes

1. Selecting a track will provide metadata on that track
2. Can also hover and select the tracks from within the container to be able to easily navigate through tracks.


### Dashboard Page (Playlist View)

![image](https://github.com/Aktreboja/spotify/assets/15055373/a9d16e4e-6bf8-4be5-8491-8766d5808ed3)

### Notes

1. Tracks that are selected will automatically be sent here, can be saved to the user's liked songs.
2. If the user doesn't want a specific track, can delete from the list.

<!-- ROADMAP -->
## Roadmap
- [ ] Fix unaligned hover outlines on trackArt components
- [ ] Add previews to artists by playing their top track
- [ ] Fix UI errors from playback state changes
- [ ] Add modal to initialize UI for audio previewing
- [ ] Fix persisted state functionality (token refresh)
- [ ] Add to playlist functionality
- [ ] Add notification components for enhanced user experience
- [ ] Implement recommended playlist feature
- [ ] Convert from REST to GraphQL api.


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Aldrich Reboja - aktreboja@gmail.com

Project Link: [https://github.com/aktreboja/Spotify](https://github.com/aktreboja/spotify)

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

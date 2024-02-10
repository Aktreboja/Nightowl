# Nightowl, A Spotify based Web Application

Nightowl is a Web application that allows you to retrieve analytical data from your Spotify history and provide you with insights and recommendations on new music, artists and albums.

## Getting Started

In order to be able to use this application, you will need to 

    1. Have a Spotify Account
    2. Have listened to music from Spotify, the more and the longer you have listened the better!
    
This application will utilize localStorage within your web browser.
    
## Current Features

    1. Able to look into a user's top Tracks and artists, based on various time frames (last month, 6 months, or all time).
    2. Be able to view metadata on a selected track, as well as receive similar artists and tracks based on the Spotify's recommendation API route.

## Upcoming changes and features

##### As of February 10, 2024 These are the upcoming features for this project
 
    1. Be able to add music directly from the site to your Spotify account
        a. This will start off as saving to your 'Liked Songs' section, but eventually we will get into playlist creation.
    2. Be able to create and add music into 
    
    
##### Challenges and optimizations

    1. API requests are used A LOT, trying to reduce API calls by Spotify's batch APIs / bundling API calls whenever possible.
    2. Image rendering; this application is very visual to promote a (like what you see) concept; therefore image optimizations are required to ensure a smooth User experience.
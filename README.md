# Getting Started with Auth app

## Tech Stack

`Front-End: React JS(Web)`

`Back-end: Node js(Server)`

`Database: MongoDB`

## Setup / Installation: 

Please install node js in your system from below link

https://nodejs.org/en/

## To install dependencies run below commands on root folder director

### `yarn all-install`

This command install all project dependencies like web, mobile(front-end) and node js(back-end)

### `yarn web-install`

This command install only web project dependencies

### `yarn install`

This command install only back-end project dependencies

## Set up environment variables

### `set up web environment variables`

Step 1: Go to web folder

Step 2: Create .env file

Step 3: Copy below code and paste there

`REACT_APP_DOMAIN_URL=http://localhost:8080`

### `set up back-end environment variables`

Step 1: Go to root directory

Step 2: Create .env file

Step 3: Copy below code and paste there

`SECRET_KEY=your_32_character_secret_key`

`DB_CONNECT=please_replace_it_with_your_mongodb_connection_string`

## To run project please run below commands on root folder director

### `yarn web`

Runs the web app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `yarn server`

Runs the back-end app in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in your terminal console.

### `yarn dev`

This command run all projects like front-end and back-end concurrently

Runs the apps in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

Open [http://localhost:8080](http://localhost:8080) to view it in your terminal console.

### `yarn web-build`

This command create web project production build

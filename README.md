# Twitter Clone - Chirpy using MERN Stack
Demo 👉 https://chirpy-clone-twitter.herokuapp.com/ (App may take a bit to load since Heroku web dyno may be asleep)

Username: demo

Password: test1234

Twitter clone built with MongoDB, Express, React, NodeJS (MERN).

# Preview :

<img src="https://github.com/jmirfield/Chirpy-Twitter-Clone/blob/main/Demo/LoginPageDemo.PNG" alt="Login Page Demo" width="800">

<img src="https://github.com/jmirfield/Chirpy-Twitter-Clone/blob/main/Demo/HomePageDemo.PNG" alt="Home Page Demo" width="800">

## Features
1. Signin / Signup
2. Add Chirps (Tweets)
3. Follow other users
4. Like, Rechirp (Retweet), and Comment
5. View user profile, view media posts, and liked posts
6. Search for other users either on sidebar or explore section

# Setup
Get the code by either cloning this repository using git
```
git clone https://github.com/jmirfield/Chirpy-Twitter-Clone.git
```
... or [downloading source code](https://github.com/jmirfield/Chirpy-Twitter-Clone/archive/refs/heads/main.zip) code as a zip archive.

Once downloaded, open the terminal in the project directory, navigate to the client folder, and install dependencies with:
```
npm install
```

Do the same for the server folder.

Create a config/.dev.env in the server folder and insert the following environment variables. Make sure to fill in the empty values with yours:
```
PORT=3001
JWT_SECRET=createyourownkey
MONGODB_URL=
CLOUDINARY_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
```

Start the server
```
npm run dev
```

Navigate back over to the client and start app
```
npm start
```

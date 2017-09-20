# My-Mirror
This is my latest version of a smart-mirror. This is for a school Project. Feel free to help!

## To get started!
1) Make sure you have nodeJs installed.
#### --- Run these commands in terminal ---
2) `git clone https://github.com/crazywolf132/My-Mirror/ && cd My-Mirror`
3) `npm install -g electron`
4) `npm install`
5) `electron .`

## To get the Weather working...
Because I did not want to share my own api key of darkSky... I made it so
everyone who uses this project will need to generate their own!

#### --- To get your own API Key ---
1) Sign up to `https://darksky.net/dev/register` or, login at `https://darksky.net/dev/login`
2) Collect `Your Secret Key` from the text box.
3) Navigate to `/My-Mirror/js/api.js` on your computer (Place where you installed the `My-Mirror`)
4) Insert your secret key to the `key` field provided.
5) Run the mirror and enjoy!

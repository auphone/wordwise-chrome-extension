## Screenshot
![Translating Science Alert article](https://raw.githubusercontent.com/auphone/wordwise-chrome-extension/master/screenshot.png)

*https://www.sciencealert.com/this-is-why-smartphones-are-bad-for-our-brains*

## Installation
```sh
git clone https://github.com/auphone/wordwise-chrome-extension.git
```
- Goto Chrome => More Tools => Extensions
- Enable Developer Mode
- Load unpacked extension by choosing this project root folder

## Usage
Setup wordwise translation server, checkout https://github.com/auphone/wordwise-translation-server.git

Click ![extension icon](https://raw.githubusercontent.com/auphone/wordwise-chrome-extension/master/icon.png) to translate difficult words on any webpage, only works with `<p>`!

*Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>*

## Options
#### Server
- Wordwise translation server URL
- Default: `http://localhost:4000`

#### Password
- Passcode of translation server
- Default: `(Empty)`

#### Language
- Language of translation
- Default: `Chinese Traditional`

#### Levels
- Your English level, level 1 is the lowest
- Default: `level 1`

#### Auto translate on page loaded
- If set to false, click icon to translate
- Default: `false`

## License
ISC

## Author
[github/auphone](https://github.com/auphone)

Good luck!
<p align="center"><br>
<a href="https://github.com/Lolo280374/openAnki"><img src="https://hackatime-badge.hackclub.com/U09CBF0DS4F/openAnki"></a>
<a href="https://makeapullrequest.com"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg"></a>
<a href="https://ankiweb.net/"><img src="https://img.shields.io/badge/works_with-.apkg_files-white"></a>
<a href="#table-of-contents"><img src="https://img.shields.io/badge/works_on-mobile-brightgreen"></a>
<br></p>

<h3 align="center">
load your fav flashcards, or grab some from AnkiWeb, and start studying in the browser! no apps!
</h3>

<h1 align="center">
showcase (screenshots)
</h1>

<img width="1920" height="1080" alt="showcase_anki_one" src="https://github.com/user-attachments/assets/e471685d-8f64-4735-abda-217df57d2b8f" />

<img width="1920" height="1080" alt="showcase_anki_two" src="https://github.com/user-attachments/assets/fd355a13-4d11-4ad9-a75e-bb050872991a" />

> [!NOTE]
> normally, the project was meant to also include the compatibility of checking the AnkiWeb library directly from the app, and handling logging in. issue is my exams are in a few days, and I preferred focusing on studies rather than making this project complete. i might add the feature later, but for now it's quite a basic viewer, sorry!!

## table of contents

- [about](#about)
- [supported flashcard data](#supported-flashcard-data)
- [how to get public decks](#how-to-get-decks)
- [info about the demo file](#demo-file-info)
- [contributing](#contributing)
- [reporting issues](#reporting-issues)
- [credits](#credits)
- [license](#license)

## about
for this week of Siege, the theme was anything (with a prompt for partying). i originally thought of making a local party app, but i got way too tired, and i decided to kick back on an idea i wanted to do before: an anki viewer for the web!

i got that idea from personally using AnkiWeb, and finding it frustrating that you must go thru the app clients to import decks, and that you cant just load them directly from the web. that's where this project comes in! you can download decks from ankiweb, and open them from the web, directly on this project.

however, i ended up falling sick sunday, the day i planned on adding some cool features, so i ended up limiting the app to a simple viewer. i might add some features later, but for now due to exams and my sickness, not sure. was still fun in the end! (sorry for this huge yap)

## supported flashcard data
this project supports loading any regular Anki-based deck (in the .apkg) format. however, some decks also have custom data built into the decks, to extend to more than just text!

this project supports the following: 
* images,
* audios, 
* videos, 
* math equations (displayed thru LaTeX),
* and obviously regular text. 

any unsupported data will just show up as a text tag. 

## how to get decks
this project relies on either you loading the demo deck, or importing your own! that's where this part comes in. you can grab your own decks on AnkiWeb, a community built library with tons of decks for pretty much anything!

to get some, you can directly to the [AnkiWeb page](https://ankiweb.net/), make an account, and grab some decks!

## demo file info
the demo file used in this project is [a deck to learn Japanese Hiragana](https://ankiweb.net/shared/info/2183294427). personally used myself, it's great and works well! I'd have quoted the author name, but AnkiWeb dosen't provide that. but eitherway, thanks!

## contributing
to contribute, you can simply git clone this repo, and start editing the main HTML file of this project (or the javascript too):

```sh
git clone https://github.com/Lolo280374/openAnki.git
cd openAnki/
```

you may then request your edits via a pull request.

## reporting issues
this is a community project, and your help is very much appreciated! if you notice anything wrong during your usage of this software, please report it on the [GitHub issues tracker!](https://github.com/Lolo280374/openAnki/issues/)

please note that if you have feature ideas or feedback to give, you should submit it on the issues tracker aswell!

## credits
many thanks to these who without them, the project may have never seen the light of day (or it would just have sucked):

- [Lucide Icons](https://lucide.dev) - once again, absolute cinema icon pack always works and looks great

- [whoever did the demo deck I used](https://ankiweb.net/shared/info/2183294427) - a cool deck to learn Japanese Hiragana! i don't know who did this, but thanks! actually useful to learn with it.

- [Anki](https://apps.ankiweb.net/) - core idea for the app obviously, but really great tool to make your studying easier!

- [MathJax](https://www.mathjax.org/) - used to display math equations properly on flashcards (derivative of LaTeX for browsers)

- [JSZip](https://stuk.github.io/jszip/) - used to unpack the Anki deck loaded by the user

- [SQL.js](https://sql.js.org/#/) - used for reading the unpacked deck properly (anki decks are based on SQL)

and probably some others I forgot.. sorry in advance, but thanks for being here!!

## license
this project is licensed under the MIT License which you may check [here](https://github.com/Lolo280374/openAnki/blob/master/LICENSE/).
<br>if you have any questions or inquieries, please reach me [at lolodotzip@hackclub.app](mailto:lolodotzip@hackclub.app).
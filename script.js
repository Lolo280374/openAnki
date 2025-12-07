const fileInput = document.getElementById('fileInput');
const demoButton = document.getElementById('demo-button');
const loadingStatus = document.getElementById('loading-status');
const homeButtonsElement = document.querySelector('.upload-demo-el');
const flashcardSection = document.querySelector('.flashcard-section');
const flashcardContent = document.getElementById('flashcard-content');
const flipFlashcardBtn = document.getElementById('flip-card');
const nextFlashcardBtn = document.getElementById('next-card');
const prevFlashcardBtn = document.getElementById('prev-card');
const shuffleBtn = document.getElementById('shuffle-cards');

lucide.createIcons();

let SQL;
let currentDeck = [];
let currentCardIndex = 0;
let ankiMedia = {};
let isFlipped = false;
let isShuffling = false;

initSqlJs({
    locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
}).then(function(sql){
    SQL = sql;
});

function renderLaTeX(){
    if (window.MathJax){
        MathJax.typesetPromise([flashcardContent]);
    }
}

function processMedia(html){
    let processed = html;
    processed = processed.replace(/<img[^>]*src=["']([^"']+)["'][^>]*>/gi, (match, src) => {
        const filename = src.split('/').pop();
        if (ankiMedia[filename]){
            return match.replace(src, ankiMedia[filename]);
        }
        return match;
    });

    processed = processed.replace(/\[sound:([^\]]+)\]/gi, (match, filename) => {
        if (ankiMedia[filename]){
            return `<audio controls autoplay src="${ankiMedia[filename]}"></audio>`
        }
        return match;
    });

    processed = processed.replace(/\[latex\]/gi, '\\[').replace(/\[\/latex\]/gi, '\\]');
    processed = processed.replace(/\[\$\$\]/gi, '\\[').replace(/\[\/\$\$\]/gi, '\\]');
    processed = processed.replace(/\[\$\]/gi, '\\(').replace(/\[\/\$\]/gi, '\\)');

    return processed;
}

async function loadAnki(file){
    try {
        homeButtonsElement.style.display = 'none';
        const size = (file.size / (1024 * 1024)).toFixed(2);
        loadingStatus.innerHTML = `now loading the deck!<br>loaded deck is ${size} MB`;
        document.title = `openAnki (loading)`;

        const zip = await JSZip.loadAsync(file);
        const ankiCollectionFile = zip.file("collection.anki2");
        if (!ankiCollectionFile){
            loadingStatus.innerHTML = `loaded file isn't an valid anki deck!<br>(or might be corrupt...)`;
            homeButtonsElement.style.display = 'flex';
            return;
        }

        const mediaFile = zip.file("media");
        if (mediaFile){
            const mediaJSON = JSON.parse(await mediaFile.async("text"));
            ankiMedia = {}

            for (const key in mediaJSON){
                const originalFilename = mediaJSON[key];
                const fileInDeck = zip.file(key);

                if (fileInDeck){
                    const blob = await fileInDeck.async("blob");
                    ankiMedia[originalFilename] = URL.createObjectURL(blob);
                }
            }
        }

        const collectionData = await ankiCollectionFile.async("uint8array");
        const ankiCollection = new SQL.Database(collectionData);
        
        const cardQuery = ankiCollection.exec(`
            SELECT
                c.id,
                c.nid,
                n.mid,
                n.flds,
                n.sfld
            FROM cards c
            JOIN notes n ON c.nid = n.id
            `);

        const cardDataRows = cardQuery[0].values;
        const cardColumns = cardQuery[0].columns;

        currentDeck = cardDataRows.map(row => {
            const card = {};
            cardColumns.forEach((col, i) => {
                card[col] = row[i];
            });

            const fields = card.flds.split('\x1f');
            card.Front = fields[0];
            card.Back = fields[1];
            return card;
        });

        loadingStatus.style.display = 'none';
        flashcardSection.style.display = 'block';
        currentCardIndex = 0;
        showCard(currentCardIndex);
        updateTitle();

    } catch (err) {
        console.error(err);
        loadingStatus.innerHTML = `loaded file isn't an valid anki deck!<br>(or might be corrupt...)`;
        document.title = `openAnki (home)`
        homeButtonsElement.style.display = 'flex';
    }
}

function updateTitle(){
    const total = currentDeck.length;
    const current = currentCardIndex + 1;
    if (total > 0){
        document.title = `openAnki (${current}/${total})`;
    } else {
        document.title = `openAnki (home)`;
    }
}

function deckIsFinished(){
    flashcardSection.style.display = 'none';
    homeButtonsElement.style.display = 'flex';
    loadingStatus.style.display = 'block';
    document.title = `openAnki (home)`;
    loadingStatus.innerHTML = `you've reached the end of this deck!`;
}

function showCard(index){
    if (currentDeck.length === 0) return;
    isFlipped = false;
    const card = currentDeck[index];

    flashcardContent.innerHTML = processMedia(card.Front);
    renderLaTeX();
    flipFlashcardBtn.querySelector('span').textContent = 'flip card (to awnser)';
    updateTitle();
}

function flipCard() {
    if (currentDeck.length === 0) return;
    isFlipped = !isFlipped;
    const card = currentDeck[currentCardIndex];

    if (isFlipped){
        flashcardContent.innerHTML = processMedia(card.Back);
        renderLaTeX();
        flipFlashcardBtn.querySelector('span').textContent = 'flip card (to front)';

    } else {
        showCard(currentCardIndex);
    }
}

flipFlashcardBtn.addEventListener('click', () => {
    flipCard();
});

shuffleBtn.addEventListener('click', () => {
    isShuffling = !isShuffling;
    const shuffleIcon = shuffleBtn.querySelector('svg');

    if (isShuffling){
        shuffleIcon.style.filter = "drop-shadow(0 4px 6px #09ff00ff)";
    } else {
        shuffleIcon.style.filter = "";
    }
});

prevFlashcardBtn.addEventListener('click', () => {
    if (currentCardIndex > 0){
        currentCardIndex--;
        showCard(currentCardIndex);
    }
});

nextFlashcardBtn.addEventListener('click', () => {
    if (currentDeck.length === 0) return;
    if (isShuffling){
        let randomIndex = currentCardIndex;
        while (randomIndex === currentCardIndex && currentDeck.length > 1){
            randomIndex = Math.floor(Math.random() * currentDeck.length);
        }
        currentCardIndex = randomIndex;
        showCard(currentCardIndex);
        
    } else {
        if (currentCardIndex < currentDeck.length -1){
            currentCardIndex++;
            showCard(currentCardIndex);
        } else if (currentCardIndex === currentDeck.length - 1){
            deckIsFinished();
        }
    }
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    loadingStatus.textContent = "now loading the deck!"
    loadAnki(file);
});

demoButton.addEventListener('click', async () => {
    homeButtonsElement.style.display = 'none';
    try {
        loadingStatus.textContent = "now loading the deck!"
        const response = await fetch('eg_deck_jp_deck.apkg');
        const file = await response.blob();
        loadAnki(file);
    } catch (err) {
        console.error(err);
    }
});
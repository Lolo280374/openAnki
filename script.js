const fileInput = document.getElementById('fileInput');
const demoButton = document.getElementById('demo-button');
const loadingStatus = document.getElementById('loading-status');
const homeButtonsElement = document.querySelector('.upload-demo-el');

let SQL;
initSqlJs({
    locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
}).then(function(sql){
    SQL = sql;
});

async function loadAnki(file){
    try {
        homeButtonsElement.style.display = 'none';
        const size = (file.size / (1024 * 1024)).toFixed(2);
        loadingStatus.innerHTML = `now loading the deck!<br>loaded deck is ${size} MB`;

        const zip = await JSZip.loadAsync(file);
        const ankiCollectionFile = zip.file("collection.anki2");
        if (!ankiCollectionFile){
            loadingStatus.innerHTML = `loaded file isn't an valid anki deck!<br>(or might be corrupt...)`;
            homeButtonsElement.style.display = 'flex';
            return;
        }

        loadingStatus.innerHTML = `file loaded!<br>loaded deck is ${size} MB`;
    } catch (err) {
        console.error(err);
        loadingStatus.innerHTML = `loaded file isn't an valid anki deck!<br>(or might be corrupt...)`;
        homeButtonsElement.style.display = 'flex';
    }
}

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
console.log("lets write java script");

async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/songs/");
    let response = await a.text();
    // console.log(response)
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1]);
        }
    }
    return songs;
}

async function main() {
    // Get the list of all the songs
    let songs = await getSongs();
    console.log(songs);

    function removeWords(inputString, wordsToRemove) {
        let result = inputString;
        wordsToRemove.forEach((word) => {
            result = result.replaceAll(word, "");
        });
        return result;
    }

    // Assuming you have an array of words to remove
    let wordsToRemove = [
        "%20",
        ".mp3",
        "i (Lyrics) (feat. Arpit Bala%2C ReVo LEKHAK)_GIK0r6WWbDQ",
        " (Official Audio) (320 kbps)",
        " - Raffey - Usama - Ahad (Official Music Video)",
        " - Raffey - Usama - Ahad",
        "%5BTubidy.li%5D V%C3%98J%2C Narvent -",
        "456.cc%5D Roddy Ricch - The Box %5BOfficial Music Video%5D",
        "(4K Music Video)",
        "%5BEn.",
    ];

    let songUl = document
        .querySelector(".songList")
        .getElementsByTagName("ul")[0];
    for (const song of songs) {
        // Remove specified words and update inner HTML
        let sanitizedSong = removeWords(song.replaceAll("%20", " "), wordsToRemove);
        songUl.innerHTML =
            songUl.innerHTML +
            `<li><img class="invert" src="music.svg" alt="">
     <div class="info">
        <div>${sanitizedSong} </div>
        <div>aniket</div>
    </div>
    <div class="playnow">
        <span>Play Now</span>
        <img class="invert" src="play.svg" alt="">
    </div>
    
        
        
        
        
     </li>`;
    }

}

main();

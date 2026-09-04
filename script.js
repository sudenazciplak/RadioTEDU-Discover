const welcome = document.querySelector(".welcome");

let selectedActivity = "";
let selectedTime = "";
let selectedType = "";


/* ==================================================
   AKTİVİTE ANAHTAR KELİMELERİ
================================================== */

const activityKeywords = {

    study: [
        "eğitim",
        "öğrenci",
        "öğrenme",
        "bilim",
        "araştırma",
        "teknoloji",
        "akademi",
        "üniversite",
        "yapay zeka"
    ],

    travel: [
        "şehir",
        "kültür",
        "gezi",
        "seyahat",
        "yaşam",
        "sohbet",
        "müzik"
    ],

    work: [
        "kariyer",
        "iş",
        "girişim",
        "yönetim",
        "liderlik",
        "teknoloji",
        "ekonomi",
        "üretim"
    ],

    sport: [
        "spor",
        "futbol",
        "basketbol",
        "fitness",
        "sağlık",
        "enerji"
    ],

    relax: [
        "sohbet",
        "müzik",
        "kültür",
        "sanat",
        "film",
        "edebiyat"
    ],

    sleep: [
        "hikaye",
        "sohbet",
        "müzik",
        "kültür",
        "edebiyat"
    ]

};


/* ==================================================
   İÇERİK TÜRÜ ANAHTAR KELİMELERİ
================================================== */

const typeKeywords = {

    information: [
        "bilim",
        "araştırma",
        "teknoloji",
        "yapay zeka",
        "ekonomi",
        "eğitim",
        "akademi",
        "bilgi"
    ],

    career: [
        "kariyer",
        "girişim",
        "iş",
        "liderlik",
        "yönetim",
        "başarı",
        "meslek",
        "gelecek"
    ],

    fun: [
        "sohbet",
        "eğlence",
        "hikaye",
        "kültür",
        "sanat",
        "müzik"
    ],

    campus: [
        "üniversite",
        "kampüs",
        "öğrenci",
        "ted",
        "akademi",
        "kulüp"
    ],

    economy: [
        "ekonomi",
        "finans",
        "para",
        "enflasyon",
        "piyasa",
        "asgari",
        "yapay zeka"
    ],

    music: [
        "müzik",
        "şarkı",
        "albüm",
        "sanatçı",
        "rock",
        "jazz"
    ]

};


/* ==================================================
   ANA SAYFA
================================================== */

function showWelcome() {

    welcome.innerHTML = `

        <div class="logo">
            RadioTEDU Discover
        </div>

        <div class="icon">
            🎧
        </div>

        <h1>
            Bugün ne dinlemek istersin?
        </h1>

        <p>
            Ne dinleyeceğine karar veremiyor musun?
            Birkaç soruyu cevapla, RadioTEDU arşivinden
            sana uygun içerikleri bulalım.
        </p>

        <button onclick="showActivity()">
            BAŞLA
        </button>


        <div class="search-section">

            <div class="search-title">
                🔎 Aklında belirli bir konu mu var?
            </div>

            <p class="search-description">
                RadioTEDU podcast arşivinde istediğin konuyu ara.
            </p>

            <div class="search-box">

                <input
                    id="homeSearchInput"
                    type="text"
                    placeholder="Örn. yapay zeka, ekonomi..."
                >

                <button
                    id="homeSearchButton"
                    type="button"
                >
                    Ara
                </button>

            </div>

        </div>

    `;


    const searchInput =
        document.querySelector("#homeSearchInput");

    const searchButton =
        document.querySelector("#homeSearchButton");


    if (searchButton) {

        searchButton.addEventListener(
            "click",
            searchFromHome
        );

    }


    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    searchFromHome();

                }

            }
        );

    }

}


/* ==================================================
   1. SORU - AKTİVİTE
================================================== */

function showActivity() {

    welcome.innerHTML = `

        <button
            class="back-button"
            onclick="showWelcome()"
        >
            ← Geri
        </button>


        <div class="progress">

            <div class="progress-info">

                <span>
                    İlerleme
                </span>

                <span>
                    1 / 3
                </span>

            </div>


            <div class="progress-bar">

                <div
                    class="progress-fill"
                    style="width: 33%"
                ></div>

            </div>

        </div>


        <h1>
            Şu an ne yapıyorsun?
        </h1>


        <p>
            Dinleme deneyimini bulunduğun duruma göre
            kişiselleştirelim.
        </p>


        <div class="options">


            <button
                class="${selectedActivity === 'study' ? 'selected' : ''}"
                onclick="selectActivity(this, 'study')"
            >
                📚 Ders çalışıyorum
            </button>


            <button
                class="${selectedActivity === 'travel' ? 'selected' : ''}"
                onclick="selectActivity(this, 'travel')"
            >
                🚶 Yoldayım / dışarıdayım
            </button>


            <button
                class="${selectedActivity === 'work' ? 'selected' : ''}"
                onclick="selectActivity(this, 'work')"
            >
                💻 Çalışıyorum / üretiyorum
            </button>


            <button
                class="${selectedActivity === 'sport' ? 'selected' : ''}"
                onclick="selectActivity(this, 'sport')"
            >
                🏃 Spor yapıyorum
            </button>


            <button
                class="${selectedActivity === 'relax' ? 'selected' : ''}"
                onclick="selectActivity(this, 'relax')"
            >
                ☕ Dinleniyorum
            </button>


            <button
                class="${selectedActivity === 'sleep' ? 'selected' : ''}"
                onclick="selectActivity(this, 'sleep')"
            >
                🌙 Uyumadan önceyim
            </button>


        </div>

    `;

}


/* ==================================================
   AKTİVİTE SEÇ
================================================== */

function selectActivity(button, activity) {

    selectedActivity = activity;


    document
        .querySelectorAll(".options button")
        .forEach(function (btn) {

            btn.classList.remove("selected");

        });


    button.classList.add("selected");


    setTimeout(
        showTime,
        250
    );

}


/* ==================================================
   2. SORU - SÜRE
================================================== */

function showTime() {

    welcome.innerHTML = `

        <button
            class="back-button"
            onclick="showActivity()"
        >
            ← Geri
        </button>


        <div class="progress">

            <div class="progress-info">

                <span>
                    İlerleme
                </span>

                <span>
                    2 / 3
                </span>

            </div>


            <div class="progress-bar">

                <div
                    class="progress-fill"
                    style="width: 66%"
                ></div>

            </div>

        </div>


        <h1>
            Ne kadar vaktin var?
        </h1>


        <p>
            Dinleme süresine göre seçeneklerini
            daraltalım.
        </p>


        <div class="options">


            <button
                class="${selectedTime === 'short' ? 'selected' : ''}"
                onclick="selectTime(this, 'short')"
            >
                ⏱️ 10–15 dakika
            </button>


            <button
                class="${selectedTime === 'medium' ? 'selected' : ''}"
                onclick="selectTime(this, 'medium')"
            >
                ⏱️ 20–30 dakika
            </button>


            <button
                class="${selectedTime === 'long' ? 'selected' : ''}"
                onclick="selectTime(this, 'long')"
            >
                ⏱️ 30–60 dakika
            </button>


            <button
                class="${selectedTime === 'very-long' ? 'selected' : ''}"
                onclick="selectTime(this, 'very-long')"
            >
                ⏱️ 1 saatten fazla
            </button>


        </div>

    `;

}


/* ==================================================
   SÜRE SEÇ
================================================== */

function selectTime(button, time) {

    selectedTime = time;


    document
        .querySelectorAll(".options button")
        .forEach(function (btn) {

            btn.classList.remove("selected");

        });


    button.classList.add("selected");


    setTimeout(
        showType,
        250
    );

}


/* ==================================================
   3. SORU - İÇERİK TÜRÜ
================================================== */

function showType() {

    welcome.innerHTML = `

        <button
            class="back-button"
            onclick="showTime()"
        >
            ← Geri
        </button>


        <div class="progress">

            <div class="progress-info">

                <span>
                    İlerleme
                </span>

                <span>
                    3 / 3
                </span>

            </div>


            <div class="progress-bar">

                <div
                    class="progress-fill"
                    style="width: 100%"
                ></div>

            </div>

        </div>


        <h1>
            Bugün ne tarz bir şey dinlemek istersin?
        </h1>


        <p>
            İlgi alanına en uygun içerikleri bulalım.
        </p>


        <div class="options">


            <button
                class="${selectedType === 'information' ? 'selected' : ''}"
                onclick="selectType(this, 'information')"
            >
                🧠 Bilgilendirici
            </button>


            <button
                class="${selectedType === 'career' ? 'selected' : ''}"
                onclick="selectType(this, 'career')"
            >
                🚀 Kariyer / gelecek
            </button>


            <button
                class="${selectedType === 'fun' ? 'selected' : ''}"
                onclick="selectType(this, 'fun')"
            >
                🎙️ Sohbet / eğlence
            </button>


            <button
                class="${selectedType === 'campus' ? 'selected' : ''}"
                onclick="selectType(this, 'campus')"
            >
                🎓 Üniversite / kampüs
            </button>


            <button
                class="${selectedType === 'economy' ? 'selected' : ''}"
                onclick="selectType(this, 'economy')"
            >
                📈 Ekonomi / gündem
            </button>


            <button
                class="${selectedType === 'music' ? 'selected' : ''}"
                onclick="selectType(this, 'music')"
            >
                🎵 Müzik
            </button>


        </div>

    `;

}


/* ==================================================
   TÜR SEÇ
================================================== */

function selectType(button, type) {

    selectedType = type;


    document
        .querySelectorAll(".options button")
        .forEach(function (btn) {

            btn.classList.remove("selected");

        });


    button.classList.add("selected");


    setTimeout(
        showResults,
        250
    );

}


/* ==================================================
   PODCAST METNİ
================================================== */

function getPodcastText(podcast) {

    return `

        ${podcast.title || ""}

        ${podcast.author || ""}

        ${podcast.series || ""}

        ${podcast.description || ""}

        ${(podcast.keywords || []).join(" ")}

    `.toLocaleLowerCase("tr-TR");

}


/* ==================================================
   ANAHTAR KELİME EŞLEŞTİRME
================================================== */

function keywordMatches(text, keywords) {

    return keywords.filter(function (keyword) {

        return text.includes(
            keyword.toLocaleLowerCase("tr-TR")
        );

    }).length;

}


/* ==================================================
   ÖNERİ PUANI
================================================== */

function calculateScore(podcast) {

    const title =
        (podcast.title || "")
            .toLocaleLowerCase("tr-TR");


    const description =
        (podcast.description || "")
            .toLocaleLowerCase("tr-TR");


    const series =
        (podcast.series || "")
            .toLocaleLowerCase("tr-TR");


    const keywords =
        (podcast.keywords || [])
            .map(function (keyword) {

                return keyword.toLocaleLowerCase("tr-TR");

            });


    const activityWords =
        activityKeywords[selectedActivity] || [];


    const typeWords =
        typeKeywords[selectedType] || [];


    let score = 0;


    /* AKTİVİTE EŞLEŞMESİ */

    activityWords.forEach(function (word) {

        const keyword =
            word.toLocaleLowerCase("tr-TR");


        if (title.includes(keyword)) {

            score += 3;

        }


        if (
            keywords.some(function (item) {

                return item.includes(keyword);

            })
        ) {

            score += 2;

        }


        if (series.includes(keyword)) {

            score += 2;

        }


        if (description.includes(keyword)) {

            score += 1;

        }

    });


    /* İÇERİK TÜRÜ EŞLEŞMESİ */

    typeWords.forEach(function (word) {

        const keyword =
            word.toLocaleLowerCase("tr-TR");


        if (title.includes(keyword)) {

            score += 5;

        }


        if (
            keywords.some(function (item) {

                return item.includes(keyword);

            })
        ) {

            score += 4;

        }


        if (series.includes(keyword)) {

            score += 3;

        }


        if (description.includes(keyword)) {

            score += 2;

        }

    });


    return score;

}


/* ==================================================
   SONUÇ ÇEŞİTLENDİRME
================================================== */

function diversifyResults(
    results,
    maxPerSeries = 2
) {

    const seriesCounts = {};

    const diversified = [];


    for (const item of results) {

        const series =
            item.podcast.series ||
            "Diğer";


        if (!seriesCounts[series]) {

            seriesCounts[series] = 0;

        }


        if (
            seriesCounts[series] >= maxPerSeries
        ) {

            continue;

        }


        seriesCounts[series]++;


        diversified.push(item);


        if (diversified.length >= 5) {

            break;

        }

    }


    return diversified;

}


/* ==================================================
   ÖNERİ NEDENLERİ
================================================== */

function createReasons(podcast) {

    const title =
        (podcast.title || "")
            .toLocaleLowerCase("tr-TR");


    const description =
        (podcast.description || "")
            .toLocaleLowerCase("tr-TR");


    const series =
        (podcast.series || "")
            .toLocaleLowerCase("tr-TR");


    const keywords =
        (podcast.keywords || [])
            .map(function (keyword) {

                return keyword.toLocaleLowerCase("tr-TR");

            });


    const reasons = [];


    const activityWords =
        activityKeywords[selectedActivity] || [];


    let activityPoints = 0;


    activityWords.forEach(function (word) {

        const keyword =
            word.toLocaleLowerCase("tr-TR");


        if (title.includes(keyword)) {

            activityPoints += 3;

        }


        if (
            keywords.some(function (item) {

                return item.includes(keyword);

            })
        ) {

            activityPoints += 2;

        }


        if (series.includes(keyword)) {

            activityPoints += 2;

        }


        if (description.includes(keyword)) {

            activityPoints += 1;

        }

    });


    if (activityPoints > 0) {

        reasons.push({

            text:
                "Seçtiğin aktiviteyle uyumlu",

            points:
                activityPoints

        });

    }


    const typeWords =
        typeKeywords[selectedType] || [];


    let typePoints = 0;


    typeWords.forEach(function (word) {

        const keyword =
            word.toLocaleLowerCase("tr-TR");


        if (title.includes(keyword)) {

            typePoints += 5;

        }


        if (
            keywords.some(function (item) {

                return item.includes(keyword);

            })
        ) {

            typePoints += 4;

        }


        if (series.includes(keyword)) {

            typePoints += 3;

        }


        if (description.includes(keyword)) {

            typePoints += 2;

        }

    });


    if (typePoints > 0) {

        reasons.push({

            text:
                "İstediğin içerik türüyle güçlü eşleşme",

            points:
                typePoints

        });

    }


    const allSelectedWords = [

        ...activityWords,

        ...typeWords

    ];


    let titleMatch = false;


    allSelectedWords.forEach(function (word) {

        const keyword =
            word.toLocaleLowerCase("tr-TR");


        if (title.includes(keyword)) {

            titleMatch = true;

        }

    });


    if (titleMatch) {

        reasons.push({

            text:
                "Başlığında seçiminle ilişkili bir konu bulunuyor",

            points:
                5

        });

    }


    if (
        keywords.length > 0 &&
        (
            activityPoints > 0 ||
            typePoints > 0
        )
    ) {

        reasons.push({

            text:
                "Podcast konu etiketleriyle eşleşiyor",

            points:
                4

        });

    }


    if (reasons.length === 0) {

        reasons.push({

            text:
                "RadioTEDU arşivinden keşfedilmeye değer bir içerik",

            points:
                0

        });

    }


    reasons.sort(function (a, b) {

        return b.points - a.points;

    });


    return reasons.slice(0, 3);

}


/* ==================================================
   SEÇİMLERİ METNE ÇEVİR
================================================== */

function getSelectionDescription() {

    const activityTexts = {

        study:
            "ders çalışırken",

        travel:
            "yoldayken",

        work:
            "çalışırken",

        sport:
            "spor yaparken",

        relax:
            "dinlenirken",

        sleep:
            "uyumadan önce"

    };


    const typeTexts = {

        information:
            "bilgilendirici",

        career:
            "kariyer odaklı",

        fun:
            "sohbet ve eğlence",

        campus:
            "üniversite ve kampüs",

        economy:
            "ekonomi ve gündem",

        music:
            "müzik"

    };


    return {

        activity:
            activityTexts[selectedActivity] ||
            "şu anda",

        type:
            typeTexts[selectedType] ||
            "ilgi alanına uygun"

    };

}


/* ==================================================
   ÖNERİ SONUÇ SAYFASI
================================================== */

function showResults() {

    welcome.innerHTML = `

        <div class="logo">
            RadioTEDU Discover
        </div>


        <button
            class="back-button"
            onclick="showType()"
        >
            ← Geri
        </button>


        <h1>
            Sana uygun içerikler 🎧
        </h1>


        <p>
            Seçimlerine göre RadioTEDU arşivinden
            en güçlü eşleşmeleri bulduk.
        </p>


        <div
            id="results"
            class="results"
        >

            <p>
                İçerikler aranıyor...
            </p>

        </div>


        <button
            onclick="showWelcome()"
        >
            Baştan Başla
        </button>

    `;


    displayResults();

}


/* ==================================================
   ÖNERİLERİ GÖSTER
================================================== */

function displayResults() {

    const resultsContainer =
        document.querySelector("#results");


    if (!resultsContainer) {

        return;

    }


    if (
        typeof podcasts === "undefined" ||
        !Array.isArray(podcasts)
    ) {

        resultsContainer.innerHTML = `

            <div class="result-card">

                <h2>
                    Podcast verileri bulunamadı.
                </h2>

                <p>
                    podcast.js dosyasının
                    yüklendiğinden emin ol.
                </p>

            </div>

        `;

        return;

    }


    const scoredPodcasts = podcasts

        .map(function (podcast) {

            return {

                podcast:
                    podcast,

                score:
                    calculateScore(podcast)

            };

        })


        .filter(function (item) {

            return item.score > 0;

        })


        .sort(function (a, b) {

            return b.score - a.score;

        });


    const diversePodcasts =
        diversifyResults(
            scoredPodcasts,
            2
        );


    const selectionDescription =
        getSelectionDescription();


    if (
        diversePodcasts.length === 0
    ) {

        resultsContainer.innerHTML = `

            <div class="result-card">

                <h2>
                    Henüz güçlü bir eşleşme bulamadık.
                </h2>

                <p>
                    Ana sayfaya dönüp farklı seçimler
                    deneyebilirsin.
                </p>

            </div>

        `;

        return;

    }


    const recommendationIntro = `

        <div class="recommendation-intro">

            <div class="recommendation-icon">
                🎧
            </div>

            <h2>
                Senin için seçtik
            </h2>

            <p>
                ${selectionDescription.activity}
                dinleyebileceğin
                ${selectionDescription.type}
                içerikleri bulduk.
            </p>

        </div>

    `;


    resultsContainer.innerHTML =
        recommendationIntro +

        diversePodcasts

            .map(function (item, index) {

                const podcast =
                    item.podcast;


                const reasons =
                    createReasons(podcast);


                const reasonList =
                    reasons

                        .map(function (reason) {

                            if (
                                reason.points > 0
                            ) {

                                return `

                                    <li>

                                        ${reason.text}

                                        <strong>
                                            (+${reason.points})
                                        </strong>

                                    </li>

                                `;

                            }


                            return `

                                <li>
                                    ${reason.text}
                                </li>

                            `;

                        })

                        .join("");


                return `

                    <div class="result-card">


                        ${
                            index === 0

                                ? `

                                    <div
                                        class="recommendation-label"
                                    >
                                        ⭐ En güçlü eşleşme
                                    </div>

                                  `

                                : ""

                        }


                        <h2>

                            ${
                                podcast.title ||
                                "Başlıksız Podcast"
                            }

                        </h2>


                        ${
                            podcast.series

                                ? `

                                    <p
                                        class="author"
                                    >
                                        ${podcast.series}
                                    </p>

                                  `

                                : ""

                        }


                        ${
                            podcast.date

                                ? `

                                    <p>
                                        📅
                                        ${podcast.date}
                                    </p>

                                  `

                                : ""

                        }


                        <div class="score">

                            Eşleşme puanı:
                            ${item.score}

                        </div>


                        <p>

                            ${
                                podcast.description ||

                                "Bu bölüm hakkında açıklama bulunamadı."
                            }

                        </p>


                        <h3>
                            Neden önerdik?
                        </h3>


                        <ul>
                            ${reasonList}
                        </ul>


                        <button
                            type="button"
                            onclick='openPodcast(${JSON.stringify(podcast.url)})'
                        >
                            Bölümü Dinle →
                        </button>


                    </div>

                `;

            })

            .join("");

}


/* ==================================================
   PODCAST AÇ
================================================== */

function openPodcast(url) {

    if (!url) {

        return;

    }


    window.open(
        url,
        "_blank"
    );

}


/* ==================================================
   ANA SAYFADAN ARAMA
================================================== */

function searchFromHome() {

    const input = document.querySelector("#homeSearchInput");

    if (!input) {
        return;
    }

    const query = input.value
        .trim()
        .toLocaleLowerCase("tr-TR");

    if (!query) {
        input.focus();
        return;
    }

    if (
        typeof podcasts === "undefined" ||
        !Array.isArray(podcasts)
    ) {
        return;
    }


    // Kullanıcının yazdığı kelimeleri ayır
    const queryWords = query
        .split(/\s+/)
        .filter(function (word) {
            return word.length > 1;
        });


    const results = podcasts

        .map(function (podcast) {

            const title = (podcast.title || "")
                .toLocaleLowerCase("tr-TR");

            const description = (podcast.description || "")
                .toLocaleLowerCase("tr-TR");

            const series = (podcast.series || "")
                .toLocaleLowerCase("tr-TR");

            const keywords = (podcast.keywords || [])
                .join(" ")
                .toLocaleLowerCase("tr-TR");


            let score = 0;

            let matchedWords = [];


            /*
             * 1. TAM İFADE
             *
             * Örneğin:
             * "yapay zeka"
             */
            if (title.includes(query)) {
                score += 20;
            }

            if (keywords.includes(query)) {
                score += 15;
            }

            if (series.includes(query)) {
                score += 10;
            }

            if (description.includes(query)) {
                score += 8;
            }


            /*
             * 2. TEK TEK KELİMELER
             */
            queryWords.forEach(function (word) {

                let matched = false;


                // Başlık
                if (title.includes(word)) {
                    score += 8;
                    matched = true;
                }


                // Anahtar kelimeler
                if (keywords.includes(word)) {
                    score += 6;
                    matched = true;
                }


                // Seri
                if (series.includes(word)) {
                    score += 4;
                    matched = true;
                }


                // Açıklama
                if (description.includes(word)) {
                    score += 3;
                    matched = true;
                }


                if (matched) {
                    matchedWords.push(word);
                }

            });


            /*
             * 3. BAŞLIKTA BAŞLAMASI
             */
            if (
                title.startsWith(query)
            ) {
                score += 10;
            }


            /*
             * 4. BÜTÜN KELİMELER BULUNDUYSA
             */
            if (
                queryWords.length > 1 &&
                matchedWords.length === queryWords.length
            ) {
                score += 10;
            }


            return {

                podcast: podcast,

                score: score,

                matchedWords: matchedWords

            };

        })


        // Hiç eşleşmeyenleri kaldır
        .filter(function (item) {

            return item.score > 0;

        })


        // En yüksek puanlı sonuçlar önce
        .sort(function (a, b) {

            return b.score - a.score;

        });


    /*
     * Aynı seriden gelen sonuçların tamamını
     * üst üste göstermemek için çeşitlendirme.
     */
    const finalResults = [];

    const usedSeries = {};


    for (
        let i = 0;
        i < results.length;
        i++
    ) {

        const item = results[i];

        const seriesName =
            item.podcast.series ||
            "Bilinmeyen Seri";


        /*
         * İlk aşamada aynı seriden
         * yalnızca 2 sonuç al.
         */
        if (
            usedSeries[seriesName] &&
            usedSeries[seriesName] >= 2
        ) {
            continue;
        }


        finalResults.push(item);


        if (
            usedSeries[seriesName]
        ) {

            usedSeries[seriesName]++;

        } else {

            usedSeries[seriesName] = 1;

        }


        if (
            finalResults.length >= 6
        ) {
            break;
        }

    }


    /*
     * Eğer yeterli çeşitlilik bulunamadıysa,
     * kalan en iyi sonuçları tamamla.
     */
    if (
        finalResults.length < 6
    ) {

        for (
            let i = 0;
            i < results.length;
            i++
        ) {

            const item = results[i];

            const alreadyExists =
                finalResults.some(function (result) {

                    return (
                        result.podcast.url ===
                        item.podcast.url
                    );

                });


            if (!alreadyExists) {

                finalResults.push(item);

            }


            if (
                finalResults.length >= 6
            ) {
                break;
            }

        }

    }


    showSearchResults(
        finalResults,
        query
    );

}


/* ==================================================
   ARAMA SONUÇLARI
================================================== */

function showSearchResults(
    results,
    query
) {

    welcome.innerHTML = `

        <div class="logo">
            RadioTEDU Discover
        </div>


        <button
            class="back-button"
            onclick="showWelcome()"
        >
            ← Ana Sayfa
        </button>


        <h1>
            🔎 "${query}" için sonuçlar
        </h1>


        <p>
            RadioTEDU podcast arşivinde bulduğumuz
            en uygun içerikler:
        </p>


        <div
            id="results"
            class="results"
        ></div>

    `;


    const resultsContainer =
        document.querySelector("#results");


    if (!resultsContainer) {

        return;

    }


    if (
        results.length === 0
    ) {

        resultsContainer.innerHTML = `

            <div class="result-card">

                <h2>
                    "${query}" için sonuç bulunamadı.
                </h2>

                <p>
                    Farklı bir anahtar kelime
                    deneyebilirsin.
                </p>

            </div>

        `;

        return;

    }


    resultsContainer.innerHTML =

        results

            .map(function (item) {

                const podcast =
                    item.podcast;


                return `

                    <div class="result-card">

                        <h2>

                            ${
                                podcast.title ||
                                "Başlıksız Podcast"
                            }

                        </h2>


                        ${
                            podcast.series

                                ? `

                                    <p
                                        class="author"
                                    >
                                        ${podcast.series}
                                    </p>

                                  `

                                : ""

                        }


                        ${
                            podcast.date

                                ? `

                                    <p>
                                        📅
                                        ${podcast.date}
                                    </p>

                                  `

                                : ""

                        }


                        <div class="score">

                            Arama eşleşmesi:
                            ${item.score}

                        </div>


                        <p>

                            ${
                                podcast.description ||
                                "Açıklama bulunamadı."
                            }

                        </p>


                        <button
                            type="button"
                            onclick='openPodcast(${JSON.stringify(podcast.url)})'
                        >
                            Bölümü Dinle →
                        </button>

                    </div>

                `;

            })

            .join("");

}


/* ==================================================
   UYGULAMAYI BAŞLAT
================================================== */

showWelcome();
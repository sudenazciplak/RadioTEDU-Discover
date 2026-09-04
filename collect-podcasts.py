import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import json
import re
import time


BASE_URL = "https://radiotedu.com"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/153.0.0.0 Safari/537.36"
    )
}

session = requests.Session()
session.headers.update(HEADERS)


def get_soup(url):
    try:
        response = session.get(url, timeout=20)
        response.raise_for_status()

        soup = BeautifulSoup(
            response.content,
            "html.parser",
            from_encoding="utf-8"
        )

        return soup

    except requests.RequestException as error:
        print()
        print("Sayfa alınamadı:")
        print(url)
        print("Hata:", error)
        print()

        return None


def clean_text(text):
    if not text:
        return ""

    text = text.replace("\xa0", " ")
    text = re.sub(r"\s+", " ", text)

    return text.strip()


# --------------------------------------------------
# PODCAST SERİLERİNİ BUL
# --------------------------------------------------

def find_series_pages():

    series_pages = set()

    list_pages = [
        f"{BASE_URL}/podcastler/",
        f"{BASE_URL}/podcastler/page/2/"
    ]

    print()
    print("=" * 50)
    print("PODCAST SERİLERİ BULUNUYOR")
    print("=" * 50)

    for page_url in list_pages:

        print()
        print("Taranıyor:")
        print(page_url)

        soup = get_soup(page_url)

        if soup is None:
            continue

        for link in soup.find_all("a", href=True):

            href = urljoin(
                BASE_URL,
                link["href"]
            )

            if "/podcastler/" in href:

                clean_url = href.rstrip("/")

                if clean_url not in [
                    f"{BASE_URL}/podcastler",
                    f"{BASE_URL}/podcastler/page/2"
                ]:

                    series_pages.add(clean_url)

        time.sleep(0.5)

    return sorted(series_pages)


# --------------------------------------------------
# PODCAST BÖLÜMLERİNİ BUL
# --------------------------------------------------

def find_episode_urls(series_pages):

    episode_urls = set()

    print()
    print("=" * 50)
    print("PODCAST BÖLÜMLERİ BULUNUYOR")
    print("=" * 50)

    for index, series_url in enumerate(
        series_pages,
        start=1
    ):

        print()
        print(
            f"[{index}/{len(series_pages)}]"
        )

        print(series_url)

        soup = get_soup(series_url)

        if soup is None:
            continue

        for link in soup.find_all(
            "a",
            href=True
        ):

            href = urljoin(
                BASE_URL,
                link["href"]
            )

            if "/podcast-bolumu/" in href:

                episode_urls.add(
                    href.rstrip("/")
                )

        time.sleep(0.5)

    return sorted(episode_urls)


# --------------------------------------------------
# BAŞLIK BUL
# --------------------------------------------------

def find_title(soup):

    h1 = soup.find("h1")

    if h1:

        title = clean_text(
            h1.get_text(
                " ",
                strip=True
            )
        )

        if title:
            return title

    if soup.title:

        title = clean_text(
            soup.title.get_text(
                " ",
                strip=True
            )
        )

        title = re.sub(
            r"\s*[-–—]\s*RadioTEDU.*$",
            "",
            title,
            flags=re.IGNORECASE
        )

        return title.strip()

    return "Bilinmeyen Podcast"


# --------------------------------------------------
# AÇIKLAMA BUL
# --------------------------------------------------

def find_description(soup):

    bad_phrases = [

        "favorilerini kaydet",

        "dinlediklerin seninle kalsın",

        "tekrar hoş geldin",

        "aylık abone ol",

        "radiotedu aylık",

        "günlük posta"

    ]

    candidates = []

    containers = [

        soup.find("article"),

        soup.find("main"),

        soup.find(
            class_=re.compile(
                r"entry-content|podcast.*content|episode.*content",
                re.IGNORECASE
            )
        )

    ]

    for container in containers:

        if container is None:
            continue

        for paragraph in container.find_all("p"):

            text = clean_text(
                paragraph.get_text(
                    " ",
                    strip=True
                )
            )

            if len(text) < 80:
                continue

            lower_text = text.lower()

            if any(
                phrase in lower_text
                for phrase in bad_phrases
            ):
                continue

            if text not in candidates:

                candidates.append(text)

    preferred_words = [

        "podcast",

        "bölümünde",

        "bu bölüm",

        "konularından",

        "konusunda",

        "sorular yönelttiler"

    ]

    for text in candidates:

        lower_text = text.lower()

        if any(
            word in lower_text
            for word in preferred_words
        ):

            return text

    if candidates:

        return candidates[0]

    # Son çare olarak Open Graph açıklamasını kullan
    meta = soup.find(
        "meta",
        attrs={
            "property": "og:description"
        }
    )

    if meta:

        content = clean_text(
            meta.get(
                "content",
                ""
            )
        )

        if (
            len(content) > 40
            and not any(
                phrase in content.lower()
                for phrase in bad_phrases
            )
        ):

            return content

    return ""


# --------------------------------------------------
# TARİH BUL
# --------------------------------------------------

def find_date(soup):

    meta_properties = [

        "article:published_time",

        "date",

        "pubdate"

    ]

    for property_name in meta_properties:

        tag = soup.find(
            "meta",
            attrs={
                "property": property_name
            }
        )

        if tag is None:

            tag = soup.find(
                "meta",
                attrs={
                    "name": property_name
                }
            )

        if tag:

            value = tag.get(
                "content",
                ""
            )

            match = re.search(
                r"(\d{2})[./-](\d{2})[./-](\d{4})",
                value
            )

            if match:

                day, month, year = match.groups()

                return (
                    f"{day}.{month}.{year}"
                )

    page_text = clean_text(
        soup.get_text(
            " ",
            strip=True
        )
    )

    match = re.search(
        r"\b(\d{2})[./-](\d{2})[./-](\d{4})\b",
        page_text
    )

    if match:

        day, month, year = match.groups()

        return (
            f"{day}.{month}.{year}"
        )

    return ""


# --------------------------------------------------
# SERİ BUL
# --------------------------------------------------

def find_series(soup):

    possible_series = []

    for link in soup.find_all(
        "a",
        href=True
    ):

        href = link["href"]

        if "/podcastler/" in href:

            text = clean_text(
                link.get_text(
                    " ",
                    strip=True
                )
            )

            if (
                text
                and len(text) < 100
            ):

                possible_series.append(text)

    if possible_series:

        return possible_series[0]

    return ""


# --------------------------------------------------
# ANAHTAR KELİMELER
# --------------------------------------------------

STOP_WORDS = {

    "ve",
    "ile",
    "bir",
    "bu",
    "da",
    "de",
    "için",
    "olan",
    "olarak",
    "çok",
    "daha",
    "nasıl",
    "neden",
    "üzerine",
    "gibi",

    "the",
    "and",
    "of",
    "to",
    "in",
    "for"

}


def create_keywords(
    title,
    description
):

    text = (
        title
        + " "
        + description
    ).lower()

    words = re.findall(
        r"[a-zA-ZçğıöşüÇĞİÖŞÜ0-9]+",
        text
    )

    keywords = []

    for word in words:

        word = word.lower()

        if len(word) < 3:
            continue

        if word in STOP_WORDS:
            continue

        if word not in keywords:

            keywords.append(word)

    return keywords[:30]


# --------------------------------------------------
# TEK PODCAST ÇEK
# --------------------------------------------------

def scrape_episode(url):

    soup = get_soup(url)

    if soup is None:
        return None

    title = find_title(soup)

    description = find_description(
        soup
    )

    date = find_date(
        soup
    )

    series = find_series(
        soup
    )

    keywords = create_keywords(
        title,
        description
    )

    return {

        "title": title,

        "author": "",

        "series": series,

        "date": date,

        "description": description,

        "keywords": keywords,

        "url": url

    }


# --------------------------------------------------
# JAVASCRIPT DOSYASI OLUŞTUR
# --------------------------------------------------

def create_javascript_file(
    podcasts
):

    with open(
        "podcast.js",
        "w",
        encoding="utf-8"
    ) as file:

        file.write(
            "const podcasts = "
        )

        file.write(
            json.dumps(
                podcasts,
                ensure_ascii=False,
                indent=4
            )
        )

        file.write(
            ";\n"
        )


# --------------------------------------------------
# JSON DOSYASI OLUŞTUR
# --------------------------------------------------

def create_json_file(
    podcasts
):

    with open(
        "podcasts.json",
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            podcasts,
            file,
            ensure_ascii=False,
            indent=4
        )


# --------------------------------------------------
# ANA PROGRAM
# --------------------------------------------------

def main():

    print()
    print("=" * 60)

    print(
        "RADIO TEDU DISCOVER"
    )

    print(
        "Podcast Veri Toplama Sistemi"
    )

    print("=" * 60)

    print()

    # Podcast serilerini bul

    series_pages = (
        find_series_pages()
    )

    print()

    print(
        "Bulunan podcast serisi:",
        len(series_pages)
    )

    # Podcast bölümlerini bul

    episode_urls = (
        find_episode_urls(
            series_pages
        )
    )

    print()

    print(
        "Bulunan podcast bölümü:",
        len(episode_urls)
    )

    # Podcast bilgilerini çek

    podcasts = []

    print()

    print("=" * 50)

    print(
        "PODCAST BİLGİLERİ ÇEKİLİYOR"
    )

    print("=" * 50)

    for index, url in enumerate(
        episode_urls,
        start=1
    ):

        print()

        print(
            f"[{index}/{len(episode_urls)}]"
        )

        podcast = scrape_episode(
            url
        )

        if podcast:

            podcasts.append(
                podcast
            )

            print(
                "✓",
                podcast["title"]
            )

        else:

            print(
                "✗ Podcast alınamadı"
            )

        time.sleep(0.5)

    # Dosyaları oluştur

    create_javascript_file(
        podcasts
    )

    create_json_file(
        podcasts
    )

    print()

    print("=" * 60)

    print("BAŞARILI!")

    print("=" * 60)

    print()

    print(
        "podcast.js oluşturuldu."
    )

    print(
        "podcasts.json oluşturuldu."
    )

    print(
        "Toplam podcast:",
        len(podcasts)
    )

    print()

    print(
        "Türkçe karakterler UTF-8 olarak kaydedildi."
    )

    print()

    print(
        "Süre alanı kaldırıldı; yanlış 0:00 verisi üretilmeyecek."
    )

    print()

    print(
        "RadioTEDU Discover gerçek podcast "
        "verilerini kullanabilir."
    )

    print()


if __name__ == "__main__":

    main()
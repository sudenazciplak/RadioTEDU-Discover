# RadioTEDU Discover 🎧

RadioTEDU içerikleri arasında kullanıcıların ilgi alanlarına ve dinleme amaçlarına göre kişiselleştirilmiş podcast önerileri sunan bir web prototipidir.

## 🎯 Projenin Amacı

RadioTEDU'da çok sayıda podcast ve bölüm bulunuyor. Ancak kullanıcı her zaman ne dinlemek istediğini veya hangi bölümü seçmesi gerektiğini bilmiyor.

RadioTEDU Discover, kullanıcıya birkaç kısa soru sorarak uygun içerikleri keşfetmesini kolaylaştırmayı amaçlar.

## 💡 Nasıl Çalışır?

Kullanıcı üç soruyu cevaplar:

1. Şu an ne yapıyorsun?
2. Ne kadar vaktin var?
3. Ne tarz bir içerik dinlemek istiyorsun?

Bu cevaplar doğrultusunda RadioTEDU podcast içerikleri analiz edilir ve kullanıcıya uygun bölümler önerilir.

Ayrıca kullanıcı belirli bir konu veya kelime yazarak podcastler arasında arama yapabilir.

## 🛠️ Kullanılan Teknolojiler

- HTML
- CSS
- JavaScript
- Python
- BeautifulSoup
- Requests

## 📊 Veri Toplama

RadioTEDU'nun podcast sayfalarındaki içerikler Python ile taranarak podcast bölümlerine ait bilgiler yapılandırılmış bir veri setine dönüştürülmüştür.

Toplanan bilgiler arasında:

- Podcast başlığı
- Seri
- Yayın tarihi
- Açıklama
- Anahtar kelimeler
- Bölüm bağlantısı

bulunmaktadır.

## 📱 Tasarım

Proje mobil öncelikli olarak tasarlanmıştır.

Telefon ekranlarında kolay kullanılabilmesi için:

- Tek sütunlu seçim ekranları
- Büyük dokunmatik butonlar
- Basit ve anlaşılır kullanıcı akışı
- Responsive tasarım

kullanılmıştır.

## 🚀 Gelecekte Eklenebilecekler

Projenin geliştirilmesi için ileride:

- Kullanıcı davranışlarına göre daha gelişmiş öneri sistemi
- Podcast bölümlerinin sürelerine göre filtreleme
- Bölüm içerisindeki belirli konulara doğrudan yönlendirme
- Daha gelişmiş doğal dil ile arama
- Kullanıcı tercihlerini hatırlayan kişiselleştirme sistemi

eklenebilir.

## ▶️ Çalıştırma

Projeyi çalıştırmak için repository dosyalarını bilgisayara indirin ve `index.html` dosyasını bir web sunucusu üzerinden çalıştırın.

Örneğin VS Code içerisindeki Live Server kullanılabilir.

## 📁 Proje Yapısı

```text
RadioTEDU-Discover/
│
├── index.html
├── style.css
├── script.js
├── podcast.js
├── podcasts.json
└── collect-podcasts.py

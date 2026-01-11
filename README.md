# AreUMine - Romantik Soru Web Sitesi

Bu proje, "Benimle sevgili olur musun?" sorusunu soran interaktif ve romantik bir web sitesidir.

## Özellikler

- 🎯 İnteraktif soru kartı
- 🎈 "Hayır" butonu tıklandığında rastgele konuma hareket eder
- 🎉 "Evet" butonuna tıklandığında konfeti animasyonu
- 🎬 Romantik arka plan video desteği
- 🎵 Arka plan müzik çalar (çoklu şarkı desteği)
- ✨ Romantik animasyonlar ve efektler
- 📱 Responsive tasarım (mobil uyumlu)

## Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

3. Tarayıcınızda `http://localhost:5173` adresini açın

## Müzik ve Video Ekleme

### Müzik Ekleme

1. Müzik dosyalarınızı `src/assets/music/` klasörüne kopyalayın
2. `src/App.tsx` dosyasını açın
3. Müzik dosyalarını import edin:
```typescript
import song1 from './assets/music/song1.mp3';
import song2 from './assets/music/song2.mp3';
```
4. `songs` array'ine ekleyin:
```typescript
const songs: Song[] = [
  { title: 'Şarkı Adı 1', url: song1 },
  { title: 'Şarkı Adı 2', url: song2 },
];
```

### Video Ekleme (Opsiyonel)

1. Video dosyanızı `src/assets/videos/` klasörüne kopyalayın
2. `src/App.tsx` dosyasını açın
3. Video dosyasını import edin:
```typescript
import romanticVideo from './assets/videos/romantic-video.mp4';
```
4. `videoSource` değişkenini güncelleyin:
```typescript
const videoSource = romanticVideo;
```

**Not:** Video yoksa, otomatik olarak animasyonlu gradient arka plan kullanılacaktır.

## Teknolojiler

- React 18
- TypeScript
- Vite
- Canvas Confetti (konfeti animasyonu için)

## Build

Production build oluşturmak için:
```bash
npm run build
```

Build edilmiş dosyalar `dist/` klasöründe oluşturulacaktır.

## Lisans

Bu proje kişisel kullanım içindir.


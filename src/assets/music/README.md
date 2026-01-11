# Müzik Dosyaları

Bu klasöre romantik müzik dosyalarınızı ekleyin (MP3, OGG, WAV formatları desteklenir).

## Kullanım

1. Müzik dosyalarınızı bu klasöre kopyalayın
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

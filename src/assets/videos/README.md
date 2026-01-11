# Video Dosyaları

Bu klasöre romantik arka plan video dosyalarınızı ekleyin (MP4 formatı önerilir).

## Kullanım

1. Video dosyanızı bu klasöre kopyalayın
2. `src/App.tsx` dosyasını açın
3. Video dosyasını import edin:
   ```typescript
   import romanticVideo from './assets/videos/romantic-video.mp4';
   ```
4. `videoSource` değişkenini güncelleyin:
   ```typescript
   const videoSource = romanticVideo;
   ```

## Notlar

- Video dosyası yoksa, otomatik olarak animasyonlu gradient arka plan kullanılacaktır
- Video otomatik olarak sessiz modda, döngüsel olarak oynatılacaktır
- Video yüklenemezse, gradient fallback otomatik olarak gösterilir


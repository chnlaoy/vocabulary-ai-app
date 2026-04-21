# App 图标和启动页资源

## 图标要求

### Android
- `mipmap-hdpi/ic_launcher.png` - 72x72
- `mipmap-mdpi/ic_launcher.png` - 48x48
- `mipmap-xhdpi/ic_launcher.png` - 96x96
- `mipmap-xxhdpi/ic_launcher.png` - 144x144
- `mipmap-xxxhdpi/ic_launcher.png` - 192x192
- `mipmap-anydpi-v26/ic_launcher_foreground.xml` - 自适应图标

### iOS
- `AppIcon-20x20@1x.png` - 20x20
- `AppIcon-20x20@2x.png` - 40x40
- `AppIcon-20x20@3x.png` - 60x60
- `AppIcon-29x29@1x.png` - 29x29
- `AppIcon-29x29@2x.png` - 58x58
- `AppIcon-29x29@3x.png` - 87x87
- `AppIcon-40x40@1x.png` - 40x40
- `AppIcon-40x40@2x.png` - 80x80
- `AppIcon-40x40@3x.png` - 120x120
- `AppIcon-60x60@2x.png` - 120x120
- `AppIcon-60x60@3x.png` - 180x180
- `AppIcon-76x76@1x.png` - 76x76
- `AppIcon-76x76@2x.png` - 152x152
- `AppIcon-83.5x83.5@2x.png` - 167x167
- `AppIcon-512@2x.png` - 1024x1024 (App Store)

## 启动页要求

### Android
- `drawable-land-hdpi/splash.png` - 640x480
- `drawable-land-mdpi/splash.png` - 480x320
- `drawable-land-xhdpi/splash.png` - 960x720
- `drawable-land-xxhdpi/splash.png` - 1440x1080
- `drawable-land-xxxhdpi/splash.png` - 1920x1440
- `drawable-port-hdpi/splash.png` - 480x640
- `drawable-port-mdpi/splash.png` - 320x480
- `drawable-port-xhdpi/splash.png` - 720x960
- `drawable-port-xxhdpi/splash.png` - 1080x1440
- `drawable-port-xxxhdpi/splash.png` - 1440x1920

### iOS
- `splash-2732x2732.png` - 2732x2732 (iPad Pro 12.9")

## 建议

使用在线工具生成所有尺寸：
- https://icon.kitchen/ - 图标生成
- https://apetools.webprofusion.com/ - 图标和启动页

或者使用 Capacitor 的资源生成工具：
```bash
npm install -g cordova-res
```

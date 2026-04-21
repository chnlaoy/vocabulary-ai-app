# 应用截图指南

## 截图规格

### iOS App Store

| 设备 | 尺寸 | 用途 |
|------|------|------|
| iPhone 15 Pro Max | 1290 x 2796 | 6.7" 显示屏 |
| iPhone 14 Plus | 1284 x 2778 | 6.5" 显示屏 |
| iPhone 8 Plus | 1242 x 2208 | 5.5" 显示屏 |
| iPad Pro 12.9" | 2048 x 2732 | iPad 截图 |

### Google Play

| 类型 | 尺寸 | 格式 |
|------|------|------|
| 手机截图 | 1080 x 1920 或 1080 x 2400 | PNG/JPEG |
| 平板截图 | 2048 x 1536 或 2732 x 2048 | PNG/JPEG |
| 功能图 | 1024 x 500 | PNG/JPEG |
| 置顶大图 | 1024 x 500 | PNG/JPEG |

## 推荐截图内容

### 截图 1: 欢迎/首页
- 展示应用主界面
- 突出品牌标识
- 显示核心功能入口

### 截图 2: 学前测试
- 展示测试界面
- 显示选择题形式
- 突出智能筛选功能

### 截图 3: 学习模式
- 展示单词卡片
- 显示词根词缀解析
- 展示例句和发音

### 截图 4: 复习系统
- 展示复习界面
- 显示艾宾浩斯曲线提示
- 展示学习统计

### 截图 5: 进度追踪
- 展示学习统计页面
- 显示已学单词数量
- 展示掌握程度图表

## 截图工具

### 模拟器截图

**iOS Simulator:**
```bash
# 启动模拟器
xcrun simctl boot "iPhone 15 Pro Max"

# 截图
xcrun simctl io booted screenshot screenshot.png
```

**Android Emulator:**
```bash
# 截图
adb shell screencap -p /sdcard/screenshot.png
adb pull /sdcard/screenshot.png
```

### 浏览器截图

使用 Chrome DevTools 设备模拟器：
1. 打开应用 (npm run dev)
2. F12 打开 DevTools
3. 点击设备模拟器图标
4. 选择设备尺寸
5. Ctrl+Shift+P → "Capture full size screenshot"

## 截图美化

推荐使用以下工具美化截图：
- [ShotBot](https://shotbot.io/) - 自动生成带设备框的截图
- [AppLaunchpad](https://theapplaunchpad.com/) - 截图模板
- [Canva](https://canva.com) - 自定义设计
- [Figma](https://figma.com) - 专业设计

## 文件命名规范

```
ios/
  iphone-6.7-inch-1-home.png
  iphone-6.7-inch-2-pretest.png
  iphone-6.7-inch-3-learning.png
  iphone-6.7-inch-4-review.png
  iphone-6.7-inch-5-stats.png

android/
  phone-1-home.png
  phone-2-pretest.png
  phone-3-learning.png
  phone-4-review.png
  phone-5-stats.png
  
  tablet-1-home.png
  ...
```

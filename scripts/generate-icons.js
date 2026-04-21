/**
 * 图标生成脚本
 * 使用 Sharp 库从 SVG 或 PNG 源文件生成所有需要的图标尺寸
 * 
 * 使用方法:
 * 1. 准备源文件: public/icons/source-icon.svg 或 source-icon.png (1024x1024)
 * 2. 运行: node scripts/generate-icons.js
 * 3. 图标将生成到 public/icons/ 目录
 */

const fs = require('fs');
const path = require('path');

// 检查是否安装了 sharp
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.log('正在安装 sharp...');
  console.log('请运行: npm install sharp --save-dev');
  process.exit(1);
}

const SOURCE_FILE = path.join(__dirname, '../public/icons/source-icon.png');
const OUTPUT_DIR = path.join(__dirname, '../public/icons');

// PWA 图标尺寸
const PWA_SIZES = [72, 96, 128, 144, 152, 192, 384, 512];

// iOS 图标尺寸
const IOS_SIZES = [
  { size: 20, scale: 2 },
  { size: 20, scale: 3 },
  { size: 29, scale: 2 },
  { size: 29, scale: 3 },
  { size: 40, scale: 2 },
  { size: 40, scale: 3 },
  { size: 60, scale: 2 },
  { size: 60, scale: 3 },
  { size: 76, scale: 1 },
  { size: 76, scale: 2 },
  { size: 83.5, scale: 2 },
  { size: 1024, scale: 1 } // App Store
];

// Android 图标尺寸
const ANDROID_SIZES = {
  'mipmap-mdpi': 48,
  'mipmap-hdpi': 72,
  'mipmap-xhdpi': 96,
  'mipmap-xxhdpi': 144,
  'mipmap-xxxhdpi': 192
};

async function generatePWAIcons() {
  console.log('生成 PWA 图标...');
  
  if (!fs.existsSync(SOURCE_FILE)) {
    console.log('⚠️  源文件不存在:', SOURCE_FILE);
    console.log('请准备 1024x1024 的 PNG 图标作为源文件');
    return;
  }

  for (const size of PWA_SIZES) {
    const outputFile = path.join(OUTPUT_DIR, `icon-${size}x${size}.png`);
    await sharp(SOURCE_FILE)
      .resize(size, size)
      .png()
      .toFile(outputFile);
    console.log(`✓ ${size}x${size}`);
  }
}

async function generateFavicon() {
  console.log('\n生成 Favicon...');
  
  if (!fs.existsSync(SOURCE_FILE)) return;

  const faviconPath = path.join(__dirname, '../public/favicon.ico');
  // 生成 32x32 的 favicon
  await sharp(SOURCE_FILE)
    .resize(32, 32)
    .toFile(faviconPath.replace('.ico', '.png'));
  console.log('✓ favicon.png');
}

async function main() {
  console.log('🎨 VocabMaster 图标生成器\n');
  
  // 确保输出目录存在
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // 检查源文件
  if (!fs.existsSync(SOURCE_FILE)) {
    console.log('⚠️  未找到源图标文件');
    console.log('请准备以下文件之一:');
    console.log('  - public/icons/source-icon.png (推荐, 1024x1024)');
    console.log('  - public/icons/source-icon.svg');
    console.log('\n你可以使用以下工具创建图标:');
    console.log('  - Figma: https://figma.com');
    console.log('  - Canva: https://canva.com');
    console.log('  - IconKitchen: https://icon.kitchen');
    return;
  }

  try {
    await generatePWAIcons();
    await generateFavicon();
    
    console.log('\n✅ 图标生成完成!');
    console.log('\n下一步:');
    console.log('1. 构建 Web App: npm run build');
    console.log('2. 同步到原生平台: npx cap sync');
    console.log('3. 在 Android Studio / Xcode 中打开项目');
  } catch (error) {
    console.error('❌ 生成失败:', error.message);
  }
}

main();

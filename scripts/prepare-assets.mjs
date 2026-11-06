import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, 'public', 'memories');

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

async function processImage(srcPath, destRelPath, maxWidth = 1400) {
  const destPath = path.join(OUT_DIR, destRelPath);
  ensureDir(path.dirname(destPath));
  if (!fs.existsSync(srcPath)) {
    console.warn(`[SKIP] Missing: ${srcPath}`);
    return false;
  }
  try {
    await sharp(srcPath)
      .rotate() // Automatically corrects EXIF orientation!
      .resize({ width: maxWidth, height: maxWidth, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 84, mozjpeg: true })
      .toFile(destPath);
    console.log(`[OK] ${destRelPath}`);
    return true;
  } catch (err) {
    console.error(`[ERR] ${srcPath}: ${err.message}`);
    return false;
  }
}

async function main() {
  ensureDir(OUT_DIR);

  // 1. Avatar & Portfolio Highlights from sibling repo LuuNguyenBaoHan
  const portfolioRoot = path.resolve(ROOT, '..', 'LuuNguyenBaoHan');
  await processImage(
    path.join(portfolioRoot, 'src', 'assets', 'avatar.jpg'),
    'profile/avatar-baohan.jpg',
    1000
  );
  await processImage(
    path.join(portfolioRoot, 'src', 'assets', 'Chạm vào di sản', 'DSC09426.JPG'),
    'portfolio/cham-vao-di-san.jpg',
    1000
  );
  await processImage(
    path.join(portfolioRoot, 'public', 'projects', 'co_em', 'IMG_2590.JPG'),
    'portfolio/co-em.jpg',
    1000
  );
  await processImage(
    path.join(portfolioRoot, 'public', 'projects', 'mua_tro_ve', 'IMG_2892.JPG'),
    'portfolio/mua-tro-ve.jpg',
    1000
  );
  await processImage(
    path.join(portfolioRoot, 'public', 'projects', 'giot_nang', 'IMG_3327.JPG'),
    'portfolio/giot-nang-ben-them.jpg',
    1000
  );
  await processImage(
    path.join(portfolioRoot, 'public', 'projects', 'cho_han', 'DSC09049.jpeg'),
    'portfolio/cho-han-chut-tet.jpg',
    1000
  );

  // 2. Main Couple Memories from image/ (8 full-res photos)
  const imgDir = path.join(ROOT, 'image');
  const coupleMap = [
    ['1793883422106_2161144868687810362_1414940633021668965_5e64dcde348a06c9afedf161b22f9441.jpg', 'couple/01-ao-dai-non-la.jpg'],
    ['1793883423558_2161144868687810362_1414940633021668965_e17f8985b7b2cf307af7721ee37af25a.jpg', 'couple/02-bien-da-nang.jpg'],
    ['1793883425046_2161144868687810362_1414940633021668965_c8cc3acf8874fb9e900daf8feb2b09f7.jpg', 'couple/03-san-la-kho.jpg'],
    ['1793883426462_2161144868687810362_1414940633021668965_ccc48caa02bdfca08831bcd566797edc.jpg', 'couple/04-dem-hen-ho.jpg'],
    ['1793883429113_2161144868687810362_1414940633021668965_466eea06c686c139885f254b1baeac3a.jpg', 'couple/05-chuyen-xe-vui-ve.jpg'],
    ['1793883430069_2161144868687810362_1414940633021668965_185ab9406091bd0652c9de7a175a6279.jpg', 'couple/06-cafe-headphone.jpg'],
    ['1793883430630_2161144868687810362_1414940633021668965_1316ebca2efbe59279c16b841dfb1209.jpg', 'couple/07-canh-dong-anh-sang.jpg'],
    ['1793883432154_2161144868687810362_1414940633021668965_d155f456133a9b5a93ebe1ef0abb5339.jpg', 'couple/08-phong-guong-led.jpg'],
  ];
  for (const [src, dest] of coupleMap) {
    await processImage(path.join(imgDir, src), dest, 1400);
  }

  // 3. Anh Trung vào Sài Gòn -> Photo Palette (Studio Bouquet & Heart Frame)
  const sgRoot = path.join(ROOT, 'Anh Trung vào Sgon');
  const paletteFiles = [
    '00002.jpg', '00005.jpg', '00007.jpg', '00010.jpg',
    '00011.jpg', '00012.jpg', '00014.jpg', '00015.jpg',
    '00020.jpg', '00021.jpg', '00023.jpg', '00034.jpg',
  ];
  for (let i = 0; i < paletteFiles.length; i++) {
    const fn = paletteFiles[i];
    await processImage(
      path.join(sgRoot, 'Photo Pallete', fn),
      `saigon/photopalette/palette-${String(i + 1).padStart(2, '0')}.jpg`,
      1400
    );
  }

  // 4. Anh Trung vào Sài Gòn -> Ga Metro (Ga metro - ảnh em + Ga metro)
  const metroEmFiles = ['DSC03474.JPG', 'DSC03476.JPG', 'DSC03478.JPG', 'DSC03479.JPG'];
  for (let i = 0; i < metroEmFiles.length; i++) {
    await processImage(
      path.join(sgRoot, 'Ga metro - ảnh em', metroEmFiles[i]),
      `saigon/metro/metro-em-${String(i + 1).padStart(2, '0')}.jpg`,
      1400
    );
  }
  const metroFiles = [
    'DSC03465.JPG', 'DSC03481.JPG', 'DSC03495.JPG', 'DSC03505.JPG',
    'DSC03511.JPG', 'DSC03518.JPG', 'DSC03532.JPG', 'DSC03547.JPG'
  ];
  for (let i = 0; i < metroFiles.length; i++) {
    await processImage(
      path.join(sgRoot, 'Ga metro', metroFiles[i]),
      `saigon/metro/metro-${String(i + 1).padStart(2, '0')}.jpg`,
      1400
    );
  }

  // 5. Anh Trung vào Sài Gòn -> Bảo tàng Van Gogh
  const vanGoghFiles = [
    'DSC03550.JPG', 'DSC03560.JPG', 'DSC03587.jpeg', 'DSC03614.jpeg',
    'DSC03636.jpeg', 'DSC03656.jpeg', 'DSC03677.jpeg', 'DSC03692.jpeg',
    'DSC03704.jpeg', 'DSC03730.jpeg', 'DSC03761.jpeg', 'DSC03795.jpeg'
  ];
  for (let i = 0; i < vanGoghFiles.length; i++) {
    await processImage(
      path.join(sgRoot, 'Bảo tàng Van Gogh', vanGoghFiles[i]),
      `saigon/vangogh/vangogh-${String(i + 1).padStart(2, '0')}.jpg`,
      1400
    );
  }

  // 6. Anh Trung vào Sài Gòn -> Thảo Cầm Viên
  const zooFiles = [
    'DSC03812.JPG', 'DSC03815.JPG', 'DSC03822.JPG', 'DSC03828.JPG',
    'DSC03834.JPG', 'DSC03842.JPG', 'DSC03845.JPG', 'DSC03854.JPG',
    'DSC03867.JPG', 'DSC03871.JPG'
  ];
  for (let i = 0; i < zooFiles.length; i++) {
    await processImage(
      path.join(sgRoot, 'Thảo Cầm Viên', zooFiles[i]),
      `saigon/thaocamvien/zoo-${String(i + 1).padStart(2, '0')}.jpg`,
      1400
    );
  }

  console.log('Done preparing all optimized assets in public/memories!');
}

main();

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { Rotate3d, Sparkles, Box, Image as ImageIcon } from 'lucide-react';

/**
 * Helper to create a high-resolution 2D canvas texture for the 3D golden nameplate
 */
function createPlaqueTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 192;
  const ctx = canvas.getContext('2d');

  // Rich gold background gradient
  const grad = ctx.createLinearGradient(0, 0, 512, 192);
  grad.addColorStop(0, '#ffe49e');
  grad.addColorStop(0.5, '#fcbc5b');
  grad.addColorStop(1, '#d98a1e');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 192);

  // Inner dark plum border
  ctx.strokeStyle = '#140b29';
  ctx.lineWidth = 8;
  ctx.strokeRect(14, 14, 484, 164);

  // Text
  ctx.fillStyle = '#140b29';
  ctx.font = '900 44px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('BẢO HÂN • 19', 256, 78);

  ctx.font = 'bold 26px serif';
  ctx.fillStyle = '#4a153b';
  ctx.fillText('THỎ BÚN • 08.11.2007', 256, 132);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * BunnyBirthdayCake3D
 * Studio-lit HDRI WebGL 3D Multi-Tier Birthday Cake using Three.js + OrbitControls + RoomEnvironment
 * + RoundedBoxGeometry + 3D Chibi White Bunny ("Thỏ Bún @bunii.817") wearing a pink bow, golden crown,
 * mini 3D camera, and hugging a glowing 3D heart, plus an optional 3D Pixar Render showcase mode.
 */
export default function BunnyBirthdayCake3D({
  candlesLit = true,
  onBlowOut,
  heightClass = 'h-[320px] sm:h-[370px]',
  interactiveHint = 'Kéo chuột xoay 360° • Lăn chuột thu phóng • Chạm vào bánh để thổi nến',
}) {
  const mountRef = useRef(null);
  const candlesLitRef = useRef(candlesLit);
  const celebrationBurstRef = useRef(0);
  const [viewMode, setViewMode] = useState('webgl'); // 'webgl' | 'render3d'

  useEffect(() => {
    if (candlesLitRef.current && !candlesLit) {
      celebrationBurstRef.current = 1.0;
    }
    candlesLitRef.current = candlesLit;
  }, [candlesLit]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container || viewMode !== 'webgl') return;

    const width = container.clientWidth || 440;
    const height = container.clientHeight || 350;

    // 1. SCENE & CAMERA
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 3.5, 8.6);

    // 2. RENDERER + STUDIO HDRI ENVIRONMENT (RoomEnvironment)
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTexture = pmremGenerator.fromScene(
      new RoomEnvironment(),
      0.04
    ).texture;
    scene.environment = envTexture;

    // 3. ORBIT CONTROLS (True 3D Damped Orbit + AutoRotate + Zoom)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0.75, 0);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enablePan = false;
    controls.minDistance = 5.8;
    controls.maxDistance = 12.5;
    controls.minPolarAngle = Math.PI * 0.18;
    controls.maxPolarAngle = Math.PI * 0.48;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.35;

    // 4. LIGHTING
    const ambientLight = new THREE.AmbientLight(0xfff0f6, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff8eb, 1.8);
    keyLight.position.set(5, 9, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xff7eb6, 1.35);
    rimLight.position.set(-6, 5, -5);
    scene.add(rimLight);

    const candlePointLight = new THREE.PointLight(0xffaa33, 3.2, 11, 1.4);
    candlePointLight.position.set(0, 2.9, 0.55);
    scene.add(candlePointLight);

    // 5. PBR MATERIALS
    const plateMat = new THREE.MeshPhysicalMaterial({
      color: 0xffeedf,
      roughness: 0.12,
      metalness: 0.08,
      clearcoat: 1.0,
    });
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xfcbc5b,
      roughness: 0.18,
      metalness: 0.92,
    });
    const tier1Mat = new THREE.MeshPhysicalMaterial({
      color: 0xff8fab,
      roughness: 0.32,
      clearcoat: 0.4,
      sheen: 0.75,
      sheenColor: new THREE.Color(0xffe5ef),
    });
    const tier2Mat = new THREE.MeshPhysicalMaterial({
      color: 0xfff5eb,
      roughness: 0.25,
      clearcoat: 0.5,
      sheen: 0.6,
      sheenColor: new THREE.Color(0xffffff),
    });
    const glazeMat = new THREE.MeshPhysicalMaterial({
      color: 0xff4d8d,
      roughness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
    });
    const creamMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.26,
      clearcoat: 0.35,
    });
    const berryMat = new THREE.MeshPhysicalMaterial({
      color: 0xe11d48,
      roughness: 0.12,
      clearcoat: 0.95,
    });
    const leafMat = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      roughness: 0.35,
    });

    // Bunny Materials
    const bunnyWhiteMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.24,
      clearcoat: 0.4,
      sheen: 1.0,
      sheenColor: new THREE.Color(0xfff0f5),
    });
    const bunnyPinkMat = new THREE.MeshPhysicalMaterial({
      color: 0xff85b3,
      roughness: 0.25,
      clearcoat: 0.5,
    });
    const bunnyBlushMat = new THREE.MeshBasicMaterial({
      color: 0xff5c97,
      transparent: true,
      opacity: 0.7,
    });
    const eyeDarkMat = new THREE.MeshPhysicalMaterial({
      color: 0x160829,
      roughness: 0.02,
      clearcoat: 1.0,
    });
    const eyeSparkleMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const heartMat = new THREE.MeshPhysicalMaterial({
      color: 0xff2e79,
      roughness: 0.1,
      metalness: 0.12,
      clearcoat: 1.0,
      emissive: 0xff1e66,
      emissiveIntensity: 0.28,
    });

    const cakeRoot = new THREE.Group();
    cakeRoot.position.y = -1.25;
    scene.add(cakeRoot);

    // -------------------------------------------------------------------------
    // A. PORCELAIN & GOLD PEDESTAL STAND
    // -------------------------------------------------------------------------
    const standBase = new THREE.Mesh(
      new THREE.CylinderGeometry(1.12, 1.48, 0.34, 48),
      plateMat
    );
    standBase.position.y = -0.2;
    standBase.receiveShadow = true;
    cakeRoot.add(standBase);

    const plateRim = new THREE.Mesh(
      new THREE.CylinderGeometry(2.7, 2.52, 0.16, 64),
      plateMat
    );
    plateRim.position.y = 0.04;
    plateRim.receiveShadow = true;
    cakeRoot.add(plateRim);

    const goldTrimPlate = new THREE.Mesh(
      new THREE.TorusGeometry(2.64, 0.048, 20, 72),
      goldMat
    );
    goldTrimPlate.rotation.x = Math.PI / 2;
    goldTrimPlate.position.y = 0.08;
    cakeRoot.add(goldTrimPlate);

    // -------------------------------------------------------------------------
    // B. TIER 1 (STRAWBERRY VELVET TIER + MACARONS + STRAWBERRIES)
    // -------------------------------------------------------------------------
    const tier1Height = 1.1;
    const tier1Radius = 2.18;
    const tier1 = new THREE.Mesh(
      new THREE.CylinderGeometry(tier1Radius, tier1Radius, tier1Height, 64),
      tier1Mat
    );
    tier1.position.y = 0.12 + tier1Height / 2;
    tier1.castShadow = true;
    tier1.receiveShadow = true;
    cakeRoot.add(tier1);

    // Gold ribbon belt around Tier 1
    const tier1GoldBelt = new THREE.Mesh(
      new THREE.TorusGeometry(tier1Radius + 0.02, 0.045, 16, 64),
      goldMat
    );
    tier1GoldBelt.rotation.x = Math.PI / 2;
    tier1GoldBelt.position.y = 0.19;
    cakeRoot.add(tier1GoldBelt);

    // Piped cream dollops around Tier 1 base
    const baseDollopCount = 26;
    for (let i = 0; i < baseDollopCount; i++) {
      const angle = (i / baseDollopCount) * Math.PI * 2;
      const d = new THREE.Mesh(
        new THREE.SphereGeometry(0.14, 16, 16),
        creamMat
      );
      d.scale.set(1, 0.76, 1);
      d.position.set(
        Math.cos(angle) * (tier1Radius + 0.06),
        0.19,
        Math.sin(angle) * (tier1Radius + 0.06)
      );
      cakeRoot.add(d);
    }

    // Top edge of Tier 1: Alternating Strawberries & Pastel 3D Macarons!
    const tier1TopY = 0.12 + tier1Height;
    const midDollopCount = 16;
    const macaronColors = [0xfde047, 0xc4b5fd, 0x99f6e4, 0xffb3c6];

    for (let i = 0; i < midDollopCount; i++) {
      const angle = (i / midDollopCount) * Math.PI * 2;
      const r = tier1Radius - 0.17;
      const puff = new THREE.Mesh(
        new THREE.SphereGeometry(0.17, 16, 16),
        creamMat
      );
      puff.scale.set(1, 0.8, 1);
      puff.position.set(
        Math.cos(angle) * r,
        tier1TopY + 0.05,
        Math.sin(angle) * r
      );
      cakeRoot.add(puff);

      if (i % 2 === 0) {
        // 3D Glossy Strawberry with gold seeds & leafy crown
        const berryGroup = new THREE.Group();
        const berry = new THREE.Mesh(
          new THREE.ConeGeometry(0.145, 0.29, 18),
          berryMat
        );
        berry.position.y = 0.14;
        berryGroup.add(berry);

        const berryBase = new THREE.Mesh(
          new THREE.SphereGeometry(0.14, 16, 14),
          berryMat
        );
        berryBase.position.y = 0.03;
        berryGroup.add(berryBase);

        const leaf = new THREE.Mesh(
          new THREE.CylinderGeometry(0.09, 0.01, 0.04, 6),
          leafMat
        );
        leaf.position.y = 0.01;
        berryGroup.add(leaf);

        berryGroup.position.set(
          Math.cos(angle) * r,
          tier1TopY + 0.14,
          Math.sin(angle) * r
        );
        berryGroup.rotation.z = -Math.cos(angle) * 0.24;
        berryGroup.rotation.x = Math.sin(angle) * 0.24;
        cakeRoot.add(berryGroup);
      } else {
        // 3D Pastel Macaron
        const macGroup = new THREE.Group();
        const macMat = new THREE.MeshPhysicalMaterial({
          color: macaronColors[i % macaronColors.length],
          roughness: 0.3,
          clearcoat: 0.4,
        });
        const topShell = new THREE.Mesh(
          new THREE.SphereGeometry(0.14, 16, 12),
          macMat
        );
        topShell.scale.set(1, 0.45, 1);
        topShell.position.y = 0.045;
        macGroup.add(topShell);

        const creamFill = new THREE.Mesh(
          new THREE.CylinderGeometry(0.135, 0.135, 0.04, 16),
          creamMat
        );
        macGroup.add(creamFill);

        const botShell = topShell.clone();
        botShell.position.y = -0.045;
        macGroup.add(botShell);

        macGroup.position.set(
          Math.cos(angle) * r,
          tier1TopY + 0.16,
          Math.sin(angle) * r
        );
        macGroup.rotation.z = 0.35;
        macGroup.rotation.y = -angle;
        cakeRoot.add(macGroup);
      }
    }

    // 3D Rounded Golden Nameplate on front of Tier 1 ("BẢO HÂN • 19")
    const plaqueTexture = createPlaqueTexture();
    const plaqueGeo = new RoundedBoxGeometry(1.32, 0.46, 0.09, 4, 0.04);
    const plaqueMat = new THREE.MeshStandardMaterial({
      map: plaqueTexture,
      roughness: 0.22,
      metalness: 0.65,
    });
    const plaque = new THREE.Mesh(plaqueGeo, plaqueMat);
    plaque.position.set(0, 0.68, tier1Radius + 0.04);
    cakeRoot.add(plaque);

    // -------------------------------------------------------------------------
    // C. TIER 2 (VANILLA CREAM TIER + GLOSSY PINK DRIP GLAZE)
    // -------------------------------------------------------------------------
    const tier2Height = 0.98;
    const tier2Radius = 1.5;
    const tier2BottomY = tier1TopY;
    const tier2 = new THREE.Mesh(
      new THREE.CylinderGeometry(tier2Radius, tier2Radius, tier2Height, 64),
      tier2Mat
    );
    tier2.position.y = tier2BottomY + tier2Height / 2;
    tier2.castShadow = true;
    tier2.receiveShadow = true;
    cakeRoot.add(tier2);

    // Gold sugar pearls around Tier 2 waist
    const pearlCount = 28;
    for (let i = 0; i < pearlCount; i++) {
      const angle = (i / pearlCount) * Math.PI * 2;
      const pearl = new THREE.Mesh(
        new THREE.SphereGeometry(0.075, 14, 14),
        goldMat
      );
      pearl.position.set(
        Math.cos(angle) * (tier2Radius + 0.05),
        tier2BottomY + 0.06,
        Math.sin(angle) * (tier2Radius + 0.05)
      );
      cakeRoot.add(pearl);
    }

    // Glossy pink glaze cap + drips on Tier 2
    const tier2TopY = tier2BottomY + tier2Height;
    const glazeCap = new THREE.Mesh(
      new THREE.CylinderGeometry(
        tier2Radius + 0.02,
        tier2Radius + 0.02,
        0.08,
        64
      ),
      glazeMat
    );
    glazeCap.position.y = tier2TopY;
    cakeRoot.add(glazeCap);

    const dripCount = 20;
    for (let i = 0; i < dripCount; i++) {
      const angle = (i / dripCount) * Math.PI * 2;
      const dripLen = 0.16 + (i % 4) * 0.09;
      const drip = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.062, dripLen, 8, 12),
        glazeMat
      );
      drip.position.set(
        Math.cos(angle) * (tier2Radius + 0.01),
        tier2TopY - dripLen / 2,
        Math.sin(angle) * (tier2Radius + 0.01)
      );
      cakeRoot.add(drip);
    }

    // -------------------------------------------------------------------------
    // D. SCULPTED 3D CHIBI WHITE BUNNY ("THỎ BÚN @bunii.817") ON TOP OF CAKE
    // -------------------------------------------------------------------------
    const bunnyGroup = new THREE.Group();
    bunnyGroup.position.set(0, tier2TopY + 0.04, 0);
    cakeRoot.add(bunnyGroup);

    // Whipped cream cloud cushion under Bunny
    const bunnyCushion = new THREE.Mesh(
      new THREE.CylinderGeometry(0.72, 0.78, 0.12, 36),
      creamMat
    );
    bunnyCushion.position.y = 0.05;
    bunnyGroup.add(bunnyCushion);

    for (let c = 0; c < 12; c++) {
      const ca = (c / 12) * Math.PI * 2;
      const swirl = new THREE.Mesh(
        new THREE.SphereGeometry(0.13, 14, 14),
        creamMat
      );
      swirl.position.set(Math.cos(ca) * 0.7, 0.08, Math.sin(ca) * 0.7);
      bunnyGroup.add(swirl);
    }

    // Chubby Bunny Body
    const bunnyBody = new THREE.Mesh(
      new THREE.SphereGeometry(0.54, 36, 36),
      bunnyWhiteMat
    );
    bunnyBody.scale.set(1.06, 0.94, 0.98);
    bunnyBody.position.y = 0.47;
    bunnyBody.castShadow = true;
    bunnyGroup.add(bunnyBody);

    // Cute Sitting Feet + Pink Toe Beans
    const leftFoot = new THREE.Mesh(
      new THREE.SphereGeometry(0.185, 22, 22),
      bunnyWhiteMat
    );
    leftFoot.scale.set(0.92, 0.68, 1.38);
    leftFoot.position.set(-0.29, 0.16, 0.39);
    bunnyGroup.add(leftFoot);

    const rightFoot = leftFoot.clone();
    rightFoot.position.set(0.29, 0.16, 0.39);
    bunnyGroup.add(rightFoot);

    const leftPad = new THREE.Mesh(
      new THREE.SphereGeometry(0.095, 14, 14),
      bunnyPinkMat
    );
    leftPad.scale.set(1, 0.8, 0.4);
    leftPad.position.set(-0.29, 0.17, 0.61);
    bunnyGroup.add(leftPad);

    const rightPad = leftPad.clone();
    rightPad.position.set(0.29, 0.17, 0.61);
    bunnyGroup.add(rightPad);

    // Fluffy Cotton Tail at the back
    const bunnyTail = new THREE.Mesh(
      new THREE.SphereGeometry(0.19, 20, 20),
      bunnyWhiteMat
    );
    bunnyTail.position.set(0, 0.28, -0.5);
    bunnyGroup.add(bunnyTail);

    // Bunny Head Group
    const bunnyHeadGroup = new THREE.Group();
    bunnyHeadGroup.position.set(0, 1.08, 0.04);
    bunnyGroup.add(bunnyHeadGroup);

    const bunnyHead = new THREE.Mesh(
      new THREE.SphereGeometry(0.52, 36, 36),
      bunnyWhiteMat
    );
    bunnyHead.scale.set(1.14, 0.96, 1.03);
    bunnyHead.castShadow = true;
    bunnyHeadGroup.add(bunnyHead);

    // Chubby Pouches on Cheeks
    const leftChubbyCheek = new THREE.Mesh(
      new THREE.SphereGeometry(0.25, 22, 22),
      bunnyWhiteMat
    );
    leftChubbyCheek.position.set(-0.33, -0.08, 0.22);
    bunnyHeadGroup.add(leftChubbyCheek);

    const rightChubbyCheek = leftChubbyCheek.clone();
    rightChubbyCheek.position.set(0.33, -0.08, 0.22);
    bunnyHeadGroup.add(rightChubbyCheek);

    // Rosy Pink Blush Ovals
    const leftBlush = new THREE.Mesh(
      new THREE.SphereGeometry(0.115, 16, 16),
      bunnyBlushMat
    );
    leftBlush.scale.set(1.35, 0.75, 0.35);
    leftBlush.position.set(-0.35, -0.04, 0.46);
    leftBlush.rotation.y = -0.35;
    bunnyHeadGroup.add(leftBlush);

    const rightBlush = leftBlush.clone();
    rightBlush.position.set(0.35, -0.04, 0.46);
    rightBlush.rotation.y = 0.35;
    bunnyHeadGroup.add(rightBlush);

    // Glossy Dark Eyes + Double Catchlight Sparkles
    const leftEye = new THREE.Mesh(
      new THREE.SphereGeometry(0.088, 22, 22),
      eyeDarkMat
    );
    leftEye.scale.set(0.95, 1.15, 0.6);
    leftEye.position.set(-0.195, 0.08, 0.485);
    bunnyHeadGroup.add(leftEye);

    const leftCatchlight = new THREE.Mesh(
      new THREE.SphereGeometry(0.03, 12, 12),
      eyeSparkleMat
    );
    leftCatchlight.position.set(-0.17, 0.115, 0.53);
    bunnyHeadGroup.add(leftCatchlight);

    const leftSmallCatch = new THREE.Mesh(
      new THREE.SphereGeometry(0.015, 10, 10),
      eyeSparkleMat
    );
    leftSmallCatch.position.set(-0.21, 0.05, 0.525);
    bunnyHeadGroup.add(leftSmallCatch);

    const rightEye = leftEye.clone();
    rightEye.position.set(0.195, 0.08, 0.485);
    bunnyHeadGroup.add(rightEye);

    const rightCatchlight = leftCatchlight.clone();
    rightCatchlight.position.set(0.22, 0.115, 0.53);
    bunnyHeadGroup.add(rightCatchlight);

    const rightSmallCatch = leftSmallCatch.clone();
    rightSmallCatch.position.set(0.18, 0.05, 0.525);
    bunnyHeadGroup.add(rightSmallCatch);

    // Cute Pink Nose & Muzzle
    const snout = new THREE.Mesh(
      new THREE.SphereGeometry(0.115, 18, 18),
      bunnyWhiteMat
    );
    snout.scale.set(1.28, 0.85, 0.82);
    snout.position.set(0, -0.04, 0.49);
    bunnyHeadGroup.add(snout);

    const pinkNose = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 16, 16),
      bunnyPinkMat
    );
    pinkNose.scale.set(1.3, 0.85, 0.8);
    pinkNose.position.set(0, -0.01, 0.565);
    bunnyHeadGroup.add(pinkNose);

    // Long Bunny Ears with Pink Inner Ears + Cute Pink Ribbon Bow on Right Ear!
    const buildEar = (side) => {
      const earPivot = new THREE.Group();
      earPivot.position.set(side * 0.23, 0.39, -0.02);

      const outerEar = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.14, 0.54, 14, 22),
        bunnyWhiteMat
      );
      outerEar.scale.set(1, 1, 0.55);
      outerEar.position.y = 0.33;
      outerEar.castShadow = true;
      earPivot.add(outerEar);

      const innerEar = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.088, 0.43, 12, 18),
        bunnyPinkMat
      );
      innerEar.scale.set(1, 1, 0.35);
      innerEar.position.set(0, 0.32, 0.058);
      earPivot.add(innerEar);

      earPivot.rotation.z = -side * 0.22;
      earPivot.rotation.x = 0.1;
      return earPivot;
    };

    const leftEarPivot = buildEar(-1);
    const rightEarPivot = buildEar(1);

    // Add a cute 3D Pink Bow at the base of the Right Ear!
    const bowGroup = new THREE.Group();
    bowGroup.position.set(0.06, 0.08, 0.08);
    bowGroup.rotation.z = -0.25;
    const bowCenter = new THREE.Mesh(
      new THREE.SphereGeometry(0.055, 14, 14),
      heartMat
    );
    bowGroup.add(bowCenter);
    const bowLeft = new THREE.Mesh(
      new THREE.ConeGeometry(0.085, 0.14, 14),
      heartMat
    );
    bowLeft.rotation.z = -Math.PI / 2;
    bowLeft.position.x = -0.08;
    bowGroup.add(bowLeft);
    const bowRight = bowLeft.clone();
    bowRight.rotation.z = Math.PI / 2;
    bowRight.position.x = 0.08;
    bowGroup.add(bowRight);
    rightEarPivot.add(bowGroup);

    bunnyHeadGroup.add(leftEarPivot);
    bunnyHeadGroup.add(rightEarPivot);

    // Golden Birthday Crown between the bunny's ears
    const crownGroup = new THREE.Group();
    crownGroup.position.set(0, 0.48, 0.08);
    crownGroup.rotation.z = -0.06;
    const crownBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.185, 0.155, 0.14, 20),
      goldMat
    );
    crownGroup.add(crownBase);
    for (let p = 0; p < 5; p++) {
      const a = (p / 5) * Math.PI * 2;
      const spike = new THREE.Mesh(
        new THREE.ConeGeometry(0.055, 0.15, 10),
        goldMat
      );
      spike.position.set(Math.cos(a) * 0.145, 0.12, Math.sin(a) * 0.145);
      crownGroup.add(spike);
    }
    bunnyHeadGroup.add(crownGroup);

    // Bunny Front Hands hugging a Glowing 3D Pink Heart
    const leftHand = new THREE.Mesh(
      new THREE.SphereGeometry(0.135, 18, 18),
      bunnyWhiteMat
    );
    leftHand.scale.set(0.85, 0.85, 1.32);
    leftHand.position.set(-0.22, 0.55, 0.45);
    leftHand.rotation.y = 0.35;
    bunnyGroup.add(leftHand);

    const rightHand = leftHand.clone();
    rightHand.position.set(0.22, 0.55, 0.45);
    rightHand.rotation.y = -0.35;
    bunnyGroup.add(rightHand);

    const heartShape = new THREE.Shape();
    heartShape.moveTo(0, 0.12);
    heartShape.bezierCurveTo(0, 0.18, -0.1, 0.28, -0.22, 0.28);
    heartShape.bezierCurveTo(-0.38, 0.28, -0.38, 0.06, -0.38, 0.06);
    heartShape.bezierCurveTo(-0.38, -0.1, -0.2, -0.24, 0, -0.36);
    heartShape.bezierCurveTo(0.2, -0.24, 0.38, -0.1, 0.38, 0.06);
    heartShape.bezierCurveTo(0.38, 0.06, 0.38, 0.28, 0.22, 0.28);
    heartShape.bezierCurveTo(0.1, 0.28, 0, 0.18, 0, 0.12);

    const heartGeo = new THREE.ExtrudeGeometry(heartShape, {
      depth: 0.12,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 1,
      bevelSize: 0.06,
      bevelThickness: 0.06,
    });
    heartGeo.center();
    const heldHeart = new THREE.Mesh(heartGeo, heartMat);
    heldHeart.scale.set(0.75, 0.75, 0.75);
    heldHeart.position.set(0, 0.55, 0.55);
    bunnyGroup.add(heldHeart);

    // -------------------------------------------------------------------------
    // E. 5 INTERACTIVE 3D CANDLES + FLICKERING FLAMES & SMOKE
    // -------------------------------------------------------------------------
    const candleColors = [0xff7eb6, 0xfcbc5b, 0xc4b5fd, 0xff7eb6, 0xfcbc5b];
    const candleObjects = [];
    const candleArcAngles = [-1.15, -0.58, 0, 0.58, 1.15];
    const candleArcRadius = 1.15;

    candleArcAngles.forEach((angle, idx) => {
      const cGroup = new THREE.Group();
      const cx = Math.sin(angle) * candleArcRadius;
      const cz = Math.cos(angle) * candleArcRadius * 0.88 + 0.16;
      cGroup.position.set(cx, tier2TopY + 0.04, cz);

      const holder = new THREE.Mesh(
        new THREE.SphereGeometry(0.125, 14, 14),
        creamMat
      );
      holder.scale.set(1, 0.65, 1);
      cGroup.add(holder);

      const stickMat = new THREE.MeshPhysicalMaterial({
        color: candleColors[idx],
        roughness: 0.22,
        clearcoat: 0.65,
      });
      const stick = new THREE.Mesh(
        new THREE.CylinderGeometry(0.065, 0.065, 0.58, 20),
        stickMat
      );
      stick.position.y = 0.29;
      stick.castShadow = true;
      cGroup.add(stick);

      const stripe = new THREE.Mesh(
        new THREE.TorusGeometry(0.068, 0.014, 10, 24),
        creamMat
      );
      stripe.rotation.x = Math.PI / 2;
      stripe.position.y = 0.34;
      cGroup.add(stripe);

      const wick = new THREE.Mesh(
        new THREE.CylinderGeometry(0.012, 0.012, 0.09, 8),
        new THREE.MeshBasicMaterial({ color: 0x292524 })
      );
      wick.position.y = 0.61;
      cGroup.add(wick);

      const flameGroup = new THREE.Group();
      flameGroup.position.y = 0.72;

      const outerFlame = new THREE.Mesh(
        new THREE.ConeGeometry(0.078, 0.25, 16),
        new THREE.MeshBasicMaterial({
          color: 0xff8c1a,
          transparent: true,
          opacity: 0.92,
        })
      );
      flameGroup.add(outerFlame);

      const innerFlame = new THREE.Mesh(
        new THREE.SphereGeometry(0.054, 14, 14),
        new THREE.MeshBasicMaterial({ color: 0xfff7b2 })
      );
      innerFlame.position.y = -0.05;
      flameGroup.add(innerFlame);

      cGroup.add(flameGroup);

      const smokeMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.065, 12, 12),
        new THREE.MeshBasicMaterial({
          color: 0xe2e8f0,
          transparent: true,
          opacity: 0,
        })
      );
      smokeMesh.position.y = 0.72;
      cGroup.add(smokeMesh);

      cakeRoot.add(cGroup);
      candleObjects.push({ flameGroup, smokeMesh, phase: idx * 1.3 });
    });

    // -------------------------------------------------------------------------
    // F. FLOATING 3D ORBITING MINI HEARTS & GOLDEN STARS
    // -------------------------------------------------------------------------
    const floatersGroup = new THREE.Group();
    scene.add(floatersGroup);
    const floaters = [];
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const isHeart = i % 2 === 0;
      const mesh = new THREE.Mesh(
        isHeart ? heartGeo : new THREE.OctahedronGeometry(0.12, 0),
        isHeart ? heartMat : goldMat
      );
      if (isHeart) mesh.scale.set(0.32, 0.32, 0.32);
      floatersGroup.add(mesh);
      floaters.push({
        mesh,
        baseAngle: a,
        radius: 2.8 + (i % 3) * 0.25,
        baseY: -0.2 + (i % 4) * 0.65,
        speed: 0.4 + (i % 3) * 0.15,
      });
    }

    // Detect clean tap/click (without drag) to blow out candles
    let downX = 0;
    let downY = 0;
    const onPointerDown = (e) => {
      downX = e.clientX;
      downY = e.clientY;
    };
    const onPointerUp = (e) => {
      const dist = Math.hypot(e.clientX - downX, e.clientY - downY);
      if (dist < 6 && candlesLitRef.current) {
        onBlowOut?.();
      }
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('pointerdown', onPointerDown);
    domEl.addEventListener('pointerup', onPointerUp);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 440;
      const h = container.clientHeight || 350;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // -------------------------------------------------------------------------
    // G. 60FPS ANIMATION LOOP
    // -------------------------------------------------------------------------
    let frameId;
    let clock = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      clock += 0.03;

      controls.update();

      // Cute Bunny head tilt, breathing, and floppy ear wiggling
      bunnyHeadGroup.rotation.z = Math.sin(clock * 1.4) * 0.075;
      bunnyHeadGroup.rotation.x = Math.cos(clock * 1.1) * 0.04;
      leftEarPivot.rotation.z = 0.22 + Math.sin(clock * 2.7) * 0.11;
      rightEarPivot.rotation.z = -0.22 - Math.sin(clock * 2.7 + 0.6) * 0.11;

      const heartScale = 0.75 + Math.sin(clock * 3.2) * 0.055;
      heldHeart.scale.set(heartScale, heartScale, heartScale);

      // Bunny jumps with joy when candles are blown out!
      if (celebrationBurstRef.current > 0.01) {
        bunnyGroup.position.y =
          tier2TopY +
          0.04 +
          Math.abs(Math.sin(clock * 5.5)) * 0.36 * celebrationBurstRef.current;
        bunnyGroup.rotation.y =
          Math.sin(clock * 4) * 0.35 * celebrationBurstRef.current;
        celebrationBurstRef.current *= 0.985;
      } else {
        bunnyGroup.position.y =
          tier2TopY + 0.04 + Math.sin(clock * 1.8) * 0.025;
        bunnyGroup.rotation.y *= 0.9;
      }

      const lit = candlesLitRef.current;
      candlePointLight.intensity = lit
        ? 3.0 + Math.sin(clock * 7.5) * 0.5
        : 0.45;

      candleObjects.forEach(({ flameGroup, smokeMesh, phase }) => {
        if (lit) {
          flameGroup.visible = true;
          const s = 1 + Math.sin(clock * 8 + phase) * 0.16;
          flameGroup.scale.set(s, 1 + Math.cos(clock * 9 + phase) * 0.2, s);
          flameGroup.rotation.z = Math.sin(clock * 6 + phase) * 0.12;
          smokeMesh.material.opacity = 0;
          smokeMesh.position.y = 0.72;
        } else {
          flameGroup.visible = false;
          smokeMesh.position.y += 0.012;
          smokeMesh.position.x = Math.sin(clock * 2 + phase) * 0.05;
          const progress = (smokeMesh.position.y - 0.72) / 0.85;
          if (progress < 1) {
            smokeMesh.material.opacity = Math.sin(progress * Math.PI) * 0.45;
            const smScale = 0.8 + progress * 1.6;
            smokeMesh.scale.set(smScale, smScale, smScale);
          } else {
            smokeMesh.position.y = 0.72;
            smokeMesh.material.opacity = 0;
          }
        }
      });

      floaters.forEach((f, idx) => {
        const a = f.baseAngle + clock * f.speed * 0.35;
        f.mesh.position.set(
          Math.cos(a) * f.radius,
          f.baseY + Math.sin(clock * 1.5 + idx) * 0.18,
          Math.sin(a) * f.radius
        );
        f.mesh.rotation.y = clock * 1.2 + idx;
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      domEl.removeEventListener('pointerdown', onPointerDown);
      domEl.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      pmremGenerator.dispose();
      plaqueTexture.dispose();
      renderer.dispose();
    };
  }, [viewMode]);

  return (
    <div className="relative w-full flex flex-col items-center select-none">
      {/* Mode Switcher Pill: Interactive 3D WebGL vs 3D Clay Render Artwork */}
      <div className="z-20 mb-2 flex items-center gap-1.5 p-1 rounded-full bg-plum-deep/85 border border-gold/30 backdrop-blur-md">
        <button
          type="button"
          onClick={() => setViewMode('webgl')}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-display font-bold uppercase tracking-wider transition-all cursor-pointer ${
            viewMode === 'webgl'
              ? 'bg-gold text-plum-deep shadow-sm'
              : 'text-cream/75 hover:text-cream'
          }`}
        >
          <Box className="w-3.5 h-3.5" />
          <span>Mô Hình 3D Xoay 360°</span>
        </button>
        <button
          type="button"
          onClick={() => setViewMode('render3d')}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-display font-bold uppercase tracking-wider transition-all cursor-pointer ${
            viewMode === 'render3d'
              ? 'bg-gold text-plum-deep shadow-sm'
              : 'text-cream/75 hover:text-cream'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Ảnh 3D Pixar Thỏ Bún</span>
        </button>
      </div>

      {viewMode === 'webgl' ? (
        <div
          ref={mountRef}
          data-cursor-label={candlesLit ? 'THỔI NẾN 3D' : 'XOAY 360°'}
          className={`w-full ${heightClass} cursor-grab active:cursor-grabbing relative`}
        />
      ) : (
        <div
          onClick={() => {
            if (candlesLit) onBlowOut?.();
          }}
          data-cursor-label={candlesLit ? 'THỔI NẾN 3D' : 'THỎ BÚN 3D'}
          className={`w-full ${heightClass} relative flex items-center justify-center p-2 cursor-pointer group`}
        >
          <div className="relative h-full aspect-square max-h-full rounded-[28px] overflow-hidden border-2 border-gold/60 shadow-[0_20px_60px_rgba(252,188,91,0.3)] bg-plum-deep">
            <img
              src="/scenes/bunny-cake-3d.png"
              alt="Bánh Kem Thỏ Bún 3D Tuổi 19"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-2.5 inset-x-3 px-3 py-1.5 rounded-full bg-plum-deep/85 border border-gold/40 backdrop-blur-md text-[11px] font-display font-bold uppercase tracking-wider text-gold text-center">
              {candlesLit
                ? 'Chạm vào Bánh Kem Thỏ 3D để thổi nến!'
                : 'Thỏ Bún 3D chúc mừng tuổi 19 của Bảo Hân!'}
            </div>
          </div>
        </div>
      )}

      {/* Interactive 3D Badge & Rotation Hint */}
      <div className="mt-1 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-plum-deep/80 border border-gold/35 text-[11px] font-display font-bold uppercase tracking-[0.15em] text-gold shadow-md">
        <Rotate3d className="w-3.5 h-3.5 animate-spin-slow" />
        <span>{interactiveHint}</span>
        <Sparkles className="w-3 h-3 text-rose" />
      </div>
    </div>
  );
}

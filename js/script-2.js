
/* ─── THREE.JS WAVE PARTICLE BACKGROUND ─────── */
(function() {
  const canvas = document.getElementById('dotted-canvas') || document.getElementById('hero-canvas');
  if (!canvas) return;

  const w = canvas.offsetWidth || window.innerWidth;
  const h = canvas.offsetHeight || window.innerHeight;

  const SEPARATION = 130, AMOUNTX = 50, AMOUNTY = 55;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(62, (w && h ? w / h : window.innerWidth / window.innerHeight), 1, 10000);
  camera.position.set(0, 300, 1100);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(w || window.innerWidth, h || window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  const geometry = new THREE.BufferGeometry();
  const positions = [];
  const numParticles = AMOUNTX * AMOUNTY;
  for (let ix = 0; ix < AMOUNTX; ix++) {
    for (let iy = 0; iy < AMOUNTY; iy++) {
      positions.push(ix * SEPARATION - (AMOUNTX * SEPARATION) / 2, 0, iy * SEPARATION - (AMOUNTY * SEPARATION) / 2);
    }
  }
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    size: 5,
    color: new THREE.Color(0xB600A8),
    transparent: true,
    opacity: 0.55,
    sizeAttenuation: true,
  });
  const points = new THREE.Points(geometry, material);
  scene.add(points);

  let count = 0;
  let animId;
  function animate() {
    animId = requestAnimationFrame(animate);
    const pos = geometry.attributes.position.array;
    let i = 0;
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        pos[i * 3 + 1] = Math.sin((ix + count) * 0.35) * 55 + Math.sin((iy + count) * 0.55) * 45;
        i++;
      }
    }
    geometry.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
    count += 0.07;
  }
  animate();

  function onResize() {
    const w = canvas.offsetWidth || window.innerWidth, h = canvas.offsetHeight || window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener('resize', onResize, { passive: true });

})();

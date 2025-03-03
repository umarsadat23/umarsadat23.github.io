// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg') });

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(100); // Move the camera further back to fit the larger cube

// Add a 3D object (a much larger cube)
const geometry = new THREE.BoxGeometry(50, 50, 50); // Significantly increase the size of the cube
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Add lighting
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(50, 50, 50); // Adjust light position for the larger cube
scene.add(pointLight);

// Create a starfield
const starGeometry = new THREE.BufferGeometry();
const starVertices = [];
const starColors = [];
const numStars = 5000; // Increase the number of stars
const starFieldSize = 3000; // Increase the size of the starfield

for (let i = 0; i < numStars; i++) {
  const x = (Math.random() - 0.5) * starFieldSize;
  const y = (Math.random() - 0.5) * starFieldSize;
  const z = (Math.random() - 0.5) * starFieldSize;
  starVertices.push(x, y, z);

  // Add random colors for glowing stars
  const isGlowingStar = Math.random() < 0.1; // 10% chance of being a glowing star
  const color = isGlowingStar ? new THREE.Color(Math.random() * 0xffffff) : new THREE.Color(0xffffff);
  starColors.push(color.r, color.g, color.b);
}

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
starGeometry.setAttribute('color', new THREE.Float32BufferAttribute(starColors, 3));

const starMaterial = new THREE.PointsMaterial({ 
  size: 0.5, // Smaller stars for a more realistic look
  sizeAttenuation: true, // Stars farther away appear smaller
  vertexColors: true // Enable vertex colors for glowing stars
});

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Add twinkling effect for glowing stars
function animateStars() {
  const positions = starGeometry.attributes.position.array;
  const colors = starGeometry.attributes.color.array;

  for (let i = 0; i < positions.length; i += 3) {
    // Randomly change the brightness of glowing stars
    if (Math.random() < 0.1) { // 10% chance to twinkle
      const brightness = Math.sin(Date.now() * 0.001 + i) * 0.5 + 0.5; // Oscillate brightness
      colors[i] = brightness; // Red
      colors[i + 1] = brightness; // Green
      colors[i + 2] = brightness; // Blue
    }
  }

  starGeometry.attributes.color.needsUpdate = true;
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the cube
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // Animate stars
  animateStars();

  renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Dark/Light Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme in localStorage
if (localStorage.getItem('theme') === 'light') {
  body.classList.add('light-mode');
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
});

// Dynamic Footer
document.addEventListener("DOMContentLoaded", function() {
  const year = new Date().getFullYear();
  document.getElementById("copyright").innerHTML = `&copy; ${year} sadat. All Rights Reserved.`;

  let lastScrollTop = 0;
  window.addEventListener("scroll", function() {
    let footer = document.getElementById("footer");
    let scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      footer.style.opacity = "1";
    } else {
      footer.style.opacity = "0";
    }
    lastScrollTop = scrollTop;
  });
});

// Add event listener for clicks
window.addEventListener('click', () => {
  cube.material.color.set(Math.random() * 0xffffff); // Random color
});

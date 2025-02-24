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

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the cube
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
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
  // Save theme preference in localStorage
  localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
});
document.addEventListener("DOMContentLoaded", function() {
    const year = new Date().getFullYear();
    document.getElementById("copyright").innerHTML = 
        `&copy; ${year} sadat. All Rights Reserved.`;

    let lastScrollTop = 0;
    window.addEventListener("scroll", function() {
        let footer = document.getElementById("footer");
        let scrollTop = window.scrollY || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Scrolling down, show the footer
            footer.style.opacity = "1";
        } else {
            // Scrolling up, hide the footer
            footer.style.opacity = "0";
        }
        lastScrollTop = scrollTop;
    });
});

// Xử lý màn hình vào cửa
const entryButton = document.getElementById('entry-button');
const entryScreen = document.getElementById('entry-screen');
const mainContent = document.getElementById('main-content');
const backgroundMusic = document.getElementById('background-music');

entryButton.addEventListener('click', () => {
    entryScreen.style.display = 'none';
    mainContent.style.display = 'block';
    
    // Bắt đầu phát nhạc
    backgroundMusic.play().catch(error => {
        console.log("Autoplay bị chặn, cần tương tác của người dùng.");
    });
    
    // Khởi tạo không gian 3D sau khi người dùng vào
    initThreeJS();
});


function initThreeJS() {
    // 1. Thiết lập Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.insertBefore(renderer.domElement, document.body.firstChild);
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = 0;
    renderer.domElement.style.left = 0;
    renderer.domElement.style.zIndex = 0;

    // 2. Thêm ánh sáng
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(0, 10, 10);
    scene.add(pointLight);

    // 3. Tạo hộp quà
    const boxGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xe63946, roughness: 0.5 });
    const giftBox = new THREE.Mesh(boxGeometry, boxMaterial);
    giftBox.position.x = -2;
    scene.add(giftBox);

    // 4. Tạo trái tim
    const heartShape = new THREE.Shape();
    const x = 0, y = 0;
    heartShape.moveTo(x + 0.5, y + 0.5);
    heartShape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y);
    heartShape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7);
    heartShape.bezierCurveTo(x - 0.6, y + 1.1, x - 0.3, y + 1.54, x + 0.5, y + 1.9);
    heartShape.bezierCurveTo(x + 1.2, y + 1.54, x + 1.6, y + 1.1, x + 1.6, y + 0.7);
    heartShape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1.0, y);
    heartShape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5);

    const extrudeSettings = { depth: 0.2, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 0.1, bevelThickness: 0.1 };
    const heartGeometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    const heartMaterial = new THREE.MeshStandardMaterial({ color: 0xff007f, metalness: 0.3, roughness: 0.4 });
    const heart = new THREE.Mesh(heartGeometry, heartMaterial);
    heart.position.set(1.5, -1, 0);
    heart.scale.set(0.7, 0.7, 0.7);
    scene.add(heart);

    camera.position.z = 5;

    // 5. Vòng lặp hoạt cảnh
    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Hoạt cảnh xoay cho hộp quà
        giftBox.rotation.x += 0.005;
        giftBox.rotation.y += 0.005;

        // Hoạt cảnh nhịp đập cho trái tim
        const scale = 0.7 + Math.sin(elapsedTime * 3) * 0.05;
        heart.scale.set(scale, scale, scale);
        heart.rotation.y = elapsedTime * 0.5;

        renderer.render(scene, camera);
    }
    animate();

    // 6. Xử lý khi thay đổi kích thước cửa sổ
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
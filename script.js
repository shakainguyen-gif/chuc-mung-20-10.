/**
 * ======================================================
 * SCRIPT CHÍNH CHO TRANG WEB CHÚC MỪNG 20/10 NÂNG CAO
 * ======================================================
 */

// 1. KHỞI TẠO CÁC BIẾN CẦN THIẾT
const loadingScreen = document.querySelector('.loading-screen');
const loadingBar = document.querySelector('.loading-bar');
const canvas = document.querySelector('canvas.webgl');
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};
let giftBox = null;

// 2. QUẢN LÝ TẢI TÀI SẢN (LOADING MANAGER)
const loadingManager = new THREE.LoadingManager(
    // Hoàn thành
    () => {
        gsap.delayedCall(0.5, () => {
            gsap.to(loadingScreen, { opacity: 0, duration: 1, onComplete: () => {
                loadingScreen.style.display = 'none';
            }});
            // Bắt đầu hoạt cảnh mở hộp quà
            if (giftBox) {
                openGiftBoxAnimation();
            }
        });
    },
    // Tiến trình
    (itemUrl, itemsLoaded, itemsTotal) => {
        const progressRatio = itemsLoaded / itemsTotal;
        loadingBar.style.setProperty('--progress', `${progressRatio * 100}%`);
        loadingBar.style.width = `${progressRatio * 100}%`;
    }
);

// 3. KHỞI TẠO SCENE 3D
const scene = new THREE.Scene();

// 4. TẢI MODEL VÀ TEXTURES
const gltfLoader = new THREE.GLTFLoader(loadingManager);
gltfLoader.load(
    // THAY THẾ BẰNG ĐƯỜNG DẪN ĐẾN FILE MODEL HỘP QUÀ.GLB CỦA BẠN
    'https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf', // Ví dụ, bạn nên tìm một model hộp quà
    (gltf) => {
        giftBox = gltf.scene;
        giftBox.scale.set(1.5, 1.5, 1.5);
        giftBox.position.y = -1;
        scene.add(giftBox);
    }
);

// 5. ÁNH SÁNG
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// 6. CAMERA
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 5;
scene.add(camera);

// 7. RENDERER
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// 8. HOẠT CẢNH MỞ HỘP QUÀ (GSAP)
function openGiftBoxAnimation() {
    // Giả sử model của bạn có các phần tên là 'Lid' (nắp) và 'Base' (thân)
    const lid = giftBox.getObjectByName('Lid'); // Thay 'Lid' bằng tên thực tế của nắp hộp
    
    const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });
    
    if (lid) {
        tl.to(lid.position, { y: '+=1', duration: 1.5 })
         .to(lid.rotation, { z: Math.PI * 0.25, duration: 1.5 }, '-=1.5');
    }
    
    // Hoạt cảnh hộp quà bay nhẹ
    tl.to(giftBox.position, { y: '-=0.2', repeat: -1, yoyo: true, duration: 3, ease: 'sine.inOut' }, '-=1');
}

// 9. TƯƠNG TÁC NGƯỜI DÙNG
// Hiệu ứng Parallax Camera theo chuột
const cursor = { x: 0, y: 0 };
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = -(event.clientY / sizes.height - 0.5);
});

// Hiệu ứng hoa giấy khi click
window.addEventListener('click', () => {
    confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 }
    });
});

// 10. KHỞI TẠO CAROUSEL (SWIPER.JS)
const swiper = new Swiper('.swiper-container', {
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
});

// 11. VÒNG LẶP HOẠT CẢNH CHÍNH
const clock = new THREE.Clock();
const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Cập nhật camera cho hiệu ứng parallax
    const parallaxX = cursor.x * 3;
    const parallaxY = cursor.y * 3;
    camera.position.x += (parallaxX - camera.position.x) * 0.05;
    camera.position.y += (parallaxY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    // Render
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};
tick();

// 12. XỬ LÝ THAY ĐỔI KÍCH THƯỚC CỬA SỔ
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Tùy chọn: Bật nhạc khi người dùng tương tác lần đầu
// window.addEventListener('click', () => {
//     const music = document.getElementById('background-music');
//     if (music.paused) {
//         music.play();
//     }
// }, { once: true });

:root {
    --primary-color: #e91e63;
    --secondary-color: #f8bbd0;
    --text-color: #4a148c;
}

body {
    margin: 0;
    font-family: 'Lora', serif;
    color: var(--text-color);
    overflow: hidden;
    background: linear-gradient(270deg, #fce4ec, #e1bee7, #f8bbd0, #fce4ec);
    background-size: 800% 800%;
    animation: gradient-animation 20s ease infinite;
}

@keyframes gradient-animation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

/* Màn hình tải */
.loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 100;
    transition: opacity 1s ease;
}

.loading-bar {
    width: 80%;
    max-width: 300px;
    height: 5px;
    background-color: #eee;
    border-radius: 5px;
    overflow: hidden;
}

.loading-bar::before {
    content: '';
    display: block;
    width: 0;
    height: 100%;
    background-color: var(--primary-color);
    transition: width 0.3s ease;
}

.loading-text {
    margin-top: 15px;
    font-family: 'Dancing Script', cursive;
    font-size: 1.5rem;
    color: var(--primary-color);
}

/* Canvas 3D */
.webgl {
    position: fixed;
    top: 0;
    left: 0;
    outline: none;
    z-index: 1;
}

/* Nội dung chính */
.content {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
    pointer-events: none; /* Cho phép click xuyên qua để tương tác với canvas */
}

.main-title {
    font-family: 'Dancing Script', cursive;
    font-size: clamp(3rem, 10vw, 6rem);
    color: transparent;
    background-image: url('https://i.pinimg.com/originals/c4/2b/9a/c42b9a1505293973f55e3364432c6b43.gif');
    background-size: cover;
    background-position: center;
    -webkit-background-clip: text;
    background-clip: text;
    animation: glitter-move 20s linear infinite;
    margin-bottom: 20px;
}

@keyframes glitter-move {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

/* Carousel Lời Chúc */
.swiper-container {
    width: 80%;
    max-width: 700px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 15px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    pointer-events: all; /* Kích hoạt lại tương tác cho carousel */
}

.swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
}

.quote {
    font-size: 1.1rem;
    line-height: 1.6;
    font-style: italic;
}

.swiper-button-next,
.swiper-button-prev {
    color: var(--primary-color);
}

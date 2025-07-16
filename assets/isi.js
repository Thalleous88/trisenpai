// Menjalankan kode setelah seluruh konten halaman (DOM) selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    
    // --- SETUP ANIMASI 3D YANG LEBIH HIDUP DAN RAPI ---
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        // ... (KODE ANIMASI 3D TORUSKNOT ANDA TETAP SAMA, TIDAK DIUBAH) ...
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true
        });
        scene.fog = new THREE.FogExp2(0x020617, 0.05);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.position.setZ(7); 
        const torusKnotGeometry = new THREE.TorusKnotGeometry(1.8, 0.4, 150, 20);
        const torusKnotMaterial = new THREE.MeshPhysicalMaterial({ 
            color: 0x22d3ee,
            metalness: 0.9,
            roughness: 0.05,
            transmission: 0.7,
            thickness: 1.8,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1
        });
        const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
        scene.add(torusKnot);
        const satelliteGeometry = new THREE.IcosahedronGeometry(0.2, 1);
        const satelliteMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 });
        const satellite1 = new THREE.Mesh(satelliteGeometry, satelliteMaterial);
        const satellite2 = new THREE.Mesh(satelliteGeometry, satelliteMaterial);
        scene.add(satellite1, satellite2);
        const moonGeometry = new THREE.SphereGeometry(1, 32, 32);
        const moonMaterial = new THREE.MeshStandardMaterial({ color: 0xbbbbbb, roughness: 0.9 });
        const moon = new THREE.Mesh(moonGeometry, moonMaterial);
        moon.position.set(-15, 5, -30);
        scene.add(moon);
        const starParticlesGeometry = new THREE.BufferGeometry();
        const starParticlesCount = 25000;
        const starPosArray = new Float32Array(starParticlesCount * 3);
        for (let i = 0; i < starParticlesCount * 3; i++) {
            starPosArray[i] = (Math.random() - 0.5) * 250; 
        }
        starParticlesGeometry.setAttribute('position', new THREE.BufferAttribute(starPosArray, 3));
        const starParticlesMaterial = new THREE.PointsMaterial({ size: 0.06, color: 0xffffff, transparent: true, opacity: 0.6 });
        const starField = new THREE.Points(starParticlesGeometry, starParticlesMaterial);
        scene.add(starField);
        const meteorGeometry = new THREE.BufferGeometry();
        const meteorCount = 15;
        const meteorPosArray = new Float32Array(meteorCount * 3);
        for (let i = 0; i < meteorCount * 3; i++) {
            meteorPosArray[i] = (Math.random() * 200) - 100;
        }
        meteorGeometry.setAttribute('position', new THREE.BufferAttribute(meteorPosArray, 3));
        const meteorMaterial = new THREE.PointsMaterial({
            size: 0.2,
            color: 0x67e8f9, 
            blending: THREE.AdditiveBlending,
            transparent: true,
            opacity: 0.7
        });
        const meteorShower = new THREE.Points(meteorGeometry, meteorMaterial);
        scene.add(meteorShower);
        const sparkleGeometry = new THREE.BufferGeometry();
        const sparkleCount = 400;
        const sparklePosArray = new Float32Array(sparkleCount * 3);
        for (let i = 0; i < sparkleCount; i++) {
            const x = (Math.random() - 0.5) * 2;
            const y = (Math.random() - 0.5) * 2;
            const z = (Math.random() - 0.5) * 2;
            const d = 1 / Math.sqrt(x*x + y*y + z*z);
            const radius = 3 + Math.random() * 2;
            sparklePosArray[i * 3] = x * d * radius;
            sparklePosArray[i * 3 + 1] = y * d * radius;
            sparklePosArray[i * 3 + 2] = z * d * radius;
        }
        sparkleGeometry.setAttribute('position', new THREE.BufferAttribute(sparklePosArray, 3));
        const sparkleMaterial = new THREE.PointsMaterial({
            size: 0.1,
            color: 0xffffff,
            blending: THREE.AdditiveBlending,
            transparent: true,
            depthWrite: false,
        });
        const sparkles = new THREE.Points(sparkleGeometry, sparkleMaterial);
        scene.add(sparkles);
        const pointLight = new THREE.PointLight(0xffffff, 1.5);
        pointLight.position.set(5, 5, 5);
        const pointLight2 = new THREE.PointLight(0xff00ff, 2);
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        scene.add(pointLight, pointLight2, ambientLight);
        let mouseX = 0, mouseY = 0;
        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        });
        let lastScrollY = window.scrollY;
        const clock = new THREE.Clock();
        const animate = () => {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();
            torusKnot.rotation.y += 0.002;
            torusKnot.rotation.x += 0.001;
            torusKnot.position.y = Math.sin(elapsedTime * 0.5) * 0.1;
            const currentScrollY = window.scrollY;
            const delta = currentScrollY - lastScrollY;
            lastScrollY = currentScrollY;
            torusKnot.rotation.x += delta * 0.001;
            camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
            camera.position.y += (mouseY * 2 - camera.position.y) * 0.02;
            camera.lookAt(torusKnot.position);
            satellite1.position.x = Math.sin(elapsedTime * 0.6) * 4;
            satellite1.position.z = Math.cos(elapsedTime * 0.6) * 4;
            satellite2.position.x = Math.cos(elapsedTime * 0.4) * 5;
            satellite2.position.y = Math.sin(elapsedTime * 0.4) * 5;
            satellite2.position.z = Math.sin(elapsedTime * 0.4) * 5;
            pointLight2.position.x = Math.sin(elapsedTime * 0.8) * 6;
            pointLight2.position.y = Math.cos(elapsedTime * 0.8) * 6;
            pointLight2.position.z = Math.cos(elapsedTime * 0.8) * 3;
            starField.rotation.y += 0.0001;
            meteorShower.position.x -= 0.1;
            meteorShower.position.y -= 0.05;
            if (meteorShower.position.x < -100) {
                meteorShower.position.x = 100;
                meteorShower.position.y = 0;
            }
            sparkles.rotation.y -= 0.0005;
            const sparkleTime = elapsedTime * 3;
            sparkleMaterial.opacity = Math.sin(sparkleTime * 2) * 0.25 + 0.75;
            sparkleMaterial.size = 0.01 + Math.sin(sparkleTime) * 0.01;
            renderer.render(scene, camera);
        };
        animate();
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    // --- Logic untuk Animasi Saat Scroll (AOS - Animate On Scroll) ---
    const aosElements = document.querySelectorAll('[data-aos]');
    const aosObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                aosObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    aosElements.forEach(el => aosObserver.observe(el));

    // --- Variabel menu mobile dideklarasikan di sini agar bisa diakses oleh fungsi lain ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    // --- Logic untuk Menu Mobile (Hamburger Menu) ---
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Logic untuk Accordion Course Outline BARU ---
    const outlineItems = document.querySelectorAll('.outline-item');
    outlineItems.forEach(item => {
        const question = item.querySelector('.outline-question');
        question.addEventListener('click', () => {
            outlineItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('open');
                }
            });
            item.classList.toggle('open');
        });
    });

    // --- Logic untuk Accordion FAQ ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isAlreadyOpen = item.classList.contains('open');
            faqItems.forEach(otherItem => otherItem.classList.remove('open'));
            if (!isAlreadyOpen) item.classList.toggle('open');
        });
    });
    
    // --- [PERBAIKAN FINAL] Logic untuk Smooth Scrolling saat link navigasi di-klik ---
    document.querySelectorAll('.smooth-scroll').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); 
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // --- Animasi Hitung Mundur (Counter-Up) untuk IPK ---
    const gpaElement = document.querySelector('.w-32.h-32 .text-4xl');
    if (gpaElement) {
        const targetGpa = 3.95;
        const animateCountUp = (el) => {
            let current = 0;
            const increment = targetGpa / 100;
            const duration = 20;
            const timer = setInterval(() => {
                current += increment;
                if (current >= targetGpa) {
                    clearInterval(timer);
                    el.textContent = `${targetGpa.toFixed(2)}+`;
                } else {
                    el.textContent = `${current.toFixed(2)}+`;
                }
            }, duration);
        };

        const gpaObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCountUp(gpaElement);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        gpaObserver.observe(gpaElement.parentElement.parentElement);
    }

    // --- Efek Tilt 3D yang lebih kuat pada Kartu Harga ---
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; 
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
    
    // --- [BARU] Efek Tilt 3D pada Kartu FAQ ---
    const faqCards = document.querySelectorAll('.faq-card');
    faqCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -5; // Efek lebih subtil untuk FAQ
            const rotateY = ((x - centerX) / centerX) * 5;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
});

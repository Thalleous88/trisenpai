document.addEventListener('DOMContentLoaded', () => {
    // === ELEMEN PENTING ===
    const landingSection = document.getElementById('landing-section');
    const animationSection = document.getElementById('animation-section');
    const startBtn = document.getElementById('start-btn');
    const skipBtn = document.getElementById('skip-btn');
    const typingSound = document.getElementById('typing-sound');
    const preAnimationStars = document.getElementById('pre-animation-stars');

    // Fungsi pembantu untuk membuat jeda
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Fungsi pembantu untuk efek mengetik
    const typeText = (elementId, text) => {
        const element = document.querySelector(elementId);
        element.innerHTML = '';
        element.classList.remove('hidden');
        element.classList.add('visible');
        
        if (typingSound && typingSound.readyState >= 2) {
            typingSound.currentTime = 0;
            typingSound.play().catch(e => {});
        }

        return new Promise(resolve => {
            new Typed(elementId, {
                strings: [text],
                typeSpeed: 50,
                showCursor: true,
                cursorChar: '_',
                onComplete: (self) => {
                    self.cursor.remove();
                    typingSound?.pause();
                    resolve();
                }
            });
        });
    };

    // Fungsi pembantu lainnya
    const showElement = (elementId) => {
        const element = document.querySelector(elementId);
        if(!element) return;
        element.classList.remove('hidden');
        setTimeout(() => element.classList.add('visible'), 50);
    };
    
    const hideElement = (elementId) => {
        const element = document.querySelector(elementId);
        if(!element) return;
        element.classList.remove('visible');
        setTimeout(() => { element.classList.add('hidden'); }, 500);
    };

    // Fungsi utama yang menjalankan urutan cerita
    async function playIntroSequence() {
        // Adegan 0: Bintang Kelap-Kelip
        if (preAnimationStars) {
            preAnimationStars.classList.remove('hidden');
            await wait(3000); 
            preAnimationStars.classList.add('hidden');
        }
        await wait(500);

        // Adegan 1: Prolog Kerajaan Kuno
        await typeText('#text1', 'Dahulu kala...');
        await wait(1000); // Durasi dipercepat
        await typeText('#text2', '...sebuah kerajaan berdiri megah di atas pilar Logika dan Sihir.');
        await wait(1000); // Durasi dipercepat
        await typeText('#text3', 'Kekuatan mereka berasal dari Rune kuno yang terukir dalam barisan "Source Code".');
        await wait(1000); // Durasi dipercepat
        hideElement('#text1'); hideElement('#text2'); hideElement('#text3');
        await wait(1000);

        // Adegan 2: Kekuatan yang Memudar
        await typeText('#text1', 'Namun seiring waktu, kekuatan Rune itu mulai memudar.');
        await wait(1000);
        await typeText('#text2', 'Struktur kode para leluhur terlupakan, dan kerajaan jatuh dalam keheningan.');
        await wait(1000); // Durasi dipercepat
        hideElement('#text1'); hideElement('#text2');
        await wait(1000);

        // Adegan 3: Ramalan
        await typeText('#text1', 'Sebuah ramalan kuno berbicara tentang seorang terpilih...');
        await wait(1000);
        await typeText('#text2', `...seorang 'Rune Master' baru yang mampu membaca kembali 'Source Code' kuno.`);
        await wait(1000); // Durasi dipercepat
        hideElement('#text1'); hideElement('#text2');
        await wait(1000);

        // Adegan 4: Panggilan untuk Pengguna
        await typeText('#text1', 'Seseorang yang memiliki logika untuk membangun...');
        await wait(1000);
        await typeText('#text2', '...dan kreativitas untuk menciptakan.');
        await wait(1000);
        await typeText('#text3', 'Seseorang... sepertimu.');
        await wait(1000);
        hideElement('#text1'); hideElement('#text2'); hideElement('#text3');
        await wait(1000);

        // Adegan 5: Kata-kata Akhir
        await typeText('#text4', 'Gerbang Kode telah terbuka, Arsitek.');
        await wait(1000);
        await typeText('#text5', 'Takdirmu menanti.');
        await wait(1500);
        
        // Adegan 6: Redirect Otomatis
        window.location.href = 'isi.html'; // Mengarahkan ke login.html
    }

    // LOGIKA UTAMA: MEMULAI ANIMASI
    startBtn.addEventListener('click', async () => {
        landingSection.style.display = 'none';
        animationSection.classList.remove('hidden');
        if (skipBtn) skipBtn.classList.remove('hidden');

        try {
            if (typingSound) {
                await typingSound.play();
                typingSound.pause();
            }
        } catch (error) {
            console.error("Gagal menginisialisasi audio ketikan:", error);
        }
        
        playIntroSequence();
    });
});
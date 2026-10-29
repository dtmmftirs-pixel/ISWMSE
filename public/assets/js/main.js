new WOW().init();

// Loader hide
$(window).on('load', function() {
    $('#pageLoader').fadeOut(500);
});
setTimeout(function() {
    $('#pageLoader').fadeOut(500);
}, 800);

// Custom notification toast
function showToast(title, message) {
    $('#toastTitle').text(title);
    $('#toastMessage').text(message);
    $('#customToast').fadeIn().delay(3500).fadeOut();
}

// Integrasi ke Serverless Function (/api/subscribe)
async function handleSubscribe(e) {
    e.preventDefault();
    const email = $('#subEmail').val();
    if (!email) return;

    try {
        const response = await fetch('/api/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        const result = await response.json();

        if (response.ok) {
            showToast("Subscribed Successfully!", result.message);
            $('#subEmail').val('');
        } else {
            showToast("Subscription Notice", result.error || "Please try again later.");
        }
    } catch (error) {
        // Fallback jika dijalankan lokal tanpa vercel dev
        showToast("Subscribed Successfully!", "Thank you! Latest updates will be sent to " + email);
        $('#subEmail').val('');
    }
}

// Seamless Tab Navigation
function switchTab(tabName) {
    $('.main-tab-content').hide();
    $('#tab-' + tabName).fadeIn(300);

    $('.navbar-nav .nav-link').removeClass('nav-active');
    $('#nav-' + tabName).addClass('nav-active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Animated Numbers
function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    if (!obj) return;
    let range = end - start;
    let current = start;
    let increment = end > start ? 1 : -1;
    let stepTime = Math.abs(Math.floor(duration / range));
    let timer = setInterval(function () {
        current += increment;
        obj.innerHTML = current;
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}

// Trigger animasi angka saat halaman dimuat
animateValue("count1", 1, 4, 1000);
animateValue("count2", 1, 4, 1000);
animateValue("count3", 1, 15, 1500);
animateValue("count4", 1, 20, 2500);
animateValue("prog-count1", 1, 2, 1000);
animateValue("prog-count2", 1, 4, 1000);
animateValue("prog-count3", 1, 15, 1500);

// Participating Universities Data Slider (Home & Participant tab)
const images = [
    "https://www.its.ac.id/tmaterial/iswmse/assets/img/departemen-1.jpg", 
    "https://www.its.ac.id/tmaterial/iswmse/assets/img/departemen-2.jpg", 
    "https://www.its.ac.id/tmaterial/iswmse/assets/img/departemen-3.jpg", 
    "https://www.its.ac.id/tmaterial/iswmse/assets/img/departemen-4.jpg"
];
const logos = [
    "https://www.its.ac.id/tmaterial/iswmse/assets/img/logo-its.png", 
    "https://www.its.ac.id/tmaterial/iswmse/assets/img/logo-ntusc.png", 
    "https://www.its.ac.id/tmaterial/iswmse/assets/img/logo-kyutech.png", 
    "https://www.its.ac.id/tmaterial/iswmse/assets/img/logo-cwnu.png"
];
const headerBgs = [
    "linear-gradient(rgba(0,0,0,0.65), rgba(5,5,5,0.9)), url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80')",
    "linear-gradient(rgba(0,0,0,0.65), rgba(5,5,5,0.9)), url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80')",
    "linear-gradient(rgba(0,0,0,0.65), rgba(5,5,5,0.9)), url('https://images.unsplash.com/photo-1492538366914-7bc2a7b6580d?auto=format&fit=crop&w=1920&q=80')",
    "linear-gradient(rgba(0,0,0,0.65), rgba(5,5,5,0.9)), url('https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1920&q=80')"
];
const titleValues = [
    'Department of <span class="color-main">Materials and Metallurgical</span> Engineering',
    'Department of <span class="color-main">Materials Science</span> and Engineering',
    'Department of <span class="color-main">Materials Science</span> and Engineering',
    'School of <span class="color-main">Materials Science</span> and Engineering',
];
const subTitleValues = [
    "Sepuluh Nopember Institute of Technology",
    "National Taiwan University of Science and Technology",
    "Kyushu Institute of Technology",
    "Changwon National University",
];
const subTitle2Values = ["Indonesia", "Taiwan", "Japan", "South Korea"];
const descriptionValues = [
    "Department of Materials and Metallurgical Engineering has the scientific field, expertise, and profession of Materials Engineering (Materials Science). In general, Materials and Metallurgical Engineering studies the properties of metal, ceramic, polymer, and composite materials along with their engineering technology. Materials engineering technology is related to material structures and manufacturing processes such as casting technology, welding, heat treatment, and others",
    "The Department of Materials Science and Engineering, established in 1975, is a highly respected institution within the Taiwanese materials science community. By adopting a unique interdisciplinary approach, we provide the scholarly training needed to address the whole range of materials, from complex materials in polymer engineering, to electronic, optoelectronic, ceramic, and metallic materials, to advanced materials in nanotechnology and biotechnology.",
    "Materials Science and Engineering is one of the core fields associated with materials such as steels, alloys, semiconductors, ceramics, and composites. We investigate the relationship between material properties and their atomic and/or nanoscopic structures, and design new materials. We also conduct applied research of processing, bonding, recycling, and so forth, for industrial importance. Our goal is to contribute to solutions for global issues such as environmental problems, through application of materials.",
    "New materials engineering is an interdisciplinary field that explores the correlation between the structure and properties of materials and applies it to various fields of science and engineering. The structure and properties of materials handled in new materials engineering start from the atomic or molecular level, and the development of new materials is an essential basic condition for the implementation of cutting-edge science and technology."
];
const webParticipantValues = [
    'https://www.its.ac.id/tmaterial/id/beranda/',
    'https://mse.ntust.edu.tw/index.php',
    'http://w3.matsc.kyutech.ac.jp/',
    'https://www.changwon.ac.kr/material/main.do',
];

let currentIndex = 0;

function updateUniversityContent() {
    // Home page slider elements
    $('#home-uni-image').css('opacity', 0);
    setTimeout(() => {
        $('#home-uni-image').attr('src', images[currentIndex]);
        $('#home-uni-image').css('opacity', 1);
    }, 300);
    $('#home-uni-title').html(titleValues[currentIndex]);
    $('#home-uni-subtitle').text(subTitleValues[currentIndex]);
    $('#home-uni-subtitle2').text(subTitle2Values[currentIndex]);
    $('#home-uni-web').attr('href', webParticipantValues[currentIndex]);

    // Participant tab elements
    $('#uni-header-bg').css('background-image', headerBgs[currentIndex]);
    $('#uni-logo').attr('src', logos[currentIndex]);
    $('#uni-title').html(titleValues[currentIndex]);
    $('#uni-subtitle').text(subTitleValues[currentIndex]);
    $('#uni-subtitle2').text(subTitle2Values[currentIndex]);
    $('#uni-description').text(descriptionValues[currentIndex]);
    $('#uni-web').attr('href', webParticipantValues[currentIndex]);
}

$('#home-uni-left, #uni-left').on('click', function() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateUniversityContent();
});

$('#home-uni-right, #uni-right').on('click', function() {
    currentIndex = (currentIndex + 1) % images.length;
    updateUniversityContent();
});

updateUniversityContent();

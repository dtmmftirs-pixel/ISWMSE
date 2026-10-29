document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. SPA Navigation Engine (Tab System)
  // ========================================== 
  const navLinks = document.querySelectorAll('.nav-route');
  const sections = document.querySelectorAll('.view-section');

  function switchTab(targetId) {
    sections.forEach(sec => sec.classList.remove('active'));
    navLinks.forEach(link => {
      if (link.getAttribute('data-target') === targetId) {
        link.classList.add('nav-active');
      } else {
        link.classList.remove('nav-active');
      }
    });

    const activeSection = document.getElementById(targetId);
    if (activeSection) {
      activeSection.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Trigger counter animation jika masuk halaman home atau program
      if (targetId === 'home') runCounters('home');
      if (targetId === 'program') runCounters('program');
    }
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-target');
      if (targetId) {
        switchTab(targetId);
        // Collapse mobile menu jika terbuka
        const navbarCollapse = document.getElementById('navbarNav');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) bsCollapse.hide();
        }
      }
    });
  });

  // ==========================================
  // 2. Animated Counter Logic
  // ==========================================
  const counterDone = { home: false, program: false };

  function animateValue(elem, start, end, duration) {
    if (!elem) return;
    let current = start;
    const range = end - start;
    const stepTime = Math.abs(Math.floor(duration / range));
    const timer = setInterval(() => {
      current += 1;
      elem.textContent = current;
      if (current >= end) {
        elem.textContent = end;
        clearInterval(timer);
      }
    }, stepTime);
  }

  function runCounters(type) {
    if (type === 'home' && !counterDone.home) {
      animateValue(document.getElementById('home-count1'), 1, 4, 800);
      animateValue(document.getElementById('home-count2'), 1, 4, 800);
      animateValue(document.getElementById('home-count3'), 1, 15, 1000);
      animateValue(document.getElementById('home-count4'), 1, 20, 1200);
      counterDone.home = true;
    } else if (type === 'program' && !counterDone.program) {
      animateValue(document.getElementById('prog-count1'), 1, 2, 600);
      animateValue(document.getElementById('prog-count2'), 1, 4, 800);
      animateValue(document.getElementById('prog-count3'), 1, 15, 1000);
      counterDone.program = true;
    }
  }

  runCounters('home'); // Jalankan counter awal

  // ==========================================
  // 3. Carousel Slider Data (Participant Universities)
  // ==========================================
  const universities = [
    {
      title: 'Department of <span class="color-main">Materials and Metallurgical</span> Engineering',
      subTitle: 'Sepuluh Nopember Institute of Technology',
      country: 'Indonesia',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
      logo: 'https://www.its.ac.id/tmaterial/wp-content/uploads/sites/48/2020/06/logo-its.png',
      desc: 'Department of Materials and Metallurgical Engineering has the scientific field, expertise, and profession of Materials Engineering. In general, it studies properties of metal, ceramic, polymer, and composite materials along with manufacturing processes like casting, welding, and heat treatment.',
      url: 'https://www.its.ac.id/tmaterial/id/beranda/'
    },
    {
      title: 'Department of <span class="color-main">Materials Science</span> and Engineering',
      subTitle: 'National Taiwan University of Science and Technology',
      country: 'Taiwan',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
      logo: 'https://www.ntust.edu.tw/var/file/0/1000/msys_1000_5760824_43232.png',
      desc: 'Established in 1975, the department provides scholarly training needed to address the whole range of materials, from polymers to electronic, optoelectronic, ceramic, and advanced materials in nanotechnology and biotechnology.',
      url: 'https://mse.ntust.edu.tw/index.php'
    },
    {
      title: 'Department of <span class="color-main">Materials Science</span> and Engineering',
      subTitle: 'Kyushu Institute of Technology',
      country: 'Japan',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
      logo: 'https://www.kyutech.ac.jp/assets/img/common/logo.svg',
      desc: 'Investigating atomic and nanoscopic structures to design new materials including steels, semiconductors, and composites. Conducting applied research on recycling, bonding, and global sustainability.',
      url: 'http://w3.matsc.kyutech.ac.jp/'
    },
    {
      title: 'School of <span class="color-main">Materials Science</span> and Engineering',
      subTitle: 'Changwon National University',
      country: 'South Korea',
      image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1200&q=80',
      logo: 'https://www.changwon.ac.kr/upload/editor/images/202103/20210330105315802_V7V8K2G4.png',
      desc: 'Exploring the correlation between structure and properties of materials, from atomic to macro scale, paving the road for cutting-edge industrial technology and cross-border research.',
      url: 'https://www.changwon.ac.kr/material/main.do'
    }
  ];

  let currentUniIdx = 0;

  function updateUniversityCard(idx) {
    const item = universities[idx];
    const imgElem = document.getElementById('uni-img');
    const titleElem = document.getElementById('uni-title');
    const subElem = document.getElementById('uni-sub');
    const countryElem = document.getElementById('uni-country');
    const linkElem = document.getElementById('uni-link');

    if (imgElem) {
      imgElem.style.opacity = '0.2';
      setTimeout(() => {
        imgElem.src = item.image;
        imgElem.style.opacity = '1';
      }, 200);
    }
    if (titleElem) titleElem.innerHTML = item.title;
    if (subElem) subElem.textContent = item.subTitle;
    if (countryElem) countryElem.textContent = item.country;
    if (linkElem) linkElem.href = item.url;
  }

  const prevBtn = document.getElementById('btn-uni-prev');
  const nextBtn = document.getElementById('btn-uni-next');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentUniIdx = (currentUniIdx - 1 + universities.length) % universities.length;
      updateUniversityCard(currentUniIdx);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentUniIdx = (currentUniIdx + 1) % universities.length;
      updateUniversityCard(currentUniIdx);
    });
  }

  // ==========================================
  // 4. Newsletter Subscription Form Handler
  // ==========================================
  const subForm = document.getElementById('subscribe-form');
  const subMsg = document.getElementById('subscribe-msg');

  if (subForm) {
    subForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('subscribe-email');
      const submitBtn = subForm.querySelector('button[type="submit"]');

      if (!emailInput || !emailInput.value) return;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span>';

      try {
        const res = await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: emailInput.value.trim() })
        });

        const data = await res.json();

        if (res.ok) {
          subMsg.className = 'mt-2 text-success small';
          subMsg.textContent = data.message || 'Subscription successful!';
          emailInput.value = '';
        } else {
          subMsg.className = 'mt-2 text-warning small';
          subMsg.textContent = data.message || 'Submission failed.';
        }
      } catch (err) {
        subMsg.className = 'mt-2 text-danger small';
        subMsg.textContent = 'Serverless function offline or unreachable.';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send';
        setTimeout(() => { subMsg.textContent = ''; }, 6000);
      }
    });
  }
});

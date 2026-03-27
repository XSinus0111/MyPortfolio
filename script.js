/* ══════════════════════════════════════════════════
     LINK SOSIAL MEDIA — GANTI DI SINI SAJA, SEKALI
     Otomatis berlaku di Home dan Footer sekaligus.
     Contoh:
       GITHUB_URL    = 'https://github.com/assyam'
       INSTAGRAM_URL = 'https://instagram.com/assyam'
     ══════════════════════════════════════════════════ */
  const GITHUB_URL    = 'https://github.com/XSinus0111';
  const INSTAGRAM_URL = 'https://instagram.com/setelah.hujan25';

  // Terapkan ke SEMUA icon sosmed (home + footer) sekaligus lewat ID
  ['home-gh',  'footer-gh' ].forEach(id => { const el = document.getElementById(id); if(el) el.href = GITHUB_URL;    });
  ['home-ig',  'footer-ig' ].forEach(id => { const el = document.getElementById(id); if(el) el.href = INSTAGRAM_URL; });

  /* ── Active nav highlight on scroll ── */
  const secs = document.querySelectorAll('section');
  const links = document.querySelectorAll('.nav-links a[data-s]');

  function setActive() {
    let cur = '';
    secs.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) cur = s.id;
    });
    links.forEach(a => {
      a.classList.toggle('active', a.dataset.s === cur);
    });
  }

  window.addEventListener('scroll', setActive, { passive: true });
  setActive();

  /* ── Smooth scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  /* ═══════════════════════════════════════════════════════════
     CONTACT FORM — ISI SALAH SATU OPSI DI BAWAH
     ═══════════════════════════════════════════════════════════

     OPSI A · Formspree (REKOMENDASI — langsung masuk inbox):
       1. Daftar gratis di https://formspree.io
       2. Buat form baru → salin endpoint kamu
       3. Tempel di sini, contoh:
          const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xyzabcde';

     OPSI B · mailto (buka app email user):
       Isi email kamu di sini, contoh:
          const MY_EMAIL = 'assyam@gmail.com';
     ═══════════════════════════════════════════════════════════ */

  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xnjggdje'; // ← Opsi A: tempel endpoint Formspree
  const MY_EMAIL           = 'biribiri3412@gmail.com';          // ← Opsi B: isi email kamu

  const sendBtn  = document.getElementById('sendBtn');
  const btnLabel = document.getElementById('btnLabel');

  sendBtn.addEventListener('click', async () => {
    const name  = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const msg   = document.getElementById('cf-msg').value.trim();

    if (!name || !email || !msg) {
      shake(sendBtn);
      showToast('⚠️ Mohon isi semua field terlebih dahulu.', 'warn');
      return;
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValid) {
      shake(sendBtn);
      showToast('⚠️ Format email tidak valid.', 'warn');
      return;
    }

    /* ── OPSI A: Formspree ── */
    if (FORMSPREE_ENDPOINT !== 'FORMSPREE_ENDPOINT_HERE') {
      sendBtn.disabled = true;
      btnLabel.textContent = 'Sending...';
      try {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ name, email, message: msg })
        });
        if (res.ok) {
          btnLabel.textContent = '✓ Terkirim!';
          showToast('✅ Pesan berhasil dikirim! Terima kasih, ' + name + '.', 'ok');
          clearForm();
          setTimeout(() => { btnLabel.textContent = 'Send Massage'; sendBtn.disabled = false; }, 3000);
        } else {
          throw new Error('Gagal');
        }
      } catch {
        btnLabel.textContent = 'Send Massage';
        sendBtn.disabled = false;
        showToast('❌ Gagal mengirim. Coba lagi.', 'err');
      }
      return;
    }

    /* ── OPSI B: mailto ── */
    if (MY_EMAIL !== 'YOUR_EMAIL_HERE') {
      const subject = encodeURIComponent('Pesan dari ' + name);
      const body    = encodeURIComponent('Nama: ' + name + '\nEmail: ' + email + '\n\n' + msg);
      window.location.href = 'mailto:' + MY_EMAIL + '?subject=' + subject + '&body=' + body;
      showToast('📧 Membuka app email kamu...', 'ok');
      clearForm();
      return;
    }

    showToast('⚠️ Belum ada email/endpoint yang diisi di kode.', 'warn');
  });

  function clearForm() {
    document.getElementById('cf-name').value  = '';
    document.getElementById('cf-email').value = '';
    document.getElementById('cf-msg').value   = '';
  }

  function shake(el) {
    el.style.animation = 'none';
    el.offsetHeight;
    el.style.animation = 'shake .4s ease';
  }

  function showToast(text, type) {
    const existing = document.getElementById('toast');
    if (existing) existing.remove();
    const t = document.createElement('div');
    t.id = 'toast';
    t.textContent = text;
    const colors = { ok: '#3de8a0', warn: '#f0883e', err: '#ff7b72' };
    Object.assign(t.style, {
      position: 'fixed', bottom: '32px', right: '32px', zIndex: '9999',
      background: '#21262d', border: '1px solid ' + (colors[type] || '#3de8a0'),
      color: '#e6edf3', fontFamily: "'Source Code Pro', monospace",
      fontSize: '.85rem', padding: '14px 20px', borderRadius: '8px',
      boxShadow: '0 4px 24px rgba(0,0,0,.4)',
      animation: 'fadeInUp .3s ease'
    });
    document.body.appendChild(t);
    setTimeout(() => { t.style.animation = 'fadeOut .3s ease'; setTimeout(() => t.remove(), 300); }, 3500);
  }
/* ── Hamburger menu toggle ── */
const navToggle = document.getElementById('navToggle');
const navLinksEl = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinksEl.classList.toggle('open');
});

// Close menu when a link is clicked
navLinksEl.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinksEl.classList.remove('open');
  });
});

const CV_FILE = 'documents/Thaïs-Parisot-FlowCV-Resume-20251116.pdf';

document.addEventListener('DOMContentLoaded', () => {
  const downloadBtn = document.getElementById('downloadBtn');
  const redirectBtn = document.getElementById('redirectBtn');

  console.log('[CV] downloadBtn:', downloadBtn);
  console.log('[CV] redirectBtn:', redirectBtn);
  console.log('[CV] CV_FILE:', CV_FILE);

  if (!downloadBtn || !redirectBtn) {
    console.error('[CV] Boutons introuvables. Vérifie les IDs dans le HTML.');
    return;
  }

  // Télécharger
  downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = CV_FILE;
    link.download = 'CV-Thaîs-Parisot.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('Téléchargement du CV…');
  });

  // Ouvrir
  redirectBtn.addEventListener('click', () => {
    window.open(CV_FILE, '_blank');
    showNotification('Ouverture du CV…');
  });

  // Animations
  animateTimeline();
  animateSkillBlocks();

  const profilePhoto = document.querySelector('.profile-photo');
  if (profilePhoto) {
    setTimeout(() => {
      profilePhoto.style.opacity = '1';
      profilePhoto.style.transform = 'scale(1)';
    }, 250);
  }
});

// Notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  notification.style.background = 'linear-gradient(135deg, #FF6B35, #FF8C42)';
  notification.style.animation = 'slideIn 0.3s ease';

  if (!document.querySelector('#notification-style')) {
    const style = document.createElement('style');
    style.id = 'notification-style';
    style.textContent = `
      @keyframes slideIn { from { transform: translateX(400px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(400px); opacity: 0; } }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 2500);
}

// Timeline animation
function animateTimeline() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  if (!timelineItems.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

  timelineItems.forEach(item => observer.observe(item));
}

// Animation d'entrée pour les skill blocks
function animateSkillBlocks() {
  const skillBlocks = document.querySelectorAll('.skill-block');
  if (!skillBlocks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 120);
      }
    });
  }, { threshold: 0.1 });

  skillBlocks.forEach(block => {
    block.style.opacity = '0';
    block.style.transform = 'translateY(18px)';
    block.style.transition = 'all 0.6s ease';
    observer.observe(block);
  });
}
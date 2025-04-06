document.addEventListener('DOMContentLoaded', function() {
  // Initialize Lucide icons
  lucide.createIcons();
  
  // Prevent zooming on the webpage
  window.addEventListener("wheel", (e) => {
    const isPinching = e.ctrlKey;
    if (isPinching) e.preventDefault();
  }, { passive: false });
  
  // Theme toggle functionality
  const themeToggle = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;
  
  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    htmlElement.classList.add('dark');
  }
  
  // Toggle theme on button click
  themeToggle.addEventListener('click', () => {
    htmlElement.classList.toggle('dark');
    const isDark = htmlElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
  
  // Interactive sector cards
  const sectorCards = document.querySelectorAll('.sector-card');
  sectorCards.forEach(card => {
    card.addEventListener('click', () => {
      const sectorName = card.querySelector('h3').innerText;
      // Scroll to the corresponding sector table
      const sectorTables = document.querySelectorAll('section:nth-child(3) > div');
      for (let i = 0; i < sectorTables.length; i++) {
        const tableName = sectorTables[i].querySelector('h3').innerText;
        if (tableName.includes(sectorName)) {
          sectorTables[i].scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Highlight the table briefly
          sectorTables[i].classList.add('ring-2', 'ring-blue-500', 'ring-opacity-50');
          setTimeout(() => {
            sectorTables[i].classList.remove('ring-2', 'ring-blue-500', 'ring-opacity-50');
          }, 1500);
          break;
        }
      }
    });
  });
  
  // Make table rows interactive
  const tableRows = document.querySelectorAll('tbody tr');
  tableRows.forEach(row => {
    row.style.cursor = 'pointer';
    row.addEventListener('click', () => {
      const companyName = row.children[1].innerText;
      const stockCode = row.children[0].innerText;
      // Show a small toast notification
      showToast(`已选择: ${companyName} (${stockCode})`);
    });
  });
  
  // Toast notification function
  function showToast(message) {
    // Remove any existing toasts
    const existingToasts = document.querySelectorAll('.toast-notification');
    existingToasts.forEach(toast => toast.remove());
    
    // Create new toast
    const toast = document.createElement('div');
    toast.className = 'toast-notification fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 transform transition-transform duration-300 ease-in-out translate-y-0';
    toast.innerText = message;
    
    // Add to DOM
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
      toast.classList.add('translate-y-16', 'opacity-0');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3000);
  }
});

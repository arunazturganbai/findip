function performSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    const categoryGrid = document.getElementById('categoryGrid');
  
    categoryGrid.innerHTML = ''; // Очищаем результаты
  
    const results = words.filter(item => 
      item.word.toLowerCase().includes(query)
    );
  
    if (results.length === 0) {
      categoryGrid.innerHTML = '<p>Ештеңе табылмады.</p>';
      return;
    }
  
    results.forEach(item => {
      const videoItem = document.createElement('div');
      videoItem.className = 'video-item';
      videoItem.innerHTML = `
        <img src="${item.image}" alt="${item.description}">
        <div class="word">${item.description}</div>
      `;
      videoItem.onclick = () => window.open(item.video, '_blank');
      categoryGrid.appendChild(videoItem);
    });
  }
  
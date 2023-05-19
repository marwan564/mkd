    function handleResponse(data) {
      const newsContainer = document.getElementById('news-container');
      data.values.forEach(item => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';

        for (let i = 0; i < item.length; i++) {
          const columnValue = item[i].trim();
          if (columnValue !== '') {
            const columnElement = document.createElement('p');
            columnElement.className = 'news-content';
            columnElement.textContent = columnValue;
            newsItem.appendChild(columnElement);
          }
        }

        if (newsItem.childNodes.length > 0) {
          newsContainer.appendChild(newsItem);
        }
      });
    }

    const sheetId = '1dH1JOwgYeNFW3e-iWHSpOmaOlYT1N9PR3_XckpdcLWA';
    const apiKey = 'AIzaSyB5M28TrVqJag7FoipJEiIrnyKa_svoB0A';

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1?key=${apiKey}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const feeds = data;
        handleResponse(feeds);
      })
      .catch(error => console.error(error));

fetch('https://api.tvmaze.com/shows')
    .then(response => response.json())
    .then(data => {
        const slider = document.getElementById('slider');
        const loadMoreBtn = document.getElementById('load-more-btn');
       
        let visibleItems = 10;

        const displayShows = (shows, limit) => {
            slider.innerHTML = ''; 
            shows.slice(0, limit).forEach(show => {
                if (show.image && show.image.medium) {
                   
                    slider.innerHTML+=`
                    <a href="detail.html?id=${show.id}"><img src="${show.image.medium}" /><a/>
                    `
                }
            });
        };
        

        
        displayShows(data, visibleItems);

        
        if (data.length > visibleItems) {
            loadMoreBtn.style.display = 'block';
        }

        
        loadMoreBtn.addEventListener('click', () => {
            visibleItems += 10;  
            displayShows(data, visibleItems);

           
            if (visibleItems >= data.length) {
                loadMoreBtn.style.display = 'none';
            }
        });
    })
    .catch(error => console.error('Error fetching shows:', error));


    document.getElementById("search-btn").addEventListener("click", () => {
        var query  = document.getElementById('search-box').value.toLowerCase();
        searchMovies(query)
      });
   

    const searchMovies = async (query) => {
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
        const data = await response.json();
        const loadMoreBtn = document.getElementById('load-more-btn');
        let visibleItems = 1;

        const moviesContainer = document.querySelector(".slider");
        moviesContainer.innerHTML = "";
        data.forEach((item) => {
          const movie = item.show;
          const movieCard = document.createElement("div");
          movieCard.classList.add("card");
      
          const imageUrl = movie.image
            ? movie.image.medium
            : "./assets/img/default.png";
          
            movieCard.innerHTML+=`
                <a href="detail.html?id=${movie.id}"><img src="${imageUrl}" /><a/>
            `;
            const loadMoreBtn = document.getElementById('load-more-btn');
            loadMoreBtn.style.display = 'none';
          moviesContainer.appendChild(movieCard);
        });
        
      };
const showExploreMaps = () => {
  $("#map-info-area").empty()
    $.get("http://localhost:8080/api/maps", function(e) {
      const mapCardName = e['checking'];
      const mapCardAuthor = e['lat'];
      const mapCardRating = e['long'];
      const mapCards = `
      <h1>Explore Maps</h1>

      <div class="card border-primary mb-2">
        <div class="card-header">Suzy Kerr</div>
        <div class="card-body text-primary">
          <h5 class="card-title">Suzy's Top 10 Dog Parks</h5>
          <small id="map-author-rating">
            <p class="card-text">Suzy Kerr</p>
            <p class="card-text">4.5/5</p>
          </small>
        </div>
      </div>

      <div class="card border-primary mb-2">
        <div class="card-header">${mapCardName}</div>
        <div class="card-body text-primary">
          <h5 class="card-title">${mapCardAuthor}</h5>
          <small id="map-author-rating">
            <p class="card-text">${mapCardRating}</p>
            <p class="card-text">${mapCardRating}</p>
          </small>
        </div>
      </div>
      `;
      $("#map-info-area").append(mapCards)
    })
};

$(document).ready(function() {
  $("#nav-explore-maps").on("click", showExploreMaps)
})

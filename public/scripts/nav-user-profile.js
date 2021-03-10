const displayUserInfo = (userInfo) => {
  const mapCards = `
  <div class="card border-dark mt-3 mb-1">
    <p>First Name: ${userInfo.name}</p>
    <p>Email: ${userInfo.email}</p>
    <p>Site User ID: ${userInfo.id}</p>
    <p class="link-favorite-maps">View All Favorited Maps</p>
    <p class="link-my-maps">View All Maps</p>
  </div>
  `;
  $("#map-info-area").append(mapCards)
};

$(document).ready(function() {

  $("#nav-user-profile").on("click", function() {
    $("#map-info-area").empty()
    $.get("api/users/about")
      .then((data) => {
        displayUserInfo(data)
      })
  })

  $(document).on("click", ".link-favorite-maps", showFavoriteMaps);
  $(document).on("click", ".link-my-maps", showMyMaps)
})

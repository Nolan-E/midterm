// const displayUserInfo = (userInfo) => {
//   const mapCards = `
//   <div class="card border-dark mt-3 mb-1">
//     <p>First Name: ${userInfo.name}</p>
//     <p>Email: ${userInfo.email}</p>
//     <p>Site User ID: ${userInfo.id}</p>
//     <p class="link-favorite-maps">View All Favorited Maps</p>
//     <p class="link-my-maps">View All Maps</p>
//   </div>
//   `;
//   $("#map-info-area").append(mapCards);
// };

const modalUserInfo =  function(userInfo) {
  const modalElm = `
  <div class="modal fade" id="profile-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="profile-modal">Profile</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body d-flex">
      <div class="modal-profile-image w-25">
        <img class="w-75 border" src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png">
      </div>
      <div class="d-flex flex-column">
      <div>${userInfo.name} <span class="text-muted">#${userInfo.id}<span></div>
      <div></div>
      <div>Email: ${userInfo.email}</div>
      <div> Community Maps Contributed: ${userInfo.count}</div>
      </div>
        </div>
        <div class="Profile d-flex justify-content-between">
        <p class="link-favorite-maps p-2"> <a href="#" class="text-secondary">My favorite Maps</a></p>
        <p class="link-my-maps p-2"><a href="#" class="text-secondary">All Maps</a></p>
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
    </div>
  </div>
</div>
  `;
  $("#map-info-area").append(modalElm);

};

$(document).ready(function() {

  $("#nav-user-profile").on("click", function() {
    //$("#map-info-area").empty()
    $.when($.get("/api/users/about")
      .then((data) => {
        console.log(data)
        // displayUserInfo(data)
        modalUserInfo(data);
      }))
      .done(function() {
        $("#profile-modal").modal('show');
      }
      );
  });
  $('#profile.modal').on('shown.bs.modal', function() {
    $('#nav-user-profile').trigger('focus');

  });
  $(document).on("click", ".link-favorite-maps", function() {
    $('.modal-backdrop').remove();
    showFavoriteMaps();

  });
  $(document).on("click", ".link-my-maps", function() {
    $('.modal-backdrop').remove();
    showMyMaps();
  });
});

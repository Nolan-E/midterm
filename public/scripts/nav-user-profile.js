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
      <div class="modal-body">
      <div class="modal-profile image">
        <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png">
      </div>
      <div>${userInfo.name}
      <div>#${userInfo.id}</div>
      </div>
        <div>Email: ${userInfo.email}</div>
        </div>
        <div class="Profile
        <p class="link-favorite-maps">My favorite Maps</p>
        <p class="link-my-maps ">All Maps</p>
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
  `;
  $("#map-info-area").append(modalElm);

};

$(document).ready(function() {

  $("#nav-user-profile").on("click", function() {
    //$("#map-info-area").empty()
    $.when($.get("api/users/about")
      .then((data) => {
        // displayUserInfo(data)
        modalUserInfo(data);
      }))
      .done(function() {
        $("#profile-modal").modal('show');
        console.log('this is done');
      }
      );
  });
  $('#profile.modal').on('shown.bs.modal', function() {
    $('#nav-user-profile').trigger('focus');

  });
  $(document).on("click", ".link-favorite-maps", showFavoriteMaps);
  $(document).on("click", ".link-my-maps", showMyMaps);
});

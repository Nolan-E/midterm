$(document).ready(function() {

  $("#nav-user-profile").on("click", function() {
    $("#map-info-area").empty()
    $.get("http://localhost:8080/api/users", function(e) { // url link
    console.log(e)
      const userFirst = e['checking'];
      const userLast = e['ueser'];
      const userEmail = 'yomama@gmail.com';
      const userMemberSince = 'a date';
      const mapCards = `
      <div class="card border-dark mt-3 mb-1">
        <div>
          <label for="user-first-name">First Name:</label>
          <input type="text" name="user-first-name" value=${userFirst} readonly>
        </div>
        <div>
          <label for="last-name">Last Name:</label>
          <input type="text" name="user-last-name" value=${userLast} readonly>
        </div>
        <div>
          <label for="user-email">Email:</label>
          <input type="text" name="user-email" value=${userEmail}>
        </div>
        <div>
          <label for="user-password">Password:</label>
          <input type="password" name="user-password" placeholder="new password">
        </div>
        <div>
          <p>Member Since: ${userMemberSince}</p>
          <p>View All Favorite Maps</p>
          <p>View All Maps</p>
        </div>

      </div>
      `;
      $("#map-info-area").append(mapCards)
    })






  })
})

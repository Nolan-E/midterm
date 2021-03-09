$(document).ready(function() {

  $("#nav-login-form").on("click", function() {
    $("#map-info-area").empty();
    const loginForm = `
    <main>
      <h3>Log In</h3>
      <form id="form-login" action="">
        <div class="form-group mb-2 form-inline">
          <label for="email"></label>
          <input class="form-control" type="email" name="email" placeholder="Email">
        </div>
        <div class="form-group mb-2 form-inline">
          <label for="password"></label>
          <input class="form-control" type="password" name="password" placeholder="Password">
        </div>
        <div class="form-group mb-2">
          <button type="submit" class="btn btn-primary">Log In</button>
        </div>
      </form>
    </main>
    `;
    $("#map-info-area").append(loginForm);
  })

  $(document).on("submit", "#form-login", function(event) {
    event.preventDefault();
    const formDataAsArray = [];
    $.each($(this).serializeArray(), function() {
      formDataAsArray.push(this.value)
    });
    const userLoginObj = {email: formDataAsArray[0], password: formDataAsArray[1]};

    $.post("http://localhost:8080/api/users/login", userLoginObj)
      .then((usersName) => {
        showExploreMaps();
        $("#nav-user-profile").text(usersName).removeClass("d-none");
        $("#nav-register").addClass("d-none");
        $("#nav-login-form").addClass("d-none");
        $("#nav-logout").removeClass("d-none");
      })
      .catch(() => alert('Invalid username or password.'))
  })

  $(document).on("click", "#nav-logout", function(event) {
    event.preventDefault();
    $.get("http://localhost:8080/api/users/logout")
      .then(() => {
        $("#nav-user-profile").addClass("d-none");
        $("#nav-register").removeClass("d-none");
        $("#nav-login-form").removeClass("d-none");
        $("#nav-logout").addClass("d-none");
      })
  })

});

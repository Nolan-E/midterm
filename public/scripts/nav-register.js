const showRegisterForm = () => {
  $("#map-info-area").empty();
    const RegisterForm = `
    <main>
      <h3>Register</h3>
      <form id="form-register" action="">
        <div class="form-group mb-2 form-inline">
          <label for="name">First and Last Name</label>
          <input class="form-control" type="text" name="name" placeholder="First and Last Name" value="Albert Einstein">
        </div>
        <div class="form-group mb-2 form-inline">
          <label for="email">Email</label>
          <input class="form-control" type="email" name="email" placeholder="Email" value="alberteinstein@gmail.com">
        </div>
        <div class="form-group mb-2 form-inline">
          <label for="password">Password</label>
          <input class="form-control" type="password" name="password" placeholder="Password" value="password">
        </div>
        <div class="form-group mb-2">
          <button type="submit" class="btn btn-primary">Register</button>
        </div>
      </form>
    </main>
    `;
    $("#map-info-area").append(RegisterForm);
}

$(document).ready(function() {

  $("#nav-register").on("click", showRegisterForm);

  $(document).on("submit", "#form-register", function(event) {
    event.preventDefault();
    const formDataAsArray = [];
    $.each($(this).serializeArray(), function() {
      formDataAsArray.push(this.value)
    });
    const userRegisterObj = {name: formDataAsArray[0], email: formDataAsArray[1], password: formDataAsArray[2]};

    $.post("/api/users/register", userRegisterObj)
      .then((usersName) => {
        console.log('usersName is', usersName)
        showExploreMaps();
        $("#nav-user-profile").text(usersName).removeClass("d-none");
        $("#nav-register").addClass("d-none");
        $("#nav-login-form").addClass("d-none");
        $("#nav-logout").removeClass("d-none");
      })
      .catch(() => alert('Invalid username or password.'))
  })
});

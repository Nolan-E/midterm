$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for (const user in users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });
});

$(document).ready(function() {
  $(document).on('click', '.card', function() {
      let id = this.id
      console.log('clicked this:',id);
    $.get(`/api/maps/${id}`)
      .then(map => console.log('redender these:',map));
    });

});


  let delBtn = document.createElement('button');
  delBtn.innerText = 'Remove Pin';
  delBtn.onclick = function() {
  markerGroup.removeLayer(marker);
  }


const editPopup = L.popup({
  autoPan: false,
  keepInview: true,
  maxWidth: 'auto',
  className: "edit-popup"
}).setContent(delBtn)


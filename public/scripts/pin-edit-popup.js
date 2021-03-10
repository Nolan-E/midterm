
  let delBtn = document.createElement('button');
  delBtn.innerText = 'Remove Pin';
  delBtn.onclick = function() {
  markerGroup.removeLayer(marker);
  }


const editPopup = L.popup({
  editable: true,
  removable:true
}).setContent(delBtn)

document.addEventListener("removeMarker", (e) => {
  console.log(e)
});

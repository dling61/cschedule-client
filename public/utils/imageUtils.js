/***************************************** //
// This Javascript file is created to hold //
// the different general utilities that    //
// affect images.                          //
// *****************************************/

// Edit Image -> Suppose already have one
// User will need to input:
//		ImageElement
//		Can get Location Element


//BROKEN
$('#uploadImg').on('wheel', {zoom: zoom, maxZoom: maxZoom, zoomSpd: zoomSpd, selectImg: selectImg}, addZoom);
function addZoom(e) {
	var zoom = e.data.zoom; 
	if (e.originalEvent.deltaY < 0){
		if (zoom + e.data.zoomSpd < e.data.maxZoom) {
			zoom += e.data.zoomSpd;  
		}
	} else {
		if (zoom > e.data.zoomSpd){
			zoom -= e.data.zoomSpd;
		}
	};
	//Rounds the number
	zoom = Math.round(zoom * 100) / 100; 
	//Updates the picture after zooming
	e.data.selectImg(e.originalEvent); 
	return zoom;
}

function drawgrid() {
	var grid=document.getElementById('grid')
	for (x=0;x<18;x++) {
		var tableRow=document.createElement('tr')
		grid.appendChild(tableRow)
		for (y=0;y<18;y++) {
			var tableCell=document.createElement('td')
			tableCell.id='c'+x+y
			tableRow.appendChild(tableCell)
			tableCell.onclick=function(){console.log('hello')}
		}
	}
}
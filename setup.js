function drawgrid() {
	var grid=document.getElementById('grid')
	for (x=0;x<18;x++) {
		var tableRow=document.createElement('tr')
		grid.appendChild(tableRow)
		for (y=0;y<18;y++) {
			var tableCell=document.createElement('td')
			tableCell.id='r'+x+'c'+y
			tableCell.x=x
			tableCell.y=y
			tableRow.appendChild(tableCell)
			tableCell.onclick=function(){clickCell(this.x,this.y)}
		}
	}
	
	setupAbbs()
	gameInit()
}

abbs=['','k','M','B','T']

function setupAbbs() {
	letters='abcdefghijklmnopqrstuvwxyz'

	for (a=0;a<4;a++) {
		for (b=0;b<26;b++) {
			abbs.push(letters.slice(a,a+1)+letters.slice(b,b+1))
		}
	}
}
player={version:1,
objective:1,
money:10,
power:0,
heat:0,
ep:0,
exp:0,
cells:{}}
time=new Date().getTime()
objRewards=[{money:10,exp:1}]

function gameInit() {
	var tickspeed=0
	load(localStorage.getItem('saveSR'))
	updated=true
	setInterval(function(){
		if (updated) {
			updated=false
			setTimeout(function(){
				var startTime=new Date().getTime()
				try {
					gameTick()
				} catch (e) {
					console.log('A game error has been occured: '+e)
				}
				tickspeed=(new Date().getTime()-startTime)*0.2+tickspeed*0.8
				updated=true
			},tickspeed)
		}
	},0)
}

function gameTick() {
	var newTime=new Date().getTime()
	var diff=(newTime-time)/1000
	time=newTime
	
	updateElement('money',format(player.money))
	updateElement('power',format(player.power))
	updateElement('heat',format(player.heat))
	updateElement('ep',format(player.ep))
}

function updateElement(elem,id) {
	document.getElementById(elem).innerHTML=id
}

function showElement(elem,id='block') {
	document.getElementById(elem).style.display=id
}

function hideElement(elem) {
	document.getElementById(elem).style.display='none'
}

function save() {
	try {
		localStorage.setItem('saveSR',btoa(JSON.stringify(player)))
		console.log('Game saved!')
	} catch (e) {
		console.log('Well, we tried.')
	}
}

function load(savefile) {
	try {
		player=JSON.parse(atob(savefile))
		updateRankText()
		updateCosts()
		console.log('Game loaded!')
	} catch (e) {
		console.log('Your save failed to load: '+e)
	}
}

function exportSave() {
	var savefile=btoa(JSON.stringify(player))
	showElement('exportSave','block')
	document.getElementById("exportText").value=btoa(JSON.stringify(player))
}

function importSave() {
	var input=prompt('Copy and paste in your exported file and press enter.')
	if (load(input)) {
		if (input!=null) {
			alert('Your save was invalid or caused a game-breaking bug. :(')
		}
	}
}

function reset() {
	if (confirm('Are you sure to reset your save? You can\'t undo your action!')) {
		player.money=10
		player.power=0
		player.heat=0
		player.ep=0
		player.cells={}
		localStorage.clear('saveSR')
	}
}

function format(num,decimalPoints=0,offset=0) {
	if (isNaN(num)) {
		return '?'
	} else if (num==1/0) {
		return 'Infinite'
	} else {
		var abbid=Math.max(Math.floor(Math.log10(Math.abs(num))/3)-offset,0)
		var mantissa=Math.round(num/Math.pow(1000,abbid)*Math.pow(10,(abbid>0&&decimalPoints<2)?2:decimalPoints))/Math.pow(10,(abbid>0&&decimalPoints<2)?2:decimalPoints)
		if (mantissa==Math.pow(1000,1+offset)) {
			mantissa=mantissa/1000
			abbid+=1
		}
		return mantissa+abbs[abbid]
	}
}

function clickCell(x,y) {
	player.money+=x*y
}

function completeObj() {
	//coming soon
}
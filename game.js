player={version:1,
	build:1,
	playtime:0,
	objective:1,
	money:10,
	totalMoney:0,
	power:0,
	totalPower:0,
	heat:0,
	totalHeat:0,
	reboots:0,
	ep:0,
	exp:0,
	cells:{}
}
	
time=new Date().getTime()
powerLimit=100
heatLimit=100
incomePerHeat=1
epGain=0
objRewards=[{money:10,exp:1}]

tab='reactor'
oldTab=tab

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
					console.log('A game error has occured:')
					console.error(e)
				}
				tickspeed=Math.max((new Date().getTime()-startTime)*0.2+tickspeed*0.8,50)
				updated=true
			},50-tickspeed)
		}
	},50)
	setInterval(save,60000)
}

function gameTick() {
	var newTime=new Date().getTime()
	var diff=(newTime-time)/1000
	if (diff>0) {
		player.playtime+=diff
	}
	time=newTime
	
	updateElement('money','$'+format(player.money))
	updateElement('power',format(player.power)+'W/'+format(powerLimit)+'W')
	updateElement('heat',format(player.heat)+'/'+format(heatLimit))
	updateElement('ep',format(player.ep))
	updateElement('sell','Sell (+$'+format(player.heat*incomePerHeat)+')')
	
	if (tab!=oldTab) {
		showElement(tab+'tab')
		hideElement(oldTab+'tab')
		oldTab=tab
	}
}

function switchTab(id) {
	tab=id
}

function getPowerLimit() {
	powerLimit=100
}

function getHeatLimit() {
	heatLimit=100
}

function getEPGain() {
	epGain=0
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
		savefile=JSON.parse(atob(savefile))
		if (savefile.build==undefined) throw 'We\'re sorry, but your savefile was not supported in new version.'
		player=savefile
		getPowerLimit()
		getHeatLimit()
		getEPGain()
		console.log('Game loaded!')
	} catch (e) {
		console.log('Your save failed to load:')
		console.error(e)
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
		player.playtime=0
		player.objective=1
		player.money=10
		player.totalMoney=0
		player.power=0
		player.totalPower=0
		player.heat=0
		player.totalHeat=0
		player.reboots=0
		player.ep=0
		player.exp=0
		player.cells={}
		localStorage.clear('saveSR')
	}
}

function format(num,decimalPoints=2,offset=0,rounded=true) {
	var abs=Math.abs(num)
	var exponent=Math.floor(Math.max(Math.log10(abs),0))
	var precision=3*offset+decimalPoints-exponent
	if (isNaN(num)||isNaN(exponent)) {
		return '?'
	} else if (abs==1/0) {
		return 'Infinite'
	} else if (abs<Math.pow(1000,1+offset)-0.5) {
		if (rounded) return Math.round(num)
		return Math.round(num*Math.pow(10,precision))/Math.pow(10,precision)
	} else {
		var abbid=Math.max(Math.floor(exponent/3-offset),0)
		precision+=3*abbid
		var mantissa=Math.round(num*Math.pow(10,precision-3*abbid))/Math.pow(10,precision)
		if (Math.abs(mantissa)==Math.pow(1000,1+offset)) {
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
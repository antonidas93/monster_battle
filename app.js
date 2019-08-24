new Vue({
	el: '#app',
	data: {
		playerHealth: 100,
		monsterHealth: 100,
		gameIsRunning: false,
		turns: [],
	},
	methods: {
		startGame: function(){
			this.playerHealth = 100;
			this.monsterHealth = 100;
			this.gameIsRunning = true;
			this.turns = [];
		},
		attack: function(){
			this.playersAttact(3, 10);
		},
		specialAttack: function(){
			this.playersAttact(10, 20, 'hard');
		},
		playersAttact: function(minDamage, maxDamage, attackType = '') {
			var damage = this.calculateDamage(minDamage, maxDamage);
			this.monsterHealth -= damage;
			this.turnsUnshift(true, 'Player hits Monster '+attackType+' -' + damage);
			if(this.checkWin()){
				return;
			}
			this.monsterAttacks();
		},
		heal: function(){
			if(this.playerHealth <= 90){
				this.playerHealth += 10;
			} else {
				this.playerHealth = 100;
			}
			this.turnsUnshift(true, 'Player heals for 10');
			this.monsterAttacks();
		},
		giveUp: function(){
			this.gameIsRunning = false;
		},
		monsterAttacks: function(){
			var damage = this.calculateDamage(5,12);
			this.playerHealth -= damage;
			this.turnsUnshift(false, 'Monster hits Player for -' + damage);
			this.checkWin();
		},
		turnsUnshift: function(isPlayer, text){
			this.turns.unshift({
				isPlayer: isPlayer,
				text: text,
			});
		},
		calculateDamage: function(min, max){
			return Math.max(Math.floor(Math.random() * max) + 1, min);
		},
		checkWin: function(){
			if(this.monsterHealth <= 0){
				if(confirm('You won! Start new game?')) {
					this.startGame();
				} else {
					this.gameIsRunning = false;
				}
				return true;
			} else if(this.playerHealth <= 0) {
				if(confirm('You lost! Start new game?')) {
					this.startGame();
				} else {
					this.gameIsRunning = false;
				}
				return true;
			}
			return false;
		}
	}
});
//Events
click.addEventListener('click',clicked);
upgradeBtn.addEventListener('click',upgrade);
autoDamage.addEventListener('click', dps);
newGame.addEventListener('click', startGame);

//Variables
let point = 0;
let hp;
let damage = 1;
let hpWidth = 200; //hp bar width
let cost = 5; //upgrade cost
let hpNewMob;
let pointNewMob;
let newCost = [5];
let i = 0;
let moreCost = 0;
let dpsDamage = 0;
let monsters = 0;
let mobs = {
    hp: [10],
    pointBonus: [1],
}
let numberMob = 0;

//Functions
statistics();
load();
update();
function load(){ //hp reload
    hp = mobs.hp[numberMob];
    hpWidth = hp / hpWidth;
    hpNow.style.width = 200 + 'px';
}
function clicked(){ // < hp by click
    hp-=damage;//уменьшаем хп

    calcWidthHp();
    checkDie();
    update();
    
}
function calcWidthHp(){ //hp bar calculation
    hpWidth = hp / hpWidth;
    hpNow.style.width = hpWidth + 'px';
    hpWidth = hp / hpWidth;
}
function checkDie(){ //death check
    if(hp <= 0){
        monsters++;
        setNewMob();
        point += mobs.pointBonus[numberMob];
        hpWidth = 200;
        hpNow.style.width = hpWidth + 'px';
        numberMob += 1;
        load();
        statistics();
    }
    update();
}
function update(){ 
    document.getElementById('hp').textContent = 'HP: ' + hp + "/" +  mobs.hp[numberMob];
    document.getElementById('scoreboard').textContent = "Points: " + point;
    document.getElementById('upgradeBtn').textContent = "Upgrade ("+ cost + " points)";
}
function statistics(){
    document.getElementById('killed').textContent = 'Mobs killed: ' + monsters;
    document.getElementById('damage').textContent = "Damage: " + damage;
    document.getElementById('dps').textContent = "DPS: " + dpsDamage;
}
function upgrade(){
    if (point >= cost){
        point -=cost;
        cost = newCost[i];
        moreCost = cost + 10;
        newCost.push(moreCost);
        i++;
        damage++;
        update();
        statistics();
    }
    else{
        alert('Not enough points');
    }
}
function dps() {
    if(point >= 50) {
        dpsDamage++;
        point -= 50;
        statistics();
    }
    else{
        alert('Not enough points');
    }
}
function dps1() {
    hp-=dpsDamage; // < hp

    calcWidthHp();
    checkDie();
    update();
}
function setNewMob() {
    hpNewMob = mobs.hp[numberMob] + 5;
    pointNewMob = mobs.pointBonus[numberMob] + 2;
    mobs.hp.push(hpNewMob);
    mobs.pointBonus.push(pointNewMob);
}
function startGame() {
    monsters = 0;
    damage = 1;
    dpsDamage = 0;

    point = 0;
    hp = 10;
    mobs.hp[numberMob] = 10;
    mobs.pointBonus[numberMob] = 1;
    cost = 5;
    hpWidth = 200;
    
    load();
    update();
    statistics();
}
setInterval(dps1, 100);
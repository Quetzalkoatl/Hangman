const wordsList = [
	'человек',
	'время',
	'жизнь',
	'день',
	'работа',
	'слово',
	'место',
	'глаз',
	'вопрос',
	'сторона',
	'страна',
	'случай',
	'голова',
	'ребенок',
	'конец',
	'система',
	'часть',
	'город',
	'отношение',
	'женщина',
	'деньги',
	'земля',
	'машина',
	'проблема',
	'право',
	'нога',
	'решение',
	'дверь',
	'образ',
	'история',
	'власть',
	'законодательство',
	'голос',
	'тысяча',
	'книга',
	'возможность',
	'результат',
	'область',
	'статья',
	'число',
	'компания',
	'народ',
	'группа',
	'развитие',
	'процесс',
	'условие',
	'средство',
	'начало',
	'уровень',
	'форма',
	'связь',
	'минута',
	'улица',
	'вечер',
	'качество',
	'мысль',
	'дорога',
	'действие',
	'месяц',
	'государство',
	'любовь',
	'взгляд',
	'школа',
	'общество',
	'деятельность',
	'организация',
	'президент',
	'комната',
	'порядок',
	'момент',
	'театр',
	'письмо',
	'утро',
	'помощь',
	'ситуация',
	'рубль',
	'смысл',
	'состояние',
	'квартира',
	'орган',
	'внимание',
	'труд',
	'мера',
	'рынок',
	'программа',
	'задача',
	'предприятие',
	'разговор',
	'правительство',
	'семья',
	'производство',
	'информация',
	'положение',
	'центр',
	'ответ',
	'автор',
	'стена',
	'интерес',
	'федерация',
	'правило',
	'управление',
	'мужчина',
	'партия',
	'совет',
	'сердце',
	'движение',
	'материал',
	'неделя',
	'чувство',
	'глава',
	'наука',
	'газета',
	'причина',
	'плечо',
	'речь',
	'основа',
	'товарищ',
	'культура',
	'данные',
	'мнение',
	'документ',
	'институт',
	'проект',
	'встреча',
	'директор',
	'палец',
	'служба',
	'судьба',
	'девушка',
	'очередь',
	'состав',
	'количество',
	'событие',
	'объект',
	'создание',
	'значение',
	'период',
	'искусство',
	'структура',
	'номер',
	'пример',
	'исследование',
	'гражданин',
	'начальник',
	'принцип',
	'метод',
	'фильм',
	'гость',
	'воздух',
	'характер',
	'борьба',
	'использование',
	'размер',
	'образование',
	'мальчик',
	'район',
];

let count = document.querySelector('.count');
let checkButton = document.querySelector('.btn');
let restartButton = document.querySelector('.restart');
let word = document.querySelector('.word');
let letter = document.querySelector('.letter');
let win = document.querySelector('.win');
let lose = document.querySelector('.lose');
let badLetters = document.querySelector('.badLetters');
let tries = document.querySelector('.countOfTries');

let answer = wordsList[Math.floor(Math.random() * wordsList.length)];

for (let i = 0; i < answer.length; i++) {
	word.innerHTML += '__' + ' ';
}

let lives = Math.ceil(answer.length / 2);
let livesMax = Math.ceil(answer.length / 2);
if (lives < 5) {
	lives = 5;
	livesMax = 5;
}

count.innerHTML = `Количество попыток : ${lives}`;

function winLose() {
	lose.classList.remove('show');
	win.classList.remove('show');
	checkButton.removeAttribute('disabled');
	lives = 5;
	count.innerHTML = `Количество попыток : ${lives}`;
	answer = wordsList[Math.floor(Math.random() * wordsList.length)];
	letter.value = '';
	word.innerHTML = '';
	badLetters.innerHTML = '';
	tries.innerHTML = '';
	for (let i = 0; i < answer.length; i++) {
		word.innerHTML += '__' + ' ';
	}
}

function minusLive() {
	lives--;
	count.innerHTML = `Количество попыток : ${lives}`;
}

checkButton.addEventListener('click', () => {
	if (letter.value.length === 1) {
		let count = 0;
		for (let i = 0; i < answer.length; i++) {
			if (letter.value.toUpperCase() === answer[i].toUpperCase()) {
				let temp = word.innerHTML.split(' ');
				temp[i] = answer[i].toUpperCase();
				word.innerHTML = temp.join(' ');
				count++;
			}
		}
		if (count === 0) {
			if (badLetters.innerHTML.split('').includes(letter.value.toUpperCase())) {
				letter.value = '';
				return;
			}
			badLetters.innerHTML += letter.value.toUpperCase() + ' ';
			minusLive();
		}
	} else if (letter.value.length === answer.length) {
		if (letter.value === answer) {
			word.innerHTML = answer.toUpperCase().split('').join(' ');
			win.classList.add('show');
			tries.innerHTML = `Количество неудачных попыток : ${livesMax - lives}`;
		} else {
			lives = 0;
			count.innerHTML = `Количество жизней : ${lives}`;
			lose.classList.add('show');
			checkButton.setAttribute('disabled', true);
			restartButton.classList.add('show');
		}
	}
	if (!/\__/g.test(word.innerHTML)) {
		tries.innerHTML = `Количество неудачных попыток : ${livesMax - lives}`;
		win.classList.add('show');
		checkButton.setAttribute('disabled', true);
		restartButton.classList.add('show');
	}

	if (
		!letter.value.length ||
		letter.value.length !== answer.length ||
		letter.value.length !== 1
	) {
		letter.value = '';
	}

	if (lives === 0) {
		word.innerHTML = answer.toUpperCase().split('').join(' ');
		lose.classList.add('show');
		checkButton.setAttribute('disabled', true);
		restartButton.classList.add('show');
	}
});

restartButton.addEventListener('click', () => {
	restartButton.classList.remove('show');
	winLose();
});

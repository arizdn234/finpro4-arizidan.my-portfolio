// ________[Preloader]________
const textLoadingList = [
	"Sip your coffee, brew your dreams.",
	"Ignite creativity, one pixel at a time.",
	"Crafting concepts over coffee.",
	"Awaiting the surge of a creative blend.",
	"Brewing brilliance, just a heartbeat away.",
	"Savor the creative process, ideas are on the rise.",
	"In the realm of pixels and caffeine, magic is brewing.",
	"Coffee: checked. Creativity: loading.",
	"Infusing innovation into your screen.",
	"Pouring ideas into the cauldron of creation."
];

let updateTextInterval;
let isPreloaderVisible = true;

function updateTextLoading() {
	if (!isPreloaderVisible) {
		return;
	}

	const randomIndex = Math.floor(Math.random() * textLoadingList.length);
	const newText = textLoadingList[randomIndex];
	const preTitleElement = document.querySelector('.pre-title');
	const preTextElement = document.querySelector('.pre-text');

	setTimeout(() => {
		preTitleElement.innerHTML = 'Loading.'
		setTimeout(() => {
			preTitleElement.innerHTML = 'Loading..'
			setTimeout(() => {
				preTitleElement.innerHTML = 'Loading...'
			}, 1000);
		}, 700);
	}, 1);

	preTextElement.style.opacity = "0";
	setTimeout(() => {
		preTextElement.innerHTML = `${newText}`;
		preTextElement.style.opacity = "1";
	}, 500);
}

function hidePreloader() {
	isPreloaderVisible = false;
	clearInterval(updateTextInterval);

	const preloaderElement = document.querySelector(".preloader");
	preloaderElement.style.opacity = "0";

	setTimeout(() => {
		preloaderElement.style.display = "none";
	}, 2000);
}

updateTextLoading()
updateTextInterval = setInterval(updateTextLoading, 3000);
window.addEventListener("load", () => {
	setTimeout(hidePreloader, 8000);
});


// ________[Button mode Handler]_______
function msgBox(title, msg) {
	const ele = document.querySelector('.modal')
	ele.style.opacity = '1'
	const format = `
		<div>
			<h1>${title}</h1>
			<p>${msg}</p>
		</div>
		<div class="modal-load"></div>
	`
	ele.innerHTML = format
	ele.style.width = '384px'
	document.querySelector('.modal-load').style.width = '100%'
	setTimeout(() => {
		document.querySelector('.modal-load').style.width = '0'
	}, 1);
	setTimeout(() => {
		ele.style.opacity = '0'
	}, 5000);
}

document.querySelector('#resume').addEventListener('click', () => {
	msgBox('Sorry', 'My Resume lost 2 week ago :(')
})
document.querySelector('#linked-in').addEventListener('click', () => {
	msgBox('Sorry', 'I forgot my LinkedIn account password :(')
})
document.querySelectorAll('.no-repo').forEach(element => {
	element.addEventListener('click', () => {
		msgBox('Sorry', 'This section does not contain any repositories <br>:(')
	})
});


// ________[Button mode Handler]_______
if (!localStorage.getItem('isParallaxMode')) {
	localStorage.setItem('isParallaxMode', false) // init
} else if (localStorage.getItem('isParallaxMode' === true)) {
	localStorage.setItem('isParallaxMode', false) // init value
}

document.querySelector('.mode').addEventListener('click', () => {
	const bugElement = document.querySelector('.bug');
	const virusElement = document.querySelector('.virus');

	if (bugElement.style.display === 'none') {
		bugElement.style.display = 'block';
		virusElement.style.display = 'none';
		localStorage.setItem('isParallaxMode', false)
} else {
		bugElement.style.display = 'none';
		virusElement.style.display = 'block';
		localStorage.setItem('isParallaxMode', true)
	}
	// console.log(isParallaxMode);
});


// ________[Button per-Section Handler]________
const swipeTo = (selector, from, to) => {
	const ele = document.querySelector(selector)

	if (ele) {
		ele.style.transform = `${from}`
		ele.style.transition = `transform 1s ease-in-out`
		setTimeout(() => {
			ele.style.transform = `${to}`
		}, 100);
	}
}

function setActiveNavLink(event) {
	const activeLink = document.querySelector('.link--nav.active');
	if (activeLink) {
		activeLink.classList.remove('active');
	}
	event.currentTarget.classList.add('active');
}
// console.log(localStorage.getItem('isParallaxMode'));

// noScrollMode()
// document.querySelector('a[href="#about"').addEventListener('click', noScrollMode('a[href="#about"'))

// console.log(document.querySelector('a[href="#about"'));

function noScrollMode(event) {
	if (localStorage.getItem('isParallaxMode') == 'false') {

		const secList = ['.about', '#projects', '#Internship', '#skills', '.footer']
		const activeSec = document.querySelector('.activeSection')
		// console.log(event);

		if (event.srcElement.id == 'nav-about') {
			if (activeSec) {
				const aboutSec = document.querySelector('.about');
	
				setActiveNavLink(event)
				swipeTo('.activeSection', `translate(0, 0)`, `translate(0, 1200px)`)
				activeSec.classList.remove('activeSection')
				aboutSec.classList.add('activeSection')
				setTimeout(() => {
					let sec = secList.slice(0, 0).concat(secList.slice(1))
					sec.forEach((selector) => {
						const element = document.querySelector(`${selector}`);
						if (element) {
							element.style.display = 'none';
						}
					});
					aboutSec.style.display = 'flex'
					swipeTo('.about', `translate(0, -1200px)`, `translate(0, 0)`)
				}, 700);
			}
		}

		if (event.srcElement.id == 'btn1') {
			if (activeSec) {
				const projectsSec = document.querySelector('#projects');
		
				setActiveNavLink(event)
				swipeTo('.activeSection', `translate(0, 0)`, `translate(1300px, -1200px)`)
				activeSec.classList.remove('activeSection')
				projectsSec.classList.add('activeSection')
				setTimeout(() => {
					let sec = secList.slice(0, 1).concat(secList.slice(2))
					sec.forEach((selector) => {
						const element = document.querySelector(`${selector}`);
						if (element) {
							element.style.display = 'none';
						}
					});
					projectsSec.style.display = 'block'
					swipeTo('#projects', `translate(-1300px, 1200px)`, `translate(0, 0)`)
				}, 700);
			}
		}

		if (event.srcElement.id == 'btn2') {
			const internshipSec = document.querySelector('#Internship');
	
			setActiveNavLink(event)
			swipeTo('.activeSection', `translate(0, 0)`, `translate(-1300px, -1200px)`)
			activeSec.classList.remove('activeSection')
			internshipSec.classList.add('activeSection')
			setTimeout(() => {
				let sec = secList.slice(0, 2).concat(secList.slice(3))
				sec.forEach((selector) => {
					const element = document.querySelector(selector);
					if (element) {
						element.style.display = 'none';
					}
				});
				internshipSec.style.display = 'block'
				swipeTo('#Internship', `translate(1300px, 1200px)`, `translate(0, 0)`)
			}, 700);
		}

		if (event.srcElement.id == 'btn3') {
			const skillsSec = document.querySelector('#skills');
	
			setActiveNavLink(event)
			swipeTo('.activeSection', `translate(0, 0)`, `translate(0, -1200px)`)
			activeSec.classList.remove('activeSection')
			skillsSec.classList.add('activeSection')
			setTimeout(() => {
				let sec = secList.slice(0, 3).concat(secList.slice(4))
				sec.forEach((selector) => {
					const element = document.querySelector(selector);
					if (element) {
						element.style.display = 'none';
					}
				});
				skillsSec.style.display = 'block'
				swipeTo('#skills', `translate(0, 1200px)`, `translate(0, 0)`)
			}, 700);
		}
	} else {
		msgBox('Info', `Maybe you're on Parallax mode.<br>Click on Virus icon to open No Scroll mode.`)
	}
}



// ________[Parallax per-Section Handle]________
// parallaxMode()
// function parallaxMode() {
// 	if (localStorage.getItem('isParallaxMode') == 'true') {
// 		document.addEventListener('scroll', () => {
// 			const scrollValue = window.scrollY;
// 			// console.log(scrollValue);

// 			if (scrollValue > 0) {
// 				const divider = scrollValue

// 				const aboutSec = document.querySelector('.about');

// 				aboutSec.style.transition = `all .3s ease`;
// 				if (1 - divider * 0.002 > 0) {
// 					aboutSec.style.transform = `translate3d(-${divider * 0.9}px, ${divider * 0.5}px, 0) scale(${1 - divider * 0.002})`
// 				}
// 				if (divider > 900) {
// 					aboutSec.style.opacity = '0'
// 				} else if (divider < 900) {
// 					aboutSec.style.opacity = '1'
// 				}
// 				// console.log(divider);
// 			}
// 		})
// 	}
// }


// ________[Background handler]________
// const anBG = document.querySelector('.slick-word-bg')
// anBG.style.display = 'block'
// setTimeout(() => {
// 	anBG.style.transform = `translate(1400px, 900px)`
// 	anBG.style.transition = `transform 12s ease-in-out`
// 	setTimeout(() => {
// 		anBG.style.transform = `translate(0, 0) scale(0)`
// 		anBG.style.display = `none`
// 	}, 12000);
// }, 2000);


// ________[idk]________
const body = document.body

const btnTheme = document.querySelector('.fa-moon')
const btnHamburger = document.querySelector('.fa-bars')

const addThemeClass = (bodyClass, btnClass) => {
	body.classList.add(bodyClass)
	btnTheme.classList.add(btnClass)
}

const getBodyTheme = localStorage.getItem('portfolio-theme')
const getBtnTheme = localStorage.getItem('portfolio-btn-theme')

addThemeClass(getBodyTheme, getBtnTheme)

const isDark = () => body.classList.contains('dark')

const setTheme = (bodyClass, btnClass) => {

	body.classList.remove(localStorage.getItem('portfolio-theme'))
	btnTheme.classList.remove(localStorage.getItem('portfolio-btn-theme'))

	addThemeClass(bodyClass, btnClass)

	localStorage.setItem('portfolio-theme', bodyClass)
	localStorage.setItem('portfolio-btn-theme', btnClass)
}

const toggleTheme = () => {
	isDark() ? setTheme('light', 'fa-moon') : setTheme('dark', 'fa-sun');

}
btnTheme.addEventListener('click', toggleTheme)

const displayList = () => {
	const navUl = document.querySelector('.nav__list-sm')

	if (btnHamburger.classList.contains('fa-bars')) {
		btnHamburger.classList.remove('fa-bars')
		btnHamburger.classList.add('fa-times')
		navUl.classList.add('display-nav-list')
	} else {
		btnHamburger.classList.remove('fa-times')
		btnHamburger.classList.add('fa-bars')
		navUl.classList.remove('display-nav-list')
	}
}

btnHamburger.addEventListener('click', displayList)

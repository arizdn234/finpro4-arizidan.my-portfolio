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


// ________[Own Builder]_______
// Get random value
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

// Hider element
function elementHider(selector, from = `translate(0, 0)`, to = `translate(0, 0)`) {
	const ele = document.querySelector(selector)
	ele.style.transform = `${from} scale(1.2)`
	ele.style.opacity = '1'
	ele.style.transition = 'all .3s'
	ele.style.transform = `${to} scale(1)`
	setTimeout(() => {
		ele.style.opacity = '0'
		ele.style.display = 'none'
	}, 1500);
}

// Shower element
function elementShower(selector, from = `translate(0, 0)`, to = `translate(0, 0)`, display = 'block') {
	const ele = document.querySelector(selector)
	ele.style.transform = `${from} scale(1)`
	ele.style.opacity = '0'
	ele.style.transition = 'all .3s'
	ele.style.transform = `${to} scale(1.2)`
	setTimeout(() => {
		ele.style.opacity = '1'
		ele.style.display = display
		ele.style.transform = `scale(1)`
	}, 1500);
}

// Show message box
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
	msgBox('Sorry', 'My Resume file is lost 2 week ago :(')
})
document.querySelector('#linked-in').addEventListener('click', () => {
	msgBox('Sorry', 'I forgot my LinkedIn account password :(')
})
document.querySelector('#walk-codeman').addEventListener('click', () => {
	msgBox('Info', 'For hide this animated character, click "Bugs" icon')
})
document.querySelectorAll('.no-repo').forEach(element => {
	element.addEventListener('click', () => {
		msgBox('Sorry', 'This section does not contain any repositories. <br>:(')
	})
});
document.querySelectorAll('.no-preview').forEach(element => {
	element.addEventListener('click', () => {
		msgBox('Sorry', 'This section does not contain any preview or deployment. <br>:(')
	})
});


// ________[Button mode Handler]_______
const customCursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    if (!window.matchMedia("(max-width: 769px)").matches) {
		let X = e.pageX - 30;
		let Y = e.pageY - 30;
		customCursor.style.left = X + 'px';
		customCursor.style.top = Y + 'px';
	}
});

document.addEventListener('mouseenter', () => {
	if (!window.matchMedia("(max-width: 769px)").matches) {
		customCursor.style.display = 'block'
	}
})

document.addEventListener('mouseleave', () => {
	if (!window.matchMedia("(max-width: 769px)").matches) {
		customCursor.style.display = 'none'
	}
})


document.addEventListener('DOMContentLoaded', () => {
	// console.log(localStorage.getItem('isParallaxMode'));
	if (localStorage.getItem('isParallaxMode') === 'true') {
		document.querySelector('.virus-slash').style.display = 'none'
		document.querySelector('.spin-load-mode').style.display = 'block'
		parallaxMode()
		setTimeout(() => {
			document.querySelector('.spin-load-mode').style.display = 'none'
			document.querySelector('.virus').style.display = 'block'
		}, 1500);
	}
	if (window.matchMedia("(max-width: 769px)").matches) {
		document.querySelector('#walk-codeman').style.display = 'none'
		document.querySelector('.custom-cursor').style.display = 'none'
		setTimeout(() => {
			msgBox(`Sorry`, `Change web mode is only on desktop view.`)
		}, 10000);
	}
	if (localStorage.getItem('portfolio-theme') == 'light' || localStorage.getItem('isParallaxMode') == 'true') {
		document.querySelector('#walk-codeman').style.display = 'none'
	}
})

document.querySelector('.mode').addEventListener('click', () => {
	const bugElement = document.querySelector('.virus-slash');
	const virusElement = document.querySelector('.virus');
	const loader = document.querySelector('.spin-load-mode');

	if (bugElement.style.display === 'none') {
		virusElement.style.display = 'none';
		loader.style.display = 'block'
		localStorage.setItem('isParallaxMode', false)
		noScrollModeInit()
		setTimeout(() => {
			loader.style.display = 'none'
			bugElement.style.display = 'block';
		}, 1500);
	} else {
		bugElement.style.display = 'none';
		loader.style.display = 'block'
		localStorage.setItem('isParallaxMode', true)
		parallaxMode()
		setTimeout(() => {
			loader.style.display = 'none'
			virusElement.style.display = 'block';
		}, 1500);
	}
});

function callCharWalk() {
	const ele = document.querySelector('#walk-codeman')
	if (localStorage.getItem('portfolio-theme') === 'dark') {
		if (localStorage.getItem('isParallaxMode') == 'false') {
			ele.style.display = 'block'
			if (ele.style.animation === '19.2s ease-in 0s infinite normal none running no') {
				ele.style.animation = 'moveRightWalk 19.2s ease-in infinite'
				msgBox(`Info`, `Animated char object will appears.`)
			} else {
				ele.style.animation = 'no 19.2s ease-in infinite'
				msgBox(`Info`, `Animated char object was removed.<br>Click "Bugs" icon again to show it.`)
			}
		} else {
			msgBox(`Info`, `Animated char object only on No Scroll mode.`)
		}
	} else {
		msgBox(`Info`, `Animated char object only on dark theme.`)
		ele.style.display = 'none'
	}
}


// ________[Button per-Section Handler (No Scroll mode)]________
const swipeTo = (selector, from, to) => {
	const ele = document.querySelector(selector)

	if (ele) {
		ele.style.transform = `${from}`
		ele.style.transition = `transform 1s ease-in-out`
		setTimeout(() => {
			ele.style.opacity = `1`
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

function noScrollModeInit() {
	document.documentElement.style.overflowY = 'hidden'
	elementShower(`#btn1`, `translate(-200px, 0)`, `translate(0, 0)`)
	elementShower(`#btn2`, `translate(200px, 0)`, `translate(0, 0)`)
	elementShower(`#btn3`, `translate(0, 200px)`, `translate(0, 0)`)
	elementShower(`.about`, `translate(0, 0)`, `translate(0, 0)`, 'flex')
	elementHider(`.nav__list-sm`, `translate(0, 0)`, `translate(0, -200px)`)
	elementHider(`#projects`, `translate(0, 0)`, `translate(0, 400px)`)
	elementHider(`#Internship`)
	elementHider(`#skills`)
	elementHider(`.footer`)
}

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

		if (event.srcElement.id == 'btn1' || event.srcElement.id == 'nav-projects') {
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

		if (event.srcElement.id == 'btn2' || event.srcElement.id == 'nav-internship') {
			if (activeSec) {
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
		}

		if (event.srcElement.id == 'btn3' || event.srcElement.id == 'nav-skills') {
			if (activeSec) {
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
		}
	} else {
		msgBox('Info', `Maybe you're on Parallax mode.<br>Click on Virus icon to open No Scroll mode.`)
	}
}


// ________[Parallax per-Section Handle]________
function parallaxMode() {
	if (localStorage.getItem('isParallaxMode') == 'true') {

		// init
		document.querySelector('#walk-codeman').style.display = 'none'
		document.documentElement.style.overflowY = 'auto'
		elementHider(`#btn1`, `translate(0, 0)`, `translate(-200px, 0)`)
		elementHider(`#btn2`, `translate(0, 0)`, `translate(200px, 0)`)
		elementHider(`#btn3`, `translate(0, 0)`, `translate(0, 200px)`)
		elementShower(`.about`, `translate(0, 0)`, `translate(0, 0)`, 'flex')
		elementShower(`.nav__list-sm`, `translate(0, -200px)`, `translate(0, 0)`, 'flex')
		elementShower(`#projects`)
		elementShower(`#Internship`)
		elementShower(`#skills`)
		elementShower(`.footer`)

		if (window.matchMedia("(max-width: 769px)").matches) {
			document.querySelector('#backToTop').style.display = 'block'
			return
		}

		// parallax start
		document.addEventListener('scroll', () => {
			const scrollValue = window.scrollY;
			// console.log(scrollValue);

			if (scrollValue > 150) {
				document.querySelector('#backToTop').style.display = 'block'
			} else {
				document.querySelector('#backToTop').style.display = 'none'
			}

			if (scrollValue > 0) {
				const divider = scrollValue

				const aboutSec = document.querySelector('.about');

				// init element before parallax
				aboutSec.style.transition = `all .3s ease`;
				aboutSec.style.marginBottom = '150px'

				if (divider < 300) {
					aboutSec.style.transform = `translate3d(0, ${divider * 0.5}px, 0) scale(${1 - divider * 0.002})`
				}

				if (divider > 300) {
					aboutSec.style.filter = `blur(10px)`
					aboutSec.style.transform = `translate3d(0, ${divider * 0.9}px, 0) scale(0.3)`
				} else if (divider < 300) {
					aboutSec.style.filter = `blur(0)`
				}

				// default element after parallax
				if (scrollValue > 2000) {
					aboutSec.style.marginBottom = '0'
				}
				// console.log(divider);
				document.querySelector('#projects').style.marginBottom = '220px'
			}

			if (scrollValue > 885) {
				const divider = scrollValue - 885

				const projectsSec = document.querySelector('#projects');

				// init element before parallax
				projectsSec.style.transition = `all .3s ease`;

				if (divider < 300) {
					projectsSec.style.transform = `translate3d(0, ${divider * 0.5}px, 0) scale(${1 - divider * 0.002})`
				}

				if (divider > 300) {
					projectsSec.style.filter = `blur(10px)`
					projectsSec.style.transform = `translate3d(0, ${divider * 0.9}px, 0) scale(0.3)`
				} else if (divider < 300) {
					projectsSec.style.filter = `blur(0)`
				}

				// default element after parallax
				if (scrollValue > 2000) {
					projectsSec.style.marginBottom = '0'
				}
				// console.log(divider);
				document.querySelector('#Internship').style.marginBottom = '220px'
			}

			if (scrollValue > 1601) {
				const divider = scrollValue - 1601

				const internshipSec = document.querySelector('#Internship');

				// init element before parallax
				internshipSec.style.transition = `all .3s ease`;

				if (divider < 300) {
					internshipSec.style.transform = `translate3d(0, ${divider * 0.5}px, 0) scale(${1 - divider * 0.002})`
				}

				if (divider > 300) {
					internshipSec.style.filter = `blur(10px)`
					internshipSec.style.transform = `translate3d(0, ${divider * 0.9}px, 0) scale(0.3)`
				} else if (divider < 300) {
					internshipSec.style.filter = `blur(0)`
				}

				// default element after parallax
				if (scrollValue > 2000) {
					internshipSec.style.marginBottom = '0'
				}
				// console.log(divider);
			}
		})
	}
}


// ________[Background handler]________
// const anBG = document.querySelector('.slick-word-bg')
// anBG.style.display = 'block'


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
	if (isDark()) {
		setTheme('light', 'fa-moon')
		if (!window.matchMedia("(max-width: 768px)").matches) {
			if (localStorage.getItem('isParallaxMode') == 'false') {
				document.querySelector('#walk-codeman').style.display = 'none'
			}
		}
	} else {
		setTheme('dark', 'fa-sun')
		if (!window.matchMedia("(max-width: 768px)").matches) {
			if (localStorage.getItem('isParallaxMode') == 'false') {
				document.querySelector('#walk-codeman').style.display = 'block'
			}
		}
	}
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

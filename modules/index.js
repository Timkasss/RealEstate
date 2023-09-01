function openburger() {
	let burger = document.querySelector('.header_burger');
	let bodyburger = document.querySelector('.body_burger');

	burger.addEventListener('click', () => {
		bodyburger.classList.toggle('active');
		burger.classList.toggle('span_active');
		if (bodyburger.classList.contains('active')) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "visible";
		}
	})
}

openburger();
new Swiper('.swiper', {
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	},
	// pagination: {
	// 	el: '.swiper-pagination',
	// 	clickable: true,
	// },
	slidesPerView: 1,
	//slidesPerGroup: 4
	//spaceBetween: 30,
	// breakpoints: {
	// 	1000: {
	// 		slidesPerView: 2,
	// 	}

	// }
});


function tabs() {
	let link = document.querySelectorAll('.best_tab_link');
	let block = document.querySelectorAll('.best_tab_content_wrapper');
	for (let index = 0; index < link.length; index++) {
		const start = link[index];
		start.addEventListener('click', (e) => {
			e.preventDefault();
			link[0].classList.remove('stl');
			for (let i = 0; i < block.length; i++) {
				const atr = block[i];
				atr.setAttribute('tab-block', 'none');

				if (index == i) {
					let atribut = atr.getAttribute('tab-block');
					if (atribut == "none") {
						atr.setAttribute('tab-block', 'active');
					}
				}
			}
		})

	}
}
tabs();

function rating() {
	const ratings = document.querySelectorAll('.rating');
	if (ratings.length > 0) {
		initRatings();
	}
	function initRatings() {
		let ratingActive, ratingValue;
		//Бегаем по всем рейтингам на странице
		for (let index = 0; index < ratings.length; index++) {
			const rating = ratings[index];
			initRating(rating);
		}
		//Инициализируем конкретный рейтинг
		function initRating(rating) {
			initRatingVars(rating);
			setRatingActiveWidth();
			if (rating.classList.contains('rating_set')) {
				setRating(rating);
			}
		}
		//Инициализируем переменые
		function initRatingVars(rating) {
			ratingActive = rating.querySelector('.rating_active');
			ratingValue = rating.querySelector('.rating_value');
		}
		//Изменяем ширину активных звезд
		function setRatingActiveWidth(index = ratingValue.innerHTML) {
			const ratingActiveWidth = index / 0.05;//Вычесления процента
			ratingActive.style.width = `${ratingActiveWidth}%`;
		}
		//Возможность указать оценку
		function setRating(rating) {
			const ratingItems = rating.querySelectorAll('.rating_item')
			for (let index = 0; index < ratingItems.length; index++) {
				const ratingItem = ratingItems[index];
				ratingItem.addEventListener("mouseenter", function (e) {
					//Обновление переменых
					initRatingVars(rating);
					//Обновление активных звезд
					setRatingActiveWidth(ratingItem.value)
				});
				ratingItem.addEventListener("mouseleave", function (e) {
					//Обновление активных звезд
					setRatingActiveWidth();
				});
				ratingItem.addEventListener("click", function (e) {
					//Обновление переменых
					initRatingVars(rating);
					if (rating.dataset.ajax) {
						//"отправить" на сервер
						setRatingValue(ratingItem.value, rating);
					} else {
						//Отобразить указаную оценку
						ratingValue.innerHTML = index + 1;
						setRatingActiveWidth();
					}
				})
			}
		}
	}
}
rating();
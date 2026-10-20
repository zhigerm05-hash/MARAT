// HTML толық жүктелмейінше бұл код орындалмайды, бұл қателердің алдын алады
document.addEventListener('DOMContentLoaded', () => {

    const animalsData = [
        { 
            id: 1, type: 'dog', img: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
            kz: { name: 'Ақтөс', age: '2 жас', gender: 'Аталық', health: 'Вакцинациядан өткен', status: 'Үй іздеп жүр', character: 'Адамға жақын, өте мейірімді, балаларды жақсы көреді.' },
            ru: { name: 'Актос', age: '2 года', gender: 'Мальчик', health: 'Вакцинирован', status: 'Ищет дом', character: 'Тянется к людям, очень добрый, любит детей.' }
        },
        { 
            id: 2, type: 'cat', img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
            kz: { name: 'Мурка', age: '1 жас', gender: 'Аналық', health: 'Стерилизацияланған', status: 'Үй іздеп жүр', character: 'Тыныш, ойнақы, тазалықты сүйеді.' },
            ru: { name: 'Мурка', age: '1 год', gender: 'Девочка', health: 'Стерилизована', status: 'Ищет дом', character: 'Спокойная, игривая, любит чистоту.' }
        },
        { 
            id: 3, type: 'dog', img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80',
            kz: { name: 'Батыр', age: '3 жас', gender: 'Аталық', health: 'Дені сау', status: 'Үй тапты', character: 'Күзетші қасиеттері өте жақсы дамыған, ақылды әрі адал дос.' },
            ru: { name: 'Батыр', age: '3 года', gender: 'Мальчик', health: 'Здоров', status: 'Нашел дом', character: 'Отличные охранные качества, умный и преданный друг.' }
        }
    ];

    let currentLang = 'kz';
    const animalGrid = document.getElementById('animal-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('search-input');

    function renderAnimals(data) {
        if (!animalGrid) return;
        animalGrid.innerHTML = ''; 
        
        if(data.length === 0) {
            const emptyMsg = currentLang === 'kz' ? 'Жануар табылған жоқ.' : 'Животное не найдено.';
            animalGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #777;">${emptyMsg}</div>`;
            return;
        }

        data.forEach(animal => {
            const langData = animal[currentLang];
            const isAdopted = langData.status === 'Үй тапты' || langData.status === 'Нашел дом';
            const statusClass = isAdopted ? 'status-adopted' : '';
            const typeIcon = animal.type === 'dog' ? 'fa-dog' : 'fa-cat';
            
            let btnText = isAdopted ? (currentLang==='kz'?'Толығырақ':'Подробнее') : (currentLang==='kz'?'Асырап алу':'Взять в семью');
            let btnAction = isAdopted ? `alert('${currentLang==='kz'?'Бұл жануар өз отбасын тапты!':'Это животное уже нашло семью!'}')` : `window.open('https://wa.me/77751829492', '_blank')`;

            const cardHTML = `
                <article class="card">
                    <img src="${animal.img}" alt="${langData.name}">
                    <div class="card-body">
                        <div class="card-header">
                            <h3 class="card-title">${langData.name}</h3>
                            <span class="card-status ${statusClass}">${langData.status}</span>
                        </div>
                        <div class="card-info">
                            <span><i class="fa-solid ${typeIcon}"></i> ${langData.age}</span>
                            <span><i class="fa-solid fa-venus-mars"></i> ${langData.gender}</span>
                        </div>
                        <div class="card-health">
                            <i class="fa-solid fa-notes-medical"></i> ${langData.health}
                        </div>
                        <p class="card-desc">${langData.character}</p>
                        <button class="btn ${isAdopted ? 'btn-secondary' : 'btn-primary'}" style="width: 100%; margin-top: auto;" onclick="${btnAction}">${btnText}</button>
                    </div>
                </article>
            `;
            animalGrid.insertAdjacentHTML('beforeend', cardHTML);
        });
    }

    // Тіл ауыстыру
    const langBtn = document.getElementById('lang-btn');
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            currentLang = currentLang === 'kz' ? 'ru' : 'kz';
            langBtn.textContent = currentLang === 'kz' ? 'RU' : 'KZ';
            
            document.querySelectorAll('[data-kz]').forEach(el => {
                el.innerHTML = el.getAttribute(`data-${currentLang}`);
            });

            document.querySelectorAll('[data-kz-placeholder]').forEach(el => {
                el.placeholder = el.getAttribute(`data-${currentLang}-placeholder`);
            });

            applyFilters();
        });
    }

    let currentFilter = 'all';
    let currentSearch = '';

    function applyFilters() {
        let filtered = animalsData;
        if (currentFilter !== 'all') filtered = filtered.filter(a => a.type === currentFilter);
        if (currentSearch) filtered = filtered.filter(a => a[currentLang].name.toLowerCase().includes(currentSearch.toLowerCase()));
        renderAnimals(filtered);
    }

    if (filterBtns) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.dataset.filter;
                applyFilters();
            });
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value;
            applyFilters();
        });
    }

    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileBtn.innerHTML = navMenu.classList.contains('active') ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
        });

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
            });
        });
    }

    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formStatus.textContent = currentLang === 'kz' ? "Хабарламаңыз қабылданды! (Демо режим)" : "Ваше сообщение принято! (Демо режим)";
            formStatus.className = "form-message success";
            contactForm.reset();
            setTimeout(() => { formStatus.style.display = 'none'; }, 4000);
        });
    }

    const amountBtns = document.querySelectorAll('.amount-btn');
    if (amountBtns) {
        amountBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                amountBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }

    const donateBtn = document.getElementById('donate-btn');
    if (donateBtn) {
        donateBtn.addEventListener('click', () => {
            alert(currentLang === 'kz' ? 'Төлем жүйесі қосылуда. Қазір Kaspi арқылы жетекші нөміріне аударым жасай аласыз.' : 'Платежная система подключается. Сейчас вы можете сделать перевод на номер руководителя через Kaspi.');
        });
    }

    // Каталогты алғашқы рет шығару
    renderAnimals(animalsData);
});
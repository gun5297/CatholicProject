document.addEventListener('DOMContentLoaded', () => {
    const sections = [
        {
            title: '성심교정',
            cards: [
                {
                    title: '경영대학원',
                    location: '김수환관 K225호',
                    phone: '02-2164-4595',
                },
                {
                    title: '교육대학원',
                    location: '김수환관 K339호',
                    phone: '02-2164-4173, 4176',
                },
                {
                    title: '교회법대학원',
                    location: '김수환관 K339호',
                    phone: '02-2164-6521',
                },
                {
                    title: '클로벌지식경영대학원',
                    location: '김수환관 K356호',
                    phone: '02-2164-4744',
                },
                {
                    title: '문화영성대학원',
                    location: '성의회관 606호',
                    phone: '02-3147-8787',
                },
                {
                    title: '사회복지대학원',
                    location: '성의회관 606호',
                    phone: '02-3147-8781',
                },
                {
                    title: '상담심리대학원',
                    location: '성의회관 606호',
                    phone: '02-3147-8783',
                },
                {
                    title: '행정대학원',
                    location: '성의회관 606호',
                    phone: '02-3147-8785',
                },
            ],
        },
        {
            title: '성의교정',
            cards: [
                {
                    title: '생명대학원',
                    location: '성의회관 5층',
                    phone: '02-3147-8156',
                },
                {
                    title: '보건의료경영대학원',
                    location: '서울성모병원 별관 1층',
                    phone: '02-3147-8155, 8158',
                },
                {
                    title: '임상치과대학원',
                    location: '서울성모병원 별관 1층',
                    phone: '02-3147-8154',
                },
                {
                    title: '임상간호대학원',
                    location: '옴니버스파크 간호대학 4층',
                    phone: '02-3147-8144',
                },
            ],
        },
        {
            title: '성신교정',
            cards: [
                {
                    title: '교회음악대학원',
                    location: '대학본부 1층',
                    phone: '02-740-9704, 5',
                },
            ],
        },
    ];

    const container = document.getElementById('sections-container');

    sections.forEach((section) => {
        const sectionContainer = document.createElement('div');
        sectionContainer.className = 'section-container';

        const sectionTitle = document.createElement('div');
        sectionTitle.className = 'section-title';
        sectionTitle.textContent = section.title;
        sectionContainer.appendChild(sectionTitle);

        const cardContainer = document.createElement('div');
        cardContainer.className = 'card-container';

        section.cards.forEach((card) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';

            const cardTitle = document.createElement('div');
            cardTitle.className = 'card-title';
            cardTitle.textContent = card.title;
            cardElement.appendChild(cardTitle);

            const cardInfo = document.createElement('div');
            cardInfo.className = 'card-info';
            cardInfo.innerHTML = `
            <p><i class="xi-maker"></i>위치: ${card.location}</p>
            <p><i class="xi-call"></i>전화번호: ${card.phone}</p>
        `;
            cardElement.appendChild(cardInfo);

            const cardButtons = document.createElement('div');
            cardButtons.className = 'card-buttons';
            cardButtons.innerHTML = `
            <button>
               <i class="xi-paper-o"></i> 입학정보 보기 <i class="xi-angle-right"></i>
            </button>
            <button>
                <i class="xi-home-o"></i>대학원 홈페이지 <i class="xi-angle-right"></i>
            </button>
        `;
            cardElement.appendChild(cardButtons);

            cardContainer.appendChild(cardElement);
        });

        sectionContainer.appendChild(cardContainer);
        container.appendChild(sectionContainer);
    });
});

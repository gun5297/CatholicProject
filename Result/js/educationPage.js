const educationPage = () => {
    const $educationlis = getAll('#education #content .cuk-core-con .cuk-core-ul > li');
    const $educationlisConWrap = getAll(
        '#education #content .cuk-core-con .cuk-core-ul li .li-con-wrap'
    );
    $educationlisConWrap.forEach((li, idx) => {
        li.addEventListener('click', (e) => {
            $educationlis[idx].classList.toggle('active');
        });
    });
};

//
const subInit = () => {
    //페이지별 sub 함수호출
    if (location.pathname.split('/').pop() === 'educationPage.html') {
        educationPage();
    }
};

(() => {
    subInit();
})();

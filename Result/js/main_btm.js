//비주얼배너
const mainBanner = () => {};
//이벤트배너
const eventBanner = () => {};

//cuk-head-lines
const cukHeadLines = () => {
    const $cukHeadListLis = getAll(
        '.main .cuk-head-lines .cuk-head-inner .head-lines-con-list .con-list-ul li'
    );
    const $cukHeadPagingLidiv = get(
        '.main .cuk-head-lines .cuk-head-inner .head-lines-con-list .head-lines-paging .paging-ul li div'
    );
    const $cukHeadPrevBtn = get(
        '.main .cuk-head-lines .cuk-head-inner .head-lines-con-list .head-lines-paging .paging-btn-wrap .prev-btn'
    );
    const $cukHeadNextBtn = get(
        '.main .cuk-head-lines .cuk-head-inner .head-lines-con-list .head-lines-paging .paging-btn-wrap .next-btn'
    );
    let cnt = 0,
        timer = null,
        interval = 3000;
    $cukHeadPrevBtn.addEventListener('click', (e) => {
        if (cnt > 0) {
            cnt--;
            $cukHeadPagingLidiv.style.width = `${(cnt + 1) * 20}%`;
            $cukHeadListLis.forEach((li) => {
                li.style.transform = `translateX(-${360 * cnt}px)`;
            });
        } else {
            cnt = 4;
            $cukHeadPagingLidiv.style.width = `100%`;
            $cukHeadListLis.forEach((li) => {
                li.style.transform = `translateX(-1440px)`;
            });
        }
        timerReStart();
    });
    $cukHeadNextBtn.addEventListener('click', (e) => {
        if (cnt < 4) {
            cnt++;
            $cukHeadPagingLidiv.style.width = `${(cnt + 1) * 20}%`;
            $cukHeadListLis.forEach((li) => {
                li.style.transform = `translateX(-${360 * cnt}px)`;
            });
        } else {
            cnt = 0;
            $cukHeadPagingLidiv.style.width = `20%`;
            $cukHeadListLis.forEach((li) => {
                li.style.transform = `translateX(0px)`;
            });
        }
        timerReStart();
    });
    const timerReStart = () => {
        clearInterval(timer);
        timerStart();
    };
    const timerStart = () => {
        timer = setInterval(() => {
            if (cnt < 4) {
                cnt++;
                $cukHeadPagingLidiv.style.width = `${(cnt + 1) * 20}%`;
                $cukHeadListLis.forEach((li) => {
                    li.style.transform = `translateX(-${360 * cnt}px)`;
                });
            } else {
                cnt = 0;
                $cukHeadPagingLidiv.style.width = `20%`;
                $cukHeadListLis.forEach((li) => {
                    li.style.transform = `translateX(0px)`;
                });
            }
        }, interval);
    };
    timerStart();
};

//cuk-news-con
const cukNewsCon = () => {
    const $cukNewsListLis = getAll('.main .cuk-news-con .news-btm-wrap .news-list li');
    const $cukNewsPrevBtn = get('.main .cuk-news-con .news-btm-wrap .btn-wrap .prev-btn');
    const $cukNewsNextBtn = get('.main .cuk-news-con .news-btm-wrap .btn-wrap .next-btn');
    let timer = null,
        cnt = 0,
        interval = 3000;

    $cukNewsPrevBtn.addEventListener('click', (e) => {
        timerRePlay();
        if (cnt > 0) cnt--;
        $cukNewsListLis.forEach((li) => {
            li.style.transform = `translateX(-${cnt * 530}px)`;
        });
    });
    $cukNewsNextBtn.addEventListener('click', (e) => {
        timerRePlay();
        if (cnt < 2) cnt++;
        $cukNewsListLis.forEach((li) => {
            li.style.transform = `translateX(-${cnt * 530}px)`;
        });
    });
    const timerRePlay = () => {
        clearInterval(timer);
        timerPlay();
    };
    const timerPlay = () => {
        timer = setInterval(() => {
            if (cnt < 2) {
                cnt++;
                $cukNewsListLis.forEach((li) => {
                    li.style.transform = `translateX(-${cnt * 530}px)`;
                });
            } else {
                cnt = 0;
                $cukNewsListLis.forEach((li) => {
                    li.style.transform = `translateX(0px)`;
                });
            }
        }, interval);
    };
    timerPlay();
};

//cuk-sns-con
const cukSnsCon = () => {
    const $cukSnsConUl = get('.main .cuk-sns-con ul');
    let imgSetLeft = 0,
        timer = null,
        data = null,
        { src, value } = '';

    const url = './JSON/maindata.json';
    fetch(url)
        .then((res) => res.json())
        .then((json) => {
            data = json.cukSnSdata;
            data.forEach((item) => {
                src = item.src;
                value = item.value;
                imgWrapMake(src, value);
            });
        });

    const reCreatTimer = () => {
        timer = setInterval(() => {
            data.forEach(() => {
                imgWrapMake(src, value);
            });
        }, 90000);
    };

    const imgWrapMake = (src, value) => {
        let li = document.createElement('li');
        let div = document.createElement('div');
        div.classList.add('img-con-wrap');

        let img = document.createElement('img');
        img.setAttribute('src', src);

        let p = document.createElement('p');
        p.textContent = value;

        div.append(img, p);
        li.append(div);
        $cukSnsConUl.append(li);
    };

    const timerplay = () => {
        timer = setInterval(() => {
            imgSetLeft -= 0.1;
            $cukSnsConUl.style.transform = `translateX(${imgSetLeft}px)`;
        }, 0);
    };

    timerplay();
    reCreatTimer();
};

// 하단 탭 컨텐츠 Js
const mainBtmTabCon = () => {
    const $tabConLis = getAll('.main .tab-con .tab-con-ul li');
    const $tabConBox = getAll('.main .tab-con .tab-con-box');
    $tabConLis.forEach((li, idx) => {
        li.addEventListener('click', (e) => {
            AllRemove($tabConLis, $tabConBox);
            Eladd(li, $tabConBox[idx]);
        });
    });
    Eladd($tabConLis[0], $tabConBox[0]);
};

//합치기
const mainInit = () => {
    mainBanner();
    eventBanner();
    mainBtmTabCon();
    cukSnsCon();
    cukNewsCon();
    cukHeadLines();
};

(() => {
    mainInit();
})();

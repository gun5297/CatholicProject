const get = (target) => document.querySelector(target);
const getAll = (target) => document.querySelectorAll(target);

const preventDefaultAnchor = () => {
    const $links = getAll('a[href="#"]');
    $links.forEach((link) => {
        link.addEventListener('click', (e) => e.preventDefault());
    });
};
const AllRemove = (all, all1) => {
    if (all) all.forEach((v) => v.classList.remove('active'));
    if (all1) all1.forEach((v) => v.classList.remove('active'));
};
const Eladd = (el, el1) => {
    if (el) el.classList.add('active');
    if (el1) el1.classList.add('active');
};
const ElRemove = (el) => {
    el.classList.remove('active');
};
const ElToggle = (el) => {
    el.classList.toggle('active');
};
const ClickElAdd = (Click, el, el1) => {
    Click.addEventListener('click', (e) => {
        if (el) el.classList.add('active');
        if (el1) el1.classList.add('active');
    });
};
const ClickElRemove = (Click, el, el1) => {
    Click.addEventListener('click', (e) => {
        if (el) el.classList.remove('active');
        if (el1) el1.classList.remove('active');
    });
};

// 공통으로 들어가는 내용을 성격별로 함수로 만들기
const navi = () => {
    const $body = get('body');
    const $header = get('#header');
    const $hdrBtmBox = get('#header .hdr-btm-box');
    const $hdrBtmGubLi = getAll('#header .hdr-btm-box .btm-box-in .gnb-ul > li');
    const $hdrBtmSubwrap = getAll('#header .hdr-btm-box .btm-box-in .sub-wrap');
    const $hdrBtmBg = get('#header .hdr-btm-box .btm-box-bg');
    const $hdrBtmSubtitleLis = getAll(
        '#header .hdr-btm-box .btm-box-in .sub-wrap .sub-title-ul ul li'
    );
    const $lagBtn = get('#header .hdr-top-box .top-box-in .hdr-r-box .lag');
    const $LagPopup = get('#header .hdr-top-box .top-box-in .lag-popup');
    const $LagPopupBtn = get('#header .hdr-top-box .top-box-in .lag-popup .btn');

    const $seh = get('#header .hdr-btm-box .btm-box-in .menu-ul .seh');
    const $sehBtn = get('#header .hdr-btm-box .btm-box-in .menu-ul .seh .xi-search');
    const $sehCloseBtn = get('#header .hdr-btm-box .btm-box-in .menu-ul .seh .seh-wrap .closeBtn');
    const $hdrPopBtn = get('#header .hdr-btm-box .btm-box-in .menu-ul .pop-menu-btn');
    const $hdrPopWrap = get('#header .pop-menu-wrap');
    const $hdrPopCloseBtn1 = get(
        '#header .hdr-btm-box .bars-pop-menu .pop-menu-inner .top-bar .xi-close'
    );
    const $hdrPopCloseBtn2 = get('#header .hdr-btm-box .pop-menu-close-btn');

    window.addEventListener('scroll', (e) => {
        if (window.scrollY > $header.offsetHeight) {
            $hdrBtmBox.classList.add('active');
        } else {
            $hdrBtmBox.classList.remove('active');
        }
    });

    $hdrBtmGubLi.forEach((lis, idx) => {
        lis.addEventListener('mouseenter', (e) => {
            AllRemove($hdrBtmGubLi);
            Eladd(lis);
            $hdrBtmBg.style.height = `${$hdrBtmSubwrap[idx].offsetHeight + 50}px`;
        });
    });
    $hdrBtmBox.addEventListener('mouseleave', (e) => {
        AllRemove($hdrBtmGubLi);
        $hdrBtmBg.style.height = `0px`;
    });
    $hdrBtmSubtitleLis.forEach((lis, idx) => {
        lis.addEventListener('mouseenter', (e) => {
            AllRemove($hdrBtmSubtitleLis);
            Eladd(lis);
        });
        lis.addEventListener('mouseleave', (e) => {
            AllRemove($hdrBtmSubtitleLis);
        });
    });
    ClickElAdd($lagBtn, $LagPopup);
    ClickElRemove($LagPopupBtn, $LagPopup);
    ClickElAdd($sehBtn, $seh);
    ClickElRemove($sehCloseBtn, $seh);
    ClickElAdd($hdrPopBtn, $hdrPopWrap, $body);
    ClickElRemove($hdrPopCloseBtn1, $hdrPopWrap, $body);
    ClickElRemove($hdrPopCloseBtn2, $hdrPopWrap, $body);
    preventDefaultAnchor();
};
const footer = () => {
    const $lis = getAll('#footer .footer-top-box .top-box-inner > ul > li');
    const $subWrap = getAll('#footer .footer-top-box .top-box-inner > ul > li > .sub-wrap');
    const $footerTopBoxAbtn = getAll('#footer .footer-top-box .top-box-inner > ul > li > a');
    const $footerTopBoxUl = get('#footer .footer-top-box .top-box-inner > ul');
    let old = 0;

    $footerTopBoxAbtn.forEach((aBtn, idx) => {
        aBtn.addEventListener('click', (e) => {
            if ($lis[idx] === $lis[old]) {
                ElToggle($lis[idx]);
            } else {
                AllRemove($lis);
                Eladd($lis[idx]);
            }
            old = idx;
            $footerTopBoxUl.style.height = `${$subWrap[idx].offsetHeight + 55}px`;
        });
    });
    preventDefaultAnchor();
};

const comInit = () => {
    const getPage = (page, tag) => {
        fetch(page)
            .then((res) => res.text())
            .then((res) => {
                if (tag === '#header') {
                    get(tag).innerHTML = res;
                    navi();
                }
                if (tag === '#footer') {
                    get(tag).innerHTML = res;
                    footer();
                }
            });
    };
    getPage('page/header.html', '#header');
    getPage('page/footer.html', '#footer');
};

(() => {
    preventDefaultAnchor();
    comInit();
})();

const magaPage = () => {
    const h3 = document.querySelector('#mega .sub1 .inner h3');
    const href = document.querySelector('#mega .sub1 .inner .logo i');
    const bigsellis = document.querySelectorAll('#mega .sub1 .inner .bigsel li');
    const logo = document.querySelector('#mega .sub1 .inner .logo img');
    const icon1 = document.querySelector('#mega .sub1 .inner .box1 img');
    const icon2 = document.querySelector('#mega .sub1 .inner .box2 img');
    const icon3 = document.querySelector('#mega .sub1 .inner .box3 img');
    const p = document.querySelector('#mega .sub1 .inner p');
    const st1 = document.querySelector('#mega .sub1 .inner ul .txt1 strong');
    const st2 = document.querySelector('#mega .sub1 .inner ul .txt2 strong');
    const st3 = document.querySelector('#mega .sub1 .inner ul .txt3 strong');
    const tp1 = document.querySelector('#mega .sub1 .inner ul .txt1 p');
    const tp2 = document.querySelector('#mega .sub1 .inner ul .txt2 p');
    const tp3 = document.querySelector('#mega .sub1 .inner ul .txt3 p');
    const btn3 = document.querySelector('#mega .sub1 .inner .box');
    const txtst = document.querySelector('#mega .sub1 .inner .txtbox strong');
    const txtp = document.querySelector('#mega .sub1 .inner .txtbox p');
    const txtem = document.querySelector('#mega .sub1 .inner .txtbox em');
    const txtbox = document.querySelector('#mega .sub1 .inner .txtbox');
    const pictxt = document.querySelector('#mega .sub1 .inner .pictxt');
    const picp = document.querySelector('#mega .sub1 .inner .pictxt p');
    const pich1 = document.querySelector('#mega .sub1 .inner .pictxt ul .tb1 h2');
    const pich2 = document.querySelector('#mega .sub1 .inner .pictxt ul .tb2 h2');
    const pich3 = document.querySelector('#mega .sub1 .inner .pictxt ul .tb3 h2');
    const picst1 = document.querySelector('#mega .sub1 .inner .pictxt ul .tb1 strong');
    const picst2 = document.querySelector('#mega .sub1 .inner .pictxt ul .tb2 strong');
    const picst3 = document.querySelector('#mega .sub1 .inner .pictxt ul .tb3 strong');
    const picpp1 = document.querySelector('#mega .sub1 .inner .pictxt ul .tb1 p');
    const picpp2 = document.querySelector('#mega .sub1 .inner .pictxt ul .tb2 p');
    const picpp3 = document.querySelector('#mega .sub1 .inner .pictxt ul .tb3 p');
    const sub1 = document.querySelector('#mega .sub1 .inner .pictxt ul .tb1 img');
    const sub2 = document.querySelector('#mega .sub1 .inner .pictxt ul .tb2 img');
    const sub3 = document.querySelector('#mega .sub1 .inner .pictxt ul .tb3 img');

    const url = './JSON/kimjinwoo_DB.json';
    fetch(url)
        .then((res) => res.json())
        .then((json) => {
            const megaset = json.megaset;
            const tx = json.tx;
            const pictxtarr = json.pictxtarr;

            let contentA = document.getElementById('contentA');
            contentA.style.display = 'none';

            href.addEventListener('click', (e) => {
                if (href.textContent === 'www.elihigh.co.kr') {
                    window.open(megaset[1].url);
                }
                if (href.textContent === 'www.mbest.co.kr') {
                    window.open(megaset[2].url);
                } else {
                    window.open(megaset[0].url);
                }
            });
            icon1.addEventListener('click', (e) => {
                if (st1.textContent === '블로그') {
                    window.open('https://blog.naver.com/ilovecu');
                }
            });
            icon2.addEventListener('click', (e) => {
                if (st2.textContent === '유튜브') {
                    window.open('https://www.youtube.com/channel/UCXCTZNby7FR4Ijb2_X8X_mA');
                }
            });
            icon3.addEventListener('click', (e) => {
                if (st3.textContent === '인스타그램') {
                    window.open('https://www.instagram.com/lovecuk/');
                }
            });

            bigsellis.forEach((item, idx) => {
                item.addEventListener('click', (e) => {
                    bigsellis.forEach((li) => {
                        li.classList.remove('on');
                    });

                    if (idx === 3) {
                        contentA.style.display = 'block';
                        btn3.classList.add('on');
                        txtbox.classList.add('on');
                        pictxt.classList.add('on');
                        href.classList.add('on');
                    }
                    if (idx !== 3) {
                        contentA.style.display = 'none';
                        btn3.classList.remove('on');
                        txtbox.classList.remove('on');
                        pictxt.classList.remove('on');
                        href.classList.remove('on');
                    }

                    bigsellis[idx].classList.add('on');

                    h3.textContent = megaset[idx].name;

                    logourl = `images/megePage/logo${idx}.jpg`;
                    logo.setAttribute('src', logourl);

                    href.textContent = megaset[idx].arr;

                    p.textContent = megaset[idx].txt;

                    st1.textContent = tx[idx].st1;
                    st2.textContent = tx[idx].st2;
                    st3.textContent = tx[idx].st3;

                    tp1.textContent = tx[idx].p1;
                    tp2.textContent = tx[idx].p2;
                    tp3.textContent = tx[idx].p3;

                    iconurl1 = `images/megePage/icon${idx}.jpg`;
                    icon1.setAttribute('src', iconurl1);
                    iconurl2 = `images/megePage/icon${idx + 3}.jpg`;
                    icon2.setAttribute('src', iconurl2);
                    iconurl3 = `images/megePage/icon${idx + 6}.jpg`;
                    icon3.setAttribute('src', iconurl3);

                    txtst.textContent = megaset[idx].txst;
                    txtp.textContent = megaset[idx].txp;
                    txtem.textContent = megaset[idx].txem;

                    picp.textContent = pictxtarr[idx].picp;

                    pich1.textContent = pictxtarr[idx].h1;
                    pich2.textContent = pictxtarr[idx].h2;
                    pich3.textContent = pictxtarr[idx].h3;

                    picst1.textContent = pictxtarr[idx].st1;
                    picst2.textContent = pictxtarr[idx].st2;
                    picst3.textContent = pictxtarr[idx].st3;

                    picpp1.textContent = pictxtarr[idx].p1;
                    picpp2.textContent = pictxtarr[idx].p2;
                    picpp3.textContent = pictxtarr[idx].p3;

                    suburl1 = `images/megePage/sub${idx}.jpg`;
                    sub1.setAttribute('src', suburl1);
                    suburl2 = `images/megePage/sub${idx + 3}.jpg`;
                    sub2.setAttribute('src', suburl2);
                    suburl3 = `images/megePage/sub${idx + 6}.jpg`;
                    sub3.setAttribute('src', suburl3);
                });
            });
        });
};
magaPage();

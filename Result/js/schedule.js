const schedulePage = () => {
    const lis = document.querySelectorAll('#schedule .sub1 .inner .menu ul li');
    const conbox1 = document.querySelector('#schedule .sub1 .inner .scdu .conbox');
    const conbox2 = document.querySelector('#schedule .sub1 .inner .scdu .conbox2');
    const mon = document.querySelector('#schedule .sub1 .inner .scdu .mon');
    const days = document.querySelector('#schedule .sub1 .inner .scdu .day');
    const cont = document.querySelector('#schedule .sub1 .inner .scdu .cont');
    const dlbtn = document.querySelector('#schedule .sub1 .inner .dlbtn button');
    const calbtn = document.querySelector('#schedule .sub1 .inner .tranbtns .cal');
    const listbtn = document.querySelector('#schedule .sub1 .inner .tranbtns .list');
    const sel = document.querySelector('#schedule .sub1 .inner .selbtn');
    const selop = document.querySelector('#schedule .sub1 .inner .selbtn select');
    const todaybtn = document.querySelector('#schedule .sub1 .inner .selbtn button');
    const con1tboby = document.querySelector('#schedule .sub1 .inner .scdu .conbox2 .con1 tbody');
    const con2box = document.querySelector('#schedule .sub1 .inner .scdu .conbox2 .con2 .con2-box');
    const con2P = document.querySelector('#schedule .sub1 .inner .scdu .conbox2 .con2 p');
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    const url = './JSON/kimjinwoo_DB.json';
    fetch(url)
        .then((res) => res.json())
        .then((json) => {
            const scheduleDt = json.scheduleDt;
            const year = json.year;
            const aug = json.aug;
            const set = json.set;
            const oct = json.oct;
            let data1 = '',
                data2 = '',
                data3 = '',
                data4 = '',
                data5 = '';
            const List = () => {
                for (let i = 0; i < year.length; i++) {
                    data1 += `<li>${year[i].m}</li>
             `;
                }
                mon.innerHTML = data1;
                for (let i = 0; i < scheduleDt.length; i++) {
                    data2 += `<li>${scheduleDt[i].d}</li>`;
                }
                days.innerHTML = data2;
                for (let i = 0; i < scheduleDt.length; i++) {
                    data3 += `<li>${scheduleDt[i].t}</li>`;
                }
                cont.innerHTML = data3;
            };
            List();
            listbtn.classList.add('on');
            calbtn.addEventListener('click', (e) => {
                conbox1.classList.add('on');
                conbox2.classList.add('on');
                sel.classList.add('on');
                dlbtn.classList.add('on');
                calbtn.classList.add('on');
                listbtn.classList.remove('on');
                selop.value = '9월';
            });
            listbtn.addEventListener('click', (e) => {
                conbox1.classList.remove('on');
                conbox2.classList.remove('on');
                sel.classList.remove('on');
                dlbtn.classList.remove('on');
                calbtn.classList.remove('on');
                listbtn.classList.add('on');
            });
            const num = (num) => {
                for (let i = 0; i < 6; i++) {
                    data4 += `<tr>
                                <td>${num[i].n1}</td>
                                <td>${num[i].n2}</td>
                                <td>${num[i].n3}</td>
                                <td>${num[i].n4}</td>
                                <td>${num[i].n5}</td>
                                <td>${num[i].n6}</td>
                                <td>${num[i].n7}</td> 
                            </tr>`;
                }
                con1tboby.innerHTML = data4;
            };
            num(set);

            con1tboby.classList.add('active');
            todaybtn.addEventListener('click', (e) => {
                if (month == '8') {
                    data4 = '';
                    num(aug);
                    data5 = '';
                    monList(9, 27);
                    con2P.textContent = `2024년 ${month}월 ${day}일`;
                    selop.value = '8월';
                    con1tboby.classList.add('on');
                    con1tboby.classList.remove('active');
                    con1tboby.classList.remove('in');
                } else if (month == '9') {
                    data4 = '';
                    num(set);
                    data5 = '';
                    monList(3, 35);
                    con2P.textContent = `2024년 ${month}월 ${day}일`;
                    selop.value = '9월';
                    con1tboby.classList.remove('on');
                    con1tboby.classList.add('active');
                    con1tboby.classList.remove('in');
                } else {
                    data4 = '';
                    num(oct);
                    data5 = '';
                    monList(3, 38);
                    con2P.textContent = `2024년 ${month}월 ${day}일`;
                    selop.value = '10월';
                    con1tboby.classList.remove('on');
                    con1tboby.classList.remove('active');
                    con1tboby.classList.add('in');
                }
            });

            const monList = (num1, num2) => {
                for (let i = 0; i < num1; i++) {
                    data5 += ` <ul>
               <li>${scheduleDt[i + num2].t}</li>
               <em>${scheduleDt[i + num2].d}</em>
                </ul>`;
                }
                con2box.innerHTML = data5;
            };
            monList(3, 35);

            selop.addEventListener('click', (e) => {
                let ty = e.currentTarget;
                if (ty.value === '9월') {
                    data4 = '';
                    num(set);
                    data5 = '';
                    monList(3, 35);
                    con1tboby.classList.remove('on');
                    con1tboby.classList.add('active');
                    con1tboby.classList.remove('in');
                    con2P.textContent = `2024년 9월`;
                } else if (ty.value === '10월') {
                    data4 = '';
                    num(oct);
                    data5 = '';
                    monList(3, 38);
                    con1tboby.classList.remove('on');
                    con1tboby.classList.remove('active');
                    con1tboby.classList.add('in');
                    con2P.textContent = '2024년 10월';
                } else {
                    data4 = '';
                    num(aug);
                    data5 = '';
                    monList(9, 27);
                    con1tboby.classList.add('on');
                    con1tboby.classList.remove('active');
                    con1tboby.classList.remove('in');
                    con2P.textContent = `2024년 8월`;
                }
            });

            lis[0].classList.add('on');
            lis.forEach((item, idx) => {
                item.addEventListener('click', (e) => {
                    lis.forEach((li) => {
                        li.classList.remove('on');
                    });
                    lis[idx].classList.add('on');
                });
            });
            lis[1].addEventListener('click', (e) => [alert('페이지 준비중')]);
            lis[2].addEventListener('click', (e) => [alert('페이지 준비중')]);
            lis[3].addEventListener('click', (e) => [alert('페이지 준비중')]);
        });
};
schedulePage();

const mainTop_section1 = () => {
    const videoDelete = get('#main_top .mainVideoBox .mainVideoUl a');
    videoDelete.addEventListener('click', (e) => {
        e.preventDefault();
        e.target.parentElement.parentElement.remove();
    });
    //naviColor
    // const hdr = het("#main_top #header")
    // const hdr_btm = get("#main_top #header .hdr-btm-box")

    // hdr_btm.addEventListener('mouseover', )

    //mainSlide

    const slideSystem = () => {};
    let currentSlide = 0,
        newSlide;
    const btnPrev = get('#main_top .section_1 .mainSlider .mainSliderControl .prevBtn');
    const btnNext = get('#main_top .section_1 .mainSlider .mainSliderControl .nextBtn');
    const btnPause = get('#main_top .section_1 .mainSlider .mainSliderControl .pauseBtn');
    const mainSlideNext = () => {
        const ani_Out = [{ transform: 'translateX(0)' }, { transform: 'translateX(-100%)' }];
        const ani_In = [{ transform: 'translateX(100%)' }, { transform: 'translateX(0)' }];
        const options = {
            duration: 700,
            easing: 'ease-in-out',
            fill: 'forwards',
        };
        //next slide
        newSlide = currentSlide + 1;
        if (currentSlide === 3) newSlide = 0;
        const slider = get('#main_top .mainSlider');
        const progress = get('#main_top .section_1 .mainSlider .mainSliderControl progress');
        slider.children[currentSlide].classList.remove('hide');
        slider.children[newSlide].classList.remove('hide');
        slider.children[currentSlide].animate(ani_Out, options);
        slider.children[newSlide].animate(ani_In, options);
        // console.log((newSlide + 1) * 25);
        progress.value = (newSlide + 1) * 25;
        if (currentSlide === 3) {
            currentSlide = 0;
        } else {
            currentSlide++;
        }
    };

    // btnNext.addEventListener("click", mainSlideNext);
    // const mainSlider = setInterval(mainSlideNext, 4000);
};

const mainTop_section2 = async () => {
    const jsonPromise = await fetch('./JSON/hanwol_DB.json');
    const jsonData = await jsonPromise.json();

    const noticeSelectAll = getAll('#main_top .select');
    noticeSelectAll.forEach((noticeSelect) => {
        noticeSelect.addEventListener('mouseleave', (e) => {
            if (!noticeSelect.children[2].classList.contains('hide'))
                noticeSelect.children[2].classList.toggle('hide'); //children[2] : options
        });
        noticeSelect.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.nodeName === 'P') {
                noticeList(e.target.innerHTML);
                noticeSelect.children[0].innerHTML =
                    '&nbsp&nbsp' + e.target.innerHTML + '&nbsp&nbsp&nbsp'; // children[0] : selected value
                noticeSelect.children[2].classList.toggle('hide');
            } else {
                noticeSelect.children[2].classList.toggle('hide');
            }
        });
    });

    const noticeList = async (select) => {
        const noticeUl = get('#main_top .section_2 .noticeBox .content ul');
        const noticeLI = noticeUl.children[0].cloneNode(true);
        noticeUl.innerHTML = '';
        const notice_list = jsonData.notice_list;
        const list_data = notice_list.filter((data) => data.type === select).slice(0, 11);

        list_data.forEach((data) => {
            const CurrentLi = noticeLI.cloneNode(true);
            const noticeImoge = CurrentLi.children[0].children[0].children[0];
            const noticeTag = CurrentLi.children[0].children[0].children[1];
            const noticeText = CurrentLi.children[0].children[0].children[2];
            const noticeDay = CurrentLi.children[1].children[0];
            if (data.notice === false) noticeImoge.remove();
            noticeTag.innerHTML = data.type;
            noticeText.innerHTML = '&nbsp;&nbsp;&nbsp;' + data.name;
            noticeDay.innerHTML = data.day;
            noticeUl.append(CurrentLi);
        });
    };

    const schedule_list = () => {
        class SchBox {
            //more info "index.html > .scheduleBox ul li :)"
            constructor(node) {
                this.node = node;
                this.month = node.querySelector('.month');
                this.day = node.querySelector('.day');
                this.date = node.querySelector('.date');
                this.text = node.querySelector('.textContent');
            }
        }
        const schedule_list = jsonData.schedule_list;
        const schBox = get('#main_top .section_2 .scheduleBox .content');
        schedule_list.forEach((schedule) => {
            const schli = new SchBox(schBox.querySelector('.copys').cloneNode(true));
            // schli.month = schedule_list.
            schli.month.innerHTML = new Date(schedule.date_start)
                .toString()
                .slice(4, 7)
                .toUpperCase();
            schli.day.innerHTML = new Date(schedule.date_start).getDate();
            schli.date.innerHTML = schedule.date_start + ' - ' + schedule.date_end;
            Object.entries(schedule.loc).forEach(([key, value]) => {
                if (value === false) {
                    schli.node.querySelector('.' + key).classList.add('hide');
                }
            });
            schli.text.innerHTML = schedule.name;
            schli.node.classList.remove('hide');
            schBox
                .querySelector(`.schedules${new Date(schedule.date_start).getMonth()}`)
                .append(schli.node);
        });
        const mons = getAll('#main_top .section_2 .scheduleBox .topBox .topBox_right a');
        const schs = schBox.querySelectorAll(`.schedules`);

        // mons[2].classList.add("hide");

        mons.forEach((mon) => {
            mon.addEventListener('click', (current) => {
                current.preventDefault();
                if (current.target.tagName === 'SPAN') {
                    for (i = 0; i < 3; i++) {
                        mons[i].children[0].classList.remove('active');
                        schs[i].classList.add('hide');
                    }
                    current.target.classList.add('active');
                    const index = current.target.dataset.num;

                    schBox.querySelector(`.schedules${index}`).classList.remove('hide');
                }
            });
        });
        //
        //
        //
        //
        //SlideBoxs
        class SlideBox {
            constructor(node, url, len, texts) {
                this.SlideNext = this.SlideNext.bind(this);
                this.SlidePrev = this.SlidePrev.bind(this);
                this.node = node;
                this.texts = texts;
                this.url = url;
                this.max = len;
                this.current = 1;
                this.ul = document.createElement('ul');
                this.prevBtn = this.node.querySelector('.prev');
                this.nextBtn = this.node.querySelector('.next');
                this.pauseBtn = this.node.querySelector('.pause');
                this.prog = this.node.querySelector('.prog');
                this.lis = [
                    this.li(this.crt(-2)),
                    this.li(this.crt(-1)),
                    this.li(this.crt(0)),
                    this.li(this.crt(1)),
                    this.li(this.crt(2)),
                ];
                this.timer;
                this.timerPause = false;
                this.init();
            }
            init() {
                this.ul.style.display = 'flex';
                // this.ul.style.overflowX = "hidden";
                this.ul.style.width = `${this.node.offsetWidth}px`;
                this.ul.style.height = `${this.node.offsetHeight}px`;
                this.ul.style.position = 'relative';
                // this.ul.style.transform = ""
                this.node.append(this.ul);
                this.ul.append(...this.lis);
                this.lisPos();
                this.timerSet();
                this.mouseEvent();
                this.prevBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.SlidePrev();
                });
                this.nextBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.SlideNext();
                });
                this.pauseBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.timerToggle();
                });
                if (this.texts) {
                    document
                        .querySelector('#main_top .announce .subNotice .delete')
                        .addEventListener('click', (e) => {
                            e.preventDefault();
                            e.target.parentElement.parentElement.remove();
                        });
                }
            }
            li(index) {
                const li = document.createElement('li');
                const img = document.createElement('img');
                const span = document.createElement('span');
                // console.log(this.url);
                img.setAttribute('src', this.url + index + '.png');
                img.setAttribute('alt', 'slide' + index);

                if (this.texts) {
                    span.innerHTML = this.texts[index - 1];
                    li.append(span);
                }

                li.append(img);
                li.style.transition = '0.5s';
                li.style.position = 'absolute';

                return li;
            }
            lisPos(newLi) {
                let pos = -2;
                this.lis.forEach((li, i) => {
                    if (li === newLi) {
                        li.classList.add('hide');
                        setTimeout(() => {
                            li.classList.remove('hide');
                        }, 500);
                    }

                    li.style.translate = '3s';
                    li.style.transform = `translateX(${pos++ * this.node.offsetWidth}px)`;
                });
            }
            lisPrev() {
                const newLi = this.li(this.crt(-2));

                this.ul.lastChild.remove();
                this.lis.pop();
                this.ul.prepend(newLi);
                this.lis.unshift(newLi);
                this.lisPos(newLi);
            }
            lisNext() {
                const newLi = this.li(this.crt(2));
                this.ul.firstChild.remove();
                this.lis.shift();
                this.ul.appendChild(newLi);
                this.lis.push(newLi);
                this.lisPos(newLi);
            }
            SlidePrev() {
                this.current = this.crt(-1);
                this.lisPrev();
                this.progSet();
                this.timerReload();
            }
            SlideNext() {
                this.current = this.crt(1);
                this.lisNext();
                this.progSet();
                this.timerReload();
            }
            crt(val) {
                if (val === 0) return this.current;
                if (val > 0) {
                    if (this.current + val > this.max) {
                        return this.current + val - this.max;
                    } else {
                        return this.current + val;
                    }
                }
                if (val < 0) {
                    if (this.current + val < 1) {
                        return this.current + this.max + val;
                    } else {
                        return this.current + val;
                    }
                }
            }
            mouseEvent() {
                let isDragging = null;
                let totalMove = 0;
                this.node.parentElement.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                    isDragging = true;
                    this.timerStop();
                    this.lis.forEach((li) => (li.style.transition = '0s'));
                });

                document.addEventListener('mouseup', (e) => {
                    if (isDragging) {
                        isDragging = false;

                        this.lis.forEach((li) => (li.style.transition = '0.5s'));
                        const copy_totalMove = totalMove;
                        // console.log(totalMove);
                        if (Math.abs(copy_totalMove) >= this.ul.offsetWidth * 0.2) {
                            if (totalMove < 0) {
                                this.SlideNext();
                            } else {
                                this.SlidePrev();
                            }
                        } else {
                            this.lisPos();
                        }
                        this.timerSet();
                    }
                    totalMove = 0;
                });

                document.addEventListener('mousemove', (e) => {
                    if (isDragging) {
                        const diffX = e.movementX;
                        totalMove += diffX;
                        if (
                            0 < this.ul.offsetWidth + totalMove &&
                            this.ul.offsetWidth + totalMove < this.ul.offsetWidth * 2
                        ) {
                            this.lis.forEach((li) => {
                                let movementTranslateX =
                                    parseInt(
                                        li.style.transform
                                            .replace('translateX(', '')
                                            .replace('px)', '')
                                    ) + diffX;
                                li.style.transform = `translateX(${movementTranslateX}px)`;
                            });
                        }
                    }
                });
                if (this.node.parentElement.querySelector('.dragNode')) {
                    const dragNode = this.node.parentElement.querySelector('.dragNode');
                    const dragBox = this.node.parentElement.querySelector('.dragNodeBox_rel');
                    dragBox.parentElement.addEventListener('mousemove', (e) => {
                        const mouseX = e.offsetX;
                        const mouseY = e.offsetY + 10 - 100;
                        dragNode.style.left = mouseX + 'px';
                        dragNode.style.top = mouseY + 'px';
                    });
                }
                // }
            }
            timerSet() {
                if (this.timerPause === false && this.timer === undefined) {
                    this.timer = setInterval(() => {
                        this.SlideNext();
                    }, 3000);
                }
            }
            timerStop() {
                if (this.timer !== undefined) {
                    clearInterval(this.timer);
                    this.timer = undefined;
                }
            }
            timerToggle() {
                this.timerPause = !this.timerPause;
                if (this.timerPause) this.timerSet();
                else this.timerStop();
            }
            timerReload() {
                if (this.timerPause) {
                    clearInterval(this.timer);
                    this.timer = setInterval(() => {
                        this.SlideNext();
                    }, 3000);
                }
            }
            progSet() {
                if (this.prog) {
                    this.prog.max = this.max;
                    this.prog.value = this.current;
                    // console.log(this.prog.previousElementSibling.tagName);
                    if (this.prog.previousElementSibling) {
                        if (this.prog.previousElementSibling.tagName === 'SPAN')
                            this.prog.previousElementSibling.innerHTML = this.prog.value;
                    }

                    if (this.prog.nextSibling) {
                        if (this.prog.nextSibling.tagName === 'SPAN')
                            this.prog.nextSibling.innerHTML = this.prog.max;
                    }
                }
            }
        }
        const subNotice = document.querySelector('#main_top .section_1 .subNotice.grabSlide');
        new SlideBox(subNotice, subNotice.dataset.src, 4, [
            '[성심] 2024-2학기 코로나 19 감염 예방 관련 권고 사항 (24.8.26 적용)',
            '대학-학과-대학원 홈페이지 리뉴얼 오픈 안내',
            '2024년도 2학기 재학생 등록금 납부 안내',
            '[입학처] 신입생(24학번) 대상 설문 (4천원 쿠폰 증정)',
        ]);
        const mainSlider = document.querySelector('#main_top .section_1 .mainSlider.grabSlide');
        new SlideBox(mainSlider, mainSlider.dataset.src, 4); //"./images/maint_sect2_banner", 5);

        const bannerSlider = document.querySelector('#main_top .section_2 .grapSlide.bannerSlide');
        new SlideBox(bannerSlider, bannerSlider.dataset.src, 5); //"./images/maint_sect2_banner", 5);

        const contentSlider = document.querySelector('#main_top .section_3 .grabSlide.contentsBox');
        new SlideBox(contentSlider, contentSlider.dataset.src, 5);
    };
    noticeList('일반');
    schedule_list();
};
mainTop_section1();
mainTop_section2();

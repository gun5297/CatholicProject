const get = (target) => document.querySelector(target);
const getAll = (target) => document.querySelectorAll(target);
const indexPage = () => {};

let bookList = [];
let currentBook;

//class내부 Promise 처리로 8시간 날림
//Promise 객체
//await 후 상위로 돌아가서 (비동기 처리 후)함수를 처리하는 방법은 결국 없다.
//무조건 then() 내부에서 타 함수 호출할것.
//Promise 이해도만 엄청 올랐네
//Promise.all() = 일반 .all과 비슷하게 모든 Promise 인자들이 full상태가되면 full Promise를 반환한다.

class Page {
    constructor(name, html) {
        // this.component = `./component/${component}.html`;
        this.name = name;
        this.html = html;
    }
    newPage = async (component) => {
        const html = await fetch(`./component/${component}.html`);
        const newClass = html.text().then((e) => {
            return new Page(component, e);
        });
        return newClass;
    };
    jsApply = () => {
        eval(`${this.name}()`);
    };
}

class Book {
    constructor(leftPage, rightPage, prevBook) {
        // console.log(leftPage)
        this.leftPage = leftPage;
        // console.log(leftPage);
        this.rightPage = rightPage;
        this.prevBook = prevBook;
        this.prevBtn = get('#login_page #prevBox');
    }
    prev() {
        const oldContents = get('#login_page .bookPage1');
        const oldCard = get('#login_page .animationCard');
        const newCard = oldCard.cloneNode(true);
        const parentCard = oldCard.parentNode;

        let [newCardFront, newCardBack] = newCard.children;
        newCardFront.innerHTML = oldContents.cloneNode(true).innerHTML;
        newCardBack.children[0].innerHTML = this.prevBook.rightPage.html;
        newCard.addEventListener('animationend', () => {
            newCard.remove();
            this.getInit(this.prevBook.rightPage, '#appBox2');
        });
        newCard.classList.add('animationLeft');
        parentCard.append(newCard);
        this.getInit(this.prevBook.leftPage, '#appBox1');
        this.btnReload();
    }
    next(page1, page2, index) {
        Promise.all([new Page().newPage(page1), new Page().newPage(page2)]).then(
            ([leftPage, rightPage]) => {
                const oldContents = get('#login_page .bookPage2');
                const oldCard = get('#login_page .animationCard');
                const newCard = oldCard.cloneNode(true);
                const parentCard = oldCard.parentNode;

                let [newCardFront, newCardBack] = newCard.children;
                newCardFront.innerHTML = oldContents.cloneNode(true).innerHTML;
                newCardBack.children[0].innerHTML = leftPage.html;
                newCard.addEventListener('animationend', () => {
                    this.getInit(leftPage, '#appBox1');
                    newCard.remove();
                });
                newCard.classList.add('animationRight');
                parentCard.append(newCard);
                bookList.push(new Book(leftPage, rightPage, index ? undefined : this));
                this.getInit(rightPage, '#appBox2');
                this.btnReload();
            }
        );
    }
    fake() {
        const oldCard = get('#login_page .animationCard');
        const newCard = oldCard.cloneNode(false);
        const parentCard = oldCard.parentNode;
        newCard.addEventListener('animationend', () => {
            newCard.remove();
        });
        newCard.style.zIndex = 10;
        newCard.classList.add('animationRight');
        parentCard.append(newCard);
    }

    reload(book) {
        if (book) {
            this.getInit(book.leftPage, '#appBox1');
            this.getInit(book.rightPage, '#appBox2');
        } else {
            // console.log(this);
            this.getInit(this.leftPage, '#appBox1');
            this.getInit(this.rightPage, '#appBox2');
        }
    }
    getInit(page, tag) {
        // console.log(page)
        get(tag).innerHTML = page.html;
        page.jsApply();
    }
    btnReload() {
        this.prevBtn.classList.remove('hide');
        if (bookList.length <= 1) {
            this.prevBtn.classList.add('hide');
        }
        this.prevBtn.children[1].innerHTML = `Page(${bookList.length - 1})`;
    }
}

(() => {
    const initPoint = new Book();
    let index = 45;
    const initAnimation = () => {
        if (!(index === 0))
            setTimeout(() => {
                index--;
                initPoint.fake();
                initAnimation();
            }, 30);
        else {
            const card = get('#login_page .animationCard');
            const prev = get('#login_page #page_prev');
            // console.log(card)
            prev.addEventListener('click', () => bookList.pop().prev());
            new Book().next('indexPage', 'loginMiniPage', 1);
        }
    };

    initAnimation();
})();

const userInputVerify = (values) => {
    if (
        Array.from(values).every((e) => {
            // if (0) {
            if (!(e.value === 'undefined' || e.value === '')) {
                switch (e.title) {
                    case 'id':
                        if (!/^[0-9]{6}$/.test(e.value)) {
                            alert(`통합ID는 6글자 숫자만 가능합니다`);

                            e.focus();
                            return false;
                        } else {
                            break;
                        }
                    case '비밀번호':
                        if (!/^([a-z0-9_]){4,8}$/.test(e.value)) {
                            alert(`비밀번호는 (영소문자,숫자 4-8글자)만 가능합니다`);

                            e.focus();
                            return false;
                        } else {
                            break;
                        }
                    case '성명':
                        if (!/^[가-힣]{2,4}$/.test(e.value)) {
                            alert(`성명은 2-4글자 한글만 가능합니다`);
                            e.focus();
                            return false;
                        } else {
                            break;
                        }
                    case '학번 및 사번':
                        if (!/^[0-9]{4}$/.test(e.value)) {
                            alert(`학번 및 사번은 4글자 숫자만 가능합니다`);

                            e.focus();
                            return false;
                        } else {
                            break;
                        }

                    case '이메일':
                        if (!/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(e.value)) {
                            alert(`이메일 양식이 올바르지 않습니다`);
                            e.focus();
                            return false;
                        } else {
                            break;
                        }
                }
                return true;
            } else {
                alert(`${e.title}을 입력해주세요.`);
                e.focus();
            }
        })
    )
        alert(
            '학번 및 사번이 등록된 학생 또는 교사가 아닙니다.\n[해당 페이지는 추가기능이 없습니다]\n[클릭 가능한 버튼 : ID신청, ID찾기, 비밀번호찾기]]'
        );
};

const loginMiniPage = () => {
    const loginBtn = get('#login_page .book:not(.animationCard) .loginMiniPage button');
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        userInputVerify(values);
    });
    const values = getAll('#login_page .book:not(.animationCard) .loginMiniPage .loginFormInput');
    values.forEach((e) => {
        e.addEventListener('keyup', (e) => {
            if (e.keyCode === 13) userInputVerify(values);
        });

    });
    idpwBtnEventListener();
};

const idpwBtnEventListener = () => {
    const [regis, findId, findPw] = getAll(
        '#login_page .book:not(.animationCard) .loginPage_aBox a'
    );
    const len = bookList.length - 1
    regis.addEventListener('click', () =>
        bookList[len].next('indexPage', 'registerPage_1')
    );
    findId.addEventListener('click', () =>
        bookList[len].next('indexPage', 'findLostId')
    );
    findPw.addEventListener('click', () =>
        bookList[len].next('indexPage', 'findLostPw')
    );
};


const findLostId = () => {
    const values = getAll(
        '#login_page .book:not(.animationCard) .findLostId .tableBox .tableInner input'
    );
    values.forEach((e) => {
        e.addEventListener('keyup', (e) => {
            if (e.keyCode === 13) userInputVerify(values);
        });
    });
    const [disAccept, accept] = getAll('#login_page .findLostId .tableBox .btnBox button');
    disAccept.addEventListener('click', (e) => {
        bookList.pop().prev();
    });
    accept.addEventListener('click', () => userInputVerify(values));
    idpwBtnEventListener();
};
const findLostPw = () => {
    const values = getAll(
        '#login_page .book:not(.animationCard) .findLostPw .tableBox .tableInner input'
    );
    values.forEach((e) => {
        e.addEventListener('keyup', (e) => {
            if (e.keyCode === 13) userInputVerify(values);
        });
    });
    const [disAccept, accept] = getAll(
        '#login_page .book:not(.animationCard) .findLostPw .tableBox .btnBox button'
    );
    disAccept.addEventListener('click', (e) => {
        bookList.pop().prev();
    });
    accept.addEventListener('click', () => userInputVerify(values));
    idpwBtnEventListener();
};

//Array.from 유사배열(nodeList같은)을 실제 배열로 변경해줌, nodeList같은 유사배열은 prototype parents에 array가 없어 메소드가 개적으니 변환해서 쓰자
//정규식 구조체 regExp에 정규식을 할당할때는 const 변수 regExp = '/$/' 이렇게 따옴표안에 작성해야 하지만, 바로 돌릴 경우에는 정규식.test() 따옴표 없이 사용이 가능했다!, 정확히는 따옴표를 붙히면 정상작동안한다 (...)
//Array.every()는 배열의 모든 요소가 특정 조건을 만족하여 true가 나올시 true를 반환, 한개라도 false를 반환하면 false 반환
//JS Switch는 문자열비교가 되며, 또한 case에 충족하여 이하 코드가 실행되면, 이상하게 다음 case도 아닌 case 이하 코드가 실행된다 ?? 그래서 해당 case에서 사용되는 구문 후 break이 강제된다.

const registerPage_1 = () => {
    const agreeChks = getAll('#login_page .book:not(.animationCard) .registerPage_1 .agreeBox i');
    const [disAgreeBtn, agreeBtn] = getAll(
        '#login_page .book:not(.animationCard) .registerPage_1 .btnBox button'
    );
    disAgreeBtn.addEventListener('click', (e) => {
        bookList.pop().prev();
    });
    agreeBtn.addEventListener('click', (e) => {
        //Card로 인해 agreChks_Card를 별도로 만들어 실행
        // const agreeChks_Card = getAll('#login_page .registerPage_1 .agreeBox i)');
        if (Array.from(agreeChks).every((e) => e.classList.value === 'xi-radiobox-checked')) {
            if (
                confirm(
                    '이용약관에 모두 동의하신것으로 간주됩니다.\n모두 확인하셨습니까?\n동의하시면 확인을 입력해주세요.'
                )
            )
                bookList[bookList.length - 1].next('indexPage', 'registerPage_2');
        } else {
            alert('이용약관을 모두 동의해주세요.');
        }
    });
    agreeChks.forEach((chk) => {
        chk.addEventListener('click', (e) => {
            e.target.classList.toggle('xi-radiobox-checked');
            e.target.classList.toggle('xi-radiobox-blank');
        });
    });
    idpwBtnEventListener();
};

const registerPage_2 = () => {
    const [disAccept, accept] = getAll(
        '#login_page .book:not(.animationCard) .registerPage_2 .tableBox .btnBox button'
    );
    disAccept.addEventListener('click', (e) => {
        bookList.pop().prev();
    });

    const values = getAll(
        '#login_page .book:not(.animationCard) .registerPage_2 .tableBox .tableInner select, #login_page .book:not(.animationCard) .registerPage_2 .tableBox .tableInner input'
    );
    values.forEach((e) => {
        e.addEventListener('keyup', (e) => {
            if (e.keyCode === 13) userInputVerify(values);;
        });
    });

    accept.addEventListener('click', () => userInputVerify(values));

    idpwBtnEventListener();
};

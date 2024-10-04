const qnaPage = () => {
	const btn = document.querySelector('#qna .sub1 .inner .srh button');
	const qna = document.querySelector('#qna .sub1 .inner .qna');
	let sel = document.querySelector('#qna .sub1 .inner .srh select');
	let txt = document.querySelector('#qna .sub1 .inner .srh .txt');
	const url = './JSON/kimjinwoo_DB.json';
	fetch(url)
		.then((res) => res.json())
		.then((json) => {
			const qnaDt = json.qnaDt;

			let output = '',
				data = null;

			qnaDt.forEach((item, idx) => {
				output += ` <div class="qnabox">
                                    <li>                       
                                    <div class="q-box">
                                            <p>Q</p>
                                        </div>
                                        <p>${item.q}</p>
                                        </li>
                                        <div class="a-box">
                                            <div class="anw">
                                            <p>A.</p>
                                            <p>${item.a}</p>
                                            </div>
                                        </div>
                                        </div>`;
			});
			qna.innerHTML = output;

			const make = () => {
				let lis = document.querySelectorAll('#qna .sub1 .inner .qna li');

				let anwBox = document.querySelectorAll('#qna .sub1 .inner .qna .qnabox'); // qna 전체
				lis.forEach((it, idx) => {
					it.addEventListener('click', (e) => {
						lis[idx].classList.toggle('on');
						anwBox[idx].classList.toggle('on');
					});
					anwBox[idx].classList.remove('on');
				});
			};
			make();

			btn.addEventListener('click', (e) => {
				let text = txt.value;
				let selt = sel.value;
				if (selt === 'title') {
					data = qnaDt.filter((item) => {
						return item.q.toLowerCase().includes(text.toLowerCase());
					});
					output = data.map((item, idx) => {
						return `<div class="qnabox">
                                <li>                       
                                <div class="q-box">
                                        <p>Q</p>
                                    </div>
                                    <p>${item.q}</p>
                                    </li>
                                    <div class="a-box">
                                        <div class="anw">
                                        <p>A.</p>
                                        <p>${item.a}</p>
                                        </div>
                                    </div>
                                    </div>
                                         `;
					});
					qna.innerHTML = output.join('');
					make();
				} else if (selt === 'content') {
					data = qnaDt.filter((item) => {
						return item.a.toLowerCase().includes(text.toLowerCase());
					});
					output = data.map((item, idx) => {
						return `<div class="qnabox">
                                <li>                       
                                <div class="q-box">
                                        <p>Q</p>
                                    </div>
                                    <p>${item.q}</p>
                                    </li>
                                    <div class="a-box">
                                        <div class="anw">
                                        <p>A.</p>
                                        <p>${item.a}</p>
                                        </div>
                                    </div>
                                    </div>
                                         `;
					});
					qna.innerHTML = output.join('');
					make();
				} else {
					data = qnaDt.filter((item) => {
						return (
							item.q.toLowerCase().includes(text.toLowerCase()) +
							item.a.toLowerCase().includes(text.toLowerCase())
						);
					});
					output = data.map((item, idx) => {
						return `<div class="qnabox">
                                <li>                       
                                <div class="q-box">
                                        <p>Q</p>
                                    </div>
                                    <p>${item.q}</p>
                                    </li>
                                    <div class="a-box">
                                        <div class="anw">
                                        <p>A.</p>
                                        <p>${item.a}</p>
                                        </div>
                                    </div>
                                    </div>
                                         `;
					});
					qna.innerHTML = output.join('');
					make();
				}
			});
		});
};
qnaPage();

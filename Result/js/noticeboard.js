const notoceBoardPage = () => {
	const lis = document.querySelectorAll('#noticeBoard .sub1 .inner .menu ul li');
	const notice = document.querySelector('#noticeBoard .sub1 .inner table .notice');
	const contents = document.querySelector('#noticeBoard .sub1 .inner table .contents');
	const paging = document.querySelector('#noticeBoard .sub1 .inner .paging');
	const sel = document.querySelector('#noticeBoard .sub1 .inner .srh select');
	const btn = document.querySelector('#noticeBoard .sub1 .inner .srh button');
	let txt = document.querySelector('#noticeBoard .sub1 .inner .srh .text');

	const url = './JSON/kimjinwoo_DB.json';
	fetch(url)
		.then((res) => res.json())
		.then((json) => {
			const noticeBoard = json.noticeBoard;
			const allBoard = json.allBoard;
			const Board1 = json.Board1;
			const Board2 = json.Board2;
			const Board3 = json.Board3;
			const Board4 = json.Board4;
			let output = '';
			let totaldatas = allBoard.length,
				row = '',
				a = '',
				datasPerPage = 10,
				currentPage = 1,
				firstdata = 0,
				lastdata = 0,
				dataMod = totaldatas % datasPerPage,
				pageNumber = Math.ceil(totaldatas / datasPerPage),
				old = 0;

			//공지
			output = noticeBoard.map((item) => {
				return `<tr>
        <td>${item.n}</td>
        <td>${item.c}</td>
        <td>${item.t}</td>
        <td>${item.d}</td>
        <td>${item.w}</</td>
        <td>${item.v}</td>
        </tr>`;
			});
			notice.innerHTML = output.join('');
			//공지 end

			// allMenu
			const allMenu = (Boarddt) => {
				const dataList = (Boarddt, num) => {
					row = '';
					let totaldatas = Boarddt.length;
					dataMod = totaldatas % datasPerPage;
					pageNumber = Math.ceil(totaldatas / datasPerPage);
					lastdata = num * datasPerPage;
					firstdata = lastdata - datasPerPage;
					if (dataMod !== 0 && pageNumber === num) {
						lastdata = firstdata + dataMod;
					}
					for (let i = firstdata; i < lastdata; i++) {
						row += `<tr>
         <td>${Boarddt[i].n}</td>
         <td>${Boarddt[i].c}</td>
         <td>${Boarddt[i].t}</td>
         <td>${Boarddt[i].d}</td>
         <td>${Boarddt[i].w}</</td>
         <td>${Boarddt[i].v}</td>
         </tr>`;
					}
					contents.innerHTML = row;
				};
				dataList(Boarddt);

				//검색 버튼
				const btnsel = (Boarddt) => {
					btn.addEventListener('click', (e) => {
						let text = txt.value;
						let selt = sel.value;
						let data = '';
						if (selt === 'all') {
							data = Boarddt.filter((item) => {
								return (
									item.t.toLocaleLowerCase().includes(text.toLowerCase()) +
									item.w.toLocaleLowerCase().includes(text.toLowerCase())
								);
							});
							row = data.map((item, idx) => {
								return `<tr>
				<td>${item.n}</td>
				<td>${item.c}</td>
				<td>${item.t}</td>
				<td>${item.d}</td>
				<td>${item.w}</</td>
				<td>${item.v}</td>
				</tr>`;
							});

							contents.innerHTML = row;
						} else if (selt === 'writer') {
							data = Boarddt.filter((item) => {
								return item.w.toLocaleLowerCase().includes(text.toLowerCase());
							});
							row = data.map((item, idx) => {
								return `<tr>
				<td>${item.n}</td>
				<td>${item.c}</td>
				<td>${item.t}</td>
				<td>${item.d}</td>
				<td>${item.w}</</td>
				<td>${item.v}</td>
				</tr>`;
							});
							contents.innerHTML = row.join('');
						} else {
							data = Boarddt.filter((item) => {
								return item.t.toLocaleLowerCase().includes(text.toLowerCase());
							});
							row = data.map((item, idx) => {
								return `<tr>
				<td>${item.n}</td>
				<td>${item.c}</td>
				<td>${item.t}</td>
				<td>${item.d}</td>
				<td>${item.w}</</td>
				<td>${item.v}</td>
				</tr>`;
							});
							contents.innerHTML = row.join('');
						}
					});
				};
				//검색 버튼 end
				btnsel(Boarddt);
				//페이지 넘버
				const pagenum = (Boarddt) => {
					for (let i = 0; i < pageNumber; i++) {
						a += `<a href="#">${i + 1}</a>`;
					}
					paging.innerHTML = a;
					let aOn = document.querySelectorAll('#noticeBoard .sub1 .inner .paging a');
					aOn[currentPage - 1].classList.add('on');
					aOn.forEach((item, i) => {
						item.addEventListener('click', (e) => {
							currentPage = i + 1;
							dataList(Boarddt, currentPage);
							aOn.forEach((v, i) => {
								v.classList.remove('on');
							});
							item.classList.add('on');
							/* if (old !== i) {
				aOn[i].classList.add('on');
				aOn[old].classList.remove('on');
			}123456
			old = i; */
						});
						dataList(Boarddt, currentPage);
					});
				};
				//페이지 넘버 end
				pagenum(Boarddt);
			};
			allMenu(allBoard);
			// allMenu end

			lis[0].classList.add('on');
			lis.forEach((item, idx) => {
				item.addEventListener('click', (e) => {
					lis.forEach((li) => {
						li.classList.remove('on');
					});
					lis[idx].classList.add('on');

					if (idx === 0) {
						a = '';
						currentPage = 1;
						allMenu(allBoard);
						pagenum(allBoard);
					} else if (idx === 1) {
						a = '';
						currentPage = 1;
						allMenu(Board1);
					} else if (idx === 2) {
						a = '';
						currentPage = 1;
						allMenu(Board2);
					} else if (idx === 3) {
						a = '';
						currentPage = 1;
						allMenu(Board3);
					} else if (idx === 4) {
						a = '';
						currentPage = 1;
						allMenu(Board4);
					}
				});
			});
		});
};
notoceBoardPage();

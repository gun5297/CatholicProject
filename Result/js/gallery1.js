const imageList = document.getElementById('imageList');

let cnt = 0;
let imageData = [];

function addImageEntry() {
    if (cnt >= imageData.length) return;

    const { src, alt, title, date } = imageData[cnt];
    const listItem = document.createElement('li');
    listItem.classList.add('b-img-con-box');
    listItem.innerHTML = `
    <div>
      <a href="#" title="${title}">
        <div class="b-img-box">
          <img src="${src}" alt="${alt}" />
        </div>
        <div class="b-con-box">
          <div class="b-img-title">
            <p><span>${title}</span></p>
          </div>
          <p class="b-img-etc">
            <span>${date}</span>
          </p>
        </div>
      </a>
    </div>
  `;
    imageList.appendChild(listItem);
    cnt++;
}

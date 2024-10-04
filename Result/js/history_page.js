// 화면스크롤
const historyPage = () => {
  const startPoint = document.querySelector(".y-point-box.year1");
  const endPoint = document.querySelector(".y-point-box.year22");

  if (startPoint && endPoint) {
    const distanceStart =
      window.pageYOffset + startPoint.getBoundingClientRect().top;
    const distanceEnd =
      window.pageYOffset + endPoint.getBoundingClientRect().top;
    const viewPortHeight = document.documentElement.clientHeight / 2;

    const noimg1Point = document.querySelector(".y-point-box.year14 .year-box");
    const noimg2Point = document.querySelector(".y-point-box.year16 .year-box");
    const dtnoimg1Point =
      window.pageYOffset + noimg1Point.getBoundingClientRect().top + 14;
    const dtnoimg2Point =
      window.pageYOffset + noimg2Point.getBoundingClientRect().top + 14;

    const moTabHeight = document.querySelector(".index_list").offsetHeight;

    $(".history-box").addClass("on");

    window.addEventListener("scroll", function () {
      // 현재 스크롤바 위치
      let scrollLocation;

      if ($(window).width() > 1024) {
        //pc
        scrollLocation = document.documentElement.scrollTop + viewPortHeight;
      }

      // 선 색 채우기 (스크롤위치 - 시작점위치)
      $(".point-cir").animate(
        {
          top: scrollLocation - distanceStart + "px",
        },
        0
      );
      $(".point-cir .bar").animate(
        {
          height: scrollLocation - distanceStart + "px",
        },
        0
      );

      //noimg 포인트 지나갈 때 색상 변환
      if (scrollLocation >= dtnoimg1Point) {
        $(".year14 .year-box").addClass("on");
      } else {
        $(".year14 .year-box").removeClass("on");
      }
      if (scrollLocation >= dtnoimg2Point) {
        $(".year16 .year-box").addClass("on");
      } else {
        $(".year16 .year-box").removeClass("on");
      }

      //도착시 포인트 색상 변환
      if (scrollLocation >= distanceEnd) {
        $(".history-box > div:last-child").addClass("on");
      } else {
        $(".history-box > div:last-child").removeClass("on");
      }
    });
  }
};

//
const subInit = () => {
  //페이지별 sub 함수호출
  if (location.pathname.split("/").pop() === "history.html") {
    historyPage();
  }
};

(() => {
  subInit();
})();

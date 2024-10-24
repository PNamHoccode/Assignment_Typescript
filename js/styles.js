document.getElementById("search-icon").addEventListener("click", function () {
  const searchBox = document.querySelector(".box-s");
  searchBox.style.display =
    searchBox.style.display === "none" || searchBox.style.display === ""
      ? "block"
      : "none";
});

// Lấy nút
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
// Khi người dùng cuộn xuống 100px từ đầu trang, hiện nút lên
window.onscroll = function () {
  toggleScrollToTopBtn();
};

function toggleScrollToTopBtn() {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    scrollToTopBtn.style.display = "block"; // Hiển thị nút
  } else {
    scrollToTopBtn.style.display = "none"; // Ẩn nút
  }
}

// Khi người dùng nhấp vào nút, cuộn về đầu trang
scrollToTopBtn.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Hiệu ứng cuộn mượt mà
  });
};
document
  .getElementById("customToggleButton")
  .addEventListener("click", function () {
    var customButtonList = document.getElementById("customButtonList");
    if (
      customButtonList.style.display === "none" ||
      customButtonList.style.display === ""
    ) {
      customButtonList.style.display = "block";
    } else {
      customButtonList.style.display = "none";
    }
  });

// Ẩn menu khi nhấn ra ngoài
document.addEventListener("click", function (event) {
  var customButtonList = document.getElementById("customButtonList");
  var customToggleButton = document.getElementById("customToggleButton");
  if (
    !customToggleButton.contains(event.target) &&
    !customButtonList.contains(event.target)
  ) {
    customButtonList.style.display = "none";
  }
});

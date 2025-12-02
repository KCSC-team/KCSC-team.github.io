localStorage.setItem("isShowMore", false);
const roleBtn = document.querySelectorAll("#content .role-btn");

let init = {
  type: "ALL",
  year: 1,
  role: "",
};
localStorage.setItem("filters", JSON.stringify(init));

roleBtn.forEach((item) => {
  item.onclick = () => {
    let value = item.querySelector("p").innerText;
    if (value != "FORMER") {
      if (value === "MEDIA") {
        let formData = {
          ...JSON.parse(localStorage.getItem("filters")),
          type: "CURRENT",
          role: value,
          year: 1,
        };
        localStorage.setItem("filters", JSON.stringify(formData));
      } else if (value === "CTFER") {
        let formData = {
          ...JSON.parse(localStorage.getItem("filters")),
          type: "CURRENT",
          role: value,
          year: 1,
        };
        localStorage.setItem("filters", JSON.stringify(formData));
      }
    } else {
      let init = {
        type: "ALL",
        year: 1,
        role: "",
      };
      localStorage.setItem("filters", JSON.stringify(init));
    }
  };
});

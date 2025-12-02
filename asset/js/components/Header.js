const initState = () => {
  let init = {
    type: "ALL",
    year: 1,
    role: "",
  };
  localStorage.setItem("filters", JSON.stringify(init));
};

export default function Header() {
  return `<div class="header-container">
        <a href="/index.html" class="club-img">
            <img src="/asset/img/club_logo.jpg" alt="KCSC Logo">
            <span class="logo-text">KCSC</span>
        </a>
        <i class="fa-solid fa-list"></i>
        <div class="nav-container">
            <ul>
                <li class="members" onclick=(initState)><a href="/members.html" class="nav-link">MEMBERS</a></li>
                <li class="about_us"><a href="/about.html" class="nav-link">ABOUT US</a></li>
                <li class="write_up"><a href="https://blog.kcsc.edu.vn/" target="_blank" class="nav-link">WRITE UP</a></li>
                <li class="achievement"><a href="/achievement.html" class="nav-link">ACHIEVEMENT</a></li>
            </ul>
        </div>
    </div>`;
}




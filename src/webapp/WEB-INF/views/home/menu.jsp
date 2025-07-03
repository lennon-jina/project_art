<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Desktop Moon Menu</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/menu.css">
</head>
<body>
    <div class="container">
        <div class="container__base"></div>
        <div class="moon-wrapper">
            <div class="moon">
                <svg class="moon__svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 611 611">
                    <defs>
                        <clipPath id="clip-path" class="moon__svg-rects">
                            <rect id="top" width="611" height="72" />
                            <rect y="77" width="611" height="72" />
                            <rect y="154" width="611" height="72" />
                            <rect y="231" width="611" height="72" />
                            <rect y="308" width="611" height="72" />
                            <rect y="385" width="611" height="72" />
                            <rect y="462" width="611" height="72" />
                            <rect y="539" width="611" height="72" />
                        </clipPath>
                    </defs>
                    <g clip-path="url(#clip-path)">
                        <image class="moon__img" width="1024" height="1024" transform="translate(-271 -188) scale(0.98)" xlink:href="${pageContext.request.contextPath}/assets/img/icarus-fall.jpg" />
                    </g>
                </svg>
            </div>

            <div class="text-section">
                <nav class="nav">
                    <a href="${pageContext.request.contextPath}/home" class="nav__link">
                        <div class="nav__link--wrapper" data-width="250">
                            <span class="nav__link--text" data-splitting>HOME</span>
                            <span class="nav__link--text" data-splitting>HOME</span>
                        </div>
                    </a>

                    <a href="${pageContext.request.contextPath}/gallery" class="nav__link">
                        <div class="nav__link--wrapper" data-width="400">
                            <span class="nav__link--text" data-splitting>GALLERY</span>
                            <span class="nav__link--text" data-splitting>GALLERY</span>
                        </div>
                    </a>
                    <a href="${pageContext.request.contextPath}/quiz" class="nav__link">
                        <div class="nav__link--wrapper" data-width="250">
                            <span class="nav__link--text" data-splitting>QUIZ</span>
                            <span class="nav__link--text" data-splitting>QUIZ</span>
                        </div>
                    </a>
                    <a href="${pageContext.request.contextPath}/exhibition" class="nav__link">
                        <div class="nav__link--wrapper" data-width="250">
                            <span class="nav__link--text" data-splitting>EXHIBITION</span>
                            <span class="nav__link--text" data-splitting>EXHIBITION</span>
                        </div>
                    </a>
                </nav>
            </div>
        </div>

        <div class="support">
            <a href="https://twitter.com/DevLoop01" target="_blank"><i class="fab fa-twitter-square"></i></a>
            <a href="https://dribbble.com/devloop01" target="_blank"><i class="fab fa-dribbble"></i></a>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js"></script>
    <script src="https://unpkg.com/splitting/dist/splitting.min.js"></script>
    <script src="${pageContext.request.contextPath}/assets/js/menu.js"></script>
</body>
</html>

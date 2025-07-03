<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Art Quiz Experience">
    <meta name="theme-color" content="#F9D100">
    <title>미술 작품 퀴즈</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/artQuizList.css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
    <style>
		/* 커스텀 커서 스타일 - 직접 HTML에 추가 */
		.custom-cursor {
		    position: fixed;
		    width: 300px;  /* 엄청 크게 */
		    height: 300px; /* 엄청 크게 */
		    pointer-events: none;
		    z-index: 99999;
		    transform: translate(-50%, -50%);
		    background-size: contain;
		    background-repeat: no-repeat;
		    background-position: center;
		}
		
		/* 각 섹션에 따른 커서 이미지 변경 - 절대 경로로 시도 */
		.cursor-1 {
		    background-image: url('/assets/img/van.png');
		}
		.cursor-2 {
		    background-image: url('/assets/img/picaso.png');
		}
		.cursor-3 {
		    background-image: url('/assets/img/van2.png');
		}
		.cursor-4 {
		    background-image: url('/assets/img/picaso2.png');
		}
		.cursor-5 {
		    background-image: url('/assets/img/mar.png');
		}
		.cursor-6 {
		    background-image: url('/assets/img/mar2.png');
		}
		
		/* 기본 커서 숨기기 */
		body, .scroll-container, .section, .artwork, * {
		    cursor: none !important;
		}
</style>
</head>
<body>
    <!-- 전체 페이지 컨테이너 -->
    <div class="scroll-container">
        <!-- 그라데이션 배경만 있는 긴 페이지 -->
        <div class="gradient-bg"></div>
        
        <!-- 각 섹션의 콘텐츠 (배경 제외) -->
		        <div class="section-wrapper">
            <section class="section" id="section1" data-artwork-id="28560">
                <div class="content">
                    <div class="content-wrapper">
                        <div class="text-content">
                            <h1>VINCENT VAN GOGH</h1>
                            <div class="artwork-info">
                                <h2>ARTWORK</h2>
                                <h3>THE BEDROOM</h3>
                            </div>
                            <p class="artwork-description">Vincent van Gogh so highly esteemed his bedroom painting that he made three distinct versions.</p>
                        </div>
                        <div class="artwork-container">
                            <img src="${pageContext.request.contextPath}/resources/images/red_armchair.jpg" alt="The Red Armchair" class="artwork" onclick="location.href='quiz?artworkId=28560'">
                        </div>
                    </div>
                </div>
                <div class="background-text">
                    <div class="large-text">VINCENT VAN GOGH</div>
                    <div class="medium-text">THE BEDROOM</div>
                </div>
            </section>

            <section class="section" id="section2" data-artwork-id="5357">
                <div class="content">
                    <div class="content-wrapper">
                        <div class="text-content">
                            <h1>PABLO PICASSO</h1>
                            <div class="artwork-info">
                                <h2>ARTWORK</h2>
                                <h3>THE RED ARMCHAIR</h3>
                            </div>
                            <p class="artwork-description">The Red Armchair demonstrates the artist's inventive use of Ripolin, an industrial house paint.</p>
                        </div>
                        <div class="artwork-container">
                            <img src="${pageContext.request.contextPath}/resources/images/old_guitarist.jpg" alt="The Old Guitarist" class="artwork" onclick="location.href='quiz?artworkId=5357'">
                        </div>
                    </div>
                </div>
                <div class="background-text">
                    <div class="large-text">PICASSO</div>
                    <div class="medium-text">THE RED ARMCHAIR</div>
                </div>
            </section>

            <section class="section" id="section3" data-artwork-id="80607">
                <div class="content">
                    <div class="content-wrapper">
                        <div class="text-content">
                            <h1>VINCENT VAN GOGH</h1>
                            <div class="artwork-info">
                                <h2>ARTWORK</h2>
                                <h3>SELF-PORTRAIT</h3>
                            </div>
                            <p class="artwork-description">In 1886 Vincent van Gogh left his native Holland and settled in Paris, where his beloved brother Theo was a dealer in paintings.</p>
                        </div>
                        <div class="artwork-container">
                            <img src="${pageContext.request.contextPath}/resources/images/bedroom.jpg" alt="The Bedroom" class="artwork" onclick="location.href='quiz?artworkId=80607'">
                        </div>
                    </div>
                </div>
                <div class="background-text">
                    <div class="large-text">VAN GOGH</div>
                    <div class="medium-text">SELF-PORTRAIT</div>
                </div>
            </section>

            <section class="section" id="section4" data-artwork-id="28067">
                <div class="content">
                    <div class="content-wrapper">
                        <div class="text-content">
                            <h1>PABLO PICASSO</h1>
                            <div class="artwork-info">
                                <h2>ARTWORK</h2>
                                <h3>THE OLD GUITARIST</h3>
                            </div>
                            <p class="artwork-description">He knew what it was like to be poor, having been nearly penniless during all of 1902.</p>
                        </div>
                        <div class="artwork-container">
                            <img src="${pageContext.request.contextPath}/resources/images/self_portrait.jpg" alt="Self-Portrait" class="artwork" onclick="location.href='quiz?artworkId=28067'">
                        </div>
                    </div>
                </div>
                <div class="background-text">
                    <div class="large-text">PICASSO</div>
                    <div class="medium-text">THE OLD GUITARIST</div>
                </div>
            </section>

            <section class="section" id="section5" data-artwork-id="59426">
                <div class="content">
                    <div class="content-wrapper">
                        <div class="text-content">
                            <h1>MARC CHAGALL</h1>
                            <div class="artwork-info">
                                <h2>ARTWORK</h2>
                                <h3>WHITE CRUCIFIXION</h3>
                            </div>
                            <p class="artwork-description">Chagall's painting links the martyred Jesus with the Jewish people being persecuted across Europe and implicitly compares the Nazis with Jesus's tormentors.</p>
                        </div>
                        <div class="artwork-container">
                            <img src="${pageContext.request.contextPath}/resources/images/white_crucifixion.jpg" alt="White Crucifixion" class="artwork" onclick="location.href='quiz?artworkId=59426'">
                        </div>
                    </div>
                </div>
                <div class="background-text">
                    <div class="large-text">CHAGALL</div>
                    <div class="medium-text">WHITE CRUCIFIXION</div>
                </div>
            </section>

            <section class="section" id="section6" data-artwork-id="23700">
                <div class="content">
                    <div class="content-wrapper">
                        <div class="text-content">
                            <h1>MARC CHAGALL</h1>
                            <div class="artwork-info">
                                <h2>ARTWORK</h2>
                                <h3>THE PRAYING JEW</h3>
                            </div>
                            <p class="artwork-description">By Marc Chagall. The later compositions differ from the original only in small details.</p>
                        </div>
                        <div class="artwork-container">
                            <img src="${pageContext.request.contextPath}/resources/images/praying_jew.jpg" alt="The Praying Jew" class="artwork" onclick="location.href='quiz?artworkId=23700'">
                        </div>
                    </div>
                </div>
                <div class="background-text">
                    <div class="large-text">CHAGALL</div>
                    <div class="medium-text">PRAYING JEW</div>
                </div>
            </section>
        </div>
    </div>

    <script src="${pageContext.request.contextPath}/assets/js/artQuizList.js"></script>
</body>
</html>
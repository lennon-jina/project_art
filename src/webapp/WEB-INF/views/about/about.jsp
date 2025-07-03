<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Digital Evolution</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/about.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="https://unpkg.com/lenis@1.1.16/dist/lenis.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js"></script>
</head>
<body>
    <div class="model"></div>

    <section class="hero">
        <h1>
            Visual <br />
            Explore
        </h1>
        <h2>예술을 직접 탐험하는, 감각적이고 몰입감 있는 미술 플랫폼</h2>
        <p>
            jdlskjdfskdljfskdljfslkdjfsldkjfslkdfjsakdljfa;skdljfsd
            sdlkfja;skdljfskdljfskdljslkdjf;ajfkd
            skdlfj;skdljf;askdljfskdljfslkdjfskdlfj;sjfk;sjkdlf
        </p>
    </section>

    <section class="info">
        <div class="tags">
            <p>Brand strategy</p>
            <p>User Experience</p>
            <p>Digital Products</p>
            <p>Innovation Lab</p>
        </div>
        <h2>
            sdjfk;lskdjf;skdlfjsldkfjslfkjlsdjfkafjsdlsdlfj;askdljfskdljfslkdjfskd
            ;sdljfskljfslkdjfskdljf;skdlfjsldkfjsdlfkjs;fkljslfdkjfdl
            askdlfj;sfkdlj;sdlkfj;sfkdljskdlja;sdlfkj;sfkdljsa;jfklslfkd
        </h2>
        <p>
            sdjfk;lskdjf;skdlfjsldkfjslfkjlsdjfkafjsdlsdlfj;askdljfskdljfslkdjfskd
            ;sdljfskljfslkdjfskdljf;skdlfjsldkfjsdlfkjs;fkljslfdkjfdl
            askdlfj;sfkdlj;sdlkfj;sfkdljskdlja;sdlfkj;sfkdljsa;jfklslfkd
        </p>
    </section>

    <section class="scanner">
        <div class="scaner-info">
            <div class="product-id"><h2>#<%= java.time.Year.now() %></h2></div>
            <div class="product-description">
                <p>Transform your digital identity</p>
            </div>
        </div>
        <div class="scan-container"></div>
    </section>

    <div class="spacer"></div>

    <section class="outro">
        <h2>
            sdjfk;lskdjf;skdlfjsldkfjslfkjlsdjfkafjsdlsdlfj;askdljfskdljfslkdjfskd
            ;sdljfskljfslkdjfskdljf;skdlfjsldkfjsdlfkjs;fkljslfdkjfdl
            askdlfj;sfkdlj;sdlkfj;sfkdljskdlja;sdlfkj;sfkdljsa;jfklslfkd
        </h2>
    </section>

    <div class="spacer"></div>
	<!-- 애니메이션 섹션 추가 (STRATEGY) -->
    <div class="animation-section" id="strategy-section">
        <div class="left-content">
            <div class="animation-title" id="strategy">STRATEGY</div>
            <div class="video-container">
                <video autoplay muted loop id="strategy-video">
                    <source src="/assets/video/r.mp4" type="video/mp4">
                </video>
            </div>
        </div>
        <div class="content-list" id="strategy-content">
            <div class="content-item">PRODUCT ROADMAPPING FOR CLEAR VISION</div>
            <div class="content-item">EXPLORING MARKETS FOR GROWTH</div>
            <div class="content-item">FACILITATING INNOVATIVE WORKSHOPS BUILDING PARTNERSHIP STRATEGIES</div>
            <div class="content-item">CRAFTING RESONANT CONTENT STRATEGIES</div>
            <div class="content-item">CREATING RESULTS-DRIVEN CAMPAIGNS USING ANALYTICS FOR</div>
            <div class="content-item">OPTIMIZATION CONDUCTING RESEARCH AND TESTING PLANNING MEDIA FOR</div>
            <div class="content-item">IMPACT</div>
        </div>
    </div>

    <div class="spacer"></div>

    <!-- 애니메이션 섹션 추가 (CREATIVE) -->
    <div class="animation-section" id="creative-section">
        <div class="left-content">
            <div class="animation-title" id="creative">CREATIVE</div>
            <div class="video-container">
                <video autoplay muted loop id="creative-video">
                    <source src="/assets/video/creative-video.mp4" type="video/mp4">
                </video>
            </div>
        </div>
        <div class="content-list" id="creative-content">
            <div class="content-item">FAST CONCEPT SPRINTS</div>
            <div class="content-item">BOLD CREATIVE IDEAS</div>
            <div class="content-item">DESIGNING INTUITIVE UI/UX</div>
            <div class="content-item">ENGAGING INTERACTION DESIGNS STORYBOARDING NARRATIVES</div>
            <div class="content-item">PROTOTYPING IDEAS</div>
            <div class="content-item">MOTION DESIGN FOR IMPACT</div>
            <div class="content-item">CLEAR, EFFECTIVE COPYWRITING STRUCTURING SEAMLESS EXPERIENCES</div>
        </div>
    </div>

    <div class="spacer"></div>

    <!-- 애니메이션 섹션 추가 (DIGITAL) -->
    <div class="animation-section" id="digital-section">
        <div class="left-content">
            <div class="animation-title" id="digital">DIGITAL</div>
            <div class="video-container">
                <video autoplay muted loop id="digital-video">
                    <source src="/assets/video/digital-video.mp4" type="video/mp4">
                </video>
            </div>
        </div>
        <div class="content-list" id="digital-content">
            <div class="content-item">WEB DEVELOPMENT</div>
            <div class="content-item">APP DEVELOPMENT</div>
            <div class="content-item">ECOMMERCE SOLUTIONS</div>
            <div class="content-item">DIGITAL MARKETING</div>
            <div class="content-item">CONTENT MANAGEMENT</div>
            <div class="content-item">SEO OPTIMIZATION</div>
            <div class="content-item">USER EXPERIENCE TESTING</div>
        </div>
    </div>
	

    <div class="black-overlay">
        <div class="project-info">
            <div class="project-title">Project: Visual Explore</div>
            <div class="project-details">
                <div class="category-title">Development Period:</div>
                January 2025 – April 2025
                <div class="category-title">Key Technologies:</div>
                Spring Framework, Oracle Database, HTML/CSS/JavaScript, GSAP Animation, Public APIs
            </div>
            <div class="project-description">
                Visual Explore is an interactive art platform designed to offer immersive gallery experiences, story-driven quizzes, and real-time exhibition information.
            </div>
            <div class="contact-info">
                <div class="category-title">Contact:</div>
                jina.dev@example.com | GitHub: github.com/jina-dev
            </div>
            <div class="data-source">Data powered by Art Institute of Chicago API & Public Data Portal Korea</div>
            <div class="version">Version 1.0.0</div>
            <div class="copyright">© 2025 Visual Explore. All rights reserved.</div>
        </div>
        <a href="#" class="back-to-top">[ ↑ Back to Top ]</a>
    </div>
    <script src="${pageContext.request.contextPath}/assets/js/about.js"></script>
</body>
</html>

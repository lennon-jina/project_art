// Variables to track quiz state
var currentQuestion = 0;
var userAnswers = [];
var quizQuestions = [];
var quizId = null;

$(document).ready(function() {
    // Initialize quiz
    function initQuiz() {
        console.log('[INIT] url:', window.location.href);
        // Get artwork ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const artworkId = urlParams.get('artworkId');
        
        console.log('Found artworkId:', artworkId);

        if (!artworkId) {
            console.error('No artwork ID specified');
            Swal.fire({
                title: '오류',
                text: '작품 ID가 지정되지 않았습니다.',
                icon: 'error',
                confirmButtonText: '확인'
            }).then(() => {
                window.location.href = '/quiz';
            });
            return;
        }

        // 디버깅: API 요청 시작 시간 기록
        console.log('[DEBUG] API 요청 시작: ' + new Date().toISOString());
        
        // 서버에서 퀴즈 데이터 가져오기
        $.ajax({
            url: `/quiz/api/${artworkId}`,
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function(response) {
                console.log('[DEBUG] 응답 받음:', response);
                
                try {
                    // 응답이 이미 JSON 객체라면 그대로 사용, 문자열이라면 파싱
                    const jsonResponse = (typeof response === 'string') ? JSON.parse(response) : response;
                    
                    // 응답에 error 필드가 있는지 확인
                    if (jsonResponse.error) {
                        console.error('[ERROR] 서버 응답 오류:', jsonResponse.error);
                        Swal.fire({
                            title: '오류',
                            text: jsonResponse.error || '퀴즈 데이터를 로드할 수 없습니다.',
                            icon: 'error',
                            confirmButtonText: '확인'
                        }).then(() => {
                            window.location.href = '/quiz';
                        });
                        return;
                    }

                    // 퀴즈 ID 설정
                    quizId = jsonResponse.quizId;
                    console.log('[DEBUG] 퀴즈 ID:', quizId);

                    // 퀴즈 문제 설정
                    quizQuestions = [];
                    if (jsonResponse.quizQuestions && jsonResponse.quizQuestions.length > 0) {
                        console.log('[DEBUG] 문제 수:', jsonResponse.quizQuestions.length);
                        
                        for (let i = 0; i < jsonResponse.quizQuestions.length; i++) {
                            const question = jsonResponse.quizQuestions[i];
                            console.log(`[DEBUG] 문제 ${i+1}:`, question.question);
                            console.log(`[DEBUG] 문제 ${i+1} 선택지:`, question.options);
                            console.log(`[DEBUG] 문제 ${i+1} 정답:`, question.correctAnswer);
                            
                            quizQuestions.push({
                                question: question.question,
                                options: question.options,
                                correctAnswer: question.correctAnswer,
                                questionId: i // 다른 ID가 없으면 인덱스 사용
                            });
                        }
                    } else {
                        console.error('[ERROR] 퀴즈 문제가 없거나 비어 있습니다.');
                    }
                    
                    // 나머지 로직 계속 진행...
                    renderQuestions();
                    showQuestion(0);
                    userAnswers = Array(quizQuestions.length).fill(-1);
                    updateNavButtons();
                    
                } catch (e) {
                    console.error('[ERROR] Error parsing quiz data:', e);
                    Swal.fire({
                        title: '오류',
                        text: '퀴즈 데이터 형식이 올바르지 않습니다: ' + e.message,
                        icon: 'error',
                        confirmButtonText: '확인'
                    });
                }
            },
            error: function(error) {
                console.error('[ERROR] Error loading quiz data:', error);
                console.error('[ERROR] Status:', error.status, 'Text:', error.statusText);
                console.error('[ERROR] Response:', error.responseText);
                Swal.fire({
                    title: '오류',
                    text: '서버 연결에 실패했습니다. 상태 코드: ' + error.status,
                    icon: 'error',
                    confirmButtonText: '확인'
                });
            }
        });
    }    

    // Render all questions
    function renderQuestions() {
        const container = $('#question-container');
        container.empty();

        quizQuestions.forEach((q, index) => {
            const questionHtml = `
                <div class="question" id="question-${index}">
                    <h3>${q.question}</h3>
                    <div class="options">
                        ${q.options.map((option, optIndex) => `
                            <div class="option" data-index="${optIndex}">
                                <div class="option-radio"></div>
                                <div class="option-text">${option}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            container.append(questionHtml);
        });

        // 동적으로 생성된 요소에 이벤트 처리 (이벤트 중복 방지를 위해 off 먼저 호출)
        $(document).off('click', '.option').on('click', '.option', function() {
            const questionIndex = parseInt($(this).closest('.question').attr('id').split('-')[1]);
            const optionIndex = $(this).data('index');
            selectOption(questionIndex, optionIndex);
        });
    }

    // Show specific question
    function showQuestion(index) {
        $('.question').removeClass('active');
        $(`#question-${index}`).addClass('active');
        currentQuestion = index;

        $('#question-counter').text(`Question ${index + 1}/${quizQuestions.length}`);
        updateNavButtons();
        updateSelectedOption();
    }

    function selectOption(questionIndex, optionIndex) {
        userAnswers[questionIndex] = optionIndex;
        updateSelectedOption();
        updateNavButtons();
    }

    function updateSelectedOption() {
        $(`#question-${currentQuestion} .option`).removeClass('selected');

        if (userAnswers[currentQuestion] !== -1) {
            $(`#question-${currentQuestion} .option[data-index="${userAnswers[currentQuestion]}"]`).addClass('selected');
        }
    }

    function updateNavButtons() {
        $('#prev-btn').prop('disabled', currentQuestion === 0);

        if (currentQuestion === quizQuestions.length - 1) {
            $('#next-btn').hide();
            $('#submit-btn').show();

            if (userAnswers[currentQuestion] !== -1) {
                $('#submit-btn').prop('disabled', false);
            } else {
                $('#submit-btn').prop('disabled', true);
            }
        } else {
            $('#next-btn').show();
            $('#submit-btn').hide();
            $('#next-btn').prop('disabled', userAnswers[currentQuestion] === -1);
        }
    }

    function showResults() {
        if (!quizId) {
            console.error('Quiz ID is not set');
            return;
        }

        const userId = getCurrentUserId();
        
        // 서버로 답안 제출
        const answers = {};
        quizQuestions.forEach((q, index) => {
            answers[q.questionId] = userAnswers[index];
        });

        console.log('[DEBUG] 제출 데이터:', {
            quizId: quizId,
            userId: userId,
            answers: answers
        });

        $.ajax({
            url: `/quiz/api/submit?quizId=${quizId}&userId=${userId}`,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(answers),
            success: function(response) {
                console.log('[DEBUG] 제출 응답:', response);
                
                // 응답이 문자열이면 JSON으로 파싱
                const result = (typeof response === 'string') ? JSON.parse(response) : response;
                
                if (!result.success) {
                    Swal.fire({
                        title: '오류',
                        text: result.message || '답안 제출에 실패했습니다.',
                        icon: 'error',
                        confirmButtonText: '확인'
                    });
                    return;
                }

                // 결과를 간단한 alert으로 표시
                const score = result.score;
                const total = result.total;
                const percentage = Math.round((score / total) * 100);
                
                Swal.fire({
                    title: '퀴즈 결과',
                    html: `
                        <div>맞은 문제: ${score}/${total} (${percentage}%)</div>
                        <div>${getScoreMessage(percentage)}</div>
                    `,
                    icon: score === total ? 'success' : (score >= total/2 ? 'info' : 'warning'),
                    confirmButtonText: '확인'
                });
                
                // 퀴즈 완료 후 작가 관련 체크 (URL에서 artwork ID 가져오기)
                const urlParams = new URLSearchParams(window.location.search);
                const artworkId = urlParams.get('artworkId');
                
                if (artworkId) {
                    // 작품 정보 가져오기 (작가 정보를 위해)
                    $.ajax({
                        url: `/artwork/api/${artworkId}`,
                        type: 'GET',
                        success: function(artworkData) {
                            if (artworkData && artworkData.artist) {
                                checkArtistMaster(userId, artworkData.artist);
                            }
                        },
                        error: function(error) {
                            console.error('작품 정보 가져오기 실패:', error);
                        }
                    });
                }
            },
            error: function(error) {
                console.error('[ERROR] 답안 제출 중 오류:', error);
                console.error('[ERROR] 상태:', error.status, '텍스트:', error.statusText);
                console.error('[ERROR] 응답:', error.responseText);
                
                Swal.fire({
                    title: '오류',
                    text: '답안 제출 중 오류가 발생했습니다.',
                    icon: 'error',
                    confirmButtonText: '확인'
                });
            }
        });
    }

    function getScoreMessage(percentage) {
        if (percentage === 100) return "Perfect! You're an art expert!";
        if (percentage >= 75) return "Great job! You know your art history well.";
        if (percentage >= 50) return "Good effort! You have a decent knowledge of art.";
        if (percentage >= 25) return "Nice try! Keep learning about art history.";
        return "Don't worry! Art history is complex. Keep exploring!";
    }

    // 포기하기 버튼 이벤트
    $('#give-up-btn').on('click', function() {
        Swal.fire({
            title: '정말 포기하겠습니까?',
            html: '<div style="margin-bottom: 10px;">퀴즈를 그만두시겠습니까?</div>',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '네',
            cancelButtonText: '다시 풀기',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                // 포기하고 결과 보기
                showResults();
            }
        });
    });

    // 네비게이션 버튼 이벤트
    $('#next-btn').on('click', function() {
        if (currentQuestion < quizQuestions.length - 1) {
            showQuestion(currentQuestion + 1);
        }
    });

    $('#prev-btn').on('click', function() {
        if (currentQuestion > 0) {
            showQuestion(currentQuestion - 1);
        }
    });

    // 제출 버튼 이벤트
    $(document).off('click', '#submit-btn').on('click', '#submit-btn', function() {
        const allAnswered = userAnswers.every(answer => answer !== -1);

        if (allAnswered) {
            showResults();
        } else {
            Swal.fire({
                title: '모든 문제에 답해주세요!',
                text: '아직 답변하지 않은 문제가 있습니다.',
                icon: 'warning',
                confirmButtonText: '확인'
            });
        }
    });

    // 결과 모달 닫기
    $('#close-result').on('click', function() {
        $('#result-modal').hide();
    });

    // 다시 시도하기
    $('#retry-btn').on('click', function() {
        $('#result-modal').hide();
        userAnswers = Array(quizQuestions.length).fill(-1);
        currentQuestion = 0;
        showQuestion(0);
    });

    // 다음 작품으로 이동
    $('#next-artwork-btn').on('click', function() {
        $('#result-modal').hide();
        
        // 다른 작품 퀴즈 목록으로 이동
        window.location.href = '/quizartwork/list';
    });

    // 시작시 초기화
    initQuiz();
});

function getCurrentUserId() {
    // 서버에서 넘겨준 userId 변수 사용
    if (typeof userId !== 'undefined') {
        return userId;
    }
    return -1; // 로그인하지 않은 경우
}

function checkArtistMaster(userId, artist) {
    // 이미 로컬 스토리지에 artist 맞춘 정보가 있는지 확인
    let artistCorrect = JSON.parse(localStorage.getItem(artist + 'Correct') || '[]');
    
    // 현재 작품 ID 추가
    const urlParams = new URLSearchParams(window.location.search);
    const artworkId = urlParams.get('artworkId');
    
    if (!artistCorrect.includes(artworkId)) {
        artistCorrect.push(artworkId);
        localStorage.setItem(artist + 'Correct', JSON.stringify(artistCorrect));
    }
    
    // 작가별 작품 수 정의
    const artistWorks = {
        'Vincent van Gogh': [28560, 80607],
        'Pablo Picasso': [5357, 28067],
        'Marc Chagall': [59426, 23700]
    };
    
    // 현재 작가의 작품 목록
    const worksToComplete = artistWorks[artist] || [];
    
    // 모든 작품을 맞췄는지 확인
    const allCompleted = worksToComplete.length > 0 && 
                         worksToComplete.every(id => artistCorrect.includes(id.toString()));
    
    if (allCompleted) {
        Swal.fire({
            title: '축하합니다!',
            text: `${artist}의 모든 문제를 맞추셨습니다! "${artist} 마스터" 칭호를 획득했습니다!`,
            icon: 'success',
            confirmButtonText: '확인'
        }).then((result) => {
            if (result.isConfirmed) {
                awardMasterTitle(userId, artist);
                localStorage.removeItem(artist + 'Correct');
            }
        });
    }
}

function awardMasterTitle(userId, artistName) {
    $.post('/achievement/award', { userId: userId, artistName: artistName })
        .done(function(response) {
            console.log("칭호 저장 완료:", response);
        })
        .fail(function(error) {
            console.error("칭호 저장 실패:", error);
        });
}
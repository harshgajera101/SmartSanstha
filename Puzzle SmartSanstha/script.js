document.addEventListener('DOMContentLoaded', () => {
    // --- Element References ---
    const puzzleBoard = document.getElementById('puzzle-board');
    const trayContent = document.getElementById('tray-content');
    const factPopup = document.getElementById('fact-popup');
    const factText = document.getElementById('fact-text');
    const hintBtn = document.getElementById('hint-btn');
    const hintTimer = document.getElementById('hint-timer');
    const timerDisplay = document.getElementById('timer-display');
    const timerSpan = timerDisplay.querySelector('span');
    const completionModal = document.getElementById('completion-modal');
    const completionFactText = document.getElementById('completion-fact-text');
    const closeModalButton = document.querySelector('.close-button');
    const playAgainBtn = document.getElementById('play-again-btn');

    // --- Centralized Puzzle Data Structure ---
    const puzzles = [
        {
            id: 'preamble',
            gridSize: 3, // 3x3 grid
            basePath: 'assets/preamble/',
            hintImage: 'assets/preamble-full.jpg',
            facts: {
                'piece-1': "The Preamble is the soul of the Constitution.",
                'piece-2': "It was adopted on 26th November 1949.",
                'piece-3': "The word 'Socialist' was added by the 42nd Amendment.",
                'piece-4': "It secures 'Liberty' of thought, expression, belief, faith and worship.",
                'piece-5': "'Justice' in the Preamble covers social, economic, and political aspects.",
                'piece-6': "The Preamble starts with 'WE, THE PEOPLE OF INDIA...'",
                'piece-7': "'Fraternity' means a sense of common brotherhood.",
                'piece-8': "'Equality' ensures the absence of special privileges to any section.",
                'piece-9': "The constitution came into effect on 26th January 1950.",
                'completionFact': "The Preamble is based on the 'Objectives Resolution', drafted by Jawaharlal Nehru."
            }
        },
        {
            id: 'mapOfIndia',
            gridSize: 4, // 4x4 grid
            basePath: 'assets/map-of-india/',
            hintImage: 'assets/map-of-india-full.jpg',
            facts: {
                'piece-1': "India is the seventh-largest country by area.",
                'piece-2': "The state of Rajasthan is the largest by area.",
                'piece-3': "The Tropic of Cancer passes through 8 Indian states.",
                'piece-4': "India shares land borders with seven countries.",
                'piece-5': "The southern-most point of mainland India is Kanyakumari.",
                'piece-6': "New Delhi, the capital, is a National Capital Territory.",
                'piece-7': "The Himalayas form the northern boundary of India.",
                'piece-8': "Goa is the smallest state by area.",
                'piece-9': "India has 28 states and 8 union territories.",
                'piece-10': "The Indian Standard Time is calculated from Mirzapur in Uttar Pradesh.",
                'piece-11': "The state with the longest coastline is Gujarat.",
                'piece-12': "The river Ganga is the longest river in India.",
                'piece-13': "Mumbai is the financial capital of India.",
                'piece-14': "The Deccan Plateau covers a majority of southern India.",
                'piece-15': "The Andaman and Nicobar Islands are a group of islands in the Bay of Bengal.",
                'piece-16': "The Thar Desert is India's largest desert.",
                'completionFact': "The political map of India has changed significantly since its independence in 1947."
            }
        },
        {
    id: 'emblem',
    gridSize: 4, // CHANGED from 3 to 4
    basePath: 'assets/national-emblem/',
    hintImage: 'assets/national-emblem-full.jpg',
    facts: {
        'piece-1': "The National Emblem is an adaptation of the Lion Capital of Ashoka from Sarnath.",
        'piece-2': "It was adopted on January 26, 1950, the day India became a republic.",
        'piece-3': "The four lions symbolize power, courage, confidence, and pride.",
        'piece-4': "The central wheel is the Dharma Chakra, representing the eternal wheel of law.",
        'piece-5': "The motto 'Satyameva Jayate' means 'Truth Alone Triumphs'.",
        'piece-6': "The horse represents energy and speed, while the bull represents hard work.",
        'piece-7': "The original Lion Capital sits on a pillar erected by Emperor Ashoka in 250 BC.",
        'piece-8': "Use of the emblem is regulated by the State Emblem of India Act, 2005.",
        'piece-9': "The full emblem has four lions, but only three are visible from any angle.",
        // ADD FACTS for the new 4x4 pieces
        'piece-10': "Fact for Emblem Piece 10",
        'piece-11': "Fact for Emblem Piece 11",
        'piece-12': "Fact for Emblem Piece 12",
        'piece-13': "Fact for Emblem Piece 13",
        'piece-14': "Fact for Emblem Piece 14",
        'piece-15': "Fact for Emblem Piece 15",
        'piece-16': "Fact for Emblem Piece 16",
        'completionFact': "The motto 'Satyameva Jayate' is taken from the Mundaka Upanishad, an ancient Hindu scripture."
    }
}
    ];

    // --- State Variables ---
    let correctlyPlacedPieces = 0;
    let timerId = null;
    let timeLeft = 10;
    let currentPuzzle = puzzles[0];

    // --- Main functions to load and reset the game ---
    function loadPuzzle(puzzleId) {
        const selectedPuzzle = puzzles.find(p => p.id === puzzleId);
        if (!selectedPuzzle) return;
        currentPuzzle = selectedPuzzle;

        const gridSize = currentPuzzle.gridSize;
        puzzleBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
        puzzleBoard.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
        trayContent.style.gridTemplateColumns = `repeat(4, 1fr)`;

        document.querySelectorAll('.puzzle-select-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.puzzleId === puzzleId);
        });

        resetGame();
        initializeGame();
    }
    
    // This function is the key to the fix. It must empty both the board and the tray.
    function resetGame() {
        stopTimer();
        puzzleBoard.innerHTML = '';
        trayContent.innerHTML = ''; // This line clears all pieces from the tray
        puzzleBoard.classList.remove('completed', 'show-hint');
        puzzleBoard.style.backgroundImage = '';
        correctlyPlacedPieces = 0;
    }

    // --- Game Initialization ---
    function initializeGame() {
        const totalPieces = currentPuzzle.gridSize * currentPuzzle.gridSize;

        for (let i = 1; i <= totalPieces; i++) {
            const dropZone = document.createElement('div');
            dropZone.classList.add('drop-zone');
            dropZone.dataset.zoneId = `piece-${i}`;
            puzzleBoard.appendChild(dropZone);
        }

        const pieces = [];
        for (let i = 1; i <= totalPieces; i++) {
            const piece = document.createElement('img');
            piece.src = `${currentPuzzle.basePath}piece-${i}.png`;
            piece.classList.add('puzzle-piece');
            piece.id = `piece-${i}`;
            piece.draggable = true;
            pieces.push(piece);
        }
        
        pieces.sort(() => Math.random() - 0.5);
        pieces.forEach(piece => trayContent.appendChild(piece));
        addEventListeners();
    }

    // --- Event Listeners and Game Logic ---
    function addEventListeners() {
        const pieces = document.querySelectorAll('.puzzle-piece');
        const dropZones = document.querySelectorAll('.drop-zone');
        pieces.forEach(piece => {
            piece.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.id);
                setTimeout(() => e.target.style.visibility = 'hidden', 0);
                startTimer(e.target);
            });
            piece.addEventListener('dragend', (e) => {
                e.target.style.visibility = 'visible';
                stopTimer();
            });
        });
        dropZones.forEach(zone => {
            zone.addEventListener('dragover', (e) => e.preventDefault());
            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                stopTimer();
                const pieceId = e.dataTransfer.getData('text/plain');
                const droppedPiece = document.getElementById(pieceId);
                const expectedPieceId = zone.dataset.zoneId;
                if (pieceId === expectedPieceId && !zone.hasChildNodes()) {
                    zone.appendChild(droppedPiece);
                    droppedPiece.draggable = false;
                    droppedPiece.style.cursor = 'default';
                    correctlyPlacedPieces++;
                    showFact(pieceId);
                    checkCompletion();
                }
            });
        });
    }

    function showFact(pieceId) {
        const fact = currentPuzzle.facts[pieceId];
        if (fact) {
            factText.textContent = fact;
            factPopup.classList.remove('hidden');
            setTimeout(() => factPopup.classList.add('hidden'), 3000);
        }
    }

    function checkCompletion() {
        const totalPieces = currentPuzzle.gridSize * currentPuzzle.gridSize;
        if (correctlyPlacedPieces === totalPieces) {
            puzzleBoard.classList.add('completed');
            setTimeout(() => {
                completionFactText.textContent = currentPuzzle.facts.completionFact;
                completionModal.classList.remove('hidden');
            }, 600);
        }
    }

    // --- Logic for the Hint Button (UPDATED) ---
function setupHintButton() {
    let hintTimerId = null; // To hold the interval ID

    hintBtn.addEventListener('click', () => {
        // Display the hint image
        puzzleBoard.style.backgroundImage = `url('${currentPuzzle.hintImage}')`;
        puzzleBoard.classList.add('show-hint');
        hintBtn.disabled = true;

        // --- Start the 3-second countdown timer ---
        let hintTimeLeft = 3;
        hintTimer.textContent = `(${hintTimeLeft}s)`;
        hintTimer.classList.remove('hidden');

        hintTimerId = setInterval(() => {
            hintTimeLeft--;
            hintTimer.textContent = `(${hintTimeLeft}s)`;
        }, 1000);
        // --- End of new code ---

        // This timeout will clear everything after 3 seconds
        setTimeout(() => {
            puzzleBoard.classList.remove('show-hint');
            puzzleBoard.style.backgroundImage = '';
            hintBtn.disabled = false;
            
            // --- Clear the interval and hide the timer ---
            clearInterval(hintTimerId);
            hintTimer.classList.add('hidden');
            // --- End of new code ---
        }, 3000);
    });
}

    function startTimer(draggedPiece) {
        stopTimer();
        timeLeft = 10;
        timerSpan.textContent = timeLeft;
        timerDisplay.classList.remove('hidden');
        timerId = setInterval(() => {
            timeLeft--;
            timerSpan.textContent = timeLeft;
            if (timeLeft <= 0) {
                stopTimer();
                trayContent.appendChild(draggedPiece);
                draggedPiece.style.visibility = 'visible';
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerId);
        timerDisplay.classList.add('hidden');
    }

    function setupModalListeners() {
        closeModalButton.addEventListener('click', () => {
            completionModal.classList.add('hidden');
        });
        playAgainBtn.addEventListener('click', () => {
            location.reload();
        });
        completionModal.addEventListener('click', (e) => {
            if (e.target === completionModal) {
                completionModal.classList.add('hidden');
            }
        });
    }

    // --- Initial Setup on Page Load ---
    document.querySelectorAll('.puzzle-select-btn').forEach(button => {
        button.addEventListener('click', () => {
            loadPuzzle(button.dataset.puzzleId);
        });
    });

    loadPuzzle(puzzles[0].id);
    setupModalListeners();
    setupHintButton();
});
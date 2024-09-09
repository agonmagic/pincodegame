document.addEventListener('DOMContentLoaded', () => {
    const secretNumber = generateSecretNumber();
    const guessInput = document.getElementById('guessInput');
    const guessForm = document.getElementById('guessForm');
    const message = document.getElementById('message');
    const results = document.getElementById('results');
    const restartButton = document.getElementById('restartButton');

    guessForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const guess = guessInput.value;
        
        if (!/^\d{3}$/.test(guess)) {
            if (guess.length !== 3) {
                message.textContent = 'Shenoni vetem numra 3 shifror';
            } else {
                message.textContent = 'Lejohet te shenoni vetem numra treshifror';
            }
            return;
        }
        
        if (guess === secretNumber) {
            message.textContent = 'Congratulations! You guessed the number!';
            results.textContent = '';
            restartButton.style.display = 'inline-block';
            guessInput.disabled = true;
            return;
        }
        
        const { correctSpot, incorrectSpot } = evaluateGuess(guess, secretNumber);
        results.textContent = `${correctSpot} in correct spot, and ${incorrectSpot} guessed but not in correct spot`;
        message.textContent = '';
    });

    restartButton.addEventListener('click', () => {
        window.location.reload();
    });

    function generateSecretNumber() {
        let num;
        do {
            num = Math.floor(Math.random() * 900) + 100; // Generate a 3-digit number
        } while (new Set(num.toString()).size < 3); // Ensure the digits are unique
        return num.toString();
    }

    function evaluateGuess(guess, secret) {
        let correctSpot = 0;
        let incorrectSpot = 0;
        const secretArr = secret.split('');
        const guessArr = guess.split('');
        
        for (let i = 0; i < 3; i++) {
            if (guessArr[i] === secretArr[i]) {
                correctSpot++;
                secretArr[i] = null; // Remove matched digits
                guessArr[i] = undefined;
            }
        }
        
        for (let i = 0; i < 3; i++) {
            if (guessArr[i] !== undefined && secretArr.includes(guessArr[i])) {
                incorrectSpot++;
                secretArr[secretArr.indexOf(guessArr[i])] = null; // Remove matched digits
            }
        }
        
        return { correctSpot, incorrectSpot };
    }
});

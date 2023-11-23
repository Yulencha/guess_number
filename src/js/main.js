let secretNumber;
let attempts = 0;
let minNumber = 1;
let maxNumber = 100;

const minNumberInput = document.getElementById("minNumber");
const maxNumberInput = document.getElementById("maxNumber");
const userGuessInput = document.getElementById("userGuess");
const hintsElement = document.getElementById("hints");
const setRangeButton = document.getElementById("setRangeButton");
const guessButton = document.getElementById("guessButton");
const newGameButton = document.getElementById("newGameButton");

// Функция для генерации секретного числа
const generateSecretNumber = () => {
  secretNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
};

// Функция для проверки и установки диапазона чисел
const validateAndSetRange = () => {
  const newMinNumber = parseInt(minNumberInput.value, 10); // Преобразовываем строку в целое число в десятичной системе
  const newMaxNumber = parseInt(maxNumberInput.value, 10); // (отбрасываются все нестандартные знаки и знаки после точки/запятой)

  // Устанавливаем значения диапазона, используя стандартные значения, если пользователь ввел некорректные данные
  minNumber = isNaN(newMinNumber) ? 1 : newMinNumber;
  maxNumber = isNaN(newMaxNumber) ? 100 : newMaxNumber;

  // Проверяем, чтобы минимальное число было меньше максимального
  if (minNumber >= maxNumber) {
    minNumber = 1;
    maxNumber = 100;
    minNumberInput.value = minNumber;
    maxNumberInput.value = maxNumber;
    alert("Минимальное число должно быть меньше максимального. Установлены значения по умолчанию");
  } else {
    hintsElement.textContent = "";
  }
};

// Функция для начала новой игры
const startNewGame = () => {
  validateAndSetRange();
  generateSecretNumber();
  attempts = 0;
  userGuessInput.value = "";
  hintsElement.textContent = "";
};

// Обработчик нажатия на кнопку "Угадать"
guessButton.addEventListener("click", () => {
  const userGuess = parseInt(userGuessInput.value, 10);
  attempts++;

  // Проверяем, входит ли введенное число в установленный диапазон
  if (userGuess < minNumber || userGuess > maxNumber) {
    hintsElement.textContent = `Введите число в диапазоне от ${minNumber} до ${maxNumber}.`;
    return;
  }

  // Сравниваем введенное число с секретным и выводим соответствующее сообщение
  if (userGuess === secretNumber) {
    hintsElement.textContent = `Поздравляем! Вы угадали число с ${attempts} попытки.`;
  } else {
    if (userGuess < secretNumber) {
      hintsElement.textContent = "Загаданное число больше вашего.";
    } else {
      hintsElement.textContent = "Загаданное число меньше вашего.";
    }

    // Предоставляем подсказку каждые три попытки
    if (attempts % 3 === 0) {
      hintsElement.textContent += ` Подсказка: число ${
        secretNumber % 2 === 0 ? "четное" : "нечетное"
      }.`;
    }
  }
});

// Обработчик нажатия на кнопку установки диапазона
setRangeButton.addEventListener("click", startNewGame);

// Обработчик нажатия на кнопку начала новой игры
newGameButton.addEventListener("click", startNewGame);

startNewGame(); // Начинаем новую игру при загрузке страницы

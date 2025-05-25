let cards = JSON.parse(localStorage.getItem("flashcards")) || [];
let currentCard = 0;
let score = 0;

function addCard() {
  const imageInput = document.getElementById("image-input");
  const answer = document.getElementById("answer-input").value.trim();

  if (!imageInput.files[0] || !answer) {
    alert("Lütfen hem resim hem cevap ekleyin.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const imageData = e.target.result;
    cards.push({ image: imageData, answer: answer });
    localStorage.setItem("flashcards", JSON.stringify(cards));
    alert("Kart eklendi!");
    document.getElementById("answer-input").value = "";
    imageInput.value = "";
  };
  reader.readAsDataURL(imageInput.files[0]);
}

function startStudy() {
  if (cards.length === 0) {
    alert("Önce kart ekleyin.");
    return;
  }
  currentCard = 0;
  score = 0;
  document.getElementById("study-area").style.display = "block";
  document.getElementById("result").innerText = "";
  document.getElementById("score").innerText = "Puan: 0";
  showCard();
}

function showCard() {
  const card = cards[currentCard];
  document.getElementById("flashcard-image").src = card.image;
  document.getElementById("user-answer").value = "";
}

function checkAnswer() {
  const userAnswer = document.getElementById("user-answer").value.trim().toLowerCase();
  const correctAnswer = cards[currentCard].answer.toLowerCase();
  const resultDiv = document.getElementById("result");

  if (userAnswer === correctAnswer) {
    score++;
    resultDiv.innerText = "✅ Doğru! Cevap: " + cards[currentCard].answer;
  } else {
    resultDiv.innerText = "❌ Yanlış! Doğru cevap: " + cards[currentCard].answer;
  }

  document.getElementById("score").innerText = "Puan: " + score;

  currentCard++;
  if (currentCard < cards.length) {
    setTimeout(() => {
      resultDiv.innerText = "";
      showCard();
    }, 2000);
  } else {
    resultDiv.innerText += "\n✅ Test tamamlandı! Toplam puan: " + score + "/" + cards.length;
    currentCard = 0;
  }
}

// Lời chào theo giờ trong ngày + lời chúc ngẫu nhiên
(function () {
  var h = new Date().getHours();
  var hello = h >= 5 && h < 11 ? "Good morning!" : h >= 11 && h < 13 ? "Good afternoon!" : h >= 13 && h < 18 ? "Good afternoon!" : h >= 18 && h < 22 ? "Good evening!" : "It's getting late!";
  var wishes = h >= 22 || h < 5 ? [
    "Save your work and get some sleep, the code will be easier tomorrow.",
    "If it's not done yet, finish it tomorrow. Your health comes first."
  ] : [
    "Have a productive lab session!",
    "May your code run correctly on the first try!",
    "May every test case pass.",
    "Don't give up on errors, read the error message carefully to find the fix.",
    "Remember to name your files correctly before submitting.",
    "Learn happily, code well, submit on time!"
  ];
  try {
    document.getElementById("greet-h").textContent = hello;
    document.getElementById("greet-w").textContent = wishes[Math.floor(Math.random() * wishes.length)];
  } catch (e) {}
})();

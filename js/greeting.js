// Time-of-day greeting + random wish (English)
(function () {
  var h = new Date().getHours();
  var hello = h >= 5 && h < 12 ? "Good morning!" : h >= 12 && h < 18 ? "Good afternoon!" : h >= 18 && h < 22 ? "Good evening!" : "Burning the midnight oil?";
  var wishes = h >= 22 || h < 5 ? [
    "Save your work and get some sleep, the code will be easier tomorrow.",
    "Unfinished? Pick it up tomorrow, your health comes first."
  ] : [
    "Have a productive lab session.",
    "May your code run right on the first try!",
    "May every test case turn green.",
    "Stuck on an error? Read the message carefully, it usually points the way.",
    "Remember to name your files correctly before submitting.",
    "Have fun, code well, and submit on time!"
  ];
  try {
    document.getElementById("greet-h").textContent = hello;
    document.getElementById("greet-w").textContent = wishes[Math.floor(Math.random() * wishes.length)];
  } catch (e) {}
})();

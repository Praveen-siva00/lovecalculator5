function calculateLove() {
    const name1 = document.getElementById("name1").value.trim();
    const name2 = document.getElementById("name2").value.trim();

    // Array of love quotes to choose from
    const quotes = [
        "Love isn’t something you find. Love is something that finds you.",
        "You’re the one who makes my heart smile.",
        "In all the world, there is no heart for me like yours.",
        "To love is to recognize yourself in another.",
        "I look at you and see the rest of my life in front of my eyes.",
        "Every love story is beautiful, but ours is my favorite.",
        "I love you not only for what you are, but for what I am when I am with you.",
        "You are my today and all of my tomorrows.",
        "Love is a friendship set to music.",
        "When I follow my heart, it leads me to you."
    ];

    // Display error if any input is missing
    if (!name1 || !name2) {
        document.getElementById("result").innerText = "Please enter both names.";
        return;
    }

    // Generate a love score between 80 and 100%
    const loveScore = Math.floor(Math.random() * 21) + 80;
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    // Send data to the server and redirect on success
    fetch('https://lovecalculator5.onrender.com/submit_names', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name1, name2, loveScore })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message); // Logs the success message from the server
        // Redirect to result page with query parameters for names, score, and quote
        const url = `https://lovecalculator5.onrender.com/result.html?name1=${encodeURIComponent(name1)}&name2=${encodeURIComponent(name2)}&loveScore=${loveScore}&quote=${encodeURIComponent(randomQuote)}`;
        window.location.href = url;
    })
    .catch(error => console.error('Error:', error));
}

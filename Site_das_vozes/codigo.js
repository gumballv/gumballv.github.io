let currentlyPlaying = null;

function showContent(contentId) {
    // 1. Get all elements with the class 'content-box'
    var contents = document.getElementsByClassName('content-box');

    // 2. Loop through all content elements and hide them
    for (var i = 0; i < contents.length; i++) {
        contents[i].style.display = 'none';
        contents[i].classList.remove('active'); // Optional: remove active class
    }

    // 3. Show the specific content requested
    var currentContent = document.getElementById(contentId);
    if (currentContent) {
        currentContent.style.display = 'block';
        currentContent.classList.add('active'); // Optional: add active class
    }
}

// Optional: Show content 1 by default when the page loads
document.addEventListener('DOMContentLoaded', (event) => {
    showContent('content1');
})

function playAudio(audioId, clickedButton) {
    const audio = document.getElementById(audioId);

    if (currentlyPlaying && currentlyPlaying !== audio) {
        currentlyPlaying.pause();
        currentlyPlaying.currentTime = 0; // Optional: rewind to start
    }

    if (audio.paused) {
        audio.play();
        currentlyPlaying = audio;
        // Optional: Add visual feedback to the button, e.g., change color or add a class
        // clickedButton.classList.add('playing'); 
    } else {
        audio.pause();
        audio.currentTime = 0; // Optional: rewind to start
        currentlyPlaying = null;
        // Optional: Remove visual feedback
        // clickedButton.classList.remove('playing');
    }
}

function downloadAudio(id) {
    const audio = document.getElementById(id);
    
    if (!audio) {
        alert("Áudio não encontrado!");
        return;
    }

    const link = document.createElement('a');
    link.href = audio.src;
    link.download = audio.src.split('/').pop(); 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

document.addEventListener("DOMContentLoaded", function () {
    const controls = document.querySelectorAll(".audio-controls");

    controls.forEach(control => {
        const baseId = control.dataset.audio;

        control.innerHTML = `
            <button onclick="playAudio('${baseId}-e', this)">ENG</button>
            <button onclick="downloadAudio('${baseId}-e')">⬇</button>

            <button onclick="playAudio('${baseId}-j', this)">JP</button>
            <button onclick="downloadAudio('${baseId}-j')">⬇</button>
        `;
    });
});

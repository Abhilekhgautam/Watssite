document.addEventListener("DOMContentLoaded", () => {
  // --- Playground Link Handler ---
  const playgroundLinks = document.querySelectorAll(
    "#playground-btn, .playground-link",
  );
  const playgroundURL =
    "https://abhilekhgautam.github.io/wats-playground/src/playground.html";

  playgroundLinks.forEach((button) => {
    button.addEventListener("click", () => {
      window.open(playgroundURL, "_blank");
    });
  });

  // --- 1. REPEATING SCROLL ANIMATION ---
  // This observer will add/remove the 'visible' class to animate elements
  // every time they enter or leave the viewport.
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Element is on screen, add class to animate in
          entry.target.classList.add("visible");
        } else {
          // Element is off screen, remove class to reset animation
          entry.target.classList.remove("visible");
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% of the element is visible
    },
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

  // --- 2. ONE-TIME TYPEWRITER ANIMATION ---
  const codeBlock = document.getElementById("animated-code");
  const codeEditor = document.getElementById("code-editor-wrapper");
  const codeToType = `<span class="code-line-number">1</span><span class="code-keyword">function</span> <span class="code-keyword">main</span>(){
<span class="code-line-number">2</span>    <span class="code-keyword">let</span> x = <span class="code-number">5</span>;
<span class="code-line-number">3</span>    <span class="code-keyword">let</span> y: <span class="code-type">i64</span> = <span class="code-string">67</span>;
<span class="code-line-number">4</span>    <span class="code-keyword">loop</span> {
<span class="code-line-number">5</span>        <span class="code-comment"># Uhh, this is a comment.</span>
<span class="code-line-number">6</span>    }
<span class="code-line-number">9</span>}`;

  // Function to type out the code character by character
  function typeWriter(text, i = 0) {
    if (i < text.length) {
      codeBlock.innerHTML = text.substring(0, i + 1);
      setTimeout(() => typeWriter(text, i + 1), 50);
    } else {
      // Typing is done, add a class to hide the cursor
      codeBlock.classList.add("typing-done");
    }
  }

  // This observer will trigger the typewriter animation only once.
  const typewriterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Editor is visible, start the typing animation
          setTimeout(() => typeWriter(codeToType), 500); // Small delay before starting

          // Stop observing so it doesn't re-trigger
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5, // Trigger when 50% of the editor is visible
    },
  );

  // Start observing the code editor
  if (codeEditor) {
    typewriterObserver.observe(codeEditor);
  }
});

// Utility functions for animations and sound effects

// Play sound effect
export const playSound = (type: 'correct' | 'incorrect' | 'hint' | 'bookmark') => {
  try {
    // In a real implementation, you would play actual sound files
    // For now, we'll just log to console
    console.log(`Playing ${type} sound effect`);
    
    // Example of how you would play actual sounds:
    /*
    const audio = new Audio(`/sounds/${type}.mp3`);
    audio.play().catch(e => console.log('Sound play failed:', e));
    */
  } catch (error) {
    console.log(`Could not play ${type} sound effect`);
  }
};

// Show confetti animation for correct answers
export const showConfetti = () => {
  try {
    // Create a simple confetti effect using CSS
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    confettiContainer.innerHTML = `
      <div class="confetti">
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
      </div>
    `;
    
    document.body.appendChild(confettiContainer);
    
    // Remove after animation
    setTimeout(() => {
      document.body.removeChild(confettiContainer);
    }, 3000);
  } catch (error) {
    console.log('Could not show confetti animation');
  }
};

// Show shake effect for incorrect answers
export const showShakeEffect = (elementId: string) => {
  try {
    const element = document.getElementById(elementId);
    if (element) {
      element.classList.add('shake');
      setTimeout(() => {
        element.classList.remove('shake');
      }, 1000);
    }
  } catch (error) {
    console.log('Could not show shake effect');
  }
};

// Add CSS for animations
const addAnimationStyles = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes confetti-fall {
      0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
      100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
    }
    
    .confetti-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
    }
    
    .confetti {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    
    .confetti-piece {
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: #f00;
      top: -10px;
      animation: confetti-fall 3s linear forwards;
    }
    
    .confetti-piece:nth-child(1) { left: 10%; background-color: #ff0000; animation-delay: 0s; }
    .confetti-piece:nth-child(2) { left: 20%; background-color: #00ff00; animation-delay: 0.2s; }
    .confetti-piece:nth-child(3) { left: 30%; background-color: #0000ff; animation-delay: 0.4s; }
    .confetti-piece:nth-child(4) { left: 40%; background-color: #ffff00; animation-delay: 0.6s; }
    .confetti-piece:nth-child(5) { left: 50%; background-color: #ff00ff; animation-delay: 0.8s; }
    .confetti-piece:nth-child(6) { left: 60%; background-color: #00ffff; animation-delay: 1.0s; }
    .confetti-piece:nth-child(7) { left: 70%; background-color: #ff9900; animation-delay: 1.2s; }
    .confetti-piece:nth-child(8) { left: 80%; background-color: #9900ff; animation-delay: 1.4s; }
    .confetti-piece:nth-child(9) { left: 90%; background-color: #ff0099; animation-delay: 1.6s; }
    .confetti-piece:nth-child(10) { left: 5%; background-color: #99ff00; animation-delay: 1.8s; }
    
    @keyframes shake {
      0% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      50% { transform: translateX(5px); }
      75% { transform: translateX(-5px); }
      100% { transform: translateX(0); }
    }
    
    .shake {
      animation: shake 0.5s ease-in-out;
    }
  `;
  
  document.head.appendChild(style);
};

// Add styles when module is loaded
addAnimationStyles();
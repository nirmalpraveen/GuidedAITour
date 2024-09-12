const essentialButtons = document.querySelectorAll('button, a, input[type="submit"]');

let currentStep = 0;
const tourSteps = [];

essentialButtons.forEach((button, index) => {
  const rect = button.getBoundingClientRect();
  const tourStep = document.createElement('div');
  
  tourStep.className = 'tour-popup';
  tourStep.innerText = `Step ${index + 1}: ${button.innerText || button.value || 'Button'}`;
  tourStep.style.position = 'absolute';
  
  // Calculate the position to place the popup above or below the button
  const popupHeight = 40;  // Height of the pop-up
  const offset = 10;  // Add an offset for better visibility
  
  if (rect.top + window.scrollY > popupHeight) {
    // If there's enough space, place it above the button
    tourStep.style.top = `${rect.top + window.scrollY - popupHeight - offset}px`;
  } else {
    // Otherwise, place it below the button
    tourStep.style.top = `${rect.bottom + window.scrollY + offset}px`;
  }
  
  tourStep.style.left = `${rect.left + window.scrollX}px`;
  tourStep.style.padding = '10px';
  tourStep.style.backgroundColor = '#ffeb3b';
  tourStep.style.border = '1px solid black';
  tourStep.style.zIndex = '10000';
  tourStep.style.display = 'none';  // Initially hidden
  
  document.body.appendChild(tourStep);
  tourSteps.push(tourStep);
});

// Show the first step
if (tourSteps.length > 0) {
  tourSteps[currentStep].style.display = 'block';
}

// Add event listener for navigation
document.addEventListener('click', (e) => {
  if (currentStep < tourSteps.length - 1) {
    tourSteps[currentStep].style.display = 'none';
    currentStep++;
    tourSteps[currentStep].style.display = 'block';
  } else {
    tourSteps[currentStep].style.display = 'none';
    currentStep = 0;  // Restart tour
  }
});

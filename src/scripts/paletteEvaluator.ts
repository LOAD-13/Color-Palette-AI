import { evaluatePalette } from '../lib/gemini';
import type { Evaluation } from '../lib/types';

export async function evaluateCurrentPalette(colors: string[]): Promise<Evaluation | null> {
  try {
    const evaluation = await evaluatePalette(colors);
    return evaluation;
  } catch (error) {
    console.error('Error evaluating palette:', error);
    return null;
  }
}

export function displayEvaluation(evaluation: Evaluation) {
  const panel = document.getElementById('evaluation-panel');
  if (!panel) return;

  // Mostrar panel
  panel.classList.remove('hidden');

  // Animar score principal
  const scoreValue = document.getElementById('score-value');
  const scoreCircle = document.getElementById('score-circle');
  
  if (scoreValue && scoreCircle) {
    animateValue(scoreValue, 0, evaluation.score, 1000);
    
    const circumference = 2 * Math.PI * 56;
    const offset = circumference - (evaluation.score / 100) * circumference;
    scoreCircle.style.strokeDashoffset = offset.toString();
  }

  // Animar métricas
  animateMetric('contrast-value', evaluation.contrast);
  animateMetric('harmony-value', evaluation.harmony);
  animateMetric('accessibility-value', evaluation.accessibility);
  animateMetric('balance-value', evaluation.balance);

  // Mostrar feedback
  const feedbackText = document.getElementById('feedback-text');
  if (feedbackText) {
    feedbackText.textContent = evaluation.feedback;
  }

  // Scroll al panel
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function animateValue(element: HTMLElement, start: number, end: number, duration: number) {
  const startTime = performance.now();

  function update(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.floor(start + (end - start) * easeOutCubic(progress));
    
    element.textContent = value.toString();

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

function animateMetric(elementId: string, value: number) {
  const element = document.getElementById(elementId);
  if (element) {
    animateValue(element, 0, value, 1000);
  }
}

function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3);
}

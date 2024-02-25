export function getBadgeClass(difficultyLevel) {
    switch (difficultyLevel) {
      case 'EASY':
        return 'bg-success';
      case 'MEDIUM':
        return 'bg-warning';
      case 'HARD':
        return 'bg-danger';
      default:
        return ''; // Default or fallback class when difficultyLevel doesn't match any case
    }
  }
  
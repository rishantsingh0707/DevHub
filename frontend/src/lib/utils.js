export const getDifficultyBadgeClass = (difficulty) => {
    switch (difficulty) {
        case 'easy':
            return 'badge-success';
        case 'medium':
            return 'badge-warning';
        case 'hard':
            return 'badge-error';
        default:
            return 'badge-ghost';
    }
}
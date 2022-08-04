const MAX_PERCENTAGE = 100;
const MAX_RATING = 5;

export const transformRatingToPercentage = (rating: number): string => `${(MAX_PERCENTAGE / MAX_RATING) * rating}%`;

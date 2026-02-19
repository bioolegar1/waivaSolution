export interface IComparisonPoint {
    text: string;
    isPositive: boolean; // Define se usa Check ou X
}

export interface IComparisonCard {
    title: string;
    highlight: string; // O número grande (61 vs 500)
    subHighlight: string;
    points: IComparisonPoint[];
    theme: 'before' | 'after';
}
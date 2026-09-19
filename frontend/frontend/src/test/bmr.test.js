import { calculateBMR, calculateTDEE, calorieTargetForGoal } from '../utils/bmr';

describe('bmr utilities', () => {
  it('calculates male BMR for a valid profile', () => {
    expect(calculateBMR({ age: 30, sex: 'male', heightCm: 180, weightKg: 75 })).toBe(1730);
  });

  it('calculates female BMR for a valid profile', () => {
    expect(calculateBMR({ age: 30, sex: 'female', heightCm: 170, weightKg: 65 })).toBe(1402);
  });

  it('calculates TDEE with activity multiplier', () => {
    expect(calculateTDEE(1730, 'moderately_active')).toBe(2682);
  });

  it('calculates a weight loss target without dropping below the floor', () => {
    expect(calorieTargetForGoal(1500, 'Weight Loss')).toBe(1200);
    expect(calorieTargetForGoal(2000, 'Weight Gain')).toBe(2500);
  });
});

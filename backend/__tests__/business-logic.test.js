import { calculateBMR, calculateTDEE, calorieTargetForGoal } from '../../frontend/frontend/src/utils/bmr.js';

describe('Nutrition calculation helpers', () => {
  it('calculates BMR using Mifflin-St Jeor formula', () => {
    const bmr = calculateBMR({ age: 30, sex: 'male', heightCm: 180, weightKg: 75 });
    expect(bmr).toBe(1730);
  });

  it('calculates TDEE from BMR and activity level', () => {
    expect(calculateTDEE(1730, 'moderately_active')).toBe(2682);
  });

  it('computes calorie targets for different goals', () => {
    expect(calorieTargetForGoal(2500, 'Weight Loss')).toBe(2000);
    expect(calorieTargetForGoal(2500, 'Weight Gain')).toBe(3000);
    expect(calorieTargetForGoal(2500, 'Maintenance')).toBe(2500);
  });
});

// utils/categorize.js

/**
 * Compute user category based on date of birth
 * @param {Date|string} dob - Date of birth of user
 * @returns {string} category - middle_school | high_school | college_student | advanced_learner
 */
function getCategoryFromDOB(dob) {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  if (age >= 8 && age <= 15) return 'middle_school';
  else if (age >= 16 && age <= 18) return 'high_school';
  else if (age >= 19 && age <= 22) return 'college_student';
  else return 'advanced_learner';
}

module.exports = getCategoryFromDOB;

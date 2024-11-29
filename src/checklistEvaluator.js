function evaluateChecklist(data, rules) {
  // Check if age is within the valid range
  if (data.age < rules.minAge) {
    return { valid: false, message: `Age must be at least ${rules.minAge}.` };
  }

  if (data.age > rules.maxAge) {
    return {
      valid: false,
      message: `Age must be no more than ${rules.maxAge}.`,
    };
  }

  // Check for required fields
  for (let field of rules.requiredFields) {
    if (!data.hasOwnProperty(field)) {
      return { valid: false, message: `Missing required field: ${field}` };
    }
  }

  // Check if email is allowed
  if (
    rules.allowedEmails &&
    rules.allowedEmails.length > 0 &&
    !rules.allowedEmails.includes(data.email)
  ) {
    return { valid: false, message: `Email ${data.email} is not allowed.` };
  }

  return { valid: true, message: "Checklist passed!" };
}

export default evaluateChecklist;

export const sendEmail = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
    console.log("Email would be sent here");
    return { success: true };
  } catch (error) {
    console.error('Send error:', error);
    throw error;
  }
};

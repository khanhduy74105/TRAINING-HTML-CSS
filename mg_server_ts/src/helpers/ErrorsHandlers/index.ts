export const failedResponse = (message: String, ...args: any[]) => {
  return {
    msg: message,
    success: false,
    ...args,
  };
};


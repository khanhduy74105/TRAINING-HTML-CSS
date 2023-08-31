const failedResponse = (message, ...args) => {
  return {
    msg: message,
    success: false,
    ...args,
  };
};

exports.failedResponse = failedResponse;

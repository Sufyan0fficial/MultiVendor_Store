export const Message = (messageApi, type, content) => {
  messageApi.open({
    type: type,
    content: content,
  });
};

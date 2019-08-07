export const ADRESS = 'https://fmail.flyaps.com/api/v1/mailbox/messages/';

export const getData = async(link) => {
  const response = await fetch(link);
  const posts = await response.json();

  return posts;
};

const formatDate = (createdAt: any) => {
  const createdAtDate = new Date(parseInt(createdAt));

  const formattedDate = createdAtDate.toLocaleDateString('en-US');

  return formattedDate;
};

export default formatDate;

import moment from 'moment';

const formatPostDate = post =>
  moment(
    post.updatedAt > post.createdAt ? post.updatedAt : post.createdAt
  ).format('MMMM Do YYYY');

export { formatPostDate };

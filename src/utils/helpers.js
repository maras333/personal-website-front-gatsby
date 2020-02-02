import moment from 'moment';

const formatPostDate = post => moment(post.createdAt).format('MMMM Do YYYY');

export { formatPostDate };

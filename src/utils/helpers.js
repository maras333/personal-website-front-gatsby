import moment from 'moment';

const formatPostDate = post => moment(post.createdAt).format('MMM Do YYYY');

export { formatPostDate };

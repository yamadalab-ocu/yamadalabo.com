import {
  startFetching,
  succeedInFetching,
  failToFetch,
} from '../sync/works';
import get from '../../services/api/works';
import APIKEY from '../../config/apikey';

const fetchWorks = async (offset = 0) => {
  const params = {
    api_key: APIKEY,
    offset,
  };
  const {
    entities,
    error,
    totalPosts,
  } = await get(params);

  if (typeof error !== 'undefined') {
    return {
      error: error.message || 'Something bad happened',
    };
  }
  const fetchedPostsNum = offset + entities.length;
  const totalPostsNum = parseInt(totalPosts, 10);
  if (fetchedPostsNum === totalPostsNum) {
    return { entities };
  }

  const {
    entities: nextEntities,
    error: nextError,
  } = await fetchWorks(offset + 20);
  return Object.assign({}, {
    entities: entities.concat(nextEntities),
  }, {
    error: nextError,
  });
};

export default () =>
  async (dispatch) => {
    dispatch(startFetching());
    const { entities, error } = await fetchWorks();
    // todo: distingish error and errorMessage
    if (typeof error !== 'undefined') {
      dispatch(failToFetch(error));
    } else {
      dispatch(succeedInFetching(entities));
    }
  };
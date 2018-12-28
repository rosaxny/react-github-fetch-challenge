export const FETCH_REPOS_REQUEST = 'FETCH_REPOS_REQUEST';
export const fetchReposRequest = () => ({
    type: FETCH_REPOS_REQUEST
});

export const FETCH_REPOS_SUCCESS = 'FETCH_REPOS_SUCCESS';
export const fetchReposSuccess = repos => ({
    type: FETCH_REPOS_SUCCESS,
    repos
});

export const FETCH_REPOS_ERROR = 'FETCH_REPOS_ERROR';
export const fetchReposError = error => ({
    type: FETCH_REPOS_ERROR,
    error
});

export const fetchRepos = () => (dispatch) => {
    dispatch(fetchReposRequest())
    return fetch('https://api.github.com/users/dhh/repos', {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
            if (!res.ok) {
                if ( res.headers.has('content-type') && res.headers.get('content-type').startsWith('application/json') ) {
                    return res.json()
                        .then((err) => Promise.reject(err));
                }
                return Promise.reject({
                    code: res.status,
                    message: res.statusText
                });
            }
            return res;
        })
        .then((res) => res.json())
        .then((res) => dispatch(fetchReposSuccess(res)))
        .catch((err) => dispatch(fetchReposError(err)))
};

import { fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/Store/Store';
import { setJwtTokens, clearJwtTokens } from '@/Store/JwtToken';
import { Mutex } from 'async-mutex';

// create a new mutex
const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).jwtSet.accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshToken = (api.getState() as RootState).jwtSet.refreshToken;
        if (refreshToken) {
          const refreshResult: any = await baseQuery(
            {
              url: '/jwt/refresh',
              method: 'POST',
              body: { refreshToken },
            },
            api,
            extraOptions
          );

          if (refreshResult.data && refreshResult.data.data) {
            api.dispatch(setJwtTokens(refreshResult.data.data));
            // retry the initial query
            result = await baseQuery(args, api, extraOptions);
          } else {
            api.dispatch(clearJwtTokens());
          }
        } else {
          api.dispatch(clearJwtTokens());
        }
      } finally {
        // release must be called once the mutex should be released
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

import { mutate } from '@/utils';

export type LoginParamsType = {
  username: string;
  password: string;
};

export async function accountLogin(params: LoginParamsType) {
  const mutation = `
    mutation {
      tokenAuth(username: "${params.username}", password: "${params.password}") {
        token
        payload
        refreshExpiresIn
      }
    }
`;
  const { data } = await mutate({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: mutation }),
  });

  return data.tokenAuth.token;
}

export async function getFakeCaptcha(mobile: string) {
  // return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function outLogin() {
  // return request('/api/login/outLogin');
}

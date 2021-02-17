import { query } from '@/utils';

export async function queryCurrentUser() {
  const currentUser = `
  query {
    currentUser {
      id
      lastLogin
      username
      isSuperuser
      isStaff
      firstName
      lastName
      email
      isActive
    }
  }

`;
  const token = localStorage.getItem('token');
  return await query({
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'JWT ' + token,
    },
    body: JSON.stringify({ query: currentUser }),
  });
}

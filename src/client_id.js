const CLIENT_IDs = {
  development: '413827651328-ctq9rgl07ugfjfv4u7hc91vo5346270l.apps.googleusercontent.com',
  production: '413827651328-j5f2r9ll2e8s7bac66104bt1fu8fis9o.apps.googleusercontent.com'
}

export const CLIENT_ID = CLIENT_IDs[import.meta.env.MODE];
module.exports = ({ env }) => ({
    "users-permissions": {
      config: {
        jwtSecret: env("ADMIN_JWT_SECRET","05YR8vOfgQ4EwFwMZBTuPw=="),
      },
    },
  });
  
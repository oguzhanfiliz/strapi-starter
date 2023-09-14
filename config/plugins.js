module.exports = ({ env }) => ({
    "users-permissions": {
      config: {
        jwtSecret: env("JWT_SECRET","6/EnfVFbVdJEs2t5vd8owA=="),
      },
    },
  });
  
import { serverConfig } from './configs';
import app from './app';
import sequelize from './db/models/sequelize';

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully.');

    app.listen(serverConfig.port, () => {
      console.log(`🚀 Server running at http://localhost:${serverConfig.port}`);
    });
  } catch (error) {
    console.error('❌ Failed to connect to DB:', error);
    process.exit(1);
  }
};

startServer();

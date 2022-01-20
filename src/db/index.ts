import mongoose, { CallbackWithoutResult, ConnectOptions } from 'mongoose';
import config from "./../config/config";

const connectOptions: ConnectOptions = {}

const connect: CallbackWithoutResult = (error) => {
  if (error) throw new Error('Please make sure envionment config is right!\n\n');
  !config.isProd && console.log(`Connected to ${config.mongoUri.replace(/^mongodb.+@/gi, '')}`);
}

try {
  mongoose.connect(config.mongoUri, connectOptions, connect);
} catch (error) {
  console.error('Please make sure envionment config is right!\n\n', error);
  process.exit(1);
}

export default mongoose.connection;

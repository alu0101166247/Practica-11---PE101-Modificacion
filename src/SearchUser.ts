import * as mongoose from 'mongoose';
import * as yargs from 'yargs';
import {UserInterface} from './UserInterface';
import {UserSchema} from './UserSchema';

/**
 * search command
 */
yargs.command({
  command: 'search',
  describe: 'Search a user',
  builder: {
    email: {
      describe: 'Email',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.email === 'string') {
      find(argv.email);
    }
  },
});

function find(email: string) {
  mongoose.connect('mongodb://127.0.0.1:27017/users-info', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }).then(() => {
    console.log('Connected to the database');
  }).catch(() => {
    console.log('Something went wrong when conecting to the database');
  });
  const User = mongoose.model<UserInterface>('User', UserSchema);
  User.findOne({email: email}).then((result) => {
    console.log(result);
    mongoose.connection.close();
  }).catch((error) => {
    console.log(error);
  });
}

yargs.parse();

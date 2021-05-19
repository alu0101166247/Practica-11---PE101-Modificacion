import * as mongoose from 'mongoose';
import * as yargs from 'yargs';
import {UserInterface} from './UserInterface';
import {UserSchema} from './UserSchema';

/**
 * remove command
 */
yargs.command({
  command: 'remove',
  describe: 'remove a user',
  builder: {
    email: {
      describe: 'Email',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.email === 'string') {
      remove(argv.email);
    }
  },
});

function remove(email: string) {
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
  User.findOneAndDelete({email: email}).then((result) => {
    console.log(result);
    mongoose.connection.close();
  }).catch((error) => {
    console.log(error);
  });
}

yargs.parse();

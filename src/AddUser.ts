/* eslint-disable max-len */
import * as mongoose from 'mongoose';
import * as yargs from 'yargs';
import {UserInterface} from './UserInterface';
import {UserSchema} from './UserSchema';

/**
 * add command
 */
yargs.command({
  command: 'add',
  describe: 'Add a new user',
  builder: {
    name: {
      describe: 'Name',
      demandOption: true,
      type: 'string',
    },
    lastname: {
      describe: 'LastName',
      demandOption: true,
      type: 'string',
    },
    age: {
      describe: 'Age',
      demandOption: false,
      type: 'number',
    },
    email: {
      describe: 'Email',
      demandOption: true,
      type: 'string',
    },
    password: {
      describe: 'Password',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if ((typeof argv.name === 'string') && (typeof argv.lastname === 'string') && (typeof argv.email === 'string') && (typeof argv.password === 'string')) {
      if ((argv.age) && (typeof argv.age === 'number')) {
        add(argv.name, argv.lastname, argv.age, argv.email, argv.password);
      } else {
        add(argv.name, argv.lastname, 0, argv.email, argv.password);
      }
    }
  },
});

function add(name: string, lastname: string, age: number, email: string, password: string) {
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
  let usuario;
  if (age != 0) {
    usuario = new User({
      name: name,
      lastName: lastname,
      age: age,
      email: email,
      password: password,
    });
  } else {
    usuario = new User({
      name: name,
      lastName: lastname,
      email: email,
      password: password,
    });
  }
  usuario.save().then((result) => {
    console.log(result);
    mongoose.connection.close();
  }).catch((error) => {
    console.log(error);
  });
}

yargs.parse();

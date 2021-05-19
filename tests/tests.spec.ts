/* eslint-disable max-len */
import 'mocha';
import {expect} from 'chai';
import * as mongoose from 'mongoose';
import {UserInterface} from '../src/UserInterface';
import {UserSchema} from '../src/UserSchema';

mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb://127.0.0.1:27017/users-info', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => {
  console.log('Connected to the database');
}).catch(() => {
  console.log('Something went wrong when conecting to the database');
});


// Pruebas
describe('Tests para el CRUD de la practica:', () => {
  it('Buscar en la base de datos el usuario con email: ull@ull.edu.es', () => {
    const User = mongoose.model<UserInterface>('User', UserSchema);
    User.findOne({email: 'ull@ull.edu.es'}).then((result) => {
      expect(result).to.equal(null);
    }).catch((error) => {
      console.log(error);
    });
  });
  it('Agregar a la base de datos el usuario con email: ull@ull.edu.es', () => {
    const User = mongoose.model<UserInterface>('User', UserSchema);
    const usuario = new User({
      name: 'ull',
      lastName: 'inf',
      age: 90,
      email: 'ull@ull.edu.es',
      password: 'dsi',
    });
    usuario.save().then((result) => {
      expect(result.email).to.equal('ull@ull.edu.es');
    }).catch((error) => {
      console.log(error);
    });
  });
  it('Modificar el usuario con email: ull@ull.edu.es', () => {
    const User = mongoose.model<UserInterface>('User', UserSchema);
    User.findOneAndUpdate({email: 'ull@ull.edu.es'}, {$set: {
      name: 'ullNew',
      lastName: 'infNew',
      age: 85,
      email: 'ull@ull.edu.es',
      password: 'dsiNew',
    },
    }).then((result) => {
      expect(result).to.equal(result);
    }).catch((error) => {
      console.log(error);
    });
  });
  it('Eliminar de la base de datos el usuario con email: ull@ull.edu.es', () => {
    const User = mongoose.model<UserInterface>('User', UserSchema);
    User.findOneAndDelete({email: 'ull@ull.edu.es'}).then((result) => {
      expect(result).to.equal(result);
      mongoose.connection.close();
    }).catch((error) => {
      console.log(error);
    });
  });
});

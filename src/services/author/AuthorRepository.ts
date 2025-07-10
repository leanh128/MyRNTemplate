import {Author} from './model';

const authors: Author[] = [
  {id: 1, name: 'Author One'},
  {id: 2, name: 'Author Two'},
  {id: 3, name: 'Author Three'},
  {id: 4, name: 'Author Four'},
];

export const AuthorRepository = {
  getAll: (): Author[] => {
    return authors;
  },
};

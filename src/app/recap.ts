const username: string = 'gabriel';

const sum = (a: number, b: number): number => {
  return a + b;
};
sum(1, 2);

class Person {
  constructor(private age: number, public name: string) {}
}

const p = new Person(22, 'Gabriel');

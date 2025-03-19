let firstName = true;
let age: number = 22;
type ConsFuncParamType = string | number;
const constFunc = (param: ConsFuncParamType) => {
  console.log(param);
};

type ConsFunc2ObjectType = {
  id: number;
  title: string;
  category: string;
  price: number;
};

const consFunc2 = (object: ConsFunc2ObjectType) => {
  console.log(object);
};
const object = {
  id: 1,
  title: "ahahhaha",
  category: "comedy",
  price: 10000,
};

type ConsFuncProductType = {
  id: number;
  title: string;
  category: string;
  price?: number;
};
const consFunc = (param1: ConsFuncProductType[]) => {};

const array = [
  {
    id: 1,
    title: "Perfume",
    category: "beauty",
    price: 10,
  },
  {
    id: 1,
    title: "Perfume",
    category: "beauty",
  },
];
consFunc(array);

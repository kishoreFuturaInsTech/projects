function Person(name) {
  this.name = name;
  this.greeting = function () {
    console.log(`Hello ${name}`);
  };
}

let kishore = new Person("Kishore");

kishore.greeting();

console.log(kishore.name);

console.log(Math.ceil(5.4));

(() => {
  console.log("IIFE");
})();

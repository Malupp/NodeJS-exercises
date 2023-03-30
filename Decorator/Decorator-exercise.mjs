// Implement a toString method on the Shout class that decorates the toString method for a Text class instance.

// It should use the toUpperCase() method to convert the Text instance string to uppercase.

class Text {
  constructor(text) {
    this.string = text;
  }

  toString() {
    return this.string;
  }

  toUpperCase() {
    return this.string.toUpperCase();
  }
}

class Shout {
  constructor(text) {
    this.text = text;
  }

  toString() {
    const yelling = this.text.toUpperCase()
    return yelling;
  }
}

console.log(new Text("Hello, I'm talking").toString());

console.log(new Shout(new Text("Hello, I'm shouting!")).toString());

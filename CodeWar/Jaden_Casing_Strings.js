// Not Jaden-Cased: "How can mirrors be real if our eyes aren't real"
// Jaden-Cased:     "How Can Mirrors Be Real If Our Eyes Aren't Real"
String.prototype.toJadenCase = function () {
  return this.replace(/(^|\s)[a-z]/g, function(x){ console.log(x); return x.toUpperCase(); });
};
var str = "how can mirrors be real if our eyes aren't real";
console.log(str.toJadenCase());
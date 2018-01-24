// We also want to be able to continue to add numbers to our chain.

// add(1)(2)(3); // 6
// add(1)(2)(3)(4); // 10
// add(1)(2)(3)(4)(5); // 15
var add = function(n) {
  const f = x => add(n + x)
  f.valueOf = () => n
  return f;
}



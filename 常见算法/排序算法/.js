var singleNumber = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    if (nums.lastIndexOf(nums[i]) === nums.indexOf(nums[i])) return nums[i];
  }
};
console.log(singleNumber([1, 2, 2, 1, 2, 3, 1, -123, 345, 5, 4, 6]))


setTimeout()


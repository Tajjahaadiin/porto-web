function truncateText(truncated, maxLength) {
  if (truncated.length > maxLength) {
    truncated = truncated.substr(0, maxLength) + "...";
  }
  return truncated;
}
//You can then call the function with something like what i have below.

module.exports = { truncateText };
